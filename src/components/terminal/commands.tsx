/* eslint-disable react/jsx-key -- Terminal wraps every output line in a keyed <li> */
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import type { ReactNode } from "react";

export type OutputLine = ReactNode;

export interface CommandContext {
  clear: () => void;
  history: string[];
  scrollTo: (id: string) => void;
  openUrl: (url: string) => void;
  navigate: (path: string) => void;
}

export interface Command {
  name: string;
  aliases?: string[];
  description: string;
  usage?: string;
  argumentOptions?: string[];
  run: (argumentsList: string[], context: CommandContext) => OutputLine[];
}

export const Key = ({ children }: { children: ReactNode }) => (
  <span className="text-brand-300">{children}</span>
);
export const StringValue = ({ children }: { children: ReactNode }) => (
  <span className="text-sky-200">{children}</span>
);
export const Dim = ({ children }: { children: ReactNode }) => (
  <span className="text-slate-500">{children}</span>
);
export const Bright = ({ children }: { children: ReactNode }) => (
  <span className="font-semibold text-white">{children}</span>
);
export const ErrorText = ({ children }: { children: ReactNode }) => (
  <span className="text-rose-300">{children}</span>
);
export const SuccessText = ({ children }: { children: ReactNode }) => (
  <span className="text-emerald-300">{children}</span>
);
export const TerminalLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => (
  <a
    href={href}
    target={href.startsWith("#") ? undefined : "_blank"}
    rel="noreferrer"
    className="text-brand-300 underline decoration-brand-300/40 underline-offset-2 hover:text-white hover:decoration-white"
  >
    {children}
  </a>
);

const SECTIONS = [
  "top",
  "about",
  "experience",
  "projects",
  "skills",
  "contact",
];
const FILES: Record<string, string> = {
  "about.md": "about",
  "experience.md": "experience",
  "projects.md": "projects",
  "skills.md": "skills",
  "education.md": "education",
  "contact.md": "contact",
  "resume.pdf": "resume",
  "stamp.md": "stamp",
  "study.md": "study",
};

const padToWidth = (value: string, width: number) => value.padEnd(width, " ");

const whoami: Command = {
  name: "whoami",
  description: "Who is this, anyway?",
  run: () => [
    <>
      <Bright>{profile.name}</Bright> <Dim>—</Dim> {profile.role}
    </>,
    <>
      <Key>role</Key>
      <Dim>:</Dim> <StringValue>&quot;{profile.headline}&quot;</StringValue>
    </>,
    <>
      <Key>previously</Key>
      <Dim>:</Dim> <StringValue>&quot;Stripe&quot;</StringValue>,{" "}
      <StringValue>&quot;Apple&quot;</StringValue>,{" "}
      <StringValue>&quot;Cornell AppDev (President)&quot;</StringValue>
    </>,
    <>
      <Key>education</Key>
      <Dim>:</Dim>{" "}
      <StringValue>&quot;CS + Applied Math @ Cornell&quot;</StringValue>
    </>,
    <>
      <Key>interests</Key>
      <Dim>:</Dim> [<StringValue>&quot;AGI&quot;</StringValue>,{" "}
      <StringValue>&quot;LLMs&quot;</StringValue>,{" "}
      <StringValue>&quot;agents&quot;</StringValue>,{" "}
      <StringValue>&quot;computer vision&quot;</StringValue>]
    </>,
  ],
};

const about: Command = {
  name: "about",
  aliases: ["bio"],
  description: "A short bio.",
  run: () => [
    <>
      I’m a tech entrepreneur currently building{" "}
      <TerminalLink href={profile.links.stamp}>Stamp</TerminalLink>, the AI
      Secretary — a new email platform that gives every user their own personal
      Secretary that triages, writes, and learns like them. Backed by{" "}
      <TerminalLink href={profile.links.ycombinator}>Y Combinator</TerminalLink>
    </>,
    "",
    <>
      Before Stamp I was a software engineer at <Bright>Stripe</Bright> (saved
      $1M/yr in database costs), interned at <Bright>Apple</Bright> on HD maps
      for autonomous systems, and led <Bright>Cornell AppDev</Bright> — 50
      students shipping apps to 15,000+ users.
    </>,
    "",
    <Dim>
      Try <Key>experience</Key>, <Key>projects</Key>, or <Key>open about</Key>.
    </Dim>,
  ],
};

