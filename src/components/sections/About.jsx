'use client';

import React from 'react';
import { MapPin, Globe, Compass, CheckCircle2 } from 'lucide-react';
import { aboutData } from '@/data/experience';
import SectionHeading from '../ui/SectionHeading';
import Badge from '../ui/Badge';
import FeatureCard from '../ui/FeatureCard';
import Reveal from '../ui/Reveal';

export default function About() {
  const { eyebrow, heading, subtitle, philosophy, profile, features } = aboutData;

  return (
    <section id="about" className="py-20 md:py-28 bg-[#edf2f8] border-t border-[#cbd9ed]/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            heading={heading}
            subtitle={subtitle}
          />
        </Reveal>

        {/* 2-column Philosophy & Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-14">
          {/* Left Philosophy Card (7 cols) */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1} className="h-full">
              <div className="card-base p-7 sm:p-9 bg-white border border-[#dbe5f2] rounded-3xl h-full flex flex-col justify-between shadow-2xs">
                <div>
                  <Badge variant="accent" size="sm" className="mb-4">
                    {philosophy.badge}
                  </Badge>

                  <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#090909] leading-tight mb-5">
                    {philosophy.heading}
                  </h3>

                  <div className="space-y-4 text-sm sm:text-[15px] text-[#3d587c] leading-relaxed">
                    <p>{philosophy.paragraph1}</p>
                    <p>{philosophy.paragraph2}</p>
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-[#dbe5f2]">
                  <div className="flex flex-wrap gap-2">
                    {philosophy.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs px-3 py-1 rounded-full bg-[#f8fafc] text-[#3d587c] border border-[#dbe5f2]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Profile & Global Strip (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <Reveal delay={0.2} className="grow">
              <div className="card-base p-6 sm:p-8 bg-white border border-[#dbe5f2] rounded-3xl shadow-2xs h-full flex flex-col justify-between">
                <div>
                  {/* Avatar and Name */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-[#0e172e] text-white flex items-center justify-center font-display font-extrabold text-xl shadow-xs">
                        {profile.avatarText}
                      </div>
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#009c71] border-2 border-white animate-pulse" />
                    </div>

                    <div>
                      <h4 className="font-display font-bold text-lg sm:text-xl text-[#090909]">
                        {profile.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#3d587c]">
                        {profile.role}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-[#788cae] mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#2864f0]" />
                        <span>{profile.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Availability badge */}
                  <div className="mb-6">
                    <Badge variant="success" size="sm" dot className="text-[11px] py-1">
                      {profile.availability}
                    </Badge>
                  </div>

                  {/* 4 Inner Info Cards (2x2) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {profile.details.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-[#f8fafc] border border-[#dbe5f2]"
                      >
                        <span className="block font-mono text-[10px] font-semibold text-[#788cae] uppercase tracking-wider mb-1">
                          {item.label}
                        </span>
                        <span className="font-sans text-xs font-semibold text-[#090909] leading-snug block">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Global Client Coverage Strip */}
            <Reveal delay={0.3}>
              <div className="p-5 sm:p-6 rounded-3xl bg-[#0e172e] text-white border border-[#0e172e] shadow-xs flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#2864f0]/20 text-[#2864f0] flex items-center justify-center border border-[#2864f0]/30 shrink-0">
                    <Compass className="w-5 h-5 text-[#2864f0]" />
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] tracking-wider text-slate-400 uppercase">
                      {profile.coverage.label}
                    </span>
                    <span className="font-display font-extrabold text-lg sm:text-xl text-white tracking-wide">
                      {profile.coverage.value}
                    </span>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Active 24/7</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* 4 About Feature Cards (4-column grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <Reveal key={feat.id} delay={0.1 * idx}>
              <FeatureCard card={feat} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
