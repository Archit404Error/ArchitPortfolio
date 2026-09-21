import type { ReactNode } from "react";

interface MarkdownContentProps {
  html: string;
  className?: string;
}

export function MarkdownContent({ html, className }: MarkdownContentProps) {
  return (
    <div
      className={`blog-prose ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

interface BlogShellProps {
  children: ReactNode;
}

export function BlogShell({ children }: BlogShellProps) {
  return (
    <div className="relative isolate flex min-h-dvh flex-col bg-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(ellipse_at_top,_rgb(31_94_255/0.07),_transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-faint opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
      />
      {children}
    </div>
  );
}
