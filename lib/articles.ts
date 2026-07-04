import fs from "node:fs";
import path from "node:path";
import data from "./articles-data.json";

export type Article = {
  week: number;
  publishDate: string;
  date: string;
  readTime: string;
  slug: string;
  title: string;
  label: string;
  description: string;
  image: string;
};

const all = data as Article[];

/** Articles visible at build time: publish-date gating preserved from the legacy site. */
export function getArticles(): Article[] {
  const today = new Date().toISOString().slice(0, 10);
  return all
    .filter((a) => a.publishDate <= today)
    .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1));
}

export function getLatest(): Article {
  return getArticles()[0];
}

export function getArticle(slug: string): Article | undefined {
  return getArticles().find((a) => a.slug === slug);
}

/** Older / newer neighbors in publish order (prev = older, next = newer). */
export function getNeighbors(slug: string): { prev?: Article; next?: Article } {
  const list = getArticles();
  const i = list.findIndex((a) => a.slug === slug);
  if (i === -1) return {};
  return { prev: list[i + 1], next: list[i - 1] };
}

/** Verbatim legacy body fragment for an article. */
export function getArticleBody(slug: string): string {
  const file = path.join(process.cwd(), "content/articles", `${slug}.html`);
  return fs.readFileSync(file, "utf8");
}

/** Month label, e.g. "June 2026", for the grouped archive index. */
export function monthOf(a: Article): string {
  return new Date(a.publishDate + "T00:00:00").toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sundai-motivation.vercel.app";

export const SITE_NAME = "SundAI Motivation";

export const SITE_DESCRIPTION =
  "The weekly Sunday briefing that gives business leaders a 6-month head start on AI. By Remco Vroom, Global EVP MarTech AI Transformation at Monks.";

export const LINKEDIN_URL = "https://www.linkedin.com/in/remcovroom/";
