# Blog posts

Each post is a folder under `content/blog/`:

```text
content/blog/<slug>/
  index.md      # required — YAML frontmatter + Markdown body
  images/       # optional — any assets referenced from the post
```

The folder name is the URL slug: `content/blog/my-post/` → `/blog/my-post`.

## Frontmatter

```yaml
---
title: "Required title"
description: "Required SEO / listing summary"
date: "2026-09-17"
updated: "2026-09-18"   # optional
tags: ["engineering"]   # optional
draft: false            # optional — hidden in production when true
image: images/cover.jpg # optional — OG / social image
---
```

## Images

In Markdown, reference files relative to the post folder:

```md
![Alt text](images/cover.jpg)
```

They are compiled to `/blog/<slug>/images/cover.jpg` with lazy loading attributes.

## Build behavior

Markdown is compiled to HTML at build time by `src/lib/blog.ts`. There is no separate `slug.html` file to maintain — Next.js statically generates the route.
