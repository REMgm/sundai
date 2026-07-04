/**
 * SundAI mark: geometric owl (head, tufts, aura arc) in brand teal.
 * Single simple mark, built from primitives on a 64-unit grid.
 */
export function OwlMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="32"
        cy="35"
        r="26"
        stroke="#00c2cc"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="118 46"
        strokeDashoffset="-18"
        opacity="0.75"
      />
      <path d="M15 22 L20 6 L29 16 Z" fill="#00727c" />
      <path d="M49 22 L44 6 L35 16 Z" fill="#00727c" />
      <circle cx="32" cy="35" r="20" fill="#00727c" />
      <circle cx="25" cy="32" r="6.5" fill="#f9f7f3" />
      <circle cx="39" cy="32" r="6.5" fill="#f9f7f3" />
      <circle cx="25" cy="32" r="2.75" fill="#00c2cc" />
      <circle cx="39" cy="32" r="2.75" fill="#00c2cc" />
      <path d="M32 38 L28.5 43.5 L35.5 43.5 Z" fill="#f9f7f3" />
    </svg>
  );
}

/** Lockup: mark plus wordmark. The AI in SundAI carries the accent. */
export function Logo({ size = 28 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <OwlMark size={size} />
      <span className="font-display text-lg font-bold tracking-tight">
        Sund<span className="text-teal-ink">AI</span>
      </span>
    </span>
  );
}
