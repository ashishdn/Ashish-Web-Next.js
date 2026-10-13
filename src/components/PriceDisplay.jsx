import React from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';

export function PriceDisplay({ amount, period = '/মাস', className = '' }) {
  const { formatBDT, t, lang } = useLanguage();

  return (
    <div className={`inline-flex items-baseline gap-1 ${className}`}>
      <span className="font-semibold text-emerald-900 tracking-tight tabular-nums">
        {formatBDT(amount)}
      </span>
      <span className="text-xs text-stone-500 font-normal">
        {t.featured.rentPerMonth}
      </span>
    </div>
  );
}

export function AvailabilityBadge({ status }) {
  const { t } = useLanguage();

  if (status === 'rented') {
    return (
      <span className="inline-flex items-center text-xs font-medium text-stone-500">
        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-stone-400" />
        {t.status.rented}
      </span>
    );
  }

  if (status === 'booked') {
    return (
      <span className="inline-flex items-center text-xs font-medium text-amber-700">
        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-amber-500" />
        {t.status.booked}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center text-xs font-medium text-emerald-700">
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-600" />
      {t.status.available}
    </span>
  );
}
