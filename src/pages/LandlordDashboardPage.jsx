'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from '../context/RouterContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { Plus, Trash2, Clock3, CheckCircle2, XCircle, LoaderCircle } from 'lucide-react';

const statusStyles = {
  pending: ['Pending review', 'bg-amber-50 text-amber-800'],
  approved: ['Live', 'bg-emerald-50 text-emerald-800'],
  rejected: ['Needs changes', 'bg-red-50 text-red-700'],
};

export default function LandlordDashboardPage() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const response = await fetch('/api/my/properties');
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not load your posts.');
      setListings(data);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);

  const remove = async (id) => {
    if (!window.confirm('Delete this property post? This cannot be undone.')) return;
    try {
      const response = await fetch(`/api/properties/${encodeURIComponent(id)}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Could not delete this post.');
      setListings((current) => current.filter((item) => item.id !== id));
      window.dispatchEvent(new Event('bachelorbari:listings-updated'));
    } catch (err) { setError(err.message); }
  };

  return <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
    <div className="mb-8 flex flex-col gap-4 border-b border-stone-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div><p className="text-sm font-medium text-emerald-800">{user?.email}</p><h1 className="mt-1 text-3xl font-bold tracking-tight text-stone-900">My property posts</h1><p className="mt-2 text-sm text-stone-500">Track reviews and manage the homes you have submitted.</p></div>
      <Link to="/landlord/add-property" className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-800 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-900"><Plus className="h-4 w-4" /> Post a property</Link>
    </div>
    {error && <p role="alert" className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}
    {loading ? <div className="flex justify-center py-20 text-emerald-800"><LoaderCircle className="h-6 w-6 animate-spin" /></div> : listings.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{listings.map((item) => {
      const [label, style] = statusStyles[item.moderationStatus] || statusStyles.pending;
      return <article key={item.id} className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xs">
        <div className="aspect-[16/9] bg-stone-100"><img src={item.images?.[0] || '/src/assets/images/property_room_interior_1791874098305.jpg'} alt="" className="h-full w-full object-cover" /></div>
        <div className="p-5"><div className="flex items-start justify-between gap-3"><h2 className="line-clamp-2 font-bold text-stone-900">{item.title?.en || item.title?.bn}</h2><span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${style}`}>{label}</span></div>
          <p className="mt-2 text-sm text-stone-500">{item.areaSlug}, {item.districtSlug}</p><p className="mt-3 font-semibold text-stone-800">৳{Number(item.monthlyRent).toLocaleString()} / month</p>
          <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-4"><span className="inline-flex items-center gap-1.5 text-xs text-stone-400">{item.moderationStatus === 'approved' ? <CheckCircle2 className="h-4 w-4" /> : item.moderationStatus === 'rejected' ? <XCircle className="h-4 w-4" /> : <Clock3 className="h-4 w-4" />}{new Date(item.createdAt).toLocaleDateString()}</span>
            {item.moderationStatus === 'approved' && <Link to={`/property/${item.slug}`} className="text-xs font-semibold text-emerald-800 hover:underline">View live post</Link>}
            <button type="button" onClick={() => remove(item.id)} className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5" /> Delete</button>
          </div>{item.moderationStatus === 'rejected' && <p className="mt-3 rounded-lg bg-red-50 p-3 text-xs text-red-700">This post was not approved. Contact the site administrator if you need help.</p>}
        </div>
      </article>;
    })}</div> : <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center"><h2 className="text-lg font-bold text-stone-900">No posts yet</h2><p className="mt-2 text-sm text-stone-500">Your submissions and their review status will show up here.</p><Link to="/landlord/add-property" className="mt-5 inline-flex rounded-lg bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white">Post your first property</Link></div>}
  </div>;
}
