import Image from "next/image";
import Link from "next/link";
import { monthOf, type Article } from "@/lib/articles";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Visual issue archive: months as a rail, issues as image cards built
 * from each issue's real header photograph. Hairlines separate month
 * groups, not individual items.
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
      {groups.map((g) => (
        <div
          key={g.month}
          className="grid grid-cols-1 gap-6 border-t border-line py-10 md:grid-cols-12"
        >
          <p className="font-mono text-sm text-ink-faint md:col-span-3 md:pt-1">{g.month}</p>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:col-span-9">
            {g.items.map((a, i) => (
              <Reveal key={a.slug} delay={Math.min(i * 0.06, 0.24)}>
                <Link href={`/articles/${a.slug}`} className="group block">
                  <div className="overflow-hidden rounded-2xl">
                    <Image
                      src={a.image}
                      alt={a.title}
                      width={1600}
                      height={900}
                      sizes="(min-width: 1024px) 420px, (min-width: 640px) 45vw, 100vw"
                      className="aspect-video w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="mt-4 flex items-baseline gap-3 font-mono text-xs">
                    <span className="text-teal-ink">
                      {a.week === 0 ? "W00" : `W${String(a.week).padStart(2, "0")}`}
                    </span>
                    <span className="text-ink-faint">{a.date}</span>
                    <span className="ml-auto text-ink-faint">{a.readTime}</span>
                  </p>
                  <h3 className="mt-2 font-display text-lg font-bold leading-snug tracking-tight transition-colors group-hover:text-teal-deep">
                    {a.title}
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
