'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, MessageCircle, Send, Layers, ShoppingBag, Code2, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/data/site';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Reveal from '../ui/Reveal';

const expertiseIcons = [Layers, ShoppingBag, Code2];

export default function Hero() {
  const { hero, stats } = siteConfig;

  return (
    <section id="home" className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-gradient-to-b from-[var(--bg-secondary)] via-[var(--bg-primary)] to-[var(--bg-secondary)]">
      {/* Ambient color lighting & grid aura */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(113,91,255,0.16),rgba(41,220,199,0.08)_45%,transparent_80%)]" />
      <div className="absolute inset-0 pointer-events-none grid-background-soft opacity-60" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Main 2-column hero content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start mb-16 md:mb-20">
          {/* Left Column (~65% / 7.5 cols) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6 md:space-y-8">
            <Reveal delay={0.05}>
              <div className="inline-flex items-center gap-2">
                <Badge variant="accent" size="md" dot>
                  Available for Q2/Q3 Projects
                </Badge>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-[68px] font-extrabold font-display text-[var(--text-primary)] tracking-tight leading-[1.08]">
                {hero.heading.pre}
                <span className="text-[var(--text-accent)] underline decoration-[var(--accent-primary)]/30 underline-offset-8">
                  {hero.heading.highlight}
                </span>{' '}
                {hero.heading.post}
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-[var(--text-secondary)] text-base sm:text-lg md:text-[19px] leading-relaxed max-w-2xl">
                {hero.intro}
              </p>
            </Reveal>

            {/* Hero 3 Action Buttons */}
            <Reveal delay={0.3}>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  href={`mailto:${siteConfig.email}`}
                  variant="primary"
                  size="md"
                  icon={Mail}
                >
                  Send An Email
                </Button>

                <Button
                  href="#contact"
                  variant="secondary"
                  size="md"
                  icon={MessageCircle}
                >
                  Start Discussion
                </Button>

                <Button
                  href={siteConfig.whatsappUrl}
                  variant="whatsapp"
                  size="md"
                  icon={Send}
                >
                  WhatsApp
                </Button>
              </div>
            </Reveal>

            {/* Core Technologies & Frameworks */}
            <Reveal delay={0.4}>
              <div className="pt-4 border-t border-[var(--border-subtle)]/80 space-y-3">
                <span className="block font-mono text-[11px] font-semibold tracking-wider text-[var(--text-muted)] uppercase">
                  {hero.coreTechLabel}
                </span>
                <div className="flex flex-wrap gap-2">
                  {hero.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-3 py-1.5 rounded-full bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-subtle)] shadow-2xs hover:border-[var(--border-accent)]/50 hover:text-[var(--text-accent)] transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column (~35% / 4.5 cols) â€” 3 Vertically Stacked Expertise Cards */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-4">
            {hero.expertiseCards.map((card, idx) => {
              const IconComp = expertiseIcons[idx] || Layers;
              return (
                <Reveal key={card.title} delay={0.2 + idx * 0.1}>
                  <div className="card-base p-5 sm:p-6 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl shadow-2xs hover:border-[var(--border-accent)]">
                    <div className="flex items-center justify-between mb-3.5">
                      <Badge variant="default" size="sm" className="font-mono text-[10px]">
                        {card.badge}
                      </Badge>
                      <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary-soft)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-accent)]">
                        <IconComp className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-base sm:text-[17px] font-bold font-display text-[var(--text-primary)] mb-2">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[var(--text-secondary)] leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* 4-column Statistics Row */}
        <Reveal delay={0.5}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="card-base p-6 sm:p-7 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl shadow-2xs text-center sm:text-left hover:border-[var(--border-accent)]"
              >
                <div className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] text-[var(--text-primary)] tracking-tight mb-2">
                  <span className="text-[var(--text-accent)]">{stat.value.replace(/[0-9]/g, '')}</span>
                  <span>{stat.value.replace(/[^0-9]/g, '')}</span>
                  <span className="text-[var(--text-accent)]">{stat.value.includes('%') ? '%' : '+'}</span>
                </div>
                <div className="font-sans font-bold text-sm sm:text-[15px] text-[var(--text-primary)] mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-[var(--text-muted)] leading-snug">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
