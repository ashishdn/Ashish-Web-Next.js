'use client';

import HomePage from '../pages/HomePage.jsx';
import SearchPage from '../pages/SearchPage.jsx';
import LocationPage from '../pages/LocationPage.jsx';
import PropertyDetailsPage from '../pages/PropertyDetailsPage.jsx';
import AddPropertyPage from '../pages/AddPropertyPage.jsx';
import LandlordDashboardPage from '../pages/LandlordDashboardPage.jsx';
import AboutPage from '../pages/AboutPage.jsx';
import ForLandlordsPage from '../pages/ForLandlordsPage.jsx';
import LegalPage from '../pages/LegalPage.jsx';
import AuthPage from '../pages/AuthPage.jsx';
import AdminDashboardPage from '../pages/AdminDashboardPage.jsx';
import { useRouter } from '../context/RouterContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import PageLoader from './PageLoader.jsx';

export default function RouteSwitch() {
  const { currentPath } = useRouter();
  const { user, isAdmin, isPending } = useAuth();

  if (isPending) return <PageLoader message="আপনার অ্যাকাউন্ট লোড হচ্ছে" />;

  if (currentPath === '/login' || currentPath === '/signup') return <AuthPage initialMode={currentPath === '/signup' ? 'signup' : 'login'} />;
  if (currentPath === '/admin/login' || currentPath === '/admin/signup') return <AuthPage initialMode={currentPath === '/admin/signup' ? 'signup' : 'login'} adminRequired destination="/admin" />;
  if (currentPath === '/admin') return isAdmin ? <AdminDashboardPage /> : <AuthPage initialMode="login" adminRequired destination="/admin" />;
  if (currentPath === '/landlord/dashboard') return user ? <LandlordDashboardPage /> : <AuthPage initialMode="login" destination="/landlord/dashboard" />;
  if (currentPath === '/landlord/add-property') return user ? <AddPropertyPage /> : <AuthPage initialMode="login" destination="/landlord/add-property" />;
  if (currentPath === '/search') return <SearchPage />;
  if (currentPath === '/about') return <AboutPage />;
  if (currentPath === '/for-landlords') return <ForLandlordsPage />;
  if (currentPath === '/terms') return <LegalPage type="terms" />;
  if (currentPath === '/privacy') return <LegalPage type="privacy" />;

  if (currentPath.startsWith('/property/')) {
    return <PropertyDetailsPage slug={decodeURIComponent(currentPath.slice('/property/'.length))} />;
  }

  if (currentPath.startsWith('/district/')) {
    const [districtSlug = 'dhaka', areaSlug = null] = currentPath.slice('/district/'.length).split('/');
    return <LocationPage districtSlug={districtSlug} areaSlug={areaSlug} />;
  }

  return <HomePage />;
}
