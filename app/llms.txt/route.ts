import { getArticles, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/articles";

export const dynamic = "force-static";

export function GET() {
  const articles = getArticles();
  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "SundAI Motivation is a weekly Sunday briefing on AI for business leaders,",
    "written by Remco Vroom (Global EVP, MarTech AI Transformation at Monks).",
    "Each issue translates one AI development into plain business impact:",
    "no jargon, no hype, practical guidance for CEOs and executives.",
    "",
    "## Issues",
    "",
    ...articles.map(
      (a) => `- [${a.title}](${SITE_URL}/articles/${a.slug}): ${a.description}`
    ),
    "",
    "## Author",
    "",
    `- [Remco Vroom on LinkedIn](https://www.linkedin.com/in/remcovroom/)`,
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
