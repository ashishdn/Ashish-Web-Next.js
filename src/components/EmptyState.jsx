'use client';
import React from 'react';
import { Home, RefreshCw } from 'lucide-react';

export default function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon: Icon = Home,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-white p-8 sm:p-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100 text-stone-500 mb-4">
        <Icon className="h-7 w-7 text-stone-400" />
      </div>
      <h3 className="text-base font-semibold text-stone-900">{title}</h3>
      <p className="mt-1.5 max-w-sm text-xs sm:text-sm text-stone-500 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-800 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-900 transition-colors"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
}
