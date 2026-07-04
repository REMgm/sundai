import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { monthOf, type Article } from "@/lib/articles";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Grouped issue index: months as row labels, issues as rows inside each
 * group. Hairlines separate groups, not every row.
 */
export function ArchiveIndex({ articles }: { articles: Article[] }) {
  const groups: { month: string; items: Article[] }[] = [];
  for (const a of articles) {
    const month = monthOf(a);
    const last = groups[groups.length - 1];
    if (last && last.month === month) last.items.push(a);
    else groups.push({ month, items: [a] });
  }

  return (
    <div>
      {groups.map((g, gi) => (
        <Reveal key={g.month} delay={Math.min(gi * 0.04, 0.2)}>
          <div className="grid grid-cols-1 gap-2 border-t border-line py-8 md:grid-cols-12 md:gap-6">
            <p className="font-mono text-sm text-ink-faint md:col-span-3 md:pt-2">{g.month}</p>
            <ul className="md:col-span-9">
              {g.items.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/articles/${a.slug}`}
                    className="group flex items-baseline gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-surface md:-mx-3"
                  >
                    <span className="w-10 flex-none font-mono text-sm text-teal-ink">
                      {a.week === 0 ? "W00" : `W${String(a.week).padStart(2, "0")}`}
                    </span>
                    <span className="min-w-0 flex-1 font-medium leading-snug text-ink group-hover:text-teal-deep">
                      {a.title}
                    </span>
                    <span className="hidden flex-none font-mono text-xs text-ink-faint sm:inline">
                      {a.readTime}
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="flex-none translate-y-0.5 text-ink-faint opacity-0 transition-opacity group-hover:text-teal-ink group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
