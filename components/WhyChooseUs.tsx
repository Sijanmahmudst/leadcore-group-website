'use client';

import React from 'react';
import { SITE_CONFIG } from '@/lib/site-config';
import {
  Sliders,
  CheckCircle2,
  MessageSquareText,
  Layers,
  FolderDown,
  Gift,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export function WhyChooseUs() {
  const getIcon = (icon: string) => {
    const props = { className: 'w-5 h-5 text-cyan-400' };
    switch (icon) {
      case 'Sliders':
        return <Sliders {...props} />;
      case 'CheckCircle2':
        return <CheckCircle2 {...props} />;
      case 'MessageSquareText':
        return <MessageSquareText {...props} />;
      case 'Layers':
        return <Layers {...props} />;
      case 'FolderDown':
        return <FolderDown {...props} />;
      case 'Gift':
        return <Gift {...props} />;
      case 'ShieldCheck':
        return <ShieldCheck {...props} />;
      default:
        return <CheckCircle2 {...props} />;
    }
  };

  return (
    <section className="py-20 lg:py-28 relative bg-[#090f1f]/50 border-y border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-semibold text-cyan-300">
            <span>Our Approach & Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Choose LeadCore Group?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            We focus on precision, transparency, and research integrity. We partner with sales teams who value relevant,
            actionable intelligence over inflated row counts.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SITE_CONFIG.whyChooseUs.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0b1325] border border-slate-800 hover:border-slate-700 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4">
                {getIcon(item.icon)}
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}

          {/* Honest Quality Disclosure Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/40 via-slate-900 to-[#0b1325] border border-cyan-800/40">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-700/50 flex items-center justify-center mb-4">
              <AlertCircle className="w-5 h-5 text-cyan-300" />
            </div>
            <h3 className="text-base font-bold text-cyan-200 mb-2">
              Our Honest Quality Commitment
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              No data provider can responsibly claim 100% permanent accuracy because corporate roles change constantly. We conduct thorough manual cross-checks to ensure high relevance and minimize bounce rates for your outreach campaigns.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
