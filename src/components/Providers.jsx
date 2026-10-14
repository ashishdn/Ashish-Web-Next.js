'use client';
import React, { Suspense } from 'react';
import { LanguageProvider } from '../context/LanguageContext.jsx';
import { PropertyProvider } from '../context/PropertyContext.jsx';
import { RouterProvider } from '../context/RouterContext.jsx';
import { AuthProvider } from '../context/AuthContext.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import PageLoader from './PageLoader.jsx';

export default function Providers({ children }) {
  return (
    <LanguageProvider>
      <PropertyProvider>
        <Suspense fallback={<PageLoader message="পাতাটি লোড হচ্ছে" />}>
          <RouterProvider>
            <AuthProvider>
              <div className="flex min-h-screen flex-col bg-stone-50 text-stone-900">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </AuthProvider>
          </RouterProvider>
        </Suspense>
      </PropertyProvider>
    </LanguageProvider>
  );
}

