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
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white border-l border-[#dbe5f2] p-6 shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-200">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-[#dbe5f2] mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2864f0]" />
              <span className="font-display font-extrabold text-base tracking-tight text-[#090909]">
                ASHISHWEB
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
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
                  className={`px-4 py-2.5 rounded-xl font-mono text-sm transition-all duration-150 flex items-center justify-between ${
                    isActive
                      ? 'bg-[#eef5ff] text-[#2864f0] font-semibold border border-[#dbe5f2]'
                      : 'text-[#3d587c] hover:bg-slate-50 hover:text-[#090909]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2864f0]" />
                  )}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Bottom CTA */}
        <div className="pt-6 border-t border-[#dbe5f2]">
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

          <p className="mt-4 text-center font-mono text-[11px] text-[#788cae]">
            Available for New Projects
          </p>
        </div>
      </div>
    </div>
  );
}
