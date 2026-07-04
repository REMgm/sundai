import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import {
  getArticle,
  getArticleBody,
  getArticles,
  getNeighbors,
  LINKEDIN_URL,
  SITE_NAME,
  SITE_URL,
} from "@/lib/articles";
import { ReadingProgress } from "@/components/motion/ReadingProgress";
import { Reveal } from "@/components/motion/Reveal";
import { ShareRow } from "@/components/ShareRow";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getArticles().map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: `/articles/${article.slug}`,
      publishedTime: article.publishDate,
      authors: ["Remco Vroom"],
      images: [{ url: article.image, width: 1600, height: 900 }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [article.image],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const body = getArticleBody(slug);
  const { prev, next } = getNeighbors(slug);
  const url = `${SITE_URL}/articles/${article.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: `${SITE_URL}${article.image}`,
    datePublished: article.publishDate,
    mainEntityOfPage: url,
    author: {
      "@type": "Person",
      name: "Remco Vroom",
      url: SITE_URL,
      sameAs: [LINKEDIN_URL],
    },
    publisher: { "@type": "Person", name: "Remco Vroom" },
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <>
      <ReadingProgress />

      <article className="mx-auto max-w-[1200px] px-5 pb-24 pt-10 md:px-8">
        <header className="mx-auto max-w-3xl">
          <Link
            href="/#articles"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-teal-ink"
          >
            <ArrowLeft size={16} />
            Back to Articles
          </Link>
          <p className="mt-8 font-mono text-sm text-teal-ink">{article.label}</p>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            {article.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-1 font-mono text-sm text-ink-muted">
            <span>Remco Vroom</span>
            <span>{article.date}</span>
            <span>{article.readTime} read</span>
          </div>
        </header>

        <Reveal className="mx-auto mt-10 max-w-4xl">
          <Image
            src={article.image}
            alt={article.title}
            width={1600}
            height={900}
            priority
            sizes="(min-width: 1024px) 896px, 100vw"
            className="h-auto w-full rounded-2xl"
          />
        </Reveal>

        <div
          className="article-prose mx-auto mt-14 max-w-[68ch]"
          dangerouslySetInnerHTML={{ __html: body }}
        />

        <div className="mx-auto mt-14 max-w-[68ch] border-t border-line pt-8">
          <ShareRow url={url} title={article.title} />
        </div>

        {(prev || next) && (
          <nav aria-label="More issues" className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/articles/${prev.slug}`}
                className="group rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-teal-ink"
              >
                <p className="font-mono text-xs text-ink-faint">Previous issue</p>
                <p className="mt-2 font-medium leading-snug group-hover:text-teal-deep">{prev.title}</p>
              </Link>
            ) : (
              <span aria-hidden="true" />
            )}
            {next && (
              <Link
                href={`/articles/${next.slug}`}
                className="group rounded-2xl border border-line bg-surface p-6 text-right transition-colors hover:border-teal-ink"
              >
                <p className="font-mono text-xs text-ink-faint">Next issue</p>
                <p className="mt-2 font-medium leading-snug group-hover:text-teal-deep">{next.title}</p>
              </Link>
            )}
          </nav>
        )}
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
