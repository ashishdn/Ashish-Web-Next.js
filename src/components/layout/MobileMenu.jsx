'use client';

import React from 'react';
import Link from 'next/link';
import { X, Send } from 'lucide-react';
import Button from '../ui/Button';

export default function MobileMenu({
  isOpen,
  onClose,
  navigation,
  activeSection,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[var(--bg-primary)]/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-[var(--bg-card)] border-l border-[var(--border-subtle)] p-6 shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-200">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-[var(--border-subtle)] mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-primary)]" />
              <span className="font-display font-extrabold text-base tracking-tight text-[var(--text-primary)]">
                ASHISHWEB
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col space-y-2">
            {navigation.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className={`px-4 py-2.5 rounded-xl font-mono text-sm transition-all duration-200 ease-out flex items-center justify-between ${
                    isActive
                      ? 'bg-[var(--accent-secondary-soft)] text-[var(--accent-secondary)] font-semibold border border-[var(--border-teal)]'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)]" />
                  )}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Bottom CTA */}
        <div className="pt-6 border-t border-[var(--border-subtle)]">
          <Button
            href="#contact"
            variant="primary"
            size="md"
            icon={Send}
            iconPosition="right"
            className="w-full"
            onClick={onClose}
          >
            Get in Touch
          </Button>

          <p className="mt-4 text-center font-mono text-[11px] text-[var(--text-muted)]">
            Available for New Projects
          </p>
        </div>
      </div>
    </div>
  );
}
