import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowUpRight,
  Globe,
  Calendar,
  Clock,
  User,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { getProjectBySlug, getProjects } from '@/lib/mongodb';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project) {
    return { title: 'Project Not Found â€” ASHISHWEB' };
  }

  return {
    title: project.seoTitle || project.title,
    description: project.seoDescription || project.description,
  };
}

export default async function ProjectDetailPage({ params }) {
  const resolvedParams = await params;
  const projects = await getProjects({ publishedOnly: true });
  const project = projects.find((item) => item.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  // Find next project
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject =
    projects[(currentIndex + 1) % projects.length];

  return (
    <article className="py-12 md:py-20 bg-gradient-to-b from-[var(--bg-secondary)] via-[var(--bg-primary)] to-[var(--bg-secondary)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/#home" className="hover:text-[var(--text-accent)] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link href="/projects" className="hover:text-[var(--text-accent)] transition-colors">
            Projects
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-[var(--text-primary)] font-medium truncate max-w-xs">
            {project.title}
          </span>
        </nav>

        {/* Header Hero Area */}
        <div className="card-base p-7 sm:p-12 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl shadow-2xs mb-10">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <Badge variant="accent" size="md">
                {project.category}
              </Badge>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)]">
                <Globe className="w-3.5 h-3.5 text-[var(--text-accent)]" />
                <span>{project.demoDomain}</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-[var(--text-primary)] tracking-tight leading-[1.12] mb-5">
              {project.title}
            </h1>

            <p className="text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed mb-8">
              {project.description}
            </p>

            {/* Project Metadata Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[var(--border-subtle)]">
              <div>
                <span className="block font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1">
                  CLIENT
                </span>
                <span className="font-semibold text-xs sm:text-sm text-[var(--text-primary)]">
                  {project.client}
                </span>
              </div>

              <div>
                <span className="block font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1">
                  TIMELINE
                </span>
                <span className="font-semibold text-xs sm:text-sm text-[var(--text-primary)]">
                  {project.duration}
                </span>
              </div>

              <div>
                <span className="block font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1">
                  YEAR
                </span>
                <span className="font-semibold text-xs sm:text-sm text-[var(--text-primary)]">
                  {project.year}
                </span>
              </div>

              <div>
                <span className="block font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1">
                  ROLE
                </span>
                <span className="font-semibold text-xs sm:text-sm text-[var(--text-primary)]">
                  {project.role}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Impact Metrics */}
        {project.metrics?.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="card-base p-5 sm:p-6 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl shadow-2xs text-center"
              >
                <span className="block font-display font-extrabold text-2xl sm:text-3xl text-[var(--text-accent)] mb-1">
                  {metric.value}
                </span>
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Case Study Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Main Case Study Body (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview */}
            <div className="card-base p-7 sm:p-9 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl shadow-2xs">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)] mb-4">
                Executive Overview
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {project.caseStudy.summary}
              </p>
            </div>

            {/* The Challenge */}
            <div className="card-base p-7 sm:p-9 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl shadow-2xs">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)] mb-4">
                The Engineering Challenge
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {project.caseStudy.challenge}
              </p>
            </div>

            {/* The Solution */}
            <div className="card-base p-7 sm:p-9 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl shadow-2xs">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)] mb-4">
                Architectural Solution
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {project.caseStudy.solution}
              </p>
            </div>

            {/* Key Features & Deliverables */}
            <div className="card-base p-7 sm:p-9 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl shadow-2xs">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)] mb-4">
                Key Features Delivered
              </h2>
              <ul className="space-y-3">
                {project.caseStudy.features.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-[var(--text-secondary)] leading-relaxed"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[var(--text-accent)] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar Tech & Actions (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Tech Stack */}
            <div className="card-base p-6 sm:p-7 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl shadow-2xs">
              <h3 className="font-mono text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase mb-4">
                TECHNOLOGY STACK
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-3 py-1.5 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Live website link */}
            <div className="card-base p-6 sm:p-7 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl shadow-2xs">
              <h3 className="font-mono text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase mb-4">
                LIVE WEBSITE
              </h3>
              {project.siteUrl ? (
                <>
                  <div className="rounded-xl p-4 bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] mb-4 text-center">
                    <span className="block font-mono text-xs text-[var(--text-accent)] font-semibold break-all">
                      {project.demoDomain || project.siteUrl.replace(/^https?:\/\//i, '').split('/')[0]}
                    </span>
                  </div>
                  <Button href={project.siteUrl} target="_blank" rel="noopener noreferrer" variant="primary" size="md" className="w-full text-xs">
                    Visit Website
                  </Button>
                </>
              ) : (
                <p className="text-sm text-[var(--text-muted)]">Live website link is not available yet.</p>
              )}
            </div>

            {/* Next Project card */}
            <div className="card-base p-6 sm:p-7 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl shadow-2xs">
              <span className="block font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-2">
                NEXT CASE STUDY
              </span>
              <h4 className="font-display font-bold text-base text-[var(--text-primary)] mb-3 line-clamp-2">
                {nextProject.title}
              </h4>
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-accent)]"
              >
                <span>Read Case Study</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center pt-8 border-t border-[var(--border-subtle)]">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[var(--text-secondary)] hover:text-[var(--text-accent)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>View All Projects in Archive</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