const experienceCommand: Command = {
  name: "experience",
  aliases: ["work", "exp", "jobs"],
  description: "Where I’ve worked.",
  run: () => [
    <Dim># most recent first</Dim>,
    ...experience.map((role) => (
      <>
        <Dim>{padToWidth(`${role.startDate} – ${role.endDate}`, 23)}</Dim>
        <Bright>{role.title}</Bright> <Dim>@</Dim>{" "}
        <Key>{role.organization}</Key>
      </>
    )),
    "",
    <Dim>
      Full details: <Key>open experience</Key>
    </Dim>,
  ],
};

const projectsCommand: Command = {
  name: "projects",
  aliases: ["ls-projects", "builds"],
  description: "Products I've shipped.",
  run: () => [
    ...projects.map((project) => (
      <>
        <Key>▸</Key> <Bright>{project.title}</Bright>
        {project.impact ? <Dim> — {project.impact}</Dim> : null}
      </>
    )),
    "",
    <Dim>
      Screenshots &amp; links: <Key>open projects</Key>
    </Dim>,
  ],
};

const skillsCommand: Command = {
  name: "skills",
  aliases: ["stack", "tech"],
  description: "My technical toolkit.",
  run: () =>
    skillGroups.map((group) => (
      <>
        <Key>{padToWidth(group.skillType, 18)}</Key>
        <Dim>→</Dim> {group.skills.map((skill) => skill.name).join(", ")}
      </>
    )),
};

const education: Command = {
  name: "education",
  aliases: ["edu", "school"],
  description: "Where I studied.",
  run: () => [
    <>
      <Bright>Cornell University</Bright> <Dim>—</Dim> B.S. Computer Science,
      minor in Applied Mathematics
    </>,
    <>
      <Dim>·</Dim> President of Cornell AppDev (50 students, 15,000+ users)
    </>,
    <>
      <Dim>·</Dim> Computer Vision research with Prof. Noah Snavely
    </>,
  ],
};

const contact: Command = {
  name: "contact",
  aliases: ["socials", "links"],
  description: "How to reach me.",
  run: () => [
    <>
      <Key>{padToWidth("email", 10)}</Key>
      <TerminalLink href={profile.socials.email}>{profile.email}</TerminalLink>
    </>,
    <>
      <Key>{padToWidth("linkedin", 10)}</Key>
      <TerminalLink href={profile.socials.linkedin}>
        linkedin.com/in/4architmehta
      </TerminalLink>
    </>,
    <>
      <Key>{padToWidth("github", 10)}</Key>
      <TerminalLink href={profile.socials.github}>
        github.com/Archit404Error
      </TerminalLink>
    </>,
    <>
      <Key>{padToWidth("stamp", 10)}</Key>
      <TerminalLink href={profile.links.stamp}>stampmail.ai</TerminalLink>
    </>,
    "",
    <Dim>
      Or send a message: <Key>open contact</Key>
    </Dim>,
  ],
};

const resume: Command = {
  name: "resume",
  aliases: ["cv"],
  description: "Open my resume (PDF).",
  run: (_, context) => {
    context.openUrl(profile.resume);
    return [
      <>
        <SuccessText>✓</SuccessText> Opening{" "}
        <TerminalLink href={profile.resume}>
          Archit_Mehta_Resume.pdf
        </TerminalLink>{" "}
        in a new tab…
      </>,
    ];
  },
};

