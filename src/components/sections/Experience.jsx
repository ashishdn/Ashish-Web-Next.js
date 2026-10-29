'use client';

import React from 'react';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { experienceData } from '@/data/experience';
import SectionHeading from '../ui/SectionHeading';
import Badge from '../ui/Badge';
import Reveal from '../ui/Reveal';

export default function Experience() {
  const { eyebrow, heading, subtitle, experience } = experienceData;

  return (
    <section className="py-20 md:py-28 bg-[var(--bg-secondary)] border-t border-[var(--border-default)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            heading={heading}
            subtitle={subtitle}
          />
        </Reveal>

        {/* Large Professional Experience Card */}
        <Reveal delay={0.15}>
          <div className="card-base p-7 sm:p-10 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl shadow-2xs hover:border-[var(--border-accent)]">
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]/80">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-[var(--text-primary)]">
                  {experience.role}
                </h3>
                <div className="flex flex-wrap items-center gap-3 mt-1 text-sm">
                  <span className="font-bold text-[var(--text-primary)]">
                    {experience.company}
                  </span>
                  <span className="text-[var(--text-secondary)]">â€¢</span>
                  <div className="flex items-center gap-1 text-[var(--text-secondary)]">
                    <MapPin className="w-3.5 h-3.5 text-[var(--text-accent)]" />
                    <span>{experience.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] font-mono text-xs text-[var(--text-secondary)]">
                  <Calendar className="w-3.5 h-3.5 text-[var(--text-accent)]" />
                  <span>{experience.period}</span>
                </div>
                <Badge variant="default" size="sm" className="font-mono">
                  {experience.type}
                </Badge>
              </div>
            </div>

            {/* Description */}
            <p className="py-5 text-sm sm:text-[15px] text-[var(--text-secondary)] leading-relaxed">
              {experience.description}
            </p>

            {/* KEY OUTCOMES & IMPACT */}
            <div className="pt-2 pb-6">
              <span className="block font-mono text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase mb-4">
                {experience.outcomesLabel}
              </span>

              {/* 2x2 Outcome Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {experience.outcomes.map((outcome, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[var(--bg-tertiary)] border border-[var(--border-subtle)]/80 flex items-start gap-3 hover:bg-[var(--bg-card-hover)] transition-colors"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[var(--text-accent)] shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-[13px] text-[var(--text-secondary)] leading-relaxed">
                      {outcome}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Technologies row */}
            <div className="pt-5 border-t border-[var(--border-subtle)] flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-semibold text-[var(--text-muted)] mr-2">
                Technologies:
              </span>
              {experience.technologies.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs px-3 py-1 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
