'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, LayoutGrid } from 'lucide-react';
import { projectsData } from '@/data/projects';
import SectionHeading from '../ui/SectionHeading';
import ProjectCard from '../ui/ProjectCard';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';

export default function Projects() {
  const { eyebrow, heading, subtitle, projects } = projectsData;

  return (
    <section id="projects" className="py-20 md:py-28 border-t border-[#cbd9ed] bg-gradient-to-b from-[#edf3fb] via-[#f3f7fd] to-[#ebf1f9] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none grid-background-soft opacity-60" />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            heading={heading}
            subtitle={subtitle}
          />
        </Reveal>

        {/* 3-column desktop grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mb-14">
          {projects.map((project, idx) => (
            <Reveal key={project.id} delay={0.08 * idx} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        {/* View All Projects CTA */}
        <Reveal delay={0.3}>
          <div className="text-center pt-2">
            <Button
              href="/projects"
              variant="secondary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              className="font-mono text-xs sm:text-sm px-8 py-3.5 shadow-2xs hover:border-[#2864f0]"
            >
              View All Projects
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