const stamp: Command = {
  name: "stamp",
  description: "What I’m building right now.",
  run: () => [
    <>
      <Bright>Stamp</Bright> <Dim>(YC W25)</Dim> <Dim>—</Dim> the AI Secretary
      for email.
    </>,
    <>
      <Dim>·</Dim> Service-oriented backend speaking IMAP/SMTP natively
    </>,
    <>
      <Dim>·</Dim> Multi-agent SDK: triage, summaries, drafts, memories, Deep
      Research, Voice Mode
    </>,
    <>
      <Dim>·</Dim> Fine-tuned multilingual embeddings powering hybrid RAG +
      clustering
    </>,
    <>
      <Dim>·</Dim> Web, iOS, Android and Desktop apps
    </>,
    <>
      <TerminalLink href={profile.links.stamp}>stampmail.ai</TerminalLink>
    </>,
  ],
};

const study: Command = {
  name: "study",
  aliases: ["books", "bookshelf"],
  description: "Bookshelf, open questions, academic notes.",
  run: (_, context) => {
    context.navigate("/study");
    return [
      <>
        <SuccessText>→</SuccessText> Opening <Key>/study</Key>
      </>,
      <Dim>
        Bookshelf, open research questions, and notes from the academic side.
      </Dim>,
    ];
  },
};

const open: Command = {
  name: "open",
  aliases: ["goto", "cd"],
  description: "Scroll to a section.",
  usage: "open <about|experience|projects|skills|contact|study|top>",
  argumentOptions: [...SECTIONS, "study", "blog"],
  run: (argumentsList, context) => {
    const target = (argumentsList[0] ?? "").toLowerCase().replace(/^~?\/?/, "");

    if (!target || target === "~") {
      context.scrollTo("top");
      return [<Dim>~</Dim>];
    }

    if (target === "study" || target === "blog") {
      context.navigate(`/${target}`);
      return [
        <>
          <SuccessText>→</SuccessText> Opening <Key>/{target}</Key>
        </>,
      ];
    }
    if (!SECTIONS.includes(target)) {
      return [
        <ErrorText>open: no such section: {target}</ErrorText>,
        <Dim>sections: {SECTIONS.join(", ")}</Dim>,
      ];
    }

    context.scrollTo(target);
    return [
      <>
        <SuccessText>→</SuccessText> Scrolling to <Key>#{target}</Key>
      </>,
    ];
  },
};

const ls: Command = {
  name: "ls",
  aliases: ["dir"],
  description: "List files in ~.",
  run: () => [
    <div className="flex flex-wrap gap-x-6 gap-y-1">
      {Object.keys(FILES).map((fileName) => (
        <span
          key={fileName}
          className={
            fileName.endsWith(".pdf") ? "text-rose-300" : "text-brand-300"
          }
        >
          {fileName}
        </span>
      ))}
    </div>,
  ],
};

const cat: Command = {
  name: "cat",
  description: "Print a file.",
  usage: "cat <file>",
  argumentOptions: Object.keys(FILES),
  run: (argumentsList, context) => {
    const file = argumentsList[0];
    if (!file) {
      return [<ErrorText>cat: missing file operand</ErrorText>];
    }

    const commandName = FILES[file];
    if (!commandName) {
      return [<ErrorText>cat: {file}: No such file or directory</ErrorText>];
    }

    const command = findCommand(commandName);
    return command ? command.run([], context) : [];
  },
};

const echo: Command = {
  name: "echo",
  description: "Echo text back.",
  usage: "echo <text>",
  run: (argumentsList) => [argumentsList.join(" ")],
};

const date: Command = {
  name: "date",
  description: "Show the current date.",
  run: () => [new Date().toString()],
};

const pwd: Command = {
  name: "pwd",
  description: "Print working directory.",
  run: () => ["/home/archit"],
};

const historyCommand: Command = {
  name: "history",
  description: "Show command history.",
  run: (_, context) =>
    context.history.length
      ? context.history.map((historyItem, index) => (
          <>
            <Dim>{String(index + 1).padStart(4, " ")}</Dim> {historyItem}
          </>
        ))
      : [<Dim>(empty)</Dim>],
};

const clear: Command = {
  name: "clear",
  aliases: ["cls"],
  description: "Clear the terminal.",
  run: (_, context) => {
    context.clear();
    return [];
  },
};

