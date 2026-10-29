import React from 'react';
import { cn } from '@/lib/utils';

export default function SectionHeading({
  eyebrow,
  heading,
  highlight,
  subtitle,
  align = 'center',
  className = '',
}) {
  const isCenter = align === 'center';

  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        isCenter ? 'text-center mx-auto' : 'text-left',
        className
      )}
    >
      {eyebrow && (
        <div className={cn('inline-flex items-center mb-3.5', isCenter && 'justify-center')}>
          <span className="font-mono text-[11px] md:text-xs font-semibold tracking-wider uppercase px-3.5 py-1 rounded-full bg-[#eef5ff] text-[#2864f0] border border-[#dbe5f2]">
            {eyebrow}
          </span>
        </div>
      )}

      {heading && (
        <h2 className="text-3xl sm:text-4xl md:text-[46px] font-extrabold font-display text-[#090909] tracking-tight leading-[1.12] mb-4">
          {heading}{' '}
          {highlight && <span className="text-[#2864f0]">{highlight}</span>}
        </h2>
      )}

      {subtitle && (
        <p className="text-[#3d587c] text-sm sm:text-base md:text-[17px] leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
