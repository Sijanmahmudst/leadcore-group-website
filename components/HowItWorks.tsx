'use client';

import React from 'react';
import { SITE_CONFIG } from '@/lib/site-config';
import { FileText, Target, SearchCheck, Send, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onStartProject: () => void;
}

export function HowItWorks({ onStartProject }: HowItWorksProps) {
  const stepIcons = [
    <FileText key="1" className="w-5 h-5 text-cyan-400" />,
    <Target key="2" className="w-5 h-5 text-blue-400" />,
    <SearchCheck key="3" className="w-5 h-5 text-cyan-300" />,
    <Send key="4" className="w-5 h-5 text-emerald-400" />,
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-300">
            <span>Simple & Transparent Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How It Works
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            From your initial criteria to final list delivery, our structured four-step process guarantees tailored research and smooth collaboration.
          </p>
        </div>

        {/* Process Timeline: Desktop Horizontal / Mobile Vertical */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 -translate-y-8 h-0.5 bg-gradient-to-r from-blue-700 via-cyan-500 to-emerald-500 -z-0 opacity-40" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
            {SITE_CONFIG.steps.map((item, idx) => (
              <div
                key={item.step}
                className="relative flex flex-col items-center lg:items-start text-center lg:text-left bg-[#0c1427]/80 lg:bg-transparent p-6 lg:p-0 rounded-2xl border border-slate-800 lg:border-none shadow-lg lg:shadow-none"
              >
                {/* Step Circle with Icon */}
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0e172e] border-2 border-cyan-500/40 shadow-md shadow-cyan-900/30 mb-5 relative group">
                  <div className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-600 text-white shadow-sm">
                    {item.step}
                  </div>
                  {stepIcons[idx]}
                </div>

                {/* Step Title */}
                <h3 className="text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>

                {/* Step Core Description */}
                <p className="text-sm text-slate-300 mb-2 leading-relaxed">
                  {item.desc}
                </p>

                {/* Step Nuance Detail */}
                <p className="text-xs text-slate-400 leading-normal">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Callout */}
        <div className="mt-16 text-center">
          <button
            onClick={onStartProject}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-md shadow-blue-600/30"
          >
            <span>Start Step 1: Share Your Target Criteria</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
