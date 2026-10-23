'use client';

import React from 'react';
import { SITE_CONFIG } from '@/lib/site-config';
import { Award, UserCheck, Shield, CheckCircle, ExternalLink, Globe2, Sparkles } from 'lucide-react';

export function AboutUs() {
  return (
    <section id="about-us" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission & Overview */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-300">
              <span>About LeadCore Group</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Research-Driven B2B Lead Generation
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              LeadCore Group helps businesses identify relevant prospects and organize useful B2B data for their sales and outreach activities. We focus on understanding each client&apos;s target audience, researching relevant business contacts, and delivering structured data that supports better prospecting decisions.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#0b1325] border border-slate-800/90">
                <div className="flex items-center gap-2.5 text-cyan-400 font-semibold text-sm mb-1.5">
                  <UserCheck className="w-4 h-4" />
                  <span>Targeted Research Focus</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We adapt our investigative methods to match the specific ICP, role hierarchies, and niche industry guidelines of each campaign.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0b1325] border border-slate-800/90">
                <div className="flex items-center gap-2.5 text-blue-400 font-semibold text-sm mb-1.5">
                  <Globe2 className="w-4 h-4" />
                  <span>International Market Reach</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Specialized in locating business contacts across the United States, United Kingdom, Canada, Australia, and other global commercial hubs.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Founder Sijan Spotlight Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-[#0e172e] to-[#0a1020] border border-slate-700/80 p-8 shadow-2xl overflow-hidden">
              {/* Subtle decorative glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-sky-400 p-0.5 shadow-lg">
                  <div className="w-full h-full rounded-[14px] bg-[#0b1325] flex items-center justify-center font-bold text-xl text-white">
                    S
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">Sijan</h3>
                  <p className="text-xs font-semibold text-cyan-400 tracking-wide mt-0.5">
                    Founder & Lead Generation Specialist
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 mt-1.5 rounded-md bg-emerald-950/60 border border-emerald-800/60 text-[11px] font-medium text-emerald-300">
                    <Award className="w-3 h-3 text-emerald-400" />
                    <span>Fiverr Level 2 Seller</span>
                  </div>
                </div>
              </div>

              {/* Founder quote statement */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-sm text-slate-300 italic leading-relaxed mb-6">
                &ldquo;Led by Sijan, a B2B Lead Generation Specialist and Fiverr Level 2 Seller, LeadCore Group focuses on customized prospect research, organized data delivery, and clear client communication.&rdquo;
              </div>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Customized prospect research tailored to client criteria</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Organized, standardized data delivery (CSV, Excel, Sheets)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Direct, transparent, and prompt client communication</span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
                <a
                  href={SITE_CONFIG.contact.fiverrUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Connect on Fiverr</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <span className="text-[11px] font-mono text-slate-400">
                  Global Client Coverage
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
