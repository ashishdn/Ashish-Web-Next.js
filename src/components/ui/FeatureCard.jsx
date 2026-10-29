import React from 'react';
import {
  Layout,
  Zap,
  Code,
  Shield,
  MessageSquare,
  Clock,
  ShieldCheck,
  MessageCircle,
  CheckCircle2,
} from 'lucide-react';

const iconMap = {
  layout: Layout,
  zap: Zap,
  code: Code,
  shield: Shield,
  'message-square': MessageSquare,
  clock: Clock,
  'shield-check': ShieldCheck,
  'message-circle': MessageCircle,
};

export default function FeatureCard({ card }) {
  const IconComponent = iconMap[card.icon] || Code;

  return (
    <div className="card-base p-6 sm:p-7 flex flex-col justify-between h-full bg-white border border-[#dbe5f2] rounded-3xl shadow-2xs hover:border-[#cbd9ed]">
      <div>
        {/* Blue icon box */}
        <div className="w-11 h-11 rounded-xl bg-[#eef5ff] border border-[#dbe5f2] flex items-center justify-center text-[#2864f0] mb-5">
          <IconComponent className="w-5 h-5" />
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-[19px] font-bold font-display text-[#090909] mb-3 leading-snug">
          {card.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#3d587c] leading-relaxed mb-6">
          {card.description}
        </p>
      </div>

      {/* Divider and guarantee standard if available */}
      {card.guarantee && (
        <div>
          <div className="border-t border-[#dbe5f2] pt-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#2864f0] shrink-0" />
            <span className="text-xs font-mono font-medium text-[#090909]">
              {card.guarantee}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
