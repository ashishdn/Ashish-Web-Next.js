import React from 'react';
import { cn } from '@/lib/utils';

export default function GridBackground({ children, className = '', id }) {
  return (
    <section id={id} className={cn('grid-background relative py-20 md:py-28', className)}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {children}
      </div>
    </section>
  );
}
