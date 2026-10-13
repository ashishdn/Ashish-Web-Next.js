import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useProperties } from '../context/PropertyContext.jsx';
import { useRouter } from '../context/RouterContext.jsx';
import { MapPin } from 'lucide-react';

export default function AreaCard({ districtSlug, districtName, thanaName, area }) {
  const { t, lang, toBnNumber } = useLanguage();
  const { getAreaCount } = useProperties();
  const { navigate } = useRouter();

  const count = getAreaCount(area.slug);

  const handleClick = () => {
    navigate(`/district/${districtSlug}/${area.slug}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group flex items-start gap-3 rounded-lg border border-stone-200 bg-white p-3 text-left transition-[background-color,border-color,box-shadow] duration-250 ease-out hover:border-emerald-700/50 hover:bg-emerald-50/30 hover:shadow-xs"
    >
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-800 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
        <MapPin className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="truncate text-xs font-semibold text-stone-900 group-hover:text-emerald-900">
          {area.name[lang] || area.name.bn}
        </h4>
        <p className="text-[11px] text-stone-500 truncate">
          {thanaName} · {districtName}
        </p>
        <span className="mt-1 inline-block text-[10px] font-medium text-emerald-700">
          {toBnNumber(count)} {t.districts.propertiesCount}
        </span>
      </div>
    </button>
  );
}
