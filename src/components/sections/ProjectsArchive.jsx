'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import ProjectCard from '../ui/ProjectCard';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function ProjectsArchive({ projects }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = [
    'All',
    ...Array.from(new Set(projects.map((project) => project.category))),
  ];
  const visibleProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((project) => project.category === selectedCategory);

  return (
    <div className="py-16 md:py-24 bg-gradient-to-b from-[var(--bg-secondary)] via-[var(--bg-primary)] to-[var(--bg-secondary)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="mb-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[var(--text-secondary)] hover:text-[var(--text-accent)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Main Portfolio</span>
          </Link>
        </div>

        <SectionHeading
          eyebrow="PORTFOLIO ARCHIVE"
          heading="All Production Projects"
          subtitle="Explore in-depth case studies across commercial real estate, corporate compliance, automotive marketplaces, and specialized web engineering."
        />

        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                selectedCategory === category
                  ? 'bg-[var(--accent-primary)] text-white border border-[var(--accent-primary)] shadow-xs'
                  : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:border-[var(--border-accent)] hover:bg-[var(--bg-card-hover)]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {visibleProjects.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mb-20">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="card-base p-8 mb-20 text-center text-[var(--text-secondary)]">
            No published projects yet.
          </div>
        )}

        <div className="card-base p-8 sm:p-12 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl text-center max-w-2xl mx-auto shadow-2xs">
          <Badge variant="accent" size="sm" className="mb-3">
            HAVE A SIMILAR PROJECT?
          </Badge>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[var(--text-primary)] mb-3">
            Let's discuss your next web build.
          </h3>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
            Get a tailored architecture roadmap, timeline estimate, and pricing within 24 hours.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button href="/#contact" variant="primary" size="md">
              Start Project Discussion
            </Button>
            <Button href="https://wa.me/8801316692616" variant="whatsapp" size="md">
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
