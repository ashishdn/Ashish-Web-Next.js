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
          <span className="font-mono text-[11px] md:text-xs font-semibold tracking-wider uppercase px-3.5 py-1 rounded-full bg-[var(--accent-primary-soft)] text-[var(--text-accent)] border border-[var(--border-subtle)]">
            {eyebrow}
          </span>
        </div>
      )}

      {heading && (
        <h2 className="text-3xl sm:text-4xl md:text-[46px] font-extrabold font-display text-[var(--text-primary)] tracking-tight leading-[1.12] mb-4">
          {heading}{' '}
          {highlight && <span className="text-[var(--text-accent)]">{highlight}</span>}
        </h2>
      )}

      {subtitle && (
        <p className="text-[var(--text-secondary)] text-sm sm:text-base md:text-[17px] leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
