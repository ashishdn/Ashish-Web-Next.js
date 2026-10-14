'use client';
import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useProperties } from '../context/PropertyContext.jsx';
import { useRouter } from '../context/RouterContext.jsx';
import PropertyCard from '../components/PropertyCard.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { districts } from '../data/districts.js';
import { locations, getThanasByDistrict, getAreasByThana } from '../data/locations.js';
import {
  SlidersHorizontal,
  X,
  ArrowUpDown,
  Search,
  Filter,
  Check,
} from 'lucide-react';

export default function SearchPage() {
  const { t, lang, toBnNumber } = useLanguage();
  const { availableProperties } = useProperties();
  const { queryParams, navigate } = useRouter();

  // Local filter states initialized from query parameters
  const [district, setDistrict] = useState(queryParams.district || '');
  const [thana, setThana] = useState(queryParams.thana || '');
  const [area, setArea] = useState(queryParams.area || '');
  const [propType, setPropType] = useState(queryParams.type || 'all');
  const [gender, setGender] = useState(queryParams.gender || 'all');
  const [furnishing, setFurnishing] = useState(queryParams.furnishing || 'all');
  const [minRent, setMinRent] = useState(queryParams.minRent || '');
  const [maxRent, setMaxRent] = useState(queryParams.maxRent || '');
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortBy, setSortBy] = useState(queryParams.sort || 'newest');
  const [searchQuery, setSearchQuery] = useState(queryParams.q || '');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Available thanas and areas based on selection
  const availableThanas = district ? getThanasByDistrict(district) : [];
  const availableAreas = district && thana ? getAreasByThana(district, thana) : [];

  const handleDistrictChange = (val) => {
    setDistrict(val);
    setThana('');
    setArea('');
  };

  const handleThanaChange = (val) => {
    setThana(val);
    setArea('');
  };

  const toggleAmenity = (amenityId) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId) ? prev.filter((a) => a !== amenityId) : [...prev, amenityId]
    );
  };

  const clearAllFilters = () => {
    setDistrict('');
    setThana('');
    setArea('');
    setPropType('all');
    setGender('all');
    setFurnishing('all');
    setMinRent('');
    setMaxRent('');
    setSelectedAmenities([]);
    setSortBy('newest');
    setSearchQuery('');
    navigate('/search');
  };

  // Filter and sort available properties
  const filteredProperties = useMemo(() => {
    return availableProperties.filter((p) => {
      // Must be available status
      if (p.status !== 'available') return false;

      // District filter
      if (district && p.districtSlug !== district) return false;

      // Thana filter
      if (thana && p.thanaSlug !== thana) return false;

      // Area filter
      if (area && p.areaSlug !== area) return false;

      // Property type filter
      if (propType !== 'all' && p.propertyType !== propType) return false;

      // Tenant gender suitability
      if (gender !== 'all') {
        const acceptsAll = p.acceptedTenants.includes('all');
        const acceptsGender = p.acceptedTenants.includes(gender);
        if (!acceptsAll && !acceptsGender) return false;
      }

      // Furnishing status
      if (furnishing !== 'all' && p.furnished !== furnishing) return false;

      // Minimum rent
      if (minRent && p.monthlyRent < Number(minRent)) return false;

      // Maximum rent
      if (maxRent && p.monthlyRent > Number(maxRent)) return false;

      // Amenities filter
      if (selectedAmenities.length > 0) {
        const hasAll = selectedAmenities.every((amenity) =>
          p.amenities && p.amenities.includes(amenity)
        );
        if (!hasAll) return false;
      }

      // Text query match (title, address, description)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleBn = (p.title.bn || '').toLowerCase();
        const titleEn = (p.title.en || '').toLowerCase();
        const addrBn = (p.address?.bn || '').toLowerCase();
        const addrEn = (p.address?.en || '').toLowerCase();
        const thanaSlug = (p.thanaSlug || '').toLowerCase();
        const areaSlug = (p.areaSlug || '').toLowerCase();

        const matches =
          titleBn.includes(q) ||
          titleEn.includes(q) ||
          addrBn.includes(q) ||
          addrEn.includes(q) ||
          thanaSlug.includes(q) ||
          areaSlug.includes(q);

        if (!matches) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rentLow') return a.monthlyRent - b.monthlyRent;
      if (sortBy === 'rentHigh') return b.monthlyRent - a.monthlyRent;
      // Default: newest
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
  }, [
    availableProperties,
    district,
    thana,
    area,
    propType,
    gender,
    furnishing,
    minRent,
    maxRent,
    selectedAmenities,
    sortBy,
    searchQuery,
  ]);

  const allAmenitiesOptions = [
    { id: 'wifi', label: 'WiFi ইন্টারনেট' },
    { id: 'attached-bath', label: 'এটাচড বাথরুম' },
    { id: 'balcony', label: 'ব্যক্তিগত বারান্দা' },
    { id: 'meal-system', label: 'মেস মিল / বুয়া' },
    { id: 'lift', label: 'লিফট সুবিধা' },
    { id: 'generator', label: 'আইপিএস / জেনারেটর' },
    { id: 'water-filter', label: 'ফিল্টার ড্রিংকিং ওয়াটার' },
    { id: 'cctv', label: 'সিসিটিভি নিরাপত্তা' },
  ];

  // Render Filter Form (shared by Desktop Sidebar and Mobile Drawer)
  const FilterForm = () => (
    <div className="flex flex-col gap-5 text-xs sm:text-sm">
      {/* Search keyword input */}
      <div>
        <label className="block font-semibold text-stone-700 mb-1.5">
          {lang === 'bn' ? 'কী-ওয়ার্ড দিয়ে খুঁজুন' : 'Keyword Search'}
        </label>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.hero.searchPlaceholder}
            className="w-full rounded-lg border border-stone-200 bg-white py-2 pl-8 pr-3 text-xs text-stone-800 placeholder:text-stone-400 focus:border-emerald-700 focus:outline-hidden"
          />
          <Search className="pointer-events-none absolute left-2.5 top-2.5 h-3.5 w-3.5 text-stone-400" />
        </div>
      </div>

      {/* District */}
      <div>
        <label className="block font-semibold text-stone-700 mb-1.5">
          {t.searchPage.districtFilter}
        </label>
        <select
          value={district}
          onChange={(e) => handleDistrictChange(e.target.value)}
          className="w-full rounded-lg border border-stone-200 bg-white p-2 text-xs text-stone-800 focus:border-emerald-700 focus:outline-hidden"
        >
          <option value="">{lang === 'bn' ? 'সকল জেলা' : 'All Districts'}</option>
          {districts.map((d) => (
            <option key={d.slug} value={d.slug}>
              {d.name[lang] || d.name.bn}
            </option>
          ))}
        </select>
      </div>

      {/* Thana */}
      {district && availableThanas.length > 0 && (
        <div>
          <label className="block font-semibold text-stone-700 mb-1.5">
            {t.searchPage.thanaFilter}
          </label>
          <select
            value={thana}
            onChange={(e) => handleThanaChange(e.target.value)}
            className="w-full rounded-lg border border-stone-200 bg-white p-2 text-xs text-stone-800 focus:border-emerald-700 focus:outline-hidden"
          >
            <option value="">{lang === 'bn' ? 'সকল থানা' : 'All Thanas'}</option>
            {availableThanas.map((loc) => (
              <option key={loc.thanaSlug} value={loc.thanaSlug}>
                {loc.thanaName[lang] || loc.thanaName.bn}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Area */}
      {district && thana && availableAreas.length > 0 && (
        <div>
          <label className="block font-semibold text-stone-700 mb-1.5">
            {t.searchPage.areaFilter}
          </label>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full rounded-lg border border-stone-200 bg-white p-2 text-xs text-stone-800 focus:border-emerald-700 focus:outline-hidden"
          >
            <option value="">{lang === 'bn' ? 'সকল এলাকা' : 'All Areas'}</option>
            {availableAreas.map((ar) => (
              <option key={ar.slug} value={ar.slug}>
                {ar.name[lang] || ar.name.bn}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Property Type */}
      <div>
        <label className="block font-semibold text-stone-700 mb-1.5">
          {t.searchPage.typeFilter}
        </label>
        <select
          value={propType}
          onChange={(e) => setPropType(e.target.value)}
          className="w-full rounded-lg border border-stone-200 bg-white p-2 text-xs text-stone-800 focus:border-emerald-700 focus:outline-hidden"
        >
          <option value="all">{t.propertyTypes.all}</option>
          <option value="room">{t.propertyTypes.room}</option>
          <option value="full-flat">{t.propertyTypes['full-flat']}</option>
          <option value="shared-room">{t.propertyTypes['shared-room']}</option>
          <option value="seat">{t.propertyTypes.seat}</option>
        </select>
      </div>

      {/* Rent Range */}
      <div>
        <label className="block font-semibold text-stone-700 mb-1.5">
          {t.searchPage.rentRange}
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            value={minRent}
            onChange={(e) => setMinRent(e.target.value)}
            placeholder={t.searchPage.minRent}
            className="w-full rounded-lg border border-stone-200 bg-white p-2 text-xs text-stone-800 focus:border-emerald-700 focus:outline-hidden"
          />
          <input
            type="number"
            value={maxRent}
            onChange={(e) => setMaxRent(e.target.value)}
            placeholder={t.searchPage.maxRent}
            className="w-full rounded-lg border border-stone-200 bg-white p-2 text-xs text-stone-800 focus:border-emerald-700 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Tenant gender */}
      <div>
        <label className="block font-semibold text-stone-700 mb-1.5">
          {t.searchPage.tenantGender}
        </label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full rounded-lg border border-stone-200 bg-white p-2 text-xs text-stone-800 focus:border-emerald-700 focus:outline-hidden"
        >
          <option value="all">{t.searchPage.allGenders}</option>
          <option value="male">{t.searchPage.maleOnly}</option>
          <option value="female">{t.searchPage.femaleOnly}</option>
        </select>
      </div>

      {/* Furnishing */}
      <div>
        <label className="block font-semibold text-stone-700 mb-1.5">
          {t.searchPage.furnishingFilter}
        </label>
        <select
          value={furnishing}
          onChange={(e) => setFurnishing(e.target.value)}
          className="w-full rounded-lg border border-stone-200 bg-white p-2 text-xs text-stone-800 focus:border-emerald-700 focus:outline-hidden"
        >
          <option value="all">{t.searchPage.allFurnishing}</option>
          <option value="furnished">{t.furnishing.furnished}</option>
          <option value="semi">{t.furnishing.semi}</option>
          <option value="unfurnished">{t.furnishing.unfurnished}</option>
        </select>
      </div>

      {/* Amenities Checkboxes */}
      <div>
        <label className="block font-semibold text-stone-700 mb-2">
          {t.searchPage.amenitiesFilter}
        </label>
        <div className="space-y-1.5">
          {allAmenitiesOptions.map((am) => (
            <label
              key={am.id}
              className="flex items-center gap-2 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedAmenities.includes(am.id)}
                onChange={() => toggleAmenity(am.id)}
                className="rounded border-stone-300 text-emerald-800 focus:ring-emerald-700"
              />
              <span>{am.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset button */}
      <div className="pt-2 border-t border-stone-200">
        <button
          type="button"
          onClick={clearAllFilters}
          className="w-full rounded-lg border border-stone-200 bg-stone-50 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-100"
        >
          {t.searchPage.clearFilters}
        </button>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200 pb-5 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900">
            {t.searchPage.title}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-500">
            {toBnNumber(filteredProperties.length)} {t.searchPage.matchingCount}
          </p>
        </div>

        {/* Sort & Mobile filter trigger */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-3.5 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 lg:hidden shadow-xs"
          >
            <SlidersHorizontal className="h-4 w-4 text-emerald-700" />
            <span>{t.searchPage.filters}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 whitespace-nowrap hidden sm:inline">
              {t.searchPage.sortLabel}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-stone-200 bg-white py-2 pl-3 pr-8 text-xs font-medium text-stone-800 focus:border-emerald-700 focus:outline-hidden"
            >
              <option value="newest">{t.searchPage.sortOptions.newest}</option>
              <option value="rentLow">{t.searchPage.sortOptions.rentLow}</option>
              <option value="rentHigh">{t.searchPage.sortOptions.rentHigh}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid with Sidebar */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-stone-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-100">
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-emerald-700" />
                <span>{t.searchPage.filters}</span>
              </h3>
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs text-emerald-800 hover:underline font-medium"
              >
                {t.searchPage.clearFilters}
              </button>
            </div>
            <FilterForm />
          </div>
        </aside>

        {/* Property Grid Area */}
        <main className="lg:col-span-3">
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          ) : (
            <EmptyState
              title={t.searchPage.noResultsTitle}
              description={t.searchPage.noResultsDesc}
              actionLabel={t.searchPage.resetBtn}
              onAction={clearAllFilters}
            />
          )}
        </main>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex bg-stone-900/50 backdrop-blur-xs lg:hidden">
          <div className="relative ml-auto h-full w-full max-w-xs bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
                <h3 className="text-sm font-bold text-stone-900">
                  {t.searchPage.filters}
                </h3>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="rounded-lg p-1 text-stone-400 hover:bg-stone-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <FilterForm />
            </div>

            <div className="pt-4 border-t border-stone-200 mt-6">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full rounded-lg bg-emerald-800 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-900"
              >
                {t.hero.searchBtn} ({toBnNumber(filteredProperties.length)})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
