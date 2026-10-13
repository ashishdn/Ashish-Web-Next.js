import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useRouter } from '../context/RouterContext.jsx';
import { PriceDisplay, AvailabilityBadge } from './PriceDisplay.jsx';
import { MapPin, Bed, Bath, Calendar, Users, Home } from 'lucide-react';
import { locations } from '../data/locations.js';
import { districts } from '../data/districts.js';

export default function PropertyCard({ property }) {
  const { t, lang, toBnNumber, formatBDT } = useLanguage();
  const { navigate } = useRouter();
  const [imgError, setImgError] = useState(false);

  // Lookup location names
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

  // Tenant type label
  let tenantLabel = t.tenantTypes.all;
  if (property.acceptedTenants.length === 1) {
    if (property.acceptedTenants[0] === 'male') tenantLabel = t.tenantTypes.male;
    if (property.acceptedTenants[0] === 'female') tenantLabel = t.tenantTypes.female;
  }

  const handleCardClick = () => {
    navigate(`/property/${property.slug}`);
  };

  const primaryImage =
    property.images && property.images.length > 0
      ? property.images[0]
      : '/src/assets/images/property_room_interior_1791874098305.jpg';

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-stone-200/90 bg-white transition-[border-color,box-shadow] duration-300 ease-out hover:border-emerald-800/25 hover:shadow-md cursor-pointer"
    >
      {/* Property Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
        {!imgError ? (
          <img
            src={primaryImage}
            alt={property.title[lang] || property.title.bn}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.01]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-stone-100 text-stone-400">
            <Home className="h-10 w-10 text-stone-300" />
          </div>
        )}

        {/* Floating status tag top-left */}
        <div className="absolute top-2.5 left-2.5 rounded-md bg-white/95 px-2 py-1 text-xs shadow-xs backdrop-blur-xs">
          <AvailabilityBadge status={property.status} />
        </div>

        {/* Tenant suitability tag top-right */}
        <div className="absolute top-2.5 right-2.5 rounded-md bg-stone-900/80 px-2 py-1 text-xs text-white shadow-xs backdrop-blur-xs font-medium">
          {tenantLabel}
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Location Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5">
          <MapPin className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
          <span className="truncate font-medium text-stone-700">{areaName}</span>
          <span>·</span>
          <span className="text-stone-500">{districtName}</span>
        </div>

        {/* Property Title */}
        <h3 className="line-clamp-2 text-sm font-semibold text-stone-900 leading-snug group-hover:text-emerald-900 transition-colors">
          {property.title[lang] || property.title.bn}
        </h3>

        {/* Key Features row */}
        <div className="mt-3 flex items-center gap-4 text-xs text-stone-600 border-y border-stone-100 py-2">
          <div className="flex items-center gap-1">
            <Bed className="h-3.5 w-3.5 text-stone-400" />
            <span>
              {toBnNumber(property.rooms)} {t.featured.beds}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-3.5 w-3.5 text-stone-400" />
            <span>
              {toBnNumber(property.baths)} {t.featured.baths}
            </span>
          </div>
          {property.availableFrom && (
            <div className="flex items-center gap-1 truncate text-stone-500">
              <Calendar className="h-3.5 w-3.5 text-stone-400" />
              <span>{toBnNumber(property.availableFrom)}</span>
            </div>
          )}
        </div>

        {/* Price & Action */}
        <div className="mt-3 flex items-center justify-between pt-1">
          <div>
            <PriceDisplay amount={property.monthlyRent} className="text-base" />
            {property.advance > 0 && (
              <p className="text-[11px] text-stone-400">
                {t.featured.deposit}: {formatBDT(property.advance)}
              </p>
            )}
          </div>

          <button
            type="button"
            className="rounded-lg bg-stone-50 px-3 py-1.5 text-xs font-medium text-emerald-800 border border-stone-200 transition-colors group-hover:bg-emerald-800 group-hover:text-white group-hover:border-emerald-800"
          >
            {t.featured.viewDetails}
          </button>
        </div>
      </div>
    </div>
  );
}
