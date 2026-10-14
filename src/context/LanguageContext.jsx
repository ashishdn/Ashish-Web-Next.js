'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, toBnNumber, formatBDT } from '../data/translations.js';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('bn');

  const setLang = (newLang) => {
    setLangState(newLang);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('bachelorbari_lang', newLang);
        document.documentElement.lang = newLang;
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem('bachelorbari_lang');
      if (saved === 'en') setLangState('en');
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const t = translations[lang] || translations.bn;

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t,
        toBnNumber: (val) => (lang === 'bn' ? toBnNumber(val) : val),
        formatBDT: (amt) => formatBDT(amt, lang),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
