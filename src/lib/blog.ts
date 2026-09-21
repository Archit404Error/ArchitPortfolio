import matter from "gray-matter";
import type { Element as HastElement, Root as HastRoot } from "hast";
import fs from "node:fs";
import path from "node:path";
import readingTime from "reading-time";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import { visit } from "unist-util-visit";

const BLOG_ROOT = path.join(process.cwd(), "content", "blog");

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags?: string[];
  draft?: boolean;
  image?: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  draft: boolean;
  image?: string;
  readingTime: string;
  readingMinutes: number;
}

export interface BlogPost extends BlogPostMeta {
  html: string;
  content: string;
}

function coerceDate(value: unknown): string | null {
  if (typeof value === "string" && !Number.isNaN(Date.parse(value))) {
    return value.length === 10
      ? value
      : new Date(value).toISOString().slice(0, 10);
  }
  if (value instanceof Date && !Number.isNaN(value.valueOf())) {
    return value.toISOString().slice(0, 10);
  }
  return null;
}

function assertFrontmatter(
  data: Record<string, unknown>,
  slug: string,
): BlogFrontmatter {
  const title = data.title;
  const description = data.description;
  const date = coerceDate(data.date);
  const updated = coerceDate(data.updated) ?? undefined;

  if (typeof title !== "string" || !title.trim()) {
    throw new Error(
      `Blog post "${slug}" is missing a string frontmatter title.`,
    );
  }
  if (typeof description !== "string" || !description.trim()) {
    throw new Error(
      `Blog post "${slug}" is missing a string frontmatter description.`,
    );
  }
  if (!date) {
    throw new Error(
      `Blog post "${slug}" needs a valid ISO date string in frontmatter.`,
    );
  }

  return {
    title: title.trim(),
    description: description.trim(),
    date,
    updated,
    tags: Array.isArray(data.tags)
      ? data.tags.filter((tag): tag is string => typeof tag === "string")
      : [],
    draft: Boolean(data.draft),
    image: typeof data.image === "string" ? data.image : undefined,
  };
}

/** Rewrites local blog image paths to absolute URLs. */
function rehypeBlogImages(slug: string) {
  return () => (tree: HastRoot) => {
    visit(tree, "element", (node: HastElement) => {
      if (node.tagName !== "img") return;
      const properties = node.properties ?? {};
      const source = properties.src;

      if (typeof source === "string") {
        const cleanedSource = source.replace(/^\.\//, "");

        if (
          cleanedSource.startsWith("images/") ||
          cleanedSource.startsWith("./images/") ||
          (!cleanedSource.startsWith("/") &&
            !cleanedSource.startsWith("http://") &&
            !cleanedSource.startsWith("https://") &&
            !cleanedSource.startsWith("data:"))
        ) {
          const relativePath = cleanedSource.startsWith("images/")
            ? cleanedSource.slice("images/".length)
            : cleanedSource;
          properties.src = `/blog/${slug}/images/${relativePath}`;
        }
      }

      properties.loading = "lazy";
      properties.decoding = "async";
      if (!properties.alt) properties.alt = "";
      node.properties = properties;
    });
  };
}

async function markdownToHtml(markdown: string, slug: string): Promise<string> {
  const processedFile = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeSlug)
    .use(rehypeBlogImages(slug))
    .use(rehypeStringify)
    .process(markdown);

  return String(processedFile);
}

function postDirectory(slug: string): string {
  return path.join(BLOG_ROOT, slug);
}

function listSlugs(): string[] {
  if (!fs.existsSync(BLOG_ROOT)) return [];

  return fs
    .readdirSync(BLOG_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((slug) => fs.existsSync(path.join(postDirectory(slug), "index.md")))
    .sort();
}

function toPublicImagePath(slug: string, image?: string): string | undefined {
  if (!image) return undefined;

  const cleanedPath = image.replace(/^\.\//, "");

  if (cleanedPath.startsWith("http://") || cleanedPath.startsWith("https://")) {
    return cleanedPath;
  }

  if (cleanedPath.startsWith("images/")) {
    return `/blog/${slug}/images/${cleanedPath.slice("images/".length)}`;
  }

  if (cleanedPath.startsWith("/")) return cleanedPath;

  return `/blog/${slug}/images/${cleanedPath}`;
}

function loadPostMetadata(slug: string): BlogPostMeta | null {
  const indexPath = path.join(postDirectory(slug), "index.md");
  if (!fs.existsSync(indexPath)) return null;

  const source = fs.readFileSync(indexPath, "utf8");
  const { data, content } = matter(source);
  const frontmatter = assertFrontmatter(data, slug);
  const readingStats = readingTime(content);

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    date: frontmatter.date,
    updated: frontmatter.updated,
    tags: frontmatter.tags ?? [],
    draft: frontmatter.draft ?? false,
    image: toPublicImagePath(slug, frontmatter.image),
    readingTime: readingStats.text,
    readingMinutes: Math.max(1, Math.ceil(readingStats.minutes)),
  };
}

function includeDrafts(): boolean {
  return process.env.NODE_ENV !== "production";
}

export function getAllPosts(): BlogPostMeta[] {
  return listSlugs()
    .map((slug) => loadPostMetadata(slug))
    .filter((post): post is BlogPostMeta => Boolean(post))
    .filter((post) => includeDrafts() || !post.draft)
    .sort(
      (firstPost, secondPost) =>
        Date.parse(secondPost.date) - Date.parse(firstPost.date),
    );
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const indexPath = path.join(postDirectory(slug), "index.md");
  if (!fs.existsSync(indexPath)) return null;

  const source = fs.readFileSync(indexPath, "utf8");
  const { data, content } = matter(source);
  const frontmatter = assertFrontmatter(data, slug);

  if (frontmatter.draft && !includeDrafts()) return null;

  const readingStats = readingTime(content);
  const html = await markdownToHtml(content, slug);

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    date: frontmatter.date,
    updated: frontmatter.updated,
    tags: frontmatter.tags ?? [],
    draft: frontmatter.draft ?? false,
    image: toPublicImagePath(slug, frontmatter.image),
    readingTime: readingStats.text,
    readingMinutes: Math.max(1, Math.ceil(readingStats.minutes)),
    html,
    content,
  };
}

export function resolvePostImage(
  slug: string,
  imagePath: string[],
): string | null {
  if (
    !slug ||
    imagePath.some(
      (pathSegment) => pathSegment === ".." || pathSegment.includes("\0"),
    )
  ) {
    return null;
  }

  const imagesRoot = path.join(postDirectory(slug), "images");
  const absolute = path.resolve(imagesRoot, ...imagePath);

  if (!absolute.startsWith(imagesRoot + path.sep) && absolute !== imagesRoot) {
    return null;
  }
  if (!fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) {
    return null;
  }
  return absolute;
}

export function formatPostDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(isoDate));
}
