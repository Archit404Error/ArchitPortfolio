"use client";

import {
  ANIMATION_DURATIONS,
  EASE_OUT_ANIMATION,
  REVEAL_VIEWPORT,
  SPRING_POP,
  STAGGER_INTERVALS,
} from "@/components/ui/motion";
import { type Book, type BookStatus, bookStatusLabel } from "@/content/study";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Star,
  StarHalf,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import Image from "next/image";
import { type KeyboardEvent, useId, useRef, useState } from "react";

const BOOK_SPINE_COLORS = [
  "#0b1220",
  "#0040d1",
  "#5a3e2b",
  "#2f4f3e",
  "#7a2e2e",
  "#3b4252",
  "#8a6d1f",
  "#1f3a5f",
];

function hashString(value: string) {
  let hash = 0;

  for (let index = 0; index < value.length; index++) {
    hash = (hash * 31 + value.charCodeAt(index)) | 0;
  }

  return Math.abs(hash);
}

export function spineColor(book: Book) {
  return (
    book.spine ??
    BOOK_SPINE_COLORS[hashString(book.title) % BOOK_SPINE_COLORS.length]
  );
}

export function spineWidth(book: Book) {
  return Math.min(64, Math.max(36, 30 + book.title.length * 0.9));
}

const BOOK_STATUS_ORDER: BookStatus[] = ["reading", "finished", "next"];

const shelfVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: STAGGER_INTERVALS.tight,
      delayChildren: 0.1,
    },
  },
};

const bookVariants: Variants = {
  hidden: { opacity: 0, y: 24, rotate: -4 },
  show: { opacity: 1, y: 0, rotate: 0, transition: SPRING_POP },
};

const detailVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.base,
      ease: EASE_OUT_ANIMATION,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: ANIMATION_DURATIONS.fast },
  },
};

export function Spine({
  book,
  selected,
  onSelect,
  onKeyDown,
  compact = false,
  interactive = true,
  describedBy,
}: {
  book: Book;
  selected?: boolean;
  onSelect?: (book: Book, element: HTMLElement | null) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
  compact?: boolean;
  interactive?: boolean;
  describedBy?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const color = spineColor(book);
  const width = compact ? spineWidth(book) * 0.7 : spineWidth(book);
  const height = compact ? "h-32" : "h-44 sm:h-56";

  const spineContent = (
    <>
      <span
        className="absolute inset-y-0 left-0 w-px bg-white/25"
        aria-hidden="true"
      />
      <span
        className="absolute inset-y-0 right-0 w-px bg-black/25"
        aria-hidden="true"
      />
      <span
        className="absolute inset-x-1.5 top-2 h-px bg-white/25"
        aria-hidden="true"
      />
      <span
        className="absolute inset-x-1.5 bottom-2 h-px bg-white/25"
        aria-hidden="true"
      />
      <span
        className={`block min-h-0 flex-1 truncate px-1 font-serif leading-none text-paper [writing-mode:vertical-rl] ${
          compact ? "text-[11px]" : "text-[13px] sm:text-sm"
        }`}
      >
        {book.title}
      </span>
      {!compact && (
        <span className="mt-2 shrink-0 font-serif text-[10px] italic leading-none text-paper/70 [writing-mode:vertical-rl]">
          {book.author.split(" ").pop()}
        </span>
      )}
    </>
  );

  const className = `relative flex ${height} shrink-0 flex-col items-center justify-start overflow-hidden rounded-[3px] py-4 shadow-[inset_1px_0_0_rgb(255_255_255/0.12),inset_-2px_0_0_rgb(0_0_0/0.25),0_10px_18px_-12px_rgb(0_0_0/0.6)] outline-none transition-[filter] duration-300 ${
    selected ? "brightness-110" : "hover:brightness-110"
  }`;

  if (!interactive) {
    return (
      <motion.span
        variants={bookVariants}
        style={{ width, backgroundColor: color }}
        className={className}
        aria-hidden="true"
      >
        {spineContent}
      </motion.span>
    );
  }

  return (
    <motion.button
      type="button"
      data-spine
      role="option"
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      variants={bookVariants}
      onClick={(event) => onSelect?.(book, event.currentTarget)}
      onKeyDown={onKeyDown}
      aria-describedby={describedBy}
      whileHover={prefersReducedMotion ? undefined : { y: -12, rotate: -1.5 }}
      whileFocus={prefersReducedMotion ? undefined : { y: -12 }}
      animate={
        selected && !prefersReducedMotion ? { y: -16, rotate: 0 } : undefined
      }
      transition={SPRING_POP}
      style={{ width, backgroundColor: color }}
      className={`${className} cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-paper`}
    >
      <span className="sr-only">
        {book.title} by {book.author}
      </span>
      {spineContent}
    </motion.button>
  );
}

function ShelfArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  const ArrowIcon = direction === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous book" : "Next book"}
      className="grid size-9 place-items-center rounded-full border border-ink-200 bg-surface text-ink-600 transition-[border-color,color,opacity] hover:border-brand-300 hover:text-brand-700 disabled:opacity-35 disabled:hover:border-ink-200 disabled:hover:text-ink-600"
    >
      <ArrowIcon className="size-4" aria-hidden="true" />
    </button>
  );
}