const sudo: Command = {
  name: "sudo",
  description: "Escalate privileges.",
  run: () => [
    <ErrorText>
      archit is not in the sudoers file. This incident will be reported.
    </ErrorText>,
  ],
};

const exit: Command = {
  name: "exit",
  aliases: ["quit", ":q"],
  description: "Leave the terminal.",
  run: () => [
    <Dim>
      There’s no escape — but you can <Key>open contact</Key> and say hi.
    </Dim>,
  ],
};

const neofetch: Command = {
  name: "neofetch",
  aliases: ["fetch"],
  description: "System info, portfolio edition.",
  run: () => {
    const asciiArt = [
      "   █████╗ ███╗   ███╗",
      "  ██╔══██╗████╗ ████║",
      "  ███████║██╔████╔██║",
      "  ██╔══██║██║╚██╔╝██║",
      "  ██║  ██║██║ ╚═╝ ██║",
      "  ╚═╝  ╚═╝╚═╝     ╚═╝",
    ];
    const systemInfo: [string, ReactNode][] = [
      ["archit@mehta", <Dim key="sep">—————————————</Dim>],
      ["OS", "FounderOS 2.0 (YC W25)"],
      ["Host", "Stamp, the AI Secretary"],
      ["Kernel", "Cornell CS + Applied Math"],
      ["Shell", "TypeScript, Python, C++"],
      ["Uptime", "building since 2018"],
      ["Packages", `${projects.length} shipped projects`],
      ["Theme", "Paper / #0052FF"],
    ];
    return [
      <div className="grid grid-cols-[auto_1fr] gap-x-6">
        <pre className="text-brand-400 leading-5">{asciiArt.join("\n")}</pre>
        <div className="leading-5">
          {systemInfo.map(([label, value], index) => (
            <div key={label}>
              {index === 0 ? (
                <Bright>{label}</Bright>
              ) : (
                <Key>{padToWidth(label, 9)}</Key>
              )}{" "}
              {value}
            </div>
          ))}
        </div>
      </div>,
    ];
  },
};

const help: Command = {
  name: "help",
  aliases: ["?", "man"],
  description: "List available commands.",
  run: () => [
    <Dim>Available commands:</Dim>,
    ...commands
      .filter(
        (command) =>
          !["sudo", "exit", "pwd", "date", "echo"].includes(command.name),
      )
      .map((command) => (
        <>
          <Key>
            {padToWidth(
              command.usage ? command.usage.split(" ")[0] : command.name,
              12,
            )}
          </Key>
          <span className="text-slate-300">{command.description}</span>
          {command.usage ? <Dim> ({command.usage})</Dim> : null}
        </>
      )),
    "",
    <Dim>
      Tip: use <Key>Tab</Key> to autocomplete and <Key>↑</Key>/<Key>↓</Key> for
      history.
    </Dim>,
  ],
};

export const commands: Command[] = [
  help,
  whoami,
  about,
  stamp,
  experienceCommand,
  projectsCommand,
  skillsCommand,
  education,
  contact,
  resume,
  study,
  open,
  ls,
  cat,
  neofetch,
  historyCommand,
  clear,
  echo,
  date,
  pwd,
  sudo,
  exit,
];

export function findCommand(name: string): Command | undefined {
  const normalizedName = name.toLowerCase();

  return commands.find(
    (command) =>
      command.name === normalizedName ||
      command.aliases?.includes(normalizedName),
  );
}

export function completeInput(input: string): string[] {
  const parts = input.split(/\s+/);
  if (parts.length <= 1) {
    const prefix = (parts[0] ?? "").toLowerCase();
    return commands
      .map((command) => command.name)
      .filter((commandName) => commandName.startsWith(prefix))
      .sort();
  }

  const command = findCommand(parts[0]);
  const argumentPrefix = parts[parts.length - 1].toLowerCase();
  const candidates = command?.argumentOptions ?? [];

  return candidates
    .filter((argument) => argument.startsWith(argumentPrefix))
    .map((argument) => `${parts.slice(0, -1).join(" ")} ${argument}`);
}
