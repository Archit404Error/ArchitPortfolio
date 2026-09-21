import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { resolvePostImage } from "@/lib/blog";

export const runtime = "nodejs";

const CONTENT_TYPES: Record<string, string> = {
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

interface RouteParams {
  params: Promise<{ slug: string; path: string[] }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { slug, path: imagePath } = await params;
  const absolutePath = resolvePostImage(slug, imagePath);

  if (!absolutePath) {
    return new NextResponse("Not found", { status: 404 });
  }

  const fileExtension = path.extname(absolutePath).toLowerCase();
  const contentType =
    CONTENT_TYPES[fileExtension] ?? "application/octet-stream";
  const fileContents = fs.readFileSync(absolutePath);

  return new NextResponse(fileContents, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
