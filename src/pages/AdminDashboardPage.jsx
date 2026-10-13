import React, { useCallback, useEffect, useState } from 'react';
import { Check, X, LoaderCircle, ShieldCheck, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState('');
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('pending');
  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const response = await fetch('/api/admin/properties');
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not load submissions.');
      setListings(data);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);

  const review = async (id, moderationStatus) => {
    setBusyId(id); setError('');
    try {
      const response = await fetch(`/api/admin/properties/${encodeURIComponent(id)}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ moderationStatus }),
      });
      const updated = await response.json();
      if (!response.ok) throw new Error(updated.error || 'Could not update this post.');
      setListings((current) => current.map((item) => item.id === id ? updated : item));
      window.dispatchEvent(new Event('bachelorbari:listings-updated'));
    } catch (err) { setError(err.message); }
    finally { setBusyId(''); }
  };

  const visible = listings.filter((item) => filter === 'all' || item.moderationStatus === filter);
  const pendingCount = listings.filter((item) => item.moderationStatus === 'pending').length;
  return <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
    <div className="mb-8 flex flex-col gap-4 border-b border-stone-200 pb-6 sm:flex-row sm:items-end sm:justify-between"><div><div className="flex items-center gap-2 text-sm font-semibold text-emerald-800"><ShieldCheck className="h-4 w-4" />Administrator · {user?.email}</div><h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900">Property review</h1><p className="mt-2 text-sm text-stone-500">Review owner details and approve a post before it becomes public.</p></div><button type="button" onClick={load} className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-50"><RefreshCw className="h-4 w-4" />Refresh</button></div>
    <div className="mb-6 flex gap-2 overflow-x-auto">{[['pending', `Pending (${pendingCount})`], ['approved', 'Live'], ['rejected', 'Rejected'], ['all', 'All posts']].map(([value, label]) => <button key={value} type="button" onClick={() => setFilter(value)} className={`shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${filter === value ? 'bg-emerald-800 text-white' : 'bg-white text-stone-600 hover:bg-stone-100'}`}>{label}</button>)}</div>
    {error && <p role="alert" className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}
    {loading ? <div className="flex justify-center py-20 text-emerald-800"><LoaderCircle className="h-6 w-6 animate-spin" /></div> : visible.length ? <div className="space-y-5">{visible.map((item) => <article key={item.id} className="grid overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xs md:grid-cols-[260px_1fr]"><div className="min-h-48 bg-stone-100 md:min-h-full"><img src={item.images?.[0] || '/src/assets/images/property_room_interior_1791874098305.jpg'} alt="Property submitted by owner" className="h-full w-full object-cover" /></div><div className="p-5 sm:p-6"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">{item.moderationStatus}</p><h2 className="mt-1 text-xl font-bold text-stone-900">{item.title?.en || item.title?.bn}</h2><p className="mt-1 text-sm text-stone-500">{item.areaSlug}, {item.thanaSlug}, {item.districtSlug} · ৳{Number(item.monthlyRent).toLocaleString()} / month</p></div><time className="text-xs text-stone-400">{new Date(item.createdAt).toLocaleString()}</time></div>
      <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-stone-700">{item.description?.en || item.description?.bn}</p>
      <div className="mt-5 grid gap-3 rounded-xl bg-stone-50 p-4 text-sm sm:grid-cols-2"><div><p className="text-xs font-semibold uppercase tracking-wide text-stone-400">Owner account</p><p className="mt-1 font-semibold text-stone-900">{item.landlordName || 'Name not provided'}</p><p className="text-stone-600">{item.ownerEmail}</p><p className="text-stone-600">{item.landlordPhone}</p></div><div><p className="text-xs font-semibold uppercase tracking-wide text-stone-400">Property address</p><p className="mt-1 text-stone-700">{item.address?.en || item.address?.bn}</p></div></div>
      {item.moderationStatus === 'pending' && <div className="mt-5 flex flex-wrap justify-end gap-3"><button type="button" disabled={busyId === item.id} onClick={() => review(item.id, 'rejected')} className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"><X className="h-4 w-4" />Reject</button><button type="button" disabled={busyId === item.id} onClick={() => review(item.id, 'approved')} className="inline-flex items-center gap-2 rounded-lg bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900 disabled:opacity-50">{busyId === item.id ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}Approve and publish</button></div>}
    </div></article>)}</div> : <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center"><h2 className="text-lg font-bold text-stone-900">No posts in this view</h2><p className="mt-2 text-sm text-stone-500">New property submissions will appear here for review.</p></div>}
  </div>;
}
