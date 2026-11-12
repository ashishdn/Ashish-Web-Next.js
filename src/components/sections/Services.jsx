import React from 'react';
import { servicesData } from '@/data/services';
import SectionHeading from '../ui/SectionHeading';
import ServiceCard from '../ui/ServiceCard';
import Reveal from '../ui/Reveal';

export default function Services() {
  const { eyebrow, heading, subtitle, services } = servicesData;

  return (
    <section id="services" className="py-16 md:py-20 bg-gradient-to-br from-[var(--bg-secondary)] via-[var(--bg-primary)] to-[var(--bg-secondary)] border-t border-[var(--border-default)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} heading={heading} subtitle={subtitle} />
        </Reveal>
        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 md:gap-6 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
