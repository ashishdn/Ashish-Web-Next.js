'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Globe, Layers, Filter } from 'lucide-react';
import { projectsData } from '@/data/projects';
import SectionHeading from '@/components/ui/SectionHeading';
import ProjectCard from '@/components/ui/ProjectCard';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    ...Array.from(new Set(projectsData.projects.map((p) => p.category))),
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? projectsData.projects
      : projectsData.projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="py-16 md:py-24 bg-gradient-to-b from-[#edf3fb] via-[#f4f7fc] to-[#eaf0f8]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#3d587c] hover:text-[#2864f0] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Main Portfolio</span>
          </Link>
        </div>

        {/* Page Heading */}
        <SectionHeading
          eyebrow="PORTFOLIO ARCHIVE"
          heading="All Production Projects"
          subtitle="Explore in-depth case studies across commercial real estate, corporate compliance, automotive marketplaces, and specialized web engineering."
        />

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0e172e] text-white border border-[#0e172e] shadow-xs'
                  : 'bg-white text-[#3d587c] border border-[#dbe5f2] hover:border-[#cbd9ed] hover:bg-[#f8fafc]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mb-20">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Bottom Contact Callout */}
        <div className="card-base p-8 sm:p-12 bg-white border border-[#dbe5f2] rounded-3xl text-center max-w-2xl mx-auto shadow-2xs">
          <Badge variant="accent" size="sm" className="mb-3">
            HAVE A SIMILAR PROJECT?
          </Badge>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#090909] mb-3">
            Let's discuss your next web build.
          </h3>
          <p className="text-sm text-[#788cae] leading-relaxed mb-6">
            Get a tailored architecture roadmap, timeline estimate, and pricing within 24 hours.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button href="/#contact" variant="primary" size="md">
              Start Project Discussion
            </Button>
            <Button
              href="https://wa.me/8801316692616"
              variant="whatsapp"
              size="md"
            >
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
