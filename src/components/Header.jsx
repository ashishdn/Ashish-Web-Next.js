import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useRouter, Link } from '../context/RouterContext.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import { Home, Menu, X, PlusCircle, LayoutDashboard, Search, Info, ShieldCheck } from 'lucide-react';

export default function Header() {
  const { t, lang } = useLanguage();
  const { currentPath, navigate } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => currentPath === path;

  const navLinks = [
    { to: '/', label: t.nav.home },
    { to: '/search', label: t.nav.findHome },
    { to: '/for-landlords', label: t.nav.forLandlords },
    { to: '/about', label: t.nav.about },
    { to: '/landlord/dashboard', label: t.nav.dashboard },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-stone-900 group shrink-0"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-800 text-white font-bold text-lg shadow-xs transition-transform group-hover:scale-105">
            ব
          </span>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-emerald-950">
              {lang === 'bn' ? 'ব্যাচেলরবাড়ি' : 'BachelorBari'}
            </span>
          </div>
        </Link>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`transition-colors whitespace-nowrap hover:text-emerald-800 ${
                isActive(link.to)
                  ? 'text-emerald-800 font-semibold border-b-2 border-emerald-800 pb-0.5'
                  : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Zone 3: CTA & Language Switcher */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <LanguageSwitcher />

          <Link
            to="/landlord/add-property"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-800 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-all hover:bg-emerald-900 hover:shadow-sm active:scale-98 whitespace-nowrap"
          >
            <PlusCircle className="h-4 w-4" />
            <span>{t.nav.postProperty}</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex sm:hidden items-center gap-2">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-50"
            aria-label={t.nav.menu}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-stone-200 bg-white px-4 py-4 lg:hidden animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col gap-2.5 text-base font-medium text-stone-700">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive(link.to)
                    ? 'bg-emerald-50 text-emerald-900 font-semibold'
                    : 'hover:bg-stone-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                to="/landlord/add-property"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-800 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-emerald-900"
              >
                <PlusCircle className="h-4 w-4" />
                <span>{t.nav.postProperty}</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
