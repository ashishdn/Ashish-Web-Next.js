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
    <section id="home" className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-gradient-to-b from-[#e8f1fc] via-[#f1f6fd] to-[#ebf2fc]">
      {/* Ambient color lighting & grid aura */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(40,100,240,0.14),rgba(99,102,241,0.06)_45%,transparent_80%)]" />
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
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-[68px] font-extrabold font-display text-[#090909] tracking-tight leading-[1.08]">
                {hero.heading.pre}
                <span className="text-[#2864f0] underline decoration-[#2864f0]/30 underline-offset-8">
                  {hero.heading.highlight}
                </span>{' '}
                {hero.heading.post}
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-[#3d587c] text-base sm:text-lg md:text-[19px] leading-relaxed max-w-2xl">
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
              <div className="pt-4 border-t border-[#dbe5f2]/80 space-y-3">
                <span className="block font-mono text-[11px] font-semibold tracking-wider text-[#788cae] uppercase">
                  {hero.coreTechLabel}
                </span>
                <div className="flex flex-wrap gap-2">
                  {hero.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-3 py-1.5 rounded-full bg-white text-[#3d587c] border border-[#dbe5f2] shadow-2xs hover:border-[#2864f0]/50 hover:text-[#2864f0] transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column (~35% / 4.5 cols) — 3 Vertically Stacked Expertise Cards */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-4">
            {hero.expertiseCards.map((card, idx) => {
              const IconComp = expertiseIcons[idx] || Layers;
              return (
                <Reveal key={card.title} delay={0.2 + idx * 0.1}>
                  <div className="card-base p-5 sm:p-6 bg-white border border-[#dbe5f2] rounded-3xl shadow-2xs hover:border-[#cbd9ed]">
                    <div className="flex items-center justify-between mb-3.5">
                      <Badge variant="default" size="sm" className="font-mono text-[10px]">
                        {card.badge}
                      </Badge>
                      <div className="w-8 h-8 rounded-lg bg-[#eef5ff] border border-[#dbe5f2] flex items-center justify-center text-[#2864f0]">
                        <IconComp className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-base sm:text-[17px] font-bold font-display text-[#090909] mb-2">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#3d587c] leading-relaxed">
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
                className="card-base p-6 sm:p-7 bg-white border border-[#dbe5f2] rounded-3xl shadow-2xs text-center sm:text-left hover:border-[#cbd9ed]"
              >
                <div className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] text-[#090909] tracking-tight mb-2">
                  <span className="text-[#2864f0]">{stat.value.replace(/[0-9]/g, '')}</span>
                  <span>{stat.value.replace(/[^0-9]/g, '')}</span>
                  <span className="text-[#2864f0]">{stat.value.includes('%') ? '%' : '+'}</span>
                </div>
                <div className="font-sans font-bold text-sm sm:text-[15px] text-[#090909] mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-[#788cae] leading-snug">
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
