"use client";

import { useState } from "react";
import { CheckCircle, LinkSimple, LinkedinLogo, XLogo } from "@phosphor-icons/react";

/** Share actions with real URLs; copy gives inline feedback. */
export function ShareRow({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const x = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", url);
    }
  }

  const pill =
    "inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-teal-ink hover:text-teal-ink";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="mr-1 text-sm text-ink-muted">Share this article</span>
      <a href={linkedin} target="_blank" rel="noopener noreferrer" className={pill}>
        <LinkedinLogo size={16} />
        LinkedIn
      </a>
      <a href={x} target="_blank" rel="noopener noreferrer" className={pill}>
        <XLogo size={16} />X
      </a>
      <button type="button" onClick={copy} className={pill} aria-live="polite">
        {copied ? <CheckCircle size={16} className="text-teal-ink" /> : <LinkSimple size={16} />}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
