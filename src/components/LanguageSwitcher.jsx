'use client';
import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher({ className = '' }) {
  const { lang, setLang } = useLanguage();

  return (
    <div className={`inline-flex items-center rounded-lg border border-stone-200 bg-white p-0.5 text-xs font-medium shadow-xs ${className}`}>
      <div className="flex items-center pl-2 pr-1 text-stone-400">
        <Globe className="h-3.5 w-3.5" aria-hidden="true" />
      </div>
      <button
        type="button"
        onClick={() => setLang('bn')}
        className={`rounded-md px-2.5 py-1 transition-all ${
          lang === 'bn'
            ? 'bg-emerald-800 text-white font-semibold shadow-xs'
            : 'text-stone-600 hover:text-stone-900'
        }`}
        aria-label="Switch to Bangla"
      >
        বাংলা
      </button>
      <button
        type="button"
        onClick={() => setLang('en')}
        className={`rounded-md px-2.5 py-1 transition-all ${
          lang === 'en'
            ? 'bg-emerald-800 text-white font-semibold shadow-xs'
            : 'text-stone-600 hover:text-stone-900'
        }`}
        aria-label="Switch to English"
      >
        English
      </button>
    </div>
  );
}
