import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useRouter, Link } from '../context/RouterContext.jsx';
import { districts } from '../data/districts.js';
import { MapPin, Mail, Phone, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  const { t, lang } = useLanguage();

  return (
    <footer className="border-t border-stone-200 bg-stone-900 text-stone-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold text-base">
                ব
              </span>
              <span className="text-xl font-bold tracking-tight text-white">
                {lang === 'bn' ? 'ব্যাচেলরবাড়ি' : 'BachelorBari'}
              </span>
            </Link>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-stone-400">
              {t.footer.description}
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-stone-400">
              <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>ঢাকা · চট্টগ্রাম · রাজশাহী | বাংলাদেশ</span>
            </div>
          </div>

          {/* District Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-100">
              {t.footer.districts}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {districts.map((d) => (
                <li key={d.slug}>
                  <Link
                    to={`/district/${d.slug}`}
                    className="text-stone-400 hover:text-white transition-colors"
                  >
                    {d.name[lang] || d.name.bn}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/search"
                  className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                >
                  {t.hero.searchBtn} &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Landlord Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-100">
              {t.footer.landlordLinks}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  to="/landlord/add-property"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  {t.nav.postProperty}
                </Link>
              </li>
              <li>
                <Link
                  to="/landlord/dashboard"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  {t.nav.dashboard}
                </Link>
              </li>
              <li>
                <Link
                  to="/for-landlords"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  {t.nav.forLandlords}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  {t.nav.about}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Policy */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-100">
              {t.footer.helpLegal}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  to="/terms"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  {t.footer.terms}
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  {t.footer.privacy}
                </Link>
              </li>
              <li className="pt-2 text-xs text-stone-500">
                <span>{t.footer.contact}:</span>
                <p className="text-stone-300 font-mono">support@bachelorbari.local</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-stone-800 pt-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-xs text-stone-400">
            <p>{t.footer.copyright}</p>
            <p className="text-stone-500 italic">
              {t.footer.fictionalNotice}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
