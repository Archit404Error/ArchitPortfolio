import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";
import { formatPostDate } from "@/lib/blog";
import { Reveal } from "@/components/ui/Reveal";

interface BlogPostCardProps {
  post: BlogPostMeta;
  index?: number;
}

export function BlogPostCard({ post, index = 0 }: BlogPostCardProps) {
  return (
    <Reveal as="article" delay={Math.min(index * 0.06, 0.24)}>
      <Link
        href={`/blog/${post.slug}`}
        className="group grid gap-3 border-b border-ink-200 py-8 transition-colors first:pt-0 last:border-b-0 sm:grid-cols-12 sm:gap-8 sm:py-10"
      >
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-xs text-ink-500 sm:col-span-3 sm:flex-col sm:gap-y-1.5">
          <time dateTime={post.date} className="tabular-nums">
            {formatPostDate(post.date)}
          </time>
          <span>{post.readingTime}</span>
          {post.draft ? <span className="text-brand-600">Draft</span> : null}
        </div>

        <div className="min-w-0 sm:col-span-9">
          <h2 className="font-serif text-balance text-[1.75rem] leading-[1.1] tracking-[-0.015em] text-ink-900 transition-colors group-hover:text-brand-700 sm:text-[2.15rem]">
            {post.title}
          </h2>

          <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-ink-600 sm:text-lg">
            {post.description}
          </p>

          <span className="mt-4 inline-block text-sm font-medium text-brand-700 underline decoration-brand-200 decoration-2 underline-offset-4 transition-colors group-hover:decoration-brand-600">
            Read the post
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
