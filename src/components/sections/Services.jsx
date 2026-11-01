'use client';

import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { servicesData } from '@/data/services';
import SectionHeading from '../ui/SectionHeading';
import ServiceCard from '../ui/ServiceCard';
import Reveal from '../ui/Reveal';

export default function Services() {
  const { eyebrow, heading, subtitle, services } = servicesData;
  const runwayRef = useRef(null);
  const panelRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const runway = runwayRef.current;
    const panel = panelRef.current;
    const track = trackRef.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let distance = 0;

    const update = () => {
      frame = 0;
      if (preference.matches) return;
      const top = parseFloat(getComputedStyle(panel).top) || 0;
      const progress = Math.min(1, Math.max(0, (top - runway.getBoundingClientRect().top) / (distance || 1)));
      track.scrollLeft = progress * distance;
      progressRef.current.style.transform = `scaleX(${progress})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const measure = () => {
      distance = Math.max(0, track.scrollWidth - track.clientWidth);
      runway.style.height = preference.matches ? 'auto' : `${panel.offsetHeight + distance}px`;
      panel.style.position = preference.matches ? 'relative' : 'sticky';
      schedule();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(panel);
    observer.observe(track);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure);
    preference.addEventListener('change', measure);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', measure);
      preference.removeEventListener('change', measure);
    };
  }, []);

  return (
    <section id="services" className="py-16 md:py-20 bg-gradient-to-br from-[var(--bg-secondary)] via-[var(--bg-primary)] to-[var(--bg-secondary)] border-t border-[var(--border-default)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} heading={heading} subtitle={subtitle} />
        </Reveal>
        <div ref={runwayRef} className="relative">
          <div ref={panelRef} className="sticky top-24 pb-6">
            <div className="flex items-center justify-between gap-4 mb-4">
              <p id="services-scroll-hint" className="text-xs sm:text-sm text-[var(--text-muted)] motion-reduce:hidden">
                Scroll down to explore all {services.length} services
              </p>
              <p className="hidden text-xs text-[var(--text-muted)] motion-reduce:block">Swipe or scroll sideways to explore all {services.length} services</p>
              <ArrowDown aria-hidden="true" className="size-4 text-[var(--text-accent)] motion-reduce:hidden" />
            </div>
            <div ref={trackRef} id="services-track" role="region" aria-label="Specialized web services" tabIndex={0} className="flex gap-5 md:gap-6 overflow-x-auto overscroll-x-contain items-stretch pb-4 pt-1 px-1 [scrollbar-width:thin] [scrollbar-color:var(--accent-primary)_var(--bg-secondary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)]">
              {services.map((service) => (
                <div key={service.id} className="min-w-0 shrink-0 basis-[90%] md:basis-[calc((100%_-_1.5rem)/2.15)] max-h-[calc(100svh_-_13rem)] min-h-48 overflow-y-auto overscroll-y-contain rounded-3xl [scrollbar-width:thin]" tabIndex={0} role="group" aria-label={service.title}>
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
            <div aria-hidden="true" className="mt-3 h-0.5 rounded-full bg-[var(--border-subtle)] overflow-hidden motion-reduce:hidden">
              <div ref={progressRef} className="h-full w-full origin-left scale-x-0 bg-[var(--accent-primary)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
