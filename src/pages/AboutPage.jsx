'use client';
import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { Link } from '../context/RouterContext.jsx';
import { ShieldCheck, Heart, Users2, Building2, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  const { t, lang } = useLanguage();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
          ব্যাচেলরবাড়ি পরিচিতি
        </span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
          {t.aboutPage.title}
        </h1>
        <p className="mt-4 text-sm sm:text-base text-stone-600 leading-relaxed">
          {t.aboutPage.subtitle}
        </p>
      </div>

      {/* Story Section */}
      <div className="rounded-3xl border border-stone-200 bg-white p-8 sm:p-12 shadow-xs mb-16 space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-stone-900">
          {t.aboutPage.storyTitle}
        </h2>
        <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
          {t.aboutPage.storyText1}
        </p>
        <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
          {t.aboutPage.storyText2}
        </p>
      </div>

      {/* Core Values */}
      <div className="mb-16">
        <h3 className="text-xl font-bold tracking-tight text-stone-900 text-center mb-8">
          আমাদের মূল লক্ষ্য ও অঙ্গীকার
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.aboutPage.values.map((v, i) => (
            <div
              key={i}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs flex flex-col"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 mb-4 font-bold text-base">
                ০{i + 1}
              </div>
              <h4 className="text-base font-bold text-stone-900 mb-2">
                {v.title}
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="rounded-2xl bg-emerald-900 p-8 text-white text-center">
        <h3 className="text-xl font-bold">
          আপনি কি একজন মার্জিত ব্যাচেলর বা সচেতন বাড়িওয়ালা?
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto">
          ব্যাচেলরবাড়ির মাধ্যমে ঢাকা, চট্টগ্রাম ও রাজশাহীতে নিরাপদ ও স্বাচ্ছন্দ্যময় আবাসন খুঁজে নিন অথবা বিজ্ঞাপন দিন।
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/search"
            className="rounded-lg bg-white px-5 py-2.5 text-xs font-bold text-emerald-950 hover:bg-emerald-50"
          >
            বাসা খুঁজুন
          </Link>
          <Link
            to="/landlord/add-property"
            className="rounded-lg border border-emerald-700 bg-emerald-800 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-700"
          >
            বাসা পোস্ট করুন
          </Link>
        </div>
      </div>
    </div>
  );
}
