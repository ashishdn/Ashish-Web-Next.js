import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Globe, CheckCircle2 } from 'lucide-react';
import Badge from './Badge';

export default function ProjectCard({ project }) {
  return (
    <div className="card-base group flex flex-col justify-between h-full bg-white border border-[#dbe5f2] rounded-3xl overflow-hidden shadow-2xs hover:border-[#cbd9ed]">
      {/* Category header */}
      <div className="p-5 pb-3">
        <Badge
          variant="default"
          size="sm"
          className="font-mono text-[10px] sm:text-[11px] truncate max-w-full"
        >
          {project.category}
        </Badge>
      </div>

      {/* Browser mockup window */}
      <div className="px-5">
        <div className="rounded-2xl border border-[#dbe5f2] bg-[#f8fafc] overflow-hidden shadow-xs transition-all duration-300 group-hover:border-[#2864f0]/40">
          {/* Browser Top bar */}
          <div className="px-3.5 py-2.5 bg-white border-b border-[#dbe5f2] flex items-center justify-between gap-2">
            {/* 3 colored window dots */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>

            {/* Small demo domain */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#f1f5fa] border border-[#dbe5f2] text-[10px] font-mono text-[#3d587c] truncate max-w-[200px]">
              <Globe className="w-3 h-3 text-[#2864f0] shrink-0" />
              <span className="truncate">{project.demoDomain}</span>
            </div>

            <div className="w-8 shrink-0 text-right">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>

          {/* Browser Preview Content Area */}
          <div className="p-4 sm:p-5 aspect-[16/10] bg-gradient-to-br from-[#ffffff] via-[#f8fafc] to-[#eef5ff] flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.01] transition-transform duration-300">
            {/* Ambient decorative glow */}
            <div
              className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none"
              style={{ backgroundColor: project.accentColor || '#2864f0' }}
            />

            {/* Mini Wireframe UI Header */}
            <div className="space-y-2 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#0e172e] bg-white px-2 py-0.5 rounded border border-[#dbe5f2]">
                  {project.client}
                </span>
                <span className="text-[10px] font-mono text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {project.metrics?.[0]?.value || '98/100'} Speed
                </span>
              </div>

              <div className="pt-2">
                <p className="text-[13px] font-bold font-display text-[#090909] leading-snug line-clamp-2">
                  {project.title}
                </p>
                <p className="text-[11px] text-[#788cae] line-clamp-2 mt-1 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Mini metrics bar */}
            <div className="relative z-10 pt-3 border-t border-[#dbe5f2]/80 grid grid-cols-2 gap-2 bg-white/70 backdrop-blur-xs p-2 rounded-xl border">
              <div>
                <span className="block text-[9px] font-mono text-[#788cae]">LOAD TIME</span>
                <span className="text-[11px] font-bold font-mono text-[#090909]">
                  {project.metrics?.[1]?.value || '< 0.8s'}
                </span>
              </div>
              <div>
                <span className="block text-[9px] font-mono text-[#788cae]">CONVERSION</span>
                <span className="text-[11px] font-bold font-mono text-emerald-600">
                  {project.metrics?.[2]?.value || '+140%'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Info & Footer */}
      <div className="p-5 pt-4 flex flex-col justify-between grow">
        <div>
          <h4 className="font-display font-bold text-base sm:text-lg text-[#090909] mb-3 group-hover:text-[#2864f0] transition-colors line-clamp-2">
            {project.title}
          </h4>

          {/* Technology tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#f8fafc] text-[#3d587c] border border-[#dbe5f2]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* View Case Study CTA */}
        <div className="pt-3 border-t border-[#dbe5f2] flex items-center justify-between">
          <Link
            href={`/projects/${project.slug}`}
            className="group/link inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#0e172e] group-hover:text-[#2864f0] transition-colors"
          >
            <span>View Case Study</span>
            <ArrowUpRight className="w-4 h-4 text-[#2864f0] transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
          <span className="text-[11px] font-mono text-[#788cae]">
            {project.year || '2024'}
          </span>
        </div>
      </div>
    </div>
  );
}
