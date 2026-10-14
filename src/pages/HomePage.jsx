'use client';
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useProperties } from '../context/PropertyContext.jsx';
import { useRouter, Link } from '../context/RouterContext.jsx';
import LocationSearch from '../components/LocationSearch.jsx';
import DistrictCard from '../components/DistrictCard.jsx';
import PropertyCard from '../components/PropertyCard.jsx';
import AreaCard from '../components/AreaCard.jsx';
import { districts } from '../data/districts.js';
import { locations } from '../data/locations.js';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Users2,
  KeyRound,
  FileText,
  PhoneCall,
  Sparkles,
} from 'lucide-react';

export default function HomePage() {
  const { t, lang, toBnNumber } = useLanguage();
  const { availableProperties, stats } = useProperties();
  const { navigate } = useRouter();

  // Featured properties: first 6 available properties
  const featured = availableProperties.slice(0, 6);

  // Sample curated popular areas
  const popularAreasList = [
    { districtSlug: 'dhaka', districtName: lang === 'bn' ? 'ঢাকা' : 'Dhaka', thanaName: lang === 'bn' ? 'মিরপুর' : 'Mirpur', area: { slug: 'mirpur-10', name: { bn: 'মিরপুর ১০', en: 'Mirpur 10' } } },
    { districtSlug: 'dhaka', districtName: lang === 'bn' ? 'ঢাকা' : 'Dhaka', thanaName: lang === 'bn' ? 'মোহাম্মদপুর' : 'Mohammadpur', area: { slug: 'ring-road', name: { bn: 'রিং রোড (শ্যামলী)', en: 'Ring Road' } } },
    { districtSlug: 'dhaka', districtName: lang === 'bn' ? 'ঢাকা' : 'Dhaka', thanaName: lang === 'bn' ? 'ধানমন্ডি' : 'Dhanmondi', area: { slug: 'road-27', name: { bn: 'ধানমন্ডি ২৭', en: 'Dhanmondi 27' } } },
    { districtSlug: 'dhaka', districtName: lang === 'bn' ? 'ঢাকা' : 'Dhaka', thanaName: lang === 'bn' ? 'বাড্ডা' : 'Badda', area: { slug: 'merul-badda', name: { bn: 'মেরুল বাড্ডা (ব্র্যাক)', en: 'Merul Badda (BRAC)' } } },
    { districtSlug: 'chattogram', districtName: lang === 'bn' ? 'চট্টগ্রাম' : 'Chattogram', thanaName: lang === 'bn' ? 'পাঁচলাইশ' : 'Panchlaish', area: { slug: 'gec-circle', name: { bn: 'জিইসি মোড়', en: 'GEC Circle' } } },
    { districtSlug: 'chattogram', districtName: lang === 'bn' ? 'চট্টগ্রাম' : 'Chattogram', thanaName: lang === 'bn' ? 'খুলশী' : 'Khulshi', area: { slug: 'south-khulshi', name: { bn: 'দক্ষিণ খুলশী', en: 'South Khulshi' } } },
    { districtSlug: 'rajshahi', districtName: lang === 'bn' ? 'রাজশাহী' : 'Rajshahi', thanaName: lang === 'bn' ? 'মতিহার' : 'Motihar', area: { slug: 'kazla', name: { bn: 'কাজলা (রাবি গেট)', en: 'Kazla (RU Gate)' } } },
    { districtSlug: 'rajshahi', districtName: lang === 'bn' ? 'রাজশাহী' : 'Rajshahi', thanaName: lang === 'bn' ? 'মতিহার' : 'Motihar', area: { slug: 'binodpur', name: { bn: 'বিনোদপুর (রুয়েট)', en: 'Binodpur (RUET)' } } },
  ];

  return (
    <div className="flex flex-col gap-16 md:gap-20">
      {/* SECTION A: HERO SECTION */}
      <section className="relative overflow-hidden bg-emerald-950 text-white">
        {/* Subtle patterned overlay with photo background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_dhaka_apartment_1791874094594.jpg"
            alt="Dhaka Modern Bachelor Living"
            className="h-full w-full object-cover object-center opacity-30 mix-blend-overlay filter blur-[1px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/90 via-emerald-950/85 to-stone-900" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* Clean kicker text */}
            <p className="text-xs font-semibold tracking-wider uppercase text-emerald-400 mb-3">
              {t.hero.badge}
            </p>

            {/* Hero Main Headline */}
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-5xl text-white leading-tight">
              {t.hero.title}
            </h1>

            {/* Supporting Text */}
            <p className="mt-4 text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl mx-auto">
              {t.hero.subtitle}
            </p>
          </div>

          {/* Prominent Search Component */}
          <div className="mt-10 mx-auto max-w-4xl">
            <LocationSearch />
          </div>

          {/* Quick stats & Landlord CTA bar below search */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>{toBnNumber(stats.available)} {t.districts.propertiesCount}</span>
            </div>
            <span className="hidden sm:inline text-stone-600">·</span>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>ঢাকা, চট্টগ্রাম ও রাজশাহী</span>
            </div>
            <span className="hidden sm:inline text-stone-600">·</span>
            <Link
              to="/landlord/add-property"
              className="text-emerald-300 hover:text-white font-medium underline underline-offset-4"
            >
              {t.hero.listPropertyBtn} &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION B: DISTRICT EXPLORATION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
              {t.districts.exploreTitle}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-stone-500">
              {t.districts.exploreSubtitle}
            </p>
          </div>
          <Link
            to="/search"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
          >
            <span>{t.districts.viewAll}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {districts.map((district) => (
            <DistrictCard key={district.slug} district={district} />
          ))}
        </div>
      </section>

      {/* SECTION C: POPULAR AREAS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-stone-900">
              {t.popularAreas.title}
            </h2>
            <p className="mt-1 text-xs text-stone-500">
              {t.popularAreas.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {popularAreasList.map((item, idx) => (
              <AreaCard
                key={`${item.districtSlug}-${item.area.slug}-${idx}`}
                districtSlug={item.districtSlug}
                districtName={item.districtName}
                thanaName={item.thanaName}
                area={item.area}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION D: FEATURED RENTAL PROPERTIES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
              {t.featured.title}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-stone-500">
              {t.featured.subtitle}
            </p>
          </div>
          <Link
            to="/search"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950"
          >
            <span>{t.featured.viewAll}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </section>

      {/* SECTION E: HOW IT WORKS */}
      <section className="bg-stone-100/70 border-y border-stone-200/80 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-stone-900">
              {t.howItWorks.title}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-stone-600">
              {t.howItWorks.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* For Tenants Card */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
              <div className="flex items-center gap-2.5 mb-6 text-emerald-800 font-bold text-base border-b border-stone-100 pb-4">
                <Users2 className="h-5 w-5" />
                <span>{t.howItWorks.tenantTitle}</span>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-3.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-900">
                    ১
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900">
                      {t.howItWorks.tenantStep1}
                    </h4>
                    <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                      {t.howItWorks.tenantStep1Desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-900">
                    ২
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900">
                      {t.howItWorks.tenantStep2}
                    </h4>
                    <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                      {t.howItWorks.tenantStep2Desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-900">
                    ৩
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900">
                      {t.howItWorks.tenantStep3}
                    </h4>
                    <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                      {t.howItWorks.tenantStep3Desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Landlords Card */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
              <div className="flex items-center gap-2.5 mb-6 text-emerald-800 font-bold text-base border-b border-stone-100 pb-4">
                <Building2 className="h-5 w-5" />
                <span>{t.howItWorks.landlordTitle}</span>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-3.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-100 text-xs font-bold text-stone-800">
                    ১
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900">
                      {t.howItWorks.landlordStep1}
                    </h4>
                    <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                      {t.howItWorks.landlordStep1Desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-100 text-xs font-bold text-stone-800">
                    ২
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900">
                      {t.howItWorks.landlordStep2}
                    </h4>
                    <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                      {t.howItWorks.landlordStep2Desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-100 text-xs font-bold text-stone-800">
                    ৩
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900">
                      {t.howItWorks.landlordStep3}
                    </h4>
                    <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                      {t.howItWorks.landlordStep3Desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION F: LANDLORD CALL TO ACTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6">
        <div className="rounded-3xl bg-emerald-900 p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t.landlordCta.title}
            </h2>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-emerald-100">
              {t.landlordCta.subtitle}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                to="/landlord/add-property"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs sm:text-sm font-bold text-emerald-950 shadow-md transition-all hover:bg-emerald-50 active:scale-98"
              >
                <span>{t.landlordCta.btn}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <span className="text-xs text-emerald-200">
                {t.landlordCta.supportText}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
