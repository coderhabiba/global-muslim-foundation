'use client';

import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <>
      <main className="not-found-page w-full bg-surface pt-[96px] sm:pt-[116px] min-h-[75vh] flex items-center justify-center px-4 sm:px-8 py-16">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
          <div className="w-24 h-24 rounded-3xl bg-surface-subtle-mint border border-primary/20 flex items-center justify-center text-primary mb-6 shadow-sm">
            <span className="material-symbols-outlined text-5xl text-amber-vibrant">
              search_off
            </span>
          </div>
          <span className="font-label-md text-amber-vibrant font-bold tracking-widest uppercase mb-2">
            Error 404 • Page Not Found
          </span>
          <h1 className="font-serif-heading text-4xl sm:text-5xl font-bold text-emerald-dark tracking-tight mb-4">
            The Page You Are Looking For Does Not Exist
          </h1>
          <p className="font-body-lg text-text-muted max-w-lg mb-8 leading-relaxed">
            The link may have moved, expired, or been restructured into our new
            clean navigation. Use the buttons below to explore our verified
            causes or return to the homepage.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-primary hover:bg-emerald-dark text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">
                home
              </span>
              <span>Return to Homepage</span>
            </Link>
            <Link
              href="/appeals"
              className="inline-flex items-center gap-2 bg-surface-clean hover:bg-surface-subtle-mint border border-border-subtle text-primary font-bold text-sm px-6 py-3 rounded-xl shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">
                volunteer_activism
              </span>
              <span>Browse Active Appeals</span>
            </Link>
            <Link
              href="/zakat-calculator"
              className="inline-flex items-center gap-2 bg-surface-clean hover:bg-surface-subtle-mint border border-border-subtle text-on-surface-variant font-bold text-sm px-6 py-3 rounded-xl shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">
                calculate
              </span>
              <span>Zakat Calculator</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
