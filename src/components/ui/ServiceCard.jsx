import React from 'react';
import Link from 'next/link';
import {
  Code,
  Layout,
  ShoppingCart,
  Figma,
  Layers,
  Sparkles,
  Zap,
  ShieldCheck,
  Send,
  CheckCircle,
} from 'lucide-react';
import Badge from './Badge';

const iconMap = {
  code: Code,
  layout: Layout,
  'shopping-cart': ShoppingCart,
  figma: Figma,
  layers: Layers,
  sparkles: Sparkles,
  zap: Zap,
  'shield-check': ShieldCheck,
};

export default function ServiceCard({ service }) {
  const IconComponent = iconMap[service.icon] || Code;

  return (
    <div className="card-base p-6 sm:p-8 flex flex-col justify-between h-full bg-white border border-[#dbe5f2] rounded-3xl shadow-2xs hover:border-[#cbd9ed]">
      <div>
        {/* Top meta row */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-8 h-8 rounded-lg bg-[#eef5ff] border border-[#dbe5f2] flex items-center justify-center text-xs font-mono font-bold text-[#2864f0]">
            {service.id}
          </div>
          <Badge
            variant={service.badge.includes('90+') ? 'success' : 'default'}
            size="sm"
            className="font-mono text-[11px]"
          >
            {service.badge}
          </Badge>
        </div>

        {/* Icon & Title */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#eef5ff] border border-[#dbe5f2] flex items-center justify-center text-[#2864f0] shrink-0">
            <IconComponent className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-[22px] font-bold font-display text-[#090909] leading-snug">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-[#3d587c] text-sm leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Divider */}
        <div className="border-t border-[#dbe5f2] my-5" />

        {/* Deliverables */}
        <div className="mb-5">
          <span className="block font-mono text-[11px] font-semibold tracking-wider text-[#788cae] uppercase mb-3">
            KEY DELIVERABLES
          </span>
          <ul className="space-y-2.5">
            {service.deliverables.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#3d587c] leading-normal"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#2864f0] mt-1.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 pt-2 mb-6">
          {service.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[#f8fafc] text-[#3d587c] border border-[#dbe5f2]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div>
        <div className="border-t border-[#dbe5f2] pt-4 flex items-center justify-between">
          <Link
            href={`#contact`}
            className="group inline-flex items-center gap-2 text-xs sm:text-[13px] font-semibold text-[#0e172e] hover:text-[#2864f0] transition-colors"
          >
            <span>{service.actionText}</span>
            <Send className="w-3.5 h-3.5 text-[#2864f0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <span className="font-mono text-[11px] text-[#788cae]">
            {service.statusText}
          </span>
        </div>
      </div>
    </div>
  );
}
