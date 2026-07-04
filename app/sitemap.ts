import type { MetadataRoute } from "next";
import { getArticles, SITE_URL } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getArticles();
  return [
    {
      url: SITE_URL,
      lastModified: new Date(articles[0].publishDate),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...articles.map((a) => ({
      url: `${SITE_URL}/articles/${a.slug}`,
      lastModified: new Date(a.publishDate),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
