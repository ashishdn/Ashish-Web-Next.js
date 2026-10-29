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
    <footer className="bg-[var(--bg-primary)] text-[var(--text-primary)] border-t border-[var(--border-subtle)] pt-16 pb-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Top 2-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 pb-12 border-b border-[var(--border-subtle)]">
          {/* Left Side */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-primary)] shadow-[0_0_12px_rgba(113,91,255,0.2)]" />
              <span className="font-display font-extrabold text-xl tracking-tight text-white">
                {siteConfig.brand}
              </span>
            </div>

            <p className="text-sm font-semibold text-[var(--text-accent)] font-sans">
              {siteConfig.tagline}
            </p>

            <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-md">
              {siteConfig.footerDescription}
            </p>
          </div>

          {/* Right Side */}
          <div className="md:text-right space-y-4">
            <span className="block font-mono text-xs font-semibold tracking-wider text-[var(--text-secondary)] uppercase">
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
                    className="w-10 h-10 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-accent)] hover:bg-[var(--bg-card-hover)] transition-all duration-200"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            <p className="text-xs font-mono text-[var(--text-muted)]">
              Email:{' '}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-[var(--text-secondary)] hover:text-[var(--accent-secondary)] underline transition-colors"
              >
                {siteConfig.email}
              </a>
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-[var(--text-muted)] text-center sm:text-left">
            {siteConfig.copyright}
          </p>

          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[var(--text-muted)] hover:text-[var(--accent-secondary)] transition-colors"
            aria-label="Scroll back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-200 ease-out" />
          </button>
        </div>
      </div>
    </footer>
  );
}
