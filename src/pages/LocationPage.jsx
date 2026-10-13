import React, { useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useProperties } from '../context/PropertyContext.jsx';
import { useRouter, Link } from '../context/RouterContext.jsx';
import PropertyCard from '../components/PropertyCard.jsx';
import EmptyState from '../components/EmptyState.jsx';
import AreaCard from '../components/AreaCard.jsx';
import { districts } from '../data/districts.js';
import { locations, getThanasByDistrict } from '../data/locations.js';
import { MapPin, ChevronRight, Home, ArrowLeft } from 'lucide-react';

export default function LocationPage({ districtSlug, areaSlug }) {
  const { t, lang, toBnNumber } = useLanguage();
  const { availableProperties, getDistrictCount, getAreaCount } = useProperties();
  const { navigate } = useRouter();

  // Find district details
  const districtObj = districts.find((d) => d.slug === districtSlug) || districts[0];

  // Find thanas for this district
  const thanasInDistrict = getThanasByDistrict(districtObj.slug);

  // If areaSlug provided, find area info
  let currentAreaObj = null;
  let currentThanaName = '';

  if (areaSlug) {
    for (const loc of thanasInDistrict) {
      const match = loc.areas.find((ar) => ar.slug === areaSlug);
      if (match) {
        currentAreaObj = match;
        currentThanaName = loc.thanaName[lang] || loc.thanaName.bn;
        break;
      }
    }
  }

  // Filter properties
  const properties = useMemo(() => {
    return availableProperties.filter((p) => {
      if (p.districtSlug !== districtObj.slug) return false;
      if (areaSlug && p.areaSlug !== areaSlug) return false;
      return true;
    });
  }, [availableProperties, districtObj.slug, areaSlug]);

  const districtCount = getDistrictCount(districtObj.slug);
  const areaCount = areaSlug ? getAreaCount(areaSlug) : districtCount;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 mb-6">
        <Link to="/" className="hover:text-emerald-800 transition-colors">
          {t.nav.home}
        </Link>
        <ChevronRight className="h-3 w-3 text-stone-400" />
        {areaSlug ? (
          <>
            <Link
              to={`/district/${districtObj.slug}`}
              className="hover:text-emerald-800 transition-colors"
            >
              {districtObj.name[lang] || districtObj.name.bn}
            </Link>
            <ChevronRight className="h-3 w-3 text-stone-400" />
            <span className="font-semibold text-stone-800">
              {currentAreaObj ? currentAreaObj.name[lang] || currentAreaObj.name.bn : areaSlug}
            </span>
          </>
        ) : (
          <span className="font-semibold text-stone-800">
            {districtObj.name[lang] || districtObj.name.bn}
          </span>
        )}
      </nav>

      {/* Hero Banner for District / Area */}
      <div className="relative mb-10 overflow-hidden rounded-2xl bg-stone-900 text-white">
        <img
          src={districtObj.image}
          alt={districtObj.name[lang] || districtObj.name.bn}
          referrerPolicy="no-referrer"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="relative z-10 p-6 sm:p-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            <MapPin className="h-4 w-4" />
            <span>
              {areaSlug
                ? `${currentThanaName} · ${districtObj.name[lang] || districtObj.name.bn}`
                : districtObj.tagline[lang] || districtObj.tagline.bn}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {areaSlug && currentAreaObj
              ? `${currentAreaObj.name[lang] || currentAreaObj.name.bn}`
              : districtObj.name[lang] || districtObj.name.bn}
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-stone-200 leading-relaxed max-w-2xl">
            {districtObj.description[lang] || districtObj.description.bn}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-lg bg-emerald-800/90 px-3 py-1.5 text-xs font-semibold text-white">
              {toBnNumber(properties.length)} {t.districts.propertiesCount}
            </span>
            <Link
              to="/search"
              params={{ district: districtObj.slug }}
              className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20 transition-colors"
            >
              {lang === 'bn' ? 'সকল ফিল্টারসহ খুঁজুন' : 'Filter with All Options'}
            </Link>
          </div>
        </div>
      </div>

      {/* Sub-areas section (if on district page) */}
      {!areaSlug && thanasInDistrict.length > 0 && (
        <div className="mb-12">
          <div className="mb-4">
            <h2 className="text-base font-bold text-stone-900">
              {districtObj.name[lang] || districtObj.name.bn} {t.popularAreas.title}
            </h2>
            <p className="text-xs text-stone-500">
              নির্দিষ্ট এলাকা বেছে নিয়ে সরাসরি সংশ্লিষ্ট বাসার তালিকা দেখুন
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {thanasInDistrict.flatMap((loc) =>
              loc.areas.map((ar) => (
                <AreaCard
                  key={ar.slug}
                  districtSlug={districtObj.slug}
                  districtName={districtObj.name[lang] || districtObj.name.bn}
                  thanaName={loc.thanaName[lang] || loc.thanaName.bn}
                  area={ar}
                />
              ))
            )}
          </div>
        </div>
      )}

      {/* Properties List */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-stone-900">
            {areaSlug
              ? `${currentAreaObj?.name[lang] || areaSlug} এর ভাড়ার বাসা`
              : `${districtObj.name[lang] || districtObj.name.bn} এর সকল বাসা`}
          </h2>

          {areaSlug && (
            <Link
              to={`/district/${districtObj.slug}`}
              className="text-xs text-emerald-800 font-medium hover:underline flex items-center gap-1"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{districtObj.name[lang] || districtObj.name.bn} এ ফিরে যান</span>
            </Link>
          )}
        </div>

        {properties.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        ) : (
          <EmptyState
            title={t.searchPage.noResultsTitle}
            description="এই এলাকায় এই মুহূর্তে কোনো বিজ্ঞাপন খালি নেই।"
            actionLabel={t.searchPage.clearFilters}
            onAction={() => navigate(`/district/${districtObj.slug}`)}
          />
        )}
      </div>
    </div>
  );
}
