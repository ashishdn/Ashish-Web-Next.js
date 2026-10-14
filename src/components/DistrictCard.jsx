'use client';
import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useProperties } from '../context/PropertyContext.jsx';
import { useRouter } from '../context/RouterContext.jsx';
import { ArrowUpRight, MapPin } from 'lucide-react';

export default function DistrictCard({ district }) {
  const { t, lang, toBnNumber } = useLanguage();
  const { getDistrictCount } = useProperties();
  const { navigate } = useRouter();

  const count = getDistrictCount(district.slug);

  const handleClick = () => {
    navigate(`/district/${district.slug}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-stone-200/90 bg-white transition-[border-color,box-shadow] duration-300 ease-out hover:border-emerald-800/25 hover:shadow-md cursor-pointer"
    >
      {/* District Photo */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100">
        <img
          src={district.image}
          alt={district.name[lang] || district.name.bn}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.01]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent" />

        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold tracking-tight">
                {district.name[lang] || district.name.bn}
              </h3>
              <p className="text-xs text-stone-200 line-clamp-1">
                {district.tagline[lang] || district.tagline.bn}
              </p>
            </div>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-xs transition-colors duration-300 group-hover:bg-white/30">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>

      {/* Card Info */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <p className="text-xs leading-relaxed text-stone-600 line-clamp-2">
          {district.description[lang] || district.description.bn}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3 text-xs">
          <span className="font-semibold text-emerald-800">
            {toBnNumber(count)} {t.districts.propertiesCount}
          </span>
          <span className="text-stone-500 font-medium group-hover:text-emerald-800 transition-colors">
            {t.districts.viewAll} &rarr;
          </span>
        </div>
      </div>
    </div>
  );
}
