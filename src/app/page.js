import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Services from '@/components/sections/Services';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import WhyMe from '@/components/sections/WhyMe';
import Contact from '@/components/sections/Contact';
import { siteConfig } from '@/data/site';
import { pageMetadata } from '@/lib/seo';
import { servicesData } from '@/data/services';

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: siteConfig.seoName,
      alternateName: siteConfig.name,
      url: siteConfig.url,
      jobTitle: 'WordPress and Elementor Developer',
      knowsAbout: ['WordPress', 'Elementor Pro', 'Website Redesign', 'Custom Web Development', 'React', 'Next.js'],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      name: siteConfig.brand,
      alternateName: siteConfig.seoName,
      url: siteConfig.url,
      inLanguage: 'en',
      publisher: { '@id': `${siteConfig.url}/#person` },
    },
    ...servicesData.services.map((service) => ({
      '@type': 'Service',
      '@id': `${siteConfig.url}/#service-${service.id}`,
      name: service.title,
      description: service.description,
      url: `${siteConfig.url}/#services`,
      provider: { '@id': `${siteConfig.url}/#person` },
      areaServed: ['United States', 'United Kingdom', 'Worldwide'],
    })),
  ],
};

export const metadata = pageMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: '/',
});

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <Hero />
      <About />
      <Skills />
      <Services />
      <Projects />
      <Experience />
      <WhyMe />
      <Contact />
    </>
  );
}
