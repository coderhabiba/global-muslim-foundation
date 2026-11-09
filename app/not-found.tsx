import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/layout/SiteHeader";
import NotFoundPage from "@/components/pages/NotFoundPage";

export const metadata: Metadata = {
  title: "Page Not Found (404) | Global Muslim Charitable Foundation",
};

export default function NotFound() {
  return (
    <>
      <SiteHeader variant="simple" />
      <NotFoundPage />
      <footer className="w-full bg-surface-container-low text-on-surface border-t border-border-subtle">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>
            © 2025 Global Muslim Charitable Foundation (GMCF). All rights
            reserved worldwide.
          </p>
          <div className="flex items-center gap-4">
            <Link className="hover:text-primary transition-colors" href="/">
              Home
            </Link>
            <Link
              className="hover:text-primary transition-colors"
              href="/appeals"
            >
              Appeals
            </Link>
            <Link
              className="hover:text-primary transition-colors"
              href="/zakat-calculator"
            >
              Zakat Calculator
            </Link>
            <Link
              className="hover:text-primary transition-colors"
              href="/about"
            >
              About &amp; Governance
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
