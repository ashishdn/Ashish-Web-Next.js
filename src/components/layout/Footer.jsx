'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp, Linkedin, Github, Instagram, Facebook, Mail } from 'lucide-react';
import { siteConfig } from '@/data/site';

const socialIconMap = {
  linkedin: Linkedin,
  github: Github,
  instagram: Instagram,
  facebook: Facebook,
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-[#0a1122] text-slate-200 border-t border-[#1a2744] pt-16 pb-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Top 2-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 pb-12 border-b border-[#1e2c48]">
          {/* Left Side */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6] shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
              <span className="font-display font-extrabold text-xl tracking-tight text-white">
                {siteConfig.brand}
              </span>
            </div>

            <p className="text-sm font-semibold text-[#60a5fa] font-sans">
              {siteConfig.tagline}
            </p>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              {siteConfig.footerDescription}
            </p>
          </div>

          {/* Right Side */}
          <div className="md:text-right space-y-4">
            <span className="block font-mono text-xs font-semibold tracking-wider text-slate-300 uppercase">
              CONNECT & SOCIAL
            </span>

            {/* Social Buttons */}
            <div className="flex items-center md:justify-end gap-2.5">
              {siteConfig.socials.map((social) => {
                const IconComponent = socialIconMap[social.icon] || Mail;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-[#131d36] border border-[#223359] flex items-center justify-center text-slate-300 hover:text-white hover:border-[#3b82f6] hover:bg-[#1e2f56] transition-all duration-200"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            <p className="text-xs font-mono text-slate-400">
              Email:{' '}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-slate-300 hover:text-[#60a5fa] underline transition-colors"
              >
                {siteConfig.email}
              </a>
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-slate-500 text-center sm:text-left">
            {siteConfig.copyright}
          </p>

          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-1.5 font-mono text-xs font-medium text-slate-400 hover:text-[#60a5fa] transition-colors"
            aria-label="Scroll back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
