import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { getArticles, getLatest, LINKEDIN_URL } from "@/lib/articles";
import { ArchiveIndex } from "@/components/ArchiveIndex";
import { KineticTitle, HeroFade } from "@/components/motion/KineticTitle";
import { HeroVisual } from "@/components/motion/HeroVisual";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { MagneticButton } from "@/components/motion/MagneticButton";

const stats = [
  { value: "30+", label: "Years experience" },
  { value: "6,500+", label: "Team at Monks" },
  { value: "92%", label: "Client retention" },
  { value: "★", label: "AI Agency of the Year" },
];

const landscape = [
  {
    value: 81,
    suffix: "notable AI models",
    context:
      "in 2024, up from 11 in 2020. The rate of AI innovation is accelerating faster than any previous technology wave.",
    featured: true,
  },
  {
    value: 87,
    suffix: "% of workers",
    context:
      "use AI weekly. Your workforce is already experimenting, the question is whether they're doing it with strategy or in the shadows.",
  },
  {
    value: 74,
    suffix: "% of CEOs",
    context:
      "fear falling behind on AI. The gap between knowing AI matters and knowing what to do about it has never been wider.",
  },
  {
    value: 70,
    suffix: "% of digital transformations",
    context:
      "fail. Not because the technology isn't ready, because the leadership, culture, and strategy aren't aligned.",
  },
];

export default function Home() {
  const articles = getArticles();
  const latest = getLatest();
  const rest = articles.slice(1);

  return (
    <>
      {/* Hero: asymmetric split, kinetic wordmark entrance */}
      <section className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 px-5 pb-20 pt-14 md:px-8 lg:grid-cols-12 lg:gap-14 lg:pb-28 lg:pt-20">
        <div className="lg:col-span-7">
          <HeroFade delay={0.05}>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-teal-ink">
              AI for business leaders
            </p>
          </HeroFade>
          <KineticTitle lines={["SUNDAI", "MOTIVATION"]} />
          <HeroFade delay={0.55}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-muted">
              The weekly Sunday briefing that gives business leaders a 6-month head start on AI.
            </p>
          </HeroFade>
          <HeroFade delay={0.7} className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href={`/articles/${latest.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-teal-ink px-6 py-3 font-medium text-white transition-colors hover:bg-teal-deep active:scale-[0.98]"
            >
              Read the latest
              <ArrowRight size={18} />
            </Link>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 font-medium text-ink transition-colors hover:border-teal-ink hover:text-teal-ink"
            >
              <LinkedinLogo size={18} />
              Subscribe on LinkedIn
            </a>
          </HeroFade>
        </div>
        <div className="lg:col-span-5">
          <HeroVisual />
        </div>
      </section>

      {/* Latest issue: full-width feature */}
      <section aria-labelledby="latest-title" className="mx-auto max-w-[1200px] px-5 md:px-8">
        <Reveal>
          <Link
            href={`/articles/${latest.slug}`}
            className="group grid grid-cols-1 overflow-hidden rounded-2xl border border-line bg-surface transition-shadow hover:shadow-[0_16px_48px_rgba(20,55,60,0.1)] lg:grid-cols-2"
          >
            <div className="overflow-hidden">
              <Image
                src={latest.image}
                alt={latest.title}
                width={1600}
                height={900}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col justify-center gap-4 p-8 lg:p-12">
              <p className="font-mono text-sm text-teal-ink">
                {latest.week === 0 ? "The beginning" : `This Sunday, week ${latest.week}`}
              </p>
              <h2
                id="latest-title"
                className="font-display text-2xl font-bold leading-tight tracking-tight lg:text-3xl"
              >
                {latest.title}
              </h2>
              <p className="leading-relaxed text-ink-muted">{latest.description}</p>
              <p className="mt-2 flex items-center gap-3 font-mono text-xs text-ink-faint">
                <span>{latest.date}</span>
                <span>{latest.readTime} read</span>
                <ArrowRight
                  size={18}
                  className="ml-auto text-teal-ink transition-transform duration-300 group-hover:translate-x-1"
                />
              </p>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* Archive: grouped index */}
      <section id="articles" className="mx-auto max-w-[1200px] scroll-mt-20 px-5 pb-28 pt-24 md:px-8">
        <Reveal>
          <h2 className="mb-10 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Every issue so far
          </h2>
        </Reveal>
        <ArchiveIndex articles={rest} />
      </section>

      {/* About: split media and bio */}
      <section id="about" className="scroll-mt-20 border-t border-line bg-surface">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 px-5 py-24 md:px-8 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-6">
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/assets/rem-boardroom-light.jpg"
                alt="Rem the cyborg owl spreading its wings at the head of a bright boardroom table"
                width={1600}
                height={900}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-auto w-full"
              />
            </div>
          </Reveal>
          <div className="lg:col-span-6">
            <Reveal>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                Remco Vroom
              </h2>
              <p className="mt-2 font-medium text-teal-ink">
                Global EVP, MarTech AI Transformation, Monks
              </p>
              <p className="mt-5 max-w-lg leading-relaxed text-ink-muted">
                With three decades at the intersection of marketing and technology, I translate
                what AI actually means for businesses, in language anyone can act on. No jargon.
                No hype. Just clarity.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 lg:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="order-last mt-1 text-sm text-ink-muted">{s.label}</dt>
                    <dd className="font-mono text-2xl font-medium tracking-tight text-ink">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* AI landscape: featured numeral and supporting stats */}
      <section id="landscape" className="mx-auto max-w-[1200px] scroll-mt-20 px-5 py-24 md:px-8">
        <Reveal>
          <h2 className="mb-12 font-display text-3xl font-bold tracking-tight md:text-4xl">
            The AI landscape
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {landscape
            .filter((s) => s.featured)
            .map((s) => (
              <Reveal key={s.suffix} className="lg:col-span-5">
                <p className="font-mono text-[clamp(5rem,12vw,9rem)] font-medium leading-none tracking-tight text-teal-ink">
                  <CountUp value={s.value} />
                </p>
                <p className="mt-3 font-display text-xl font-bold">{s.suffix}</p>
                <p className="mt-3 max-w-sm leading-relaxed text-ink-muted">{s.context}</p>
              </Reveal>
            ))}
          <div className="lg:col-span-6 lg:col-start-7">
            {landscape
              .filter((s) => !s.featured)
              .map((s, i) => (
                <Reveal key={s.suffix} delay={i * 0.06}>
                  <div className={i === 0 ? "pb-8" : "border-t border-line py-8"}>
                    <p className="flex flex-wrap items-baseline gap-x-3">
                      <span className="font-mono text-5xl font-medium tracking-tight text-ink">
                        <CountUp value={s.value} />
                      </span>
                      <span className="font-display text-lg font-bold">{s.suffix}</span>
                    </p>
                    <p className="mt-2 max-w-lg leading-relaxed text-ink-muted">{s.context}</p>
                  </div>
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section id="speaking" className="scroll-mt-20 bg-teal-wash">
        <div className="mx-auto max-w-[1200px] px-5 py-24 text-center md:px-8">
          <Reveal>
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight md:text-4xl">
              Looking forward to some weekly notes:
            </h2>
            <div className="mt-9">
              <MagneticButton>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full bg-teal-ink px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-teal-deep"
                >
                  <LinkedinLogo size={22} />
                  Subscribe on LinkedIn
                </a>
              </MagneticButton>
            </div>
            <p className="mt-5 text-sm text-ink-muted">A new issue every Sunday. No jargon, no hype.</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