export function Rating({ value }: { value: number }) {
  const clampedRating = Math.max(0, Math.min(5, value));
  const fullStars = Math.floor(clampedRating);
  const hasHalfStar = clampedRating - fullStars >= 0.5;

  return (
    <span
      role="img"
      aria-label={`Rated ${clampedRating} out of 5`}
      className="inline-flex items-center gap-0.5 text-brand-600"
    >
      {Array.from({ length: 5 }, (_, index) => {
        if (index < fullStars) {
          return (
            <Star
              key={index}
              className="size-4 fill-current"
              aria-hidden="true"
            />
          );
        }

        if (index === fullStars && hasHalfStar) {
          return (
            <span
              key={index}
              className="relative inline-grid size-4 place-items-center"
            >
              <Star
                className="absolute inset-0 size-4 text-ink-300"
                aria-hidden="true"
              />
              <StarHalf
                className="absolute inset-0 size-4 fill-current"
                aria-hidden="true"
              />
            </span>
          );
        }

        return (
          <Star
            key={index}
            className="size-4 text-ink-300"
            aria-hidden="true"
          />
        );
      })}
    </span>
  );
}

export function Bookshelf({ books }: { books: Book[] }) {
  const prefersReducedMotion = useReducedMotion();
  const detailId = useId();
  const scrollerRef = useRef<HTMLDivElement>(null);

  const orderedBooks = BOOK_STATUS_ORDER.flatMap((status) =>
    books.filter((book) => book.status === status),
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedBook: Book | undefined = orderedBooks[selectedIndex];

  const getSpineAt = (index: number): HTMLElement | null =>
    scrollerRef.current?.querySelectorAll<HTMLElement>("[data-spine]")[index] ??
    null;

  const revealSpine = (index: number, shouldFocus: boolean) => {
    const spine = getSpineAt(index);

    spine?.scrollIntoView({
      inline: "nearest",
      block: "nearest",
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    if (shouldFocus) spine?.focus({ preventScroll: true });
  };

  const selectBook = (index: number, shouldFocus = false) => {
    if (index < 0 || index >= orderedBooks.length) return;

    setSelectedIndex(index);
    revealSpine(index, shouldFocus);
  };

  const handleSpineKeyDown = (
    event: KeyboardEvent<HTMLElement>,
    index: number,
  ) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectBook(index + 1, true);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectBook(index - 1, true);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectBook(0, true);
    } else if (event.key === "End") {
      event.preventDefault();
      selectBook(orderedBooks.length - 1, true);
    }
  };

  if (!books.length) return null;

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <motion.div
        className="min-w-0 lg:col-span-7"
        initial={prefersReducedMotion ? false : "hidden"}
        whileInView="show"
        viewport={{ ...REVEAL_VIEWPORT, once: true }}
        variants={shelfVariants}
      >
        <div
          ref={scrollerRef}
          className="no-scrollbar -mx-5 overflow-x-auto overflow-y-hidden scroll-px-5 px-5 pt-5 sm:mx-0 sm:scroll-px-0 sm:px-0"
        >
          <div className="flex w-max min-w-full flex-col">
            <div
              className="flex items-end gap-1.5 px-4 sm:gap-2 sm:px-6"
              role="listbox"
              aria-label="Books on the shelf"
              aria-orientation="horizontal"
            >
              {orderedBooks.map((book, index) => (
                <Spine
                  key={book.title}
                  book={book}
                  selected={index === selectedIndex}
                  onSelect={() => selectBook(index)}
                  onKeyDown={(event) => handleSpineKeyDown(event, index)}
                  describedBy={detailId}
                />
              ))}
            </div>
            <div
              className="h-2 rounded-b-sm bg-ink-300 shadow-[0_14px_24px_-12px_rgb(43_36_24/0.55)]"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-6">
          <p className="flex flex-wrap gap-x-5 gap-y-1 font-serif text-base italic text-ink-500">
            {BOOK_STATUS_ORDER.filter((status) =>
              books.some((book) => book.status === status),
            ).map((status) => (
              <span key={status}>
                {books.filter((book) => book.status === status).length}{" "}
                {bookStatusLabel[status].toLowerCase()}
              </span>
            ))}
          </p>
          {orderedBooks.length > 1 && (
            <div className="flex shrink-0 items-center gap-2">
              <ShelfArrow
                direction="left"
                disabled={selectedIndex === 0}
                onClick={() => selectBook(selectedIndex - 1)}
              />
              <span className="min-w-[3.5rem] text-center font-mono text-xs text-ink-500 tabular-nums">
                {selectedIndex + 1} / {orderedBooks.length}
              </span>
              <ShelfArrow
                direction="right"
                disabled={selectedIndex === orderedBooks.length - 1}
                onClick={() => selectBook(selectedIndex + 1)}
              />
            </div>
          )}
        </div>
      </motion.div>

      <div className="lg:col-span-5" id={detailId} aria-live="polite">
        <div className="lg:sticky lg:top-28">
          <AnimatePresence mode="wait" initial={false}>
            {selectedBook && (
              <motion.div
                key={selectedBook.title}
                variants={prefersReducedMotion ? undefined : detailVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="grid gap-6 sm:grid-cols-[auto_1fr] lg:grid-cols-1"
              >
                {selectedBook.cover ? (
                  <motion.div
                    initial={
                      prefersReducedMotion
                        ? false
                        : { rotateY: -60, opacity: 0 }
                    }
                    animate={{ rotateY: 0, opacity: 1 }}
                    transition={{
                      duration: ANIMATION_DURATIONS.slow,
                      ease: EASE_OUT_ANIMATION,
                    }}
                    style={{ transformPerspective: 900 }}
                    className="relative aspect-[2/3] w-36 shrink-0 overflow-hidden rounded-[4px] shadow-[0_24px_40px_-20px_rgb(43_36_24/0.5)] ring-1 ring-ink-200 sm:w-40"
                  >
                    <Image
                      src={selectedBook.cover}
                      alt={`Cover of ${selectedBook.title}`}
                      fill
                      sizes="160px"
                      className="object-cover"
                    />
                  </motion.div>
                ) : (
                  <div
                    className="relative flex aspect-[2/3] w-36 shrink-0 items-end overflow-hidden rounded-[4px] p-3 shadow-[0_24px_40px_-20px_rgb(43_36_24/0.5)] sm:w-40"
                    style={{ backgroundColor: spineColor(selectedBook) }}
                    aria-hidden="true"
                  >
                    <span className="absolute inset-y-0 left-0 w-1.5 bg-black/20" />
                    <span className="font-serif text-lg leading-tight text-paper">
                      {selectedBook.title}
                    </span>
                  </div>
                )}

                <div className="min-w-0">
                  <p className="font-serif text-base italic text-ink-500">
                    {bookStatusLabel[selectedBook.status]}
                    {selectedBook.year ? `, ${selectedBook.year}` : ""}
                  </p>
                  <h3 className="mt-1 font-serif text-2xl leading-tight text-ink-900 sm:text-[1.75rem]">
                    {selectedBook.title}
                  </h3>
                  <p className="mt-1 text-ink-600">{selectedBook.author}</p>
                  {typeof selectedBook.rating === "number" && (
                    <div className="mt-3 flex items-center gap-2">
                      <Rating value={selectedBook.rating} />
                      <span
                        className="font-mono text-xs text-ink-500 tabular-nums"
                        aria-hidden="true"
                      >
                        {selectedBook.rating}/5
                      </span>
                    </div>
                  )}
                  {selectedBook.note && (
                    <p className="mt-4 text-pretty text-[15px] leading-relaxed text-ink-700">
                      {selectedBook.note}
                    </p>
                  )}
                  {selectedBook.url && (
                    <a
                      href={selectedBook.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-700 underline decoration-brand-200 decoration-2 underline-offset-4 transition-colors hover:decoration-brand-600"
                    >
                      About the book
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
