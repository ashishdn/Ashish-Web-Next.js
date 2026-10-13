import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useRouter } from '../context/RouterContext.jsx';
import { districts } from '../data/districts.js';
import { locations, getThanasByDistrict, searchLocations } from '../data/locations.js';
import { Search, MapPin, Building, Home, ChevronDown } from 'lucide-react';

export default function LocationSearch({ initialDistrict = '', initialType = '', className = '' }) {
  const { t, lang } = useLanguage();
  const { navigate } = useRouter();

  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);
  const [selectedThana, setSelectedThana] = useState('');
  const [selectedType, setSelectedType] = useState(initialType);
  const [typedQuery, setTypedQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const autocompleteRef = useRef(null);

  // Available thanas for the selected district
  const availableThanas = selectedDistrict ? getThanasByDistrict(selectedDistrict) : [];

  // Reset thana if district changes
  const handleDistrictChange = (e) => {
    const val = e.target.value;
    setSelectedDistrict(val);
    setSelectedThana('');
  };

  // Handle typing suggestions
  useEffect(() => {
    if (typedQuery.trim().length >= 2) {
      const hits = searchLocations(typedQuery, lang);
      setSuggestions(hits);
      setShowSuggestions(hits.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [typedQuery, lang]);

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSuggestion = (item) => {
    setSelectedDistrict(item.districtSlug);
    setSelectedThana(item.thanaSlug);
    setTypedQuery(item.areaName);
    setShowSuggestions(false);

    // Direct navigate to search with these params
    navigate('/search', {
      district: item.districtSlug,
      thana: item.thanaSlug,
      area: item.areaSlug,
      type: selectedType,
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    const params = {};
    if (selectedDistrict) params.district = selectedDistrict;
    if (selectedThana) params.thana = selectedThana;
    if (selectedType && selectedType !== 'all') params.type = selectedType;
    if (typedQuery && !selectedThana) params.q = typedQuery.trim();

    navigate('/search', params);
  };

  return (
    <div className={`relative w-full rounded-2xl bg-white p-3 sm:p-4 shadow-lg border border-stone-200/90 ${className}`}>
      <form onSubmit={handleSearchSubmit} className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* District Selector */}
        <div className="flex-1 min-w-[160px]">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-1">
            {t.hero.selectDistrict}
          </label>
          <div className="relative">
            <select
              value={selectedDistrict}
              onChange={handleDistrictChange}
              className="w-full appearance-none rounded-lg border border-stone-200 bg-stone-50/50 py-2.5 pl-3 pr-8 text-xs sm:text-sm font-medium text-stone-800 focus:border-emerald-700 focus:bg-white focus:outline-hidden"
            >
              <option value="">{lang === 'bn' ? 'সকল জেলা' : 'All Districts'}</option>
              {districts.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.name[lang] || d.name.bn}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-3 h-4 w-4 text-stone-400" />
          </div>
        </div>

        {/* Thana or Free Search Input with Autocomplete */}
        <div className="flex-2 relative" ref={autocompleteRef}>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-1">
            {selectedDistrict ? t.hero.selectArea : t.searchPage.areaFilter}
          </label>

          {selectedDistrict && availableThanas.length > 0 ? (
            <div className="relative">
              <select
                value={selectedThana}
                onChange={(e) => setSelectedThana(e.target.value)}
                className="w-full appearance-none rounded-lg border border-stone-200 bg-stone-50/50 py-2.5 pl-3 pr-8 text-xs sm:text-sm font-medium text-stone-800 focus:border-emerald-700 focus:bg-white focus:outline-hidden"
              >
                <option value="">{lang === 'bn' ? 'সব এলাকা ও থানা' : 'All Thanas & Areas'}</option>
                {availableThanas.map((loc) => (
                  <option key={loc.thanaSlug} value={loc.thanaSlug}>
                    {loc.thanaName[lang] || loc.thanaName.bn}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-3 h-4 w-4 text-stone-400" />
            </div>
          ) : (
            <div className="relative">
              <input
                type="text"
                value={typedQuery}
                onChange={(e) => setTypedQuery(e.target.value)}
                onFocus={() => typedQuery.trim().length >= 2 && setShowSuggestions(true)}
                placeholder={t.hero.searchPlaceholder}
                className="w-full rounded-lg border border-stone-200 bg-stone-50/50 py-2.5 pl-9 pr-3 text-xs sm:text-sm text-stone-800 placeholder:text-stone-400 focus:border-emerald-700 focus:bg-white focus:outline-hidden"
              />
              <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-stone-400" />
            </div>
          )}

          {/* Autocomplete Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-y-auto rounded-lg border border-stone-200 bg-white py-1 shadow-xl">
              {suggestions.map((item, idx) => (
                <button
                  key={`${item.districtSlug}-${item.areaSlug}-${idx}`}
                  type="button"
                  onClick={() => handleSelectSuggestion(item)}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-stone-700 hover:bg-emerald-50 hover:text-emerald-950"
                >
                  <MapPin className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
                  <span className="font-medium">{item.fullLabel}</span>
                  <span className="text-[10px] text-stone-400 capitalize">
                    ({item.districtSlug})
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Property Type Selector */}
        <div className="flex-1 min-w-[150px]">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-1">
            {t.hero.selectType}
          </label>
          <div className="relative">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full appearance-none rounded-lg border border-stone-200 bg-stone-50/50 py-2.5 pl-3 pr-8 text-xs sm:text-sm font-medium text-stone-800 focus:border-emerald-700 focus:bg-white focus:outline-hidden"
            >
              <option value="all">{t.propertyTypes.all}</option>
              <option value="room">{t.propertyTypes.room}</option>
              <option value="full-flat">{t.propertyTypes['full-flat']}</option>
              <option value="shared-room">{t.propertyTypes['shared-room']}</option>
              <option value="seat">{t.propertyTypes.seat}</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-3 h-4 w-4 text-stone-400" />
          </div>
        </div>

        {/* Search Action Button */}
        <div className="lg:pt-5">
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-800 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs transition-all hover:bg-emerald-900 active:scale-98"
          >
            <Search className="h-4 w-4" />
            <span>{t.hero.searchBtn}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
