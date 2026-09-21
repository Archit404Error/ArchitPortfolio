"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

interface TypewriterProps {
  text: string;
  millisecondsPerCharacter?: number;
  delayMilliseconds?: number;
  className?: string;
  onComplete?: () => void;
  showCaret?: boolean;
}

/** Reveals text from frame elapsed time so sub-millisecond speeds stay accurate. */
export function Typewriter({
  text,
  millisecondsPerCharacter = 14,
  delayMilliseconds = 0,
  className,
  onComplete,
  showCaret = true,
}: TypewriterProps) {
  const prefersReducedMotion = useReducedMotion();
  const [visibleCharacterCount, setVisibleCharacterCount] = useState(
    prefersReducedMotion ? text.length : 0,
  );
  const [hasStarted, setHasStarted] = useState(Boolean(prefersReducedMotion));
  // Keep inline callbacks current without restarting the animation.
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    if (prefersReducedMotion) {
      const completionTimerId = window.setTimeout(
        () => onCompleteRef.current?.(),
        0,
      );

      return () => window.clearTimeout(completionTimerId);
    }

    let animationFrameId = 0;
    let startTime = 0;
    const characterInterval = Math.max(0.1, millisecondsPerCharacter);

    const updateVisibleText = (currentTime: number) => {
      if (!startTime) {
        startTime = currentTime;
        setHasStarted(true);
      }

      const nextCharacterCount = Math.min(
        text.length,
        Math.floor((currentTime - startTime) / characterInterval),
      );
      setVisibleCharacterCount(nextCharacterCount);

      if (nextCharacterCount < text.length) {
        animationFrameId = window.requestAnimationFrame(updateVisibleText);
      } else {
        onCompleteRef.current?.();
      }
    };

    const startTimerId = window.setTimeout(() => {
      animationFrameId = window.requestAnimationFrame(updateVisibleText);
    }, delayMilliseconds);

    return () => {
      window.clearTimeout(startTimerId);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [text, prefersReducedMotion, millisecondsPerCharacter, delayMilliseconds]);

  const isComplete = visibleCharacterCount >= text.length && hasStarted;

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {text.slice(0, visibleCharacterCount)}
      {showCaret && hasStarted && !isComplete && (
        <span
          className="ml-0.5 inline-block h-[1em] w-[0.08em] translate-y-[0.12em] bg-brand-600 align-baseline animate-blink"
          aria-hidden="true"
        />
      )}
    </span>
  );
}

interface TypewriterBlocksProps {
  blocks: { key: string; text: string; as?: "p" | "h2"; className?: string }[];
  gapMilliseconds?: number;
  millisecondsPerCharacter?: number;
  delayMilliseconds?: number;
  className?: string;
}

export function TypewriterBlocks({
  blocks,
  gapMilliseconds = 220,
  millisecondsPerCharacter = 12,
  delayMilliseconds = 0,
  className,
}: TypewriterBlocksProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  if (prefersReducedMotion) {
    return (
      <div className={className}>
        {blocks.map((block) => {
          const BlockTag = block.as ?? "p";

          return (
            <BlockTag key={block.key} className={block.className}>
              {block.text}
            </BlockTag>
          );
        })}
      </div>
    );
  }

  return (
    <div className={className}>
      {blocks.map((block, index) => {
        if (index > activeIndex) return null;

        const BlockTag = block.as ?? "p";
        const isActive = index === activeIndex;

        return (
          <BlockTag key={block.key} className={block.className}>
            {isActive ? (
              <Typewriter
                text={block.text}
                millisecondsPerCharacter={
                  block.as === "h2"
                    ? millisecondsPerCharacter * 0.7
                    : millisecondsPerCharacter
                }
                delayMilliseconds={index === 0 ? delayMilliseconds : 0}
                showCaret
                onComplete={() => {
                  window.setTimeout(
                    () => setActiveIndex((currentIndex) => currentIndex + 1),
                    gapMilliseconds,
                  );
                }}
              />
            ) : (
              block.text
            )}
          </BlockTag>
        );
      })}
    </div>
  );
}
