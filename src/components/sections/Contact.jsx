'use client';

import React, { useState } from 'react';
import {
  Mail,
  MessageCircle,
  Globe,
  Copy,
  Check,
  Send,
  Calendar,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { siteConfig } from '@/data/site';
import SectionHeading from '../ui/SectionHeading';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-gradient-to-b from-[#eaf1fb] via-[#f1f6fd] to-[#e4eefb] border-t border-[#cbd9ed]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <Reveal>
          <SectionHeading
            eyebrow="GET IN TOUCH"
            heading="Let's Build Together"
            subtitle="Ready to elevate your digital presence? Reach out directly through any of the channels below for a prompt discussion and clear timeline estimate."
          />
        </Reveal>

        {/* 3 Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10 items-stretch">
          {/* Card 1 — Direct Email */}
          <Reveal delay={0.1} className="h-full">
            <div className="card-base p-6 sm:p-8 bg-white border border-[#dbe5f2] rounded-3xl h-full flex flex-col justify-between shadow-2xs hover:border-[#cbd9ed]">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-[#eef5ff] border border-[#dbe5f2] flex items-center justify-center text-[#2864f0]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f8fafc] border border-[#dbe5f2] text-xs font-mono text-[#3d587c] hover:bg-[#eef5ff] hover:text-[#2864f0] transition-colors cursor-pointer"
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <span className="block font-mono text-[10px] font-semibold text-[#788cae] uppercase tracking-wider mb-1">
                  DIRECT EMAIL INQUIRIES
                </span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-sans font-bold text-base sm:text-lg text-[#090909] hover:text-[#2864f0] transition-colors break-all block mb-1"
                >
                  {siteConfig.email}
                </a>
                <p className="text-xs text-[#788cae] mb-6">
                  Secondary: {siteConfig.secondaryEmail}
                </p>
              </div>

              <div>
                <div className="border-t border-[#dbe5f2] pt-4 flex items-center justify-between text-xs font-mono">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="group inline-flex items-center gap-1.5 font-semibold text-[#0e172e] hover:text-[#2864f0] transition-colors"
                  >
                    <span>Compose Email</span>
                    <Send className="w-3.5 h-3.5 text-[#2864f0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                  <span className="text-[#788cae]">Average reply: &lt; 2 hrs</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Card 2 — WhatsApp & Direct Call */}
          <Reveal delay={0.2} className="h-full">
            <div className="card-base p-6 sm:p-8 bg-white border border-[#dbe5f2] rounded-3xl h-full flex flex-col justify-between shadow-2xs hover:border-[#cbd9ed]">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-[#eef5ff] border border-[#dbe5f2] flex items-center justify-center text-[#2864f0]">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <Badge variant="success" size="sm" dot>
                    Available Now
                  </Badge>
                </div>

                <span className="block font-mono text-[10px] font-semibold text-[#788cae] uppercase tracking-wider mb-1">
                  WHATSAPP & DIRECT CALL
                </span>
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans font-bold text-base sm:text-lg text-[#090909] hover:text-[#009c71] transition-colors block mb-2"
                >
                  {siteConfig.phone}
                </a>
                <p className="text-xs text-[#788cae] leading-relaxed mb-6">
                  Direct mobile messaging for quick discussions, scope reviews, and urgent queries.
                </p>
              </div>

              <div>
                <div className="border-t border-[#dbe5f2] pt-4 flex items-center justify-between text-xs font-mono">
                  <a
                    href={siteConfig.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 font-semibold text-[#0e172e] hover:text-[#009c71] transition-colors"
                  >
                    <span>Open WhatsApp Chat</span>
                    <Send className="w-3.5 h-3.5 text-[#009c71] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                  <span className="text-[#788cae]">Instant Messaging</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Card 3 — Base & Timezones */}
          <Reveal delay={0.3} className="h-full">
            <div className="card-base p-6 sm:p-8 bg-white border border-[#dbe5f2] rounded-3xl h-full flex flex-col justify-between shadow-2xs hover:border-[#cbd9ed]">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-[#eef5ff] border border-[#dbe5f2] flex items-center justify-center text-[#2864f0]">
                    <Globe className="w-5 h-5" />
                  </div>
                  <Badge variant="default" size="sm">
                    Remote Global
                  </Badge>
                </div>

                <span className="block font-mono text-[10px] font-semibold text-[#788cae] uppercase tracking-wider mb-1">
                  BASE & CLIENT TIMEZONES
                </span>
                <h4 className="font-sans font-bold text-base sm:text-lg text-[#090909] mb-2">
                  {siteConfig.location}
                </h4>
                <p className="text-xs text-[#788cae] leading-relaxed mb-6">
                  Seamless collaboration with clients across US (EST/PST), UK/GMT, Europe, and Australia.
                </p>
              </div>

              <div>
                <div className="border-t border-[#dbe5f2] pt-4 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#3d587c] font-medium">Flexible Scheduling</span>
                  <span className="text-[#788cae]">Every Day</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Wide Bottom CTA Card (Matching Screenshot 1 & 2) */}
        <Reveal delay={0.4}>
          <div className="card-base p-7 sm:p-10 bg-white border border-[#dbe5f2] rounded-3xl shadow-2xs flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center lg:text-left max-w-xl">
              <span className="font-mono text-xs font-bold tracking-wider uppercase text-[#2864f0]">
                READY TO START?
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#090909] tracking-tight leading-snug">
                Let's turn your ideas into a high-performing reality.
              </h3>
              <p className="text-sm text-[#788cae] leading-relaxed">
                Whether starting from scratch or redesigning an existing site, I deliver results you'll be proud of.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3.5 shrink-0">
              <Button
                href={`mailto:${siteConfig.email}`}
                variant="primary"
                size="md"
                icon={Mail}
              >
                Send An Email
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
