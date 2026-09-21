import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { BlogShell } from "@/components/blog/MarkdownContent";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/sections/Footer";
import { getAllPosts } from "@/lib/blog";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on building products, engineering, and entrepreneurship from Archit Mehta.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    url: "/blog",
    title: "Blog · Archit Mehta",
    description:
      "Notes on building products, engineering, and entrepreneurship from Archit Mehta.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog · Archit Mehta",
    description:
      "Notes on building products, engineering, and entrepreneurship from Archit Mehta.",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <BlogShell>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar variant="blog" />
      <main id="main" className="flex-1">
        <section
          className="container-page pb-20 pt-28 sm:pb-28 sm:pt-32"
          aria-labelledby="blog-heading"
        >
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 transition-colors hover:text-brand-700"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back home
          </Link>

          <h1
            id="blog-heading"
            className="max-w-3xl font-serif text-balance text-[3rem] font-[450] leading-[1] tracking-[-0.025em] text-ink-900 sm:text-[4rem] lg:text-[4.5rem]"
          >
            Writing on building, shipping, and learning in public.
          </h1>
          <p className="mt-6 max-w-xl font-serif text-pretty text-xl italic leading-[1.4] text-ink-600 sm:text-2xl">
            Long-form notes on product, engineering, and the process behind
            starting successful companies.
          </p>

          <div className="mt-16 max-w-4xl border-t border-ink-200 pt-2">
            {posts.length === 0 ? (
              <p className="py-12 text-ink-600">
                No posts yet. Check back soon.
              </p>
            ) : (
              posts.map((post, index) => (
                <BlogPostCard key={post.slug} post={post} index={index} />
              ))
            )}
          </div>
        </section>
      </main>
      <Footer variant="blog" year={new Date().getFullYear()} />
    </BlogShell>
  );
}
