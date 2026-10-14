'use client';
import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { Link } from '../context/RouterContext.jsx';

export default function LegalPage({ type = 'terms' }) {
  const { lang } = useLanguage();
  const isTerms = type === 'terms';

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="border-b border-stone-200 pb-5 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
          {isTerms
            ? lang === 'bn' ? 'ব্যবহারের শর্তাবলী (Terms of Service)' : 'Terms of Service'
            : lang === 'bn' ? 'গোপনীয়তা নীতি (Privacy Policy)' : 'Privacy Policy'}
        </h1>
        <p className="mt-1 text-xs text-stone-500">
          সর্বশেষ হালনাগাদ: অক্টোবর ২০২৬
        </p>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-10 space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
        {isTerms ? (
          <>
            <div>
              <h2 className="text-base font-bold text-stone-900 mb-2">
                ১. প্ল্যাটফর্মের ব্যবহার
              </h2>
              <p>
                ব্যাচেলরবাড়ি (BachelorBari) একটি ডেমো আবাসন প্ল্যাটফর্ম যা বাংলাদেশে ছাত্র ও কর্মজীবী ব্যাচেলরদের বাসা অনুসন্ধানে সহায়তার লক্ষ্য নিয়ে তৈরি।
              </p>
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900 mb-2">
                ২. ডেমো লিস্টিং ও দায়িত্বমুক্তি
              </h2>
              <p>
                এই ওয়েবসাইটে প্রদর্শিত সকল লিস্টিং, বাড়িওয়ালার নাম এবং ফোন নম্বর কাল্পনিক ডেমো উদ্দেশ্যে পরিবেশিত। কোনো আর্থিক লেনদেন করার পূর্বে ব্যবহারকারীকে সরাসরি বাসা পরিদর্শন ও ব্যক্তিগত পরিচয় যাচাই করার অনুরোধ করা হচ্ছে।
              </p>
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900 mb-2">
                ৩. শালীনতা ও আচরণ
              </h2>
              <p>
                প্লাটফর্মে কোনো ধরনের আপত্তিকর, মিথ্যা বা বিভ্রান্তিকর তথ্য পোস্ট করা সম্পূর্ণ নিষিদ্ধ।
              </p>
            </div>
          </>
        ) : (
          <>
            <div>
              <h2 className="text-base font-bold text-stone-900 mb-2">
                ১. তথ্য সংরক্ষণ নীতি
              </h2>
              <p>
                BachelorBari account details and submitted property listings are stored in the connected database. Listings are shown publicly only after administrator approval.
              </p>
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900 mb-2">
                ২. কুকি ও লোকাল স্টোরেজ
              </h2>
              <p>
                ভাষা পছন্দ (বাংলা/ইংরেজি) ও ব্যবহারকারীর পরীক্ষামূলক পোস্ট সংরক্ষণের জন্য স্ট্যান্ডার্ড ব্রাউজার স্টোরেজ ব্যবহৃত হয়।
              </p>
            </div>
          </>
        )}

        <div className="pt-4 border-t border-stone-100">
          <Link to="/" className="text-emerald-800 font-semibold hover:underline">
            ← হোমে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
