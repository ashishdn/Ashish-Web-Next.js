import Link from 'next/link';
import { Home } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70svh] flex items-center justify-center py-12 sm:py-20 px-4 sm:px-6 bg-[var(--bg-secondary)]">
      <div className="card-base w-full max-w-lg p-6 sm:p-10 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl text-center shadow-2xs">
        <span className="font-mono text-xs font-bold tracking-wider uppercase text-[var(--text-accent)] mb-3 block">
          404 | PAGE NOT FOUND
        </span>
        <h1 className="mx-auto mb-4 max-w-full text-[clamp(1.875rem,8vw,2.5rem)] leading-[1.08] font-extrabold font-display text-[var(--text-primary)] [text-wrap:balance] [overflow-wrap:anywhere]">
          Lost in cyberspace?
        </h1>
        <p className="mx-auto mb-8 max-w-sm text-sm text-[var(--text-muted)] leading-relaxed">
          The page you are looking for does not exist or has been moved to a new URL.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <Button href="/" variant="primary" size="md" icon={Home} className="w-full sm:w-auto">
            Return Home
          </Button>
          <Button href="/projects" variant="secondary" size="md" className="w-full sm:w-auto">
            View Projects
          </Button>
        </div>
      </div>
    </div>
  );
}
