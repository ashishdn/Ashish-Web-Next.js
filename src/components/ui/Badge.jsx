import React from 'react';
import { cn } from '@/lib/utils';

export default function Badge({
  children,
  variant = 'default',
  className = '',
  size = 'md',
  dot = false,
}) {
  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-[11px] px-2.5 py-1',
    lg: 'text-xs px-3 py-1.5',
  };

  const variantClasses = {
    default:
      'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] font-mono',
    accent:
      'bg-[var(--accent-primary-soft)] text-[var(--text-accent)] border border-[var(--border-subtle)] font-mono font-medium',
    success:
      'bg-[var(--accent-secondary-soft)] text-[var(--accent-secondary)] border border-[var(--border-teal)] font-mono font-medium',
    navy:
      'bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-default)] font-sans font-medium',
    outline:
      'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-subtle)] font-sans font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium transition-colors',
        sizeClasses[size] || sizeClasses.md,
        variantClasses[variant] || variantClasses.default,
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full shrink-0',
            variant === 'success'
              ? 'bg-[var(--accent-secondary)] animate-pulse'
              : variant === 'accent'
              ? 'bg-[var(--accent-primary)]'
              : 'bg-[var(--text-muted)]'
          )}
        />
      )}
      {children}
    </span>
  );
}
