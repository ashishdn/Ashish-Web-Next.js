import React from 'react';
import { LanguageProvider } from './context/LanguageContext.jsx';
import { PropertyProvider } from './context/PropertyContext.jsx';
import { RouterProvider, useRouter } from './context/RouterContext.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import LocationPage from './pages/LocationPage.jsx';
import PropertyDetailsPage from './pages/PropertyDetailsPage.jsx';
import AddPropertyPage from './pages/AddPropertyPage.jsx';
import LandlordDashboardPage from './pages/LandlordDashboardPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ForLandlordsPage from './pages/ForLandlordsPage.jsx';
import LegalPage from './pages/LegalPage.jsx';

function RouteSwitch() {
  const { currentPath } = useRouter();

  // Route matching
  if (currentPath === '/' || currentPath === '') {
    return <HomePage />;
  }

  if (currentPath === '/search') {
    return <SearchPage />;
  }

  if (currentPath === '/landlord/add-property') {
    return <AddPropertyPage />;
  }

  if (currentPath === '/landlord/dashboard') {
    return <LandlordDashboardPage />;
  }

  if (currentPath === '/about') {
    return <AboutPage />;
  }

  if (currentPath === '/for-landlords') {
    return <ForLandlordsPage />;
  }

  if (currentPath === '/terms') {
    return <LegalPage type="terms" />;
  }

  if (currentPath === '/privacy') {
    return <LegalPage type="privacy" />;
  }

  // /property/:slug
  if (currentPath.startsWith('/property/')) {
    const slug = currentPath.replace('/property/', '');
    return <PropertyDetailsPage slug={slug} />;
  }

  // /district/:districtSlug/:areaSlug or /district/:districtSlug
  if (currentPath.startsWith('/district/')) {
    const segments = currentPath.replace('/district/', '').split('/').filter(Boolean);
    const districtSlug = segments[0] || 'dhaka';
    const areaSlug = segments[1] || null;
    return <LocationPage districtSlug={districtSlug} areaSlug={areaSlug} />;
  }

  // Fallback to home
  return <HomePage />;
}

export default function App() {
  return (
    <LanguageProvider>
      <PropertyProvider>
        <RouterProvider>
          <div className="flex min-h-screen flex-col bg-stone-50 text-stone-900">
            <Header />
            <main className="flex-1">
              <RouteSwitch />
            </main>
            <Footer />
          </div>
        </RouterProvider>
      </PropertyProvider>
    </LanguageProvider>
  );
}
