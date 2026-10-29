'use client';

import React from 'react';
import { whyMeData } from '@/data/experience';
import SectionHeading from '../ui/SectionHeading';
import FeatureCard from '../ui/FeatureCard';
import Reveal from '../ui/Reveal';

export default function WhyMe() {
  const { eyebrow, heading, subtitle, cards } = whyMeData;

  return (
    <section id="why-me" className="py-20 md:py-28 border-t border-[var(--border-default)] bg-gradient-to-b from-[var(--bg-secondary)] via-[var(--bg-primary)] to-[var(--bg-secondary)] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none grid-background-soft opacity-60" />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            heading={heading}
            subtitle={subtitle}
          />
        </Reveal>

        {/* 3-column desktop grid of 6 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {cards.map((card, idx) => (
            <Reveal key={card.id} delay={0.08 * idx} className="h-full">
              <FeatureCard card={card} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
