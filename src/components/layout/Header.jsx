'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Send, Menu } from 'lucide-react';
import { siteConfig } from '@/data/site';
import Button from '../ui/Button';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = siteConfig.navigation.map((n) => n.href.replace('#', ''));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border-subtle)] shadow-xs'
            : 'bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-[var(--border-subtle)]/70'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/#home" className="flex items-center gap-2 group">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-primary)] transition-transform duration-200 ease-out group-hover:scale-110" />
            <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-[var(--text-primary)]">
              {siteConfig.brand}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {siteConfig.navigation.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={item.label}
                  href={`/${item.href}`}
                  className={`relative px-3 py-2 text-xs xl:text-[13px] font-mono transition-colors duration-200 ${
                    isActive
                      ? 'text-[var(--accent-secondary)] font-bold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[var(--accent-secondary)] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Button
                href="/#contact"
                variant="primary"
                size="md"
                icon={Send}
                iconPosition="right"
                className="font-mono text-xs"
              >
                Get in Touch
              </Button>
            </div>

            {/* Hamburger Button for mobile */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-colors border border-[var(--border-subtle)]"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navigation={siteConfig.navigation}
        activeSection={activeSection}
      />
    </>
  );
}
