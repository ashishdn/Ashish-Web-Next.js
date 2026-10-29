import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-gradient-to-b from-[#edf3fb] to-[#eaf0f8]">
      <div className="card-base p-8 sm:p-14 bg-white border border-[#dbe5f2] rounded-3xl text-center max-w-lg shadow-2xs">
        <span className="font-mono text-xs font-bold tracking-wider uppercase text-[#2864f0] mb-3 block">
          404 — PAGE NOT FOUND
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-[#090909] mb-4">
          Lost in cyberspace?
        </h1>
        <p className="text-sm text-[#788cae] leading-relaxed mb-8">
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
