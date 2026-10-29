import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, ShieldCheck, Code2, Globe } from 'lucide-react';
import Badge from './Badge';

export default function SkillPanel({ category }) {
  const isLeft = category.id === 'wordpress-cms';

  return (
    <div className="card-base p-6 sm:p-8 flex flex-col justify-between h-full bg-white border border-[#dbe5f2] rounded-3xl shadow-2xs">
      <div>
        {/* Header */}
        <div className="flex items-center gap-3.5 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#eef5ff] text-[#2864f0] flex items-center justify-center shrink-0 border border-[#dbe5f2]">
            {isLeft ? <Globe className="w-5 h-5" /> : <Code2 className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-[#090909]">
              {category.title}
            </h3>
          </div>
        </div>

        <p className="text-[#3d587c] text-sm leading-relaxed mb-6">
          {category.introduction}
        </p>

        {/* Skill Rows */}
        <div className="space-y-3.5">
          {category.skills.map((skill, index) => (
            <div
              key={index}
              className="p-3.5 sm:p-4 rounded-xl bg-[#f8fafc] border border-[#dbe5f2]/80 hover:border-[#cbd9ed] hover:bg-[#f1f5fa] transition-all duration-200"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#2864f0] shrink-0" />
                  <span className="font-semibold text-sm sm:text-[15px] text-[#090909]">
                    {skill.name}
                  </span>
                </div>
                <Badge
                  variant="outline"
                  size="sm"
                  className="font-mono text-[10px] text-[#2864f0] bg-white border-[#dbe5f2]"
                >
                  {skill.level}
                </Badge>
              </div>
              <p className="text-xs sm:text-[13px] text-[#788cae] pl-4.5 leading-relaxed">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-[#dbe5f2] flex items-center justify-between">
        <div className="flex items-center gap-2">
          {category.footerType === 'guarantee' ? (
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#009c71]">
              <CheckCircle2 className="w-4 h-4 text-[#009c71]" />
              <span>{category.footer}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#3d587c]">
              <ShieldCheck className="w-4 h-4 text-[#2864f0]" />
              <span>{category.footer}</span>
            </div>
          )}
        </div>
        <span className="text-[11px] font-mono text-[#788cae]">
          Verified Proficiency
        </span>
      </div>
    </div>
  );
}
