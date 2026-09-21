"use client";

import { useRouter } from "next/navigation";
import {
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  commands,
  completeInput,
  Dim,
  ErrorText,
  findCommand,
  Key,
} from "./commands";

interface Entry {
  id: number;
  kind: "input" | "output";
  content: ReactNode;
}

interface TerminalProps {
  className?: string;
  bootCommand?: string;
  autoFocus?: boolean;
}

const PROMPT_USER = "archit";
const PROMPT_HOST = "mehta";

function Prompt() {
  return (
    <span className="select-none whitespace-pre">
      <span className="text-emerald-300">{PROMPT_USER}</span>
      <span className="text-slate-500">@</span>
      <span className="text-brand-300">{PROMPT_HOST}</span>
      <span className="text-slate-500">:</span>
      <span className="text-sky-200">~</span>
      <span className="text-slate-400">$ </span>
    </span>
  );
}

export function Terminal({
  className,
  bootCommand = "whoami",
  autoFocus = true,
}: TerminalProps) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [value, setValue] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [isBooting, setIsBooting] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const nextEntryIdRef = useRef(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const outputRef = useRef<HTMLDivElement | null>(null);
  const commandHistoryRef = useRef<string[]>([]);

  const getNextEntryId = () => ++nextEntryIdRef.current;

  const appendEntries = useCallback((newEntries: Omit<Entry, "id">[]) => {
    setEntries((currentEntries) => [
      ...currentEntries,
      ...newEntries.map((entry) => ({
        ...entry,
        id: getNextEntryId(),
      })),
    ]);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    if (sectionId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const executeCommand = useCallback(
    (rawInput: string) => {
      const commandLine = rawInput.trim();
      const echoedEntries: Omit<Entry, "id">[] = [
        {
          kind: "input",
          content: (
            <>
              <Prompt />
              <span className="text-slate-100">{rawInput}</span>
            </>
          ),
        },
      ];

      if (!commandLine) {
        appendEntries(echoedEntries);
        return;
      }

      commandHistoryRef.current = [...commandHistoryRef.current, commandLine];
      setCommandHistory(commandHistoryRef.current);
      setHistoryIndex(null);

      const [commandName, ...argumentsList] = commandLine.split(/\s+/);
      const command = findCommand(commandName);

      let cleared = false;
      const commandContext = {
        clear: () => {
          cleared = true;
        },
        history: commandHistoryRef.current,
        scrollTo: scrollToSection,
        openUrl: (url: string) => window.open(url, "_blank", "noopener"),
        navigate: (path: string) => router.push(path),
      };

      const outputLines: ReactNode[] = command
        ? command.run(argumentsList, commandContext)
        : [
            <ErrorText key="err">
              zsh: command not found: {commandName}
            </ErrorText>,
            <Dim key="hint">
              Type <Key>help</Key> to see what I can do.
            </Dim>,
          ];

      if (cleared) {
        setEntries([]);
        return;
      }

      appendEntries([
        ...echoedEntries,
        ...outputLines.map((content) => ({
          kind: "output" as const,
          content,
        })),
      ]);
    },
    [appendEntries, scrollToSection, router],
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const timerIds: number[] = [];

    // Timers let Strict Mode cleanup cancel every boot side effect.
    const finishBoot = () => {
      executeCommand(bootCommand);
      setValue("");
      appendEntries([
        { kind: "output", content: "" },
        {
          kind: "output",
          content: (
            <Dim>
              Type <Key>help</Key> to explore, or try <Key>projects</Key>,{" "}
              <Key>experience</Key>, <Key>neofetch</Key>…
            </Dim>
          ),
        },
      ]);
      setIsBooting(false);
    };

    if (prefersReducedMotion) {
      timerIds.push(window.setTimeout(finishBoot, 0));
    } else {
      const initialDelay = 550;

      for (
        let characterCount = 1;
        characterCount <= bootCommand.length;
        characterCount++
      ) {
        timerIds.push(
          window.setTimeout(
            () => setValue(bootCommand.slice(0, characterCount)),
            initialDelay + characterCount * 70,
          ),
        );
      }

      timerIds.push(
        window.setTimeout(
          finishBoot,
          initialDelay + bootCommand.length * 70 + 350,
        ),
      );
    }

    return () => timerIds.forEach(clearTimeout);
  }, [bootCommand, executeCommand, appendEntries]);

  useEffect(() => {
    if (isBooting || !autoFocus) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const activeElement = document.activeElement;

    if (
      activeElement &&
      activeElement !== document.body &&
      activeElement !== inputRef.current
    ) {
      return;
    }

    inputRef.current?.focus({ preventScroll: true });
  }, [isBooting, autoFocus]);

  useEffect(() => {
    const output = outputRef.current;
    if (output) output.scrollTop = output.scrollHeight;
  }, [entries, value]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isBooting) return;

    executeCommand(value);
    setValue("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (isBooting) return;

    if (event.key === "Tab") {
      event.preventDefault();

      const completions = completeInput(value);

      if (completions.length === 1) {
        setValue(completions[0] + (value.split(/\s+/).length <= 1 ? " " : ""));
      } else if (completions.length > 1) {
        appendEntries([
          {
            kind: "input",
            content: (
              <>
                <Prompt />
                <span className="text-slate-100">{value}</span>
              </>
            ),
          },
          {
            kind: "output",
            content: (
              <span className="text-slate-300">
                {completions
                  .map((completion) => completion.split(" ").pop())
                  .join("   ")}
              </span>
            ),
          },
        ]);
      }
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!commandHistory.length) return;

      const previousHistoryIndex =
        historyIndex === null
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);

      setHistoryIndex(previousHistoryIndex);
      setValue(commandHistory[previousHistoryIndex]);

      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex === null) return;

      const nextHistoryIndex = historyIndex + 1;

      if (nextHistoryIndex >= commandHistory.length) {
        setHistoryIndex(null);
        setValue("");
      } else {
        setHistoryIndex(nextHistoryIndex);
        setValue(commandHistory[nextHistoryIndex]);
      }

      return;
    }

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "l") {
      event.preventDefault();
      setEntries([]);
      return;
    }

    if (event.ctrlKey && event.key.toLowerCase() === "c") {
      event.preventDefault();
      appendEntries([
        {
          kind: "input",
          content: (
            <>
              <Prompt />
              <span className="text-slate-100">{value}</span>
              <span className="text-slate-500">^C</span>
            </>
          ),
        },
      ]);
      setValue("");
    }
  };

  const focusInputUnlessSelecting = () => {
    if (window.getSelection()?.toString()) return;
    inputRef.current?.focus({ preventScroll: true });
  };

  return (
    <div
      className={`group/terminal relative flex flex-col overflow-hidden rounded-2xl bg-ink-950 text-[13px] leading-6 text-slate-200 shadow-terminal ring-1 transition-shadow duration-300 ${
        isFocused ? "ring-brand-400/60" : "ring-white/10"
      } ${className ?? ""}`}
      onClick={focusInputUnlessSelecting}
      role="region"
      aria-label="Interactive terminal about Archit"
      data-focused={isFocused || undefined}
    >
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </span>
        <p className="flex-1 truncate text-center font-mono text-xs text-slate-400">
          {PROMPT_USER}@{PROMPT_HOST}: ~ — zsh
        </p>
        <span className="hidden font-mono text-[11px] text-slate-500 sm:inline">
          {commands.length} commands
        </span>
      </div>

      <div
        ref={outputRef}
        className="terminal-scroll flex-1 overflow-y-auto px-4 py-4 font-mono"
      >
        <ol className="m-0 list-none space-y-0 p-0" aria-live="polite">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className={
                entry.kind === "input"
                  ? "mt-3 whitespace-pre-wrap break-words first:mt-0"
                  : "whitespace-pre-wrap break-words text-slate-300"
              }
            >
              {entry.content === "" ? "\u00a0" : entry.content}
            </li>
          ))}
        </ol>

        <form onSubmit={handleSubmit} className="mt-3 flex items-center">
          <label htmlFor="terminal-input" className="sr-only">
            Terminal command input
          </label>
          <Prompt />
          <span className="relative flex min-w-0 flex-1 items-center">
            <input
              id="terminal-input"
              ref={inputRef}
              value={value}
              readOnly={isBooting}
              onChange={(event) => {
                setValue(event.target.value);
                setHistoryIndex(null);
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="send"
              placeholder={isBooting ? undefined : "type a command…"}
              className={`min-w-0 flex-1 bg-transparent font-mono text-slate-100 outline-none placeholder:text-slate-600 ${
                isBooting ? "caret-transparent" : "caret-brand-400"
              }`}
            />
            {isBooting ? (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 h-[1.05em] w-[0.6em] -translate-y-1/2 animate-blink bg-brand-400"
                style={{ left: `${value.length}ch` }}
              />
            ) : null}
          </span>
        </form>
      </div>

      <div className="flex items-center justify-between border-t border-white/[0.06] bg-white/[0.02] px-4 py-2 font-mono text-[11px] text-slate-500">
        <span>
          <kbd className="rounded border border-white/10 bg-white/5 px-1 py-px text-slate-400">
            Tab
          </kbd>{" "}
          autocomplete
          <span className="mx-2 text-slate-700">·</span>
          <kbd className="rounded border border-white/10 bg-white/5 px-1 py-px text-slate-400">
            ↑
          </kbd>{" "}
          history
        </span>
        <span className="hidden items-center gap-1.5 sm:inline-flex">
          <span
            className={`size-1.5 rounded-full transition-colors ${
              isFocused ? "bg-emerald-400" : "bg-slate-600"
            }`}
            aria-hidden="true"
          />
          {isFocused ? (
            <>
              <kbd className="rounded border border-white/10 bg-white/5 px-1 py-px text-slate-400">
                help
              </kbd>{" "}
              to start
            </>
          ) : (
            "click to type"
          )}
        </span>
      </div>
    </div>
  );
}
