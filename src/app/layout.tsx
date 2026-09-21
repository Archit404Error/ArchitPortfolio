import type { Metadata, Viewport } from "next";
import { Newsreader } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

const SITE_URL = "https://architmehta.me";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Archit Mehta — Founder & Software Engineer",
    template: "%s · Archit Mehta",
  },
  description:
    "Archit Mehta is a tech entrepreneur and software engineer — CEO of Stamp (YC W25), previously at Stripe and Apple, and a Cornell CS graduate.",
  keywords: [
    "Archit Mehta",
    "Stamp",
    "Y Combinator",
    "software engineer",
    "founder",
    "Cornell",
    "Stripe",
    "Apple",
  ],
  authors: [{ name: "Archit Mehta", url: SITE_URL }],
  creator: "Archit Mehta",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Archit Mehta — Founder & Software Engineer",
    description:
      "CEO of Stamp (YC W25). Previously Stripe, Apple, and Cornell AppDev. Building the AI Secretary.",
    siteName: "Archit Mehta",
    images: [{ url: "/Archit_Headshot.jpeg", width: 1024, height: 1024 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Archit Mehta — Founder & Software Engineer",
    description:
      "CEO of Stamp (YC W25). Previously Stripe, Apple, and Cornell AppDev.",
    images: ["/Archit_Headshot.jpeg"],
  },
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf7f1",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${newsreader.variable} font-sans`}
    >
      <body className="min-h-dvh flex flex-col">{children}</body>
    </html>
  );
}
