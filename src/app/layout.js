import './globals.css';
import Providers from '../components/Providers.jsx';

export const metadata = {
  title: 'BachelorBari - Bangladesh Bachelor Rental Platform',
  description: 'ঢাকা, চট্টগ্রাম ও রাজশাহীর বিভিন্ন এলাকায় ব্যাচেলরদের উপযোগী ভাড়ার বাসা খুঁজুন এক জায়গায়।',
  openGraph: {
    title: 'BachelorBari - Bangladesh Bachelor Rental Platform',
    description: 'ঢাকা, চট্টগ্রাম ও রাজশাহীর বিভিন্ন এলাকায় ব্যাচেলরদের উপযোগী ভাড়ার বাসা খুঁজুন এক জায়গায়।',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-stone-50 text-stone-900 antialiased font-sans selection:bg-emerald-100 selection:text-emerald-900 min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

