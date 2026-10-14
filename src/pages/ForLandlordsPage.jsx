'use client';
import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { Link } from '../context/RouterContext.jsx';
import { CheckCircle2, PlusCircle, ShieldCheck, DollarSign, Users } from 'lucide-react';

export default function ForLandlordsPage() {
  const { t, lang } = useLanguage();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
          বাড়িওয়ালা সহায়িকা
        </span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
          {t.forLandlordsPage.title}
        </h1>
        <p className="mt-4 text-sm sm:text-base text-stone-600 leading-relaxed">
          {t.forLandlordsPage.subtitle}
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            to="/landlord/add-property"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-800 px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-emerald-900"
          >
            <PlusCircle className="h-4 w-4" />
            <span>{t.nav.postProperty}</span>
          </Link>
        </div>
      </div>

      {/* Benefits */}
      <div className="mb-16">
        <h2 className="text-xl font-bold tracking-tight text-stone-900 mb-6">
          {t.forLandlordsPage.benefitsTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.forLandlordsPage.benefits.map((b, i) => (
            <div
              key={i}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 mb-4">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-2">
                {b.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Landlord Guidelines / Tips */}
      <div className="rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 mb-16">
        <h2 className="text-xl font-bold tracking-tight text-stone-900 mb-4">
          {t.forLandlordsPage.rulesTitle}
        </h2>
        <ul className="space-y-4 text-xs sm:text-sm text-stone-700">
          {t.forLandlordsPage.tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-900 mt-0.5">
                ✓
              </span>
              <span className="leading-relaxed">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
