import { LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { LINKEDIN_URL } from "@/lib/articles";
import { OwlMark } from "@/components/Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-8 md:px-8">
        <p className="flex items-center gap-3 text-sm text-ink-muted">
          <OwlMark size={20} />
          &copy; 2026 Remco Vroom
        </p>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Remco Vroom on LinkedIn"
          className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink-muted transition-colors hover:border-teal-ink hover:text-teal-ink"
        >
          <LinkedinLogo size={18} />
        </a>
      </div>
    </footer>
  );
}
