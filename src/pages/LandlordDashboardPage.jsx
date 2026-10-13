import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useProperties } from '../context/PropertyContext.jsx';
import { useRouter, Link } from '../context/RouterContext.jsx';
import { PriceDisplay, AvailabilityBadge } from '../components/PriceDisplay.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { districts } from '../data/districts.js';
import {
  LayoutDashboard,
  CheckCircle,
  Clock,
  Home,
  PlusCircle,
  Trash2,
  ExternalLink,
  Search,
  Filter,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

export default function LandlordDashboardPage() {
  const { t, lang, toBnNumber } = useLanguage();
  const {
    properties,
    stats,
    updatePropertyStatus,
    deleteProperty,
    resetToDefaultData,
  } = useProperties();
  const { navigate } = useRouter();

  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Filter properties
  const filteredListings = useMemo(() => {
    return properties.filter((p) => {
      if (statusFilter !== 'all' && p.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleBn = (p.title.bn || '').toLowerCase();
        const titleEn = (p.title.en || '').toLowerCase();
        const districtSlug = (p.districtSlug || '').toLowerCase();
        if (
          !titleBn.includes(q) &&
          !titleEn.includes(q) &&
          !districtSlug.includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [properties, statusFilter, searchQuery]);

  const handleDeleteConfirm = () => {
    if (deleteTargetId) {
      deleteProperty(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200 pb-5 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
            {t.dashboard.title}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-500">
            {t.dashboard.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={resetToDefaultData}
            title="রিসেট ডেমো ডাটা"
            className="flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs font-medium text-stone-600 hover:bg-stone-50 transition-colors shadow-xs"
          >
            <RotateCcw className="h-3.5 w-3.5 text-stone-400" />
            <span className="hidden sm:inline">রিসেট ডেমো</span>
          </button>

          <Link
            to="/landlord/add-property"
            className="flex items-center gap-1.5 rounded-lg bg-emerald-800 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-900 transition-colors"
          >
            <PlusCircle className="h-4 w-4" />
            <span>{t.dashboard.addNewBtn}</span>
          </Link>
        </div>
      </div>

      {/* Demo Notice Banner */}
      <div className="mb-8 rounded-xl border border-stone-200 bg-stone-100/80 p-4 text-xs text-stone-700 flex items-start gap-3">
        <AlertTriangle className="h-4 w-4 text-emerald-800 shrink-0 mt-0.5" />
        <p className="leading-relaxed">{t.dashboard.demoBanner}</p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-xs">
          <span className="text-[11px] font-medium text-stone-500 block">
            {t.dashboard.totalListings}
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-stone-900 tabular-nums">
              {toBnNumber(stats.total)}
            </span>
            <Home className="h-5 w-5 text-stone-300" />
          </div>
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-xs">
          <span className="text-[11px] font-medium text-emerald-700 block">
            {t.dashboard.availableCount}
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-emerald-900 tabular-nums">
              {toBnNumber(stats.available)}
            </span>
            <CheckCircle className="h-5 w-5 text-emerald-600" />
          </div>
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-xs">
          <span className="text-[11px] font-medium text-amber-700 block">
            {t.dashboard.bookedCount}
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-amber-900 tabular-nums">
              {toBnNumber(stats.booked)}
            </span>
            <Clock className="h-5 w-5 text-amber-500" />
          </div>
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-xs">
          <span className="text-[11px] font-medium text-stone-500 block">
            {t.dashboard.rentedCount}
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-stone-600 tabular-nums">
              {toBnNumber(stats.rented)}
            </span>
            <CheckCircle className="h-5 w-5 text-stone-400" />
          </div>
        </div>
      </div>

      {/* Controls Bar: Search & Status Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 bg-white p-3 rounded-xl border border-stone-200">
        {/* Status segmented filters */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {[
            { id: 'all', label: 'সবগুলো' },
            { id: 'available', label: t.dashboard.availableCount },
            { id: 'booked', label: t.dashboard.bookedCount },
            { id: 'rented', label: t.dashboard.rentedCount },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === tab.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Quick search input */}
        <div className="relative min-w-[200px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="লিস্টিং খুঁজুন..."
            className="w-full rounded-lg border border-stone-200 bg-stone-50 py-1.5 pl-8 pr-3 text-xs text-stone-800 focus:border-emerald-700 focus:bg-white focus:outline-hidden"
          />
          <Search className="pointer-events-none absolute left-2.5 top-2 h-3.5 w-3.5 text-stone-400" />
        </div>
      </div>

      {/* Management Table / Responsive Card List */}
      {filteredListings.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50/80 font-semibold text-stone-600">
                  <th className="py-3.5 px-4">{t.dashboard.tableProperty}</th>
                  <th className="py-3.5 px-4">{t.dashboard.tableLocation}</th>
                  <th className="py-3.5 px-4">{t.dashboard.tableRent}</th>
                  <th className="py-3.5 px-4">{t.dashboard.tableStatus}</th>
                  <th className="py-3.5 px-4 text-right">{t.dashboard.tableActions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredListings.map((prop) => (
                  <tr key={prop.id} className="hover:bg-stone-50/50 transition-colors">
                    {/* Property info */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            prop.images && prop.images[0]
                              ? prop.images[0]
                              : '/src/assets/images/property_room_interior_1791874098305.jpg'
                          }
                          alt=""
                          className="h-10 w-12 rounded-md object-cover bg-stone-100 shrink-0"
                        />
                        <div className="truncate">
                          <Link
                            to={`/property/${prop.slug}`}
                            className="font-semibold text-stone-900 hover:text-emerald-800 truncate block"
                          >
                            {prop.title[lang] || prop.title.bn}
                          </Link>
                          <span className="text-[11px] text-stone-400 capitalize">
                            {t.propertyTypes[prop.propertyType] || prop.propertyType}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-stone-600">
                      <span className="capitalize font-medium text-stone-800">
                        {prop.thanaSlug || prop.areaSlug}
                      </span>
                      <span className="text-stone-400 block text-[11px] capitalize">
                        {prop.districtSlug}
                      </span>
                    </td>

                    {/* Rent */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <PriceDisplay amount={prop.monthlyRent} className="text-xs" />
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <AvailabilityBadge status={prop.status} />

                        {/* Status Change Selector */}
                        <select
                          value={prop.status}
                          onChange={(e) => updatePropertyStatus(prop.id, e.target.value)}
                          className="rounded-md border border-stone-200 bg-white py-1 px-2 text-[11px] text-stone-700 focus:border-emerald-700 focus:outline-hidden"
                        >
                          <option value="available">{t.status.available}</option>
                          <option value="booked">{t.status.booked}</option>
                          <option value="rented">{t.status.rented}</option>
                        </select>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/property/${prop.slug}`}
                          className="inline-flex items-center gap-1 rounded-md border border-stone-200 bg-white px-2.5 py-1 text-[11px] font-medium text-stone-700 hover:bg-stone-50"
                          title="বাসাটি দেখুন"
                        >
                          <ExternalLink className="h-3 w-3 text-stone-400" />
                          <span>দেখুন</span>
                        </Link>

                        <button
                          type="button"
                          onClick={() => setDeleteTargetId(prop.id)}
                          className="inline-flex items-center gap-1 rounded-md border border-red-200 bg-white px-2.5 py-1 text-[11px] font-medium text-red-600 hover:bg-red-50 transition-colors"
                          title={t.dashboard.deleteListing}
                        >
                          <Trash2 className="h-3 w-3" />
                          <span>মুছুন</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState
          title={t.dashboard.noListings}
          description="বর্তমান ফিল্টারে কোনো বিজ্ঞাপন পাওয়া যায়নি।"
          actionLabel={t.dashboard.addNewBtn}
          onAction={() => navigate('/landlord/add-property')}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteTargetId)}
        title={t.dashboard.deleteConfirmTitle}
        description={t.dashboard.deleteConfirmDesc}
        confirmLabel={t.dashboard.confirmBtn}
        cancelLabel={t.dashboard.cancelBtn}
        isDestructive={true}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
