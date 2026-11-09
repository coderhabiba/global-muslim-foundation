import Link from "next/link";

import NewsletterForm from "./NewsletterForm";

export default function SiteFooter() {
  return (
    <footer className="w-full bg-surface-container-low text-on-surface border-t border-border-subtle">
      {/* Top Trust Bar */}
      <div className="bg-emerald-dark text-on-primary py-6 px-4 sm:px-8">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-primary-container flex items-center justify-center text-gold-warm border border-white/20">
              <span className="material-symbols-outlined text-[26px]">
                verified
              </span>
            </div>
            <div>
              <h4 className="font-serif-heading text-lg font-bold text-white">
                100% Zakat Guarantee &amp; Absolute Transparency
              </h4>
              <p className="text-xs text-primary-fixed">
                Every cent of your Zakat directly reaches qualified
                beneficiaries under rigorous Shariah stewardship.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              className="bg-surface-clean text-primary hover:bg-surface-subtle-mint text-xs font-bold px-4 py-2 rounded-xl transition-colors shadow-sm"
              href="/zakat-calculator"
            >
              Calculate Zakat
            </Link>
            <Link
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors border border-white/20"
              href="/about#governance"
            >
              View Audit Reports
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & Registration */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white border border-primary/20 flex items-center justify-center p-1 overflow-hidden shadow-sm">
                <img
                  src="/images/gmcf-logo-emblem.png"
                  alt="GMCF Emblem"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base text-emerald-dark">
                  Global Muslim Charitable Foundation
                </span>
                <span className="text-[11px] text-text-muted">
                  Chairman: Mohammad Ali Mostafa
                </span>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Dedicated to serving the destitute, orphans, hunger relief, and
              community empowerment across Bangladesh and beyond.
            </p>
            <div className="pt-1">
              <span className="inline-block text-[11px] bg-zakat-gold-light border border-amber-300 text-amber-800 px-2.5 py-1 rounded font-bold">
                Govt Reg / Non-Profit Charitable Organization
              </span>
            </div>
          </div>

          {/* Appeals List */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-primary border-b border-border-subtle pb-2">
              Featured Appeals
            </h3>
            <ul className="space-y-2 text-xs text-on-surface-variant">
              <li>
                <Link
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                  href="/appeals"
                >
                  <span className="material-symbols-outlined text-[15px] text-amber-500">
                    campaign
                  </span>
                  Gaza Emergency Nourishment Appeal
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                  href="/campaign-details"
                >
                  <span className="material-symbols-outlined text-[15px] text-primary">
                    restaurant
                  </span>
                  One Meal One Hope (Street Food Aid)
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                  href="/appeals"
                >
                  <span className="material-symbols-outlined text-[15px] text-primary">
                    medical_services
                  </span>
                  Project Alo: Pediatric Surgery &amp; Eyes
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                  href="/appeals"
                >
                  <span className="material-symbols-outlined text-[15px] text-primary">
                    water_drop
                  </span>
                  Deep Tube Wells &amp; Clean Water
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-primary transition-colors flex items-center gap-1.5"
                  href="/appeals"
                >
                  <span className="material-symbols-outlined text-[15px] text-primary">
                    ac_unit
                  </span>
                  Project Sheetolota Winter Blankets
                </Link>
              </li>
            </ul>
          </div>

          {/* Global Offices */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-primary border-b border-border-subtle pb-2">
              Registered Office
            </h3>
            <div className="space-y-2 text-xs text-on-surface-variant leading-relaxed">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary mt-0.5">
                  location_on
                </span>
                <span>
                  <strong>Head Office:</strong> 99, Kaisharchor, Vakurta, Savar, Dhaka, Bangladesh
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  person
                </span>
                <span>
                  <strong>Chairman:</strong> Mohammad Ali Mostafa
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  call
                </span>
                <a href="tel:01913119525" className="hover:underline font-semibold text-emerald-dark">
                  01913119525
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  mail
                </span>
                <a href="mailto:gmcfoundation2022@gmail.com" className="hover:underline">
                  gmcfoundation2022@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter & Updates */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-primary border-b border-border-subtle pb-2">
              Field Bulletins
            </h3>
            <p className="text-xs text-on-surface-variant">
              Receive verified field impact dispatch reports and tax exemption
              updates directly.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom Copyright & Legal */}
        <div className="mt-12 pt-6 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted">
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
              href="/impact"
            >
              Impact
            </Link>
            <Link
              className="hover:text-primary transition-colors"
              href="/about"
            >
              About &amp; Governance
            </Link>
            <Link
              className="hover:text-primary transition-colors"
              href="/volunteer"
            >
              Volunteers
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
