import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-secondary)]">
      <div className="card-base p-8 sm:p-14 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl text-center max-w-lg shadow-2xs">
        <span className="font-mono text-xs font-bold tracking-wider uppercase text-[var(--text-accent)] mb-3 block">
          404 â€” PAGE NOT FOUND
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-[var(--text-primary)] mb-4">
          Lost in cyberspace?
        </h1>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-8">
          The page you are looking for does not exist or has been moved to a new URL.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button href="/" variant="primary" size="md" icon={Home}>
            Return Home
          </Button>
          <Button href="/projects" variant="secondary" size="md">
            View Projects
          </Button>
        </div>
      </div>
    </div>
  );
}
