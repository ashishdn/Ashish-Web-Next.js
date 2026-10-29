'use client';

import React from 'react';
import { servicesData } from '@/data/services';
import SectionHeading from '../ui/SectionHeading';
import ServiceCard from '../ui/ServiceCard';
import Reveal from '../ui/Reveal';

export default function Services() {
  const { eyebrow, heading, subtitle, services } = servicesData;

  return (
    <section id="services" className="py-20 md:py-28 bg-gradient-to-br from-[#eaf1fb] via-[#f3f7fd] to-[#e8f0fa] border-t border-[#cbd9ed]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            heading={heading}
            subtitle={subtitle}
          />
        </Reveal>

        {/* 2-column desktop grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {services.map((service, idx) => (
            <Reveal key={service.id} delay={0.08 * idx} className="h-full">
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
