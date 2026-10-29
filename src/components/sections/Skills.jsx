'use client';

import React from 'react';
import { skillsData } from '@/data/skills';
import SectionHeading from '../ui/SectionHeading';
import SkillPanel from '../ui/SkillCard';
import Reveal from '../ui/Reveal';

export default function Skills() {
  const { eyebrow, heading, subtitle, categories } = skillsData;

  return (
    <section id="skills" className="py-20 md:py-28 border-t border-[#cbd9ed] bg-gradient-to-b from-[#f2f6fc] via-[#edf3fc] to-[#f0f5fc] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none grid-background-soft opacity-60" />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            heading={heading}
            subtitle={subtitle}
          />
        </Reveal>

        {/* 2-column large panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {categories.map((category, idx) => (
            <Reveal key={category.id} delay={0.15 * idx} className="h-full">
              <SkillPanel category={category} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
