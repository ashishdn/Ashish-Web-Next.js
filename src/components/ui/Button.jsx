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
    'inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed';

  const sizeClasses = {
    sm: 'text-xs px-3.5 py-1.5 rounded-full gap-1.5',
    md: 'text-xs sm:text-[13px] px-4 sm:px-5 py-2.5 rounded-full gap-2',
    lg: 'text-sm sm:text-base px-6 py-3 rounded-full gap-2.5',
  };

  const variantClasses = {
    primary:
      'bg-[#0e172e] text-white hover:bg-[#1a294d] border border-[#0e172e] shadow-sm hover:shadow',
    secondary:
      'bg-white text-[#090909] border border-[#dbe5f2] hover:border-[#cbd9ed] hover:bg-[#f8fafc] shadow-2xs',
    whatsapp:
      'bg-[#eafff4] text-[#009c71] border border-[#a6f2cf] hover:bg-[#d8fbe7] hover:border-[#7cebb7] shadow-2xs',
    accent:
      'bg-[#2864f0] text-white hover:bg-[#1754de] border border-[#2864f0] shadow-sm hover:shadow',
    ghost:
      'bg-transparent text-[#3d587c] hover:bg-[#f1f5f9] hover:text-[#090909]',
  };

  const combinedClasses = cn(
    baseClasses,
    sizeClasses[size] || sizeClasses.md,
    variantClasses[variant] || variantClasses.primary,
    className
  );

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />}
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
