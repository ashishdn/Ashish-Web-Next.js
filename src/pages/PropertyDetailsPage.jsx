'use client';
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useProperties } from '../context/PropertyContext.jsx';
import { useRouter, Link } from '../context/RouterContext.jsx';
import { getLandlordById } from '../data/landlords.js';
import { districts } from '../data/districts.js';
import { locations } from '../data/locations.js';
import { PriceDisplay, AvailabilityBadge } from '../components/PriceDisplay.jsx';
import PropertyCard from '../components/PropertyCard.jsx';
import PageLoader from '../components/PageLoader.jsx';
import {
  MapPin,
  Bed,
  Bath,
  Calendar,
  Layers,
  Sparkles,
  ShieldAlert,
  Clock,
  Utensils,
  Users,
  Cigarette,
  Phone,
  MessageCircle,
  FileText,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Info,
  Building,
} from 'lucide-react';

export default function PropertyDetailsPage({ slug }) {
  const { t, lang, toBnNumber, formatBDT } = useLanguage();
  const { getPropertyBySlug, availableProperties, properties, loading } = useProperties();
  const { navigate } = useRouter();

  const [remoteProperty, setRemoteProperty] = useState(null);
  const [remoteLoading, setRemoteLoading] = useState(true);
  const property = getPropertyBySlug(slug) || remoteProperty;

  useEffect(() => {
    if (loading) return;
    if (getPropertyBySlug(slug)) {
      setRemoteLoading(false);
      return;
    }
    let active = true;
    setRemoteLoading(true);
    fetch(`/api/properties/${encodeURIComponent(slug)}`)
      .then((response) => response.ok ? response.json() : null)
      .then((listing) => { if (active) setRemoteProperty(listing); })
      .catch((error) => console.error('Could not load property details', error))
      .finally(() => { if (active) setRemoteLoading(false); });
    return () => { active = false; };
  }, [slug, loading, properties]);

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [showPhone, setShowPhone] = useState(false);

  if (!property && (loading || remoteLoading)) return <PageLoader message="বাসার বিস্তারিত লোড হচ্ছে" />;
  if (!property) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-stone-900">
          {lang === 'bn' ? 'বাসাটি পাওয়া যায়নি' : 'Property Not Found'}
        </h2>
        <p className="mt-2 text-xs text-stone-500">
          {lang === 'bn'
            ? 'হয়তো বিজ্ঞাপনটি মুছে ফেলা হয়েছে অথবা লিংকটি সঠিক নয়।'
            : 'The requested listing might have been removed or the link is invalid.'}
        </p>
        <Link
          to="/search"
          className="mt-6 inline-block rounded-lg bg-emerald-800 px-4 py-2 text-xs font-semibold text-white"
        >
          {t.details.backToSearch}
        </Link>
      </div>
    );
  }

  const landlord = getLandlordById(property.landlordId) || {
    name: { bn: property.landlordName || 'বাড়িওয়ালা', en: property.landlordName || 'Landlord' },
    role: { bn: 'বাড়িওয়ালা', en: 'Landlord' },
    phone: property.landlordPhone || '',
  };

  // Lookup location details
  const districtObj = districts.find((d) => d.slug === property.districtSlug);
  const districtName = districtObj ? districtObj.name[lang] || districtObj.name.bn : property.districtSlug;

  const locObj = locations.find(
    (l) => l.districtSlug === property.districtSlug && l.thanaSlug === property.thanaSlug
  );
  const thanaName = locObj ? locObj.thanaName[lang] || locObj.thanaName.bn : property.thanaSlug;

  let areaName = property.areaSlug;
  if (locObj) {
    const a = locObj.areas.find((ar) => ar.slug === property.areaSlug);
    if (a) areaName = a.name[lang] || a.name.bn;
  }

  // Similar properties from same district, excluding this one
  const similarProperties = availableProperties
    .filter((p) => p.id !== property.id && p.districtSlug === property.districtSlug)
    .slice(0, 3);

  const images = property.images && property.images.length > 0
    ? property.images
    : ['/src/assets/images/property_room_interior_1791874098305.jpg'];

  const handlePrevImg = () => {
    setActiveImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImg = () => {
    setActiveImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top back navigation */}
      <div className="mb-6">
        <Link
          to="/search"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-emerald-800 transition-colors"
        >
          {t.details.backToSearch}
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Left Column (Main Gallery & Details) */}
        <div className="lg:col-span-2 space-y-8">
          {/* IMAGE GALLERY */}
          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
            <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100">
              <img
                src={images[activeImgIndex]}
                alt={property.title[lang] || property.title.bn}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-opacity duration-300"
              />

              {/* Prev / Next controls */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImg}
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-stone-800 shadow-md hover:bg-white transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImg}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-stone-800 shadow-md hover:bg-white transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Floating Status & Type */}
              <div className="absolute top-4 left-4 rounded-lg bg-white/95 px-3 py-1 text-xs shadow-xs">
                <AvailabilityBadge status={property.status} />
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="flex gap-2.5 p-3 overflow-x-auto border-t border-stone-100 bg-stone-50">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                      activeImgIndex === idx
                        ? 'border-emerald-800 ring-2 ring-emerald-800/30'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* MAIN PROPERTY HEADLINE & SUMMARY */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
              <MapPin className="h-4 w-4 text-emerald-800 shrink-0" />
              <span className="font-semibold text-stone-800">{areaName}</span>
              <span>·</span>
              <span>{thanaName}</span>
              <span>·</span>
              <span>{districtName}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 leading-snug">
              {property.title[lang] || property.title.bn}
            </h1>

            <p className="mt-2 text-xs text-stone-500">
              {property.address[lang] || property.address.bn}
            </p>

            {/* Quick Metrics Bar */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-y border-stone-100 py-4 text-xs">
              <div className="flex items-center gap-2">
                <Bed className="h-4 w-4 text-stone-400" />
                <div>
                  <span className="text-stone-400 block text-[10px]">রুম / শয্যা</span>
                  <span className="font-semibold text-stone-800">
                    {toBnNumber(property.rooms)} {t.featured.beds}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Bath className="h-4 w-4 text-stone-400" />
                <div>
                  <span className="text-stone-400 block text-[10px]">বাথরুম</span>
                  <span className="font-semibold text-stone-800">
                    {toBnNumber(property.baths)} {t.featured.baths}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-stone-400" />
                <div>
                  <span className="text-stone-400 block text-[10px]">তলা / ফ্লোর</span>
                  <span className="font-semibold text-stone-800">
                    {property.floor[lang] || property.floor.bn}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-stone-400" />
                <div>
                  <span className="text-stone-400 block text-[10px]">ভাড়া শুরু</span>
                  <span className="font-semibold text-stone-800">
                    {toBnNumber(property.availableFrom)}
                  </span>
                </div>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="mt-6">
              <h3 className="text-sm font-bold text-stone-900 mb-2">
                {t.addProperty.description}
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-line">
                {property.description[lang] || property.description.bn}
              </p>
            </div>
          </div>

          {/* HOUSE RULES & RESTRICTIONS */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
            <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-emerald-800" />
              <span>{t.details.houseRules}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="rounded-xl border border-stone-100 bg-stone-50/60 p-3.5">
                <div className="flex items-center gap-2 font-semibold text-stone-900 mb-1">
                  <Clock className="h-4 w-4 text-emerald-700" />
                  <span>{t.details.curfew}</span>
                </div>
                <p className="text-stone-600 leading-relaxed">
                  {property.rules.curfew[lang] || property.rules.curfew.bn}
                </p>
              </div>

              <div className="rounded-xl border border-stone-100 bg-stone-50/60 p-3.5">
                <div className="flex items-center gap-2 font-semibold text-stone-900 mb-1">
                  <Utensils className="h-4 w-4 text-emerald-700" />
                  <span>{t.details.cooking}</span>
                </div>
                <p className="text-stone-600 leading-relaxed">
                  {property.rules.cooking[lang] || property.rules.cooking.bn}
                </p>
              </div>

              <div className="rounded-xl border border-stone-100 bg-stone-50/60 p-3.5">
                <div className="flex items-center gap-2 font-semibold text-stone-900 mb-1">
                  <Users className="h-4 w-4 text-emerald-700" />
                  <span>{t.details.guests}</span>
                </div>
                <p className="text-stone-600 leading-relaxed">
                  {property.rules.guests[lang] || property.rules.guests.bn}
                </p>
              </div>

              <div className="rounded-xl border border-stone-100 bg-stone-50/60 p-3.5">
                <div className="flex items-center gap-2 font-semibold text-stone-900 mb-1">
                  <Cigarette className="h-4 w-4 text-emerald-700" />
                  <span>{t.details.smoking}</span>
                </div>
                <p className="text-stone-600 leading-relaxed">
                  {property.rules.smoking[lang] || property.rules.smoking.bn}
                </p>
              </div>
            </div>

            {property.rules.customRules && property.rules.customRules.length > 0 && (
              <div className="mt-4 pt-4 border-t border-stone-100">
                <h4 className="text-xs font-semibold text-stone-800 mb-2">
                  অন্যান্য বিশেষ নিয়মাবলী:
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-xs text-stone-600">
                  {property.rules.customRules.map((rule, idx) => (
                    <li key={idx}>{rule[lang] || rule.bn}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* UTILITIES & BILLS BREAKDOWN */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
            <h3 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-emerald-800" />
              <span>{t.details.billsAndUtilities}</span>
            </h3>

            <p className="text-xs text-stone-600 mb-4">
              {property.utilities.details[lang] || property.utilities.details.bn}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="rounded-lg bg-stone-50 p-3">
                <span className="text-stone-400 block text-[11px]">{t.addProperty.electricityBill}</span>
                <span className="font-semibold text-stone-800">
                  {property.utilities.electricity[lang] || property.utilities.electricity.bn}
                </span>
              </div>
              <div className="rounded-lg bg-stone-50 p-3">
                <span className="text-stone-400 block text-[11px]">{t.addProperty.gasBill}</span>
                <span className="font-semibold text-stone-800">
                  {property.utilities.gas[lang] || property.utilities.gas.bn}
                </span>
              </div>
              <div className="rounded-lg bg-stone-50 p-3">
                <span className="text-stone-400 block text-[11px]">{t.addProperty.serviceCharge}</span>
                <span className="font-semibold text-stone-800">
                  {property.utilities.serviceCharge[lang] || property.utilities.serviceCharge.bn}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sticky Column (Financials & Landlord Contact) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Rent & Advance Box */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="mb-4">
                <span className="text-xs text-stone-500 block mb-1">
                  {t.details.monthlyRent}
                </span>
                <PriceDisplay amount={property.monthlyRent} className="text-2xl font-bold" />
              </div>

              <div className="border-t border-stone-100 pt-3 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>{t.details.securityAdvance}:</span>
                  <span className="font-semibold text-stone-900">
                    {formatBDT(property.advance)}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>{t.details.furnishingStatus}:</span>
                  <span className="font-semibold text-stone-900 capitalize">
                    {t.furnishing[property.furnished] || property.furnished}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>{t.details.tenantPreference}:</span>
                  <span className="font-semibold text-emerald-800">
                    {property.acceptedTenants.includes('all')
                      ? t.tenantTypes.all
                      : property.acceptedTenants.includes('male')
                      ? t.tenantTypes.male
                      : t.tenantTypes.female}
                  </span>
                </div>
              </div>

              {/* Landlord Contact Button */}
              <div className="mt-6 pt-4 border-t border-stone-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-900 font-bold text-sm">
                    {landlord.name.bn.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">
                      {landlord.name[lang] || landlord.name.bn}
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      {landlord.role[lang] || landlord.role.bn}
                    </p>
                  </div>
                </div>

                {!showPhone ? (
                  <button
                    type="button"
                    onClick={() => setShowPhone(true)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-800 py-3 text-xs font-bold text-white shadow-xs hover:bg-emerald-900 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    <span>{t.details.showContactBtn}</span>
                  </button>
                ) : (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-3">
                    <div>
                      <span className="text-[10px] text-stone-500 block uppercase font-medium">
                        বাড়িওয়ালার মোবাইল নম্বর:
                      </span>
                      <p className="text-sm font-bold text-emerald-950 font-mono tracking-wide">
                        {landlord.phone}
                      </p>
                    </div>

                    <a
                      href={`tel:${landlord.phone.split(' ')[0]}`}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-800 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-900"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      <span>{t.details.callNow}</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setShowPhone(false)}
                      className="w-full text-center text-[11px] text-stone-500 hover:underline"
                    >
                      {t.details.hideContactBtn}
                    </button>
                  </div>
                )}

                <p className="mt-3 text-[11px] text-stone-400 leading-normal">
                  {t.details.landlordDisclaimer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Properties Section */}
      {similarProperties.length > 0 && (
        <div className="mt-16 border-t border-stone-200 pt-10">
          <h2 className="text-xl font-bold text-stone-900 mb-6">
            {t.details.similarProperties}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProperties.map((simProp) => (
              <PropertyCard key={simProp.id} property={simProp} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
