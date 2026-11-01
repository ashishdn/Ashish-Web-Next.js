import { siteConfig } from '@/data/site';

export function pageMetadata({ title, description, path }) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: siteConfig.brand,
      title,
      description,
      url: new URL(path, siteConfig.url).href,
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: `${siteConfig.name} - Web Development` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/opengraph-image'],
    },
  };
}
