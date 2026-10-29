import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  icon: Icon,
  iconPosition = 'left',
  target,
  rel,
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-all duration-[240ms] ease-out active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed';

  const sizeClasses = {
    sm: 'text-xs px-3.5 py-1.5 rounded-full gap-1.5',
    md: 'text-xs sm:text-[13px] px-4 sm:px-5 py-2.5 rounded-full gap-2',
    lg: 'text-sm sm:text-base px-6 py-3 rounded-full gap-2.5',
  };

  const variantClasses = {
    primary:
      'bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary-hover)] hover:text-[var(--bg-primary)] border border-[var(--accent-primary)] shadow-sm hover:shadow',
    secondary:
      'bg-transparent text-[var(--text-primary)] border border-[var(--border-default)] hover:border-[var(--border-accent)] hover:bg-[var(--bg-card-hover)] shadow-2xs',
    whatsapp:
      'bg-[var(--accent-secondary-soft)] text-[var(--accent-secondary)] border border-[var(--border-teal)] hover:bg-[var(--accent-secondary-soft)] hover:border-[var(--accent-secondary)] shadow-2xs',
    accent:
      'bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary-hover)] hover:text-[var(--bg-primary)] border border-[var(--border-accent)] shadow-sm hover:shadow',
    ghost:
      'bg-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]',
  };

  const combinedClasses = cn(
    baseClasses,
    sizeClasses[size] || sizeClasses.md,
    variantClasses[variant] || variantClasses.primary,
    className
  );

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0 transition-transform duration-200 ease-out group-hover:-translate-x-0.5" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />}
    </>
  );

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
    if (isExternal) {
      return (
        <a
          href={href}
          target={target || (href.startsWith('http') ? '_blank' : undefined)}
          rel={rel || (href.startsWith('http') ? 'noopener noreferrer' : undefined)}
          className={combinedClasses}
          {...props}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={combinedClasses} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClasses} {...props}>
      {content}
    </button>
  );
}
