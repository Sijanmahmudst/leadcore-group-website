'use client';

import React, { useState } from 'react';
import { SITE_CONFIG } from '@/lib/site-config';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQProps {
  onStartInquiry: () => void;
}

export function FAQ({ onStartInquiry }: FAQProps) {
  // First item open by default
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 relative bg-[#090f1f]/60 border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-300">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Common Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-300 text-base">
            Transparent answers regarding our research processes, deliverables, sample policies, and data checks.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {SITE_CONFIG.faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#0b1427] border-cyan-500/40 shadow-lg shadow-cyan-950/20'
                    : 'bg-[#091122] border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-white pr-4">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center bg-slate-900 border border-slate-700 text-cyan-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 bg-blue-900/60 border-blue-500' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-slate-800/80 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA prompt */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
          <p className="text-sm text-slate-300">
            Have a specialized requirement not covered here?
          </p>
          <button
            onClick={onStartInquiry}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 underline"
          >
            Ask us via the inquiry form →
          </button>
        </div>
      </div>
    </section>
  );
}
