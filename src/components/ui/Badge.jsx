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
      'bg-[#f5f7fa] text-[#3d587c] border border-[#dbe5f2] font-mono',
    accent:
      'bg-[#eef5ff] text-[#2864f0] border border-[#dbe5f2] font-mono font-medium',
    success:
      'bg-[#eafff4] text-[#009c71] border border-[#a6f2cf] font-mono font-medium',
    navy:
      'bg-[#0e172e] text-white border border-[#0e172e] font-sans font-medium',
    outline:
      'bg-white text-[#3d587c] border border-[#dbe5f2] font-sans font-medium',
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
              ? 'bg-[#009c71] animate-pulse'
              : variant === 'accent'
              ? 'bg-[#2864f0]'
              : 'bg-slate-400'
          )}
        />
      )}
      {children}
    </span>
  );
}
