import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BlogShell, MarkdownContent } from "@/components/blog/MarkdownContent";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/nav/Navbar";
import {
  formatPostDate,
  getAllPosts,
  getPostBySlug,
  getPostSlugs,
} from "@/lib/blog";
import { profile } from "@/content/profile";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: "Post not found" };
  }

  const url = `/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: profile.name, url: "https://architmehta.me" }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [profile.name],
      tags: post.tags,
      images: post.image ? [{ url: post.image, alt: post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : undefined,
    },
    robots: post.draft
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const posts = getAllPosts();
  const postIndex = posts.findIndex(
    (candidatePost) => candidatePost.slug === post.slug,
  );
  const olderPost = postIndex >= 0 ? posts[postIndex + 1] : undefined;
  const newerPost = postIndex > 0 ? posts[postIndex - 1] : undefined;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: {
      "@type": "Person",
      name: profile.name,
      url: "https://architmehta.me",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://architmehta.me/blog/${post.slug}`,
    },
    image: post.image
      ? [
          post.image.startsWith("http://") || post.image.startsWith("https://")
            ? post.image
            : `https://architmehta.me${post.image}`,
        ]
      : undefined,
    keywords: post.tags.join(", "),
  };

  return (
    <BlogShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar variant="blog" />
      <main id="main" className="flex-1">
        <article className="container-page pb-20 pt-28 sm:pb-28 sm:pt-32">
          <Link
            href="/blog"
            className="mb-10 inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 transition-colors hover:text-brand-700"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            All posts
          </Link>

          <header className="mx-auto max-w-3xl">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-xs text-ink-500">
              <time dateTime={post.date} className="tabular-nums">
                {formatPostDate(post.date)}
              </time>
              <span>{post.readingTime}</span>
              {post.draft ? (
                <span className="text-brand-600">Draft</span>
              ) : null}
            </div>

            <h1 className="mt-5 font-serif text-balance text-[2.75rem] font-[450] leading-[1.02] tracking-[-0.02em] text-ink-900 sm:text-[3.5rem] lg:text-[4rem]">
              {post.title}
            </h1>

            <p className="mt-6 font-serif text-pretty text-xl italic leading-[1.4] text-ink-600 sm:text-2xl">
              {post.description}
            </p>

            {post.tags.length > 0 ? (
              <ul
                className="mt-6 flex flex-wrap gap-x-4 gap-y-1"
                aria-label="Tags"
              >
                {post.tags.map((tag) => (
                  <li key={tag} className="font-mono text-xs text-ink-500">
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </header>

          <MarkdownContent
            html={post.html}
            className="mx-auto mt-12 max-w-3xl border-t border-ink-200 pt-10 sm:mt-14 sm:pt-12"
          />

          <nav
            aria-label="Adjacent posts"
            className="mx-auto mt-16 grid max-w-3xl gap-8 border-t border-ink-200 pt-10 sm:grid-cols-2"
          >
            {olderPost ? (
              <Link
                href={`/blog/${olderPost.slug}`}
                className="group block transition-colors"
              >
                <p className="font-serif text-base italic text-ink-500">
                  Older
                </p>
                <p className="mt-1.5 font-medium text-ink-900 transition-colors group-hover:text-brand-700">
                  {olderPost.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
            {newerPost ? (
              <Link
                href={`/blog/${newerPost.slug}`}
                className="group block text-right transition-colors sm:justify-self-end"
              >
                <p className="font-serif text-base italic text-ink-500">
                  Newer
                </p>
                <p className="mt-1.5 font-medium text-ink-900 transition-colors group-hover:text-brand-700">
                  {newerPost.title}
                </p>
              </Link>
            ) : null}
          </nav>
        </article>
      </main>
      <Footer variant="blog" topHref="#" year={new Date().getFullYear()} />
    </BlogShell>
  );
}
