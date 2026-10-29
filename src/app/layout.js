import './globals.css';
import { siteConfig } from '@/data/site';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: `${siteConfig.brand} — ${siteConfig.title}`,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
  },
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  keywords: [
    'WordPress Developer',
    'Elementor Pro Specialist',
    'WooCommerce Expert',
    'Next.js Developer',
    'React Web Solutions',
    'Figma to WordPress',
    'Speed Optimization',
    'Core Web Vitals',
    'Ashish Kumar Deb Nath',
    'Dhaka Web Developer',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: `${siteConfig.brand} — ${siteConfig.title}`,
    description: siteConfig.description,
    siteName: siteConfig.brand,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.brand} — ${siteConfig.title}`,
    description: siteConfig.description,
    creator: '@ashishweb',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Syne:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#f0f4fa] text-[#090909] font-sans antialiased selection:bg-[#dbeafe] selection:text-[#1e3a8a]">
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
