'use client';

import React, { useState } from 'react';
import { SITE_CONFIG } from '@/lib/site-config';
import {
  ArrowRight,
  Sparkles,
  CheckCircle,
  Database,
  Search,
  Filter,
  Layers,
  ShieldCheck,
  Building2,
  Mail,
  Linkedin,
  Globe,
  SlidersHorizontal,
} from 'lucide-react';

interface HeroProps {
  onGetFreeSample: () => void;
  onExploreServices: () => void;
}

export function Hero({ onGetFreeSample, onExploreServices }: HeroProps) {
  const [activeTab, setActiveTab] = useState<'record' | 'filters' | 'delivery'>('record');

  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background radial glow & geometric grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-cyan-500/10 blur-[110px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Tag badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-semibold text-cyan-300 shadow-sm shadow-cyan-900/20 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>International B2B Lead Generation & Prospect Research</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Find the Right Prospects.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-sky-200">
                Build Better Business.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {SITE_CONFIG.subheading}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onGetFreeSample}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-blue-600/30 hover:shadow-cyan-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Get a Free Sample</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreServices}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all"
              >
                <span>Explore Our Services</span>
              </button>
            </div>

            {/* Value Propositions */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              {SITE_CONFIG.valueProps.map((prop, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div className="mt-0.5 p-1 rounded bg-blue-950/70 border border-blue-800/50 text-cyan-400 shrink-0">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h2 className="text-xs font-semibold text-slate-200 tracking-wide uppercase">
                      {prop.title}
                    </h2>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      {prop.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Custom Modern Data Dashboard Visual (CSS + SVG) */}
          <div className="lg:col-span-5 relative">
            {/* Ambient Back Glow */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600/30 to-cyan-500/30 blur-xl opacity-60" />

            <div className="relative rounded-2xl bg-[#0b1325]/90 border border-slate-800 shadow-2xl p-5 backdrop-blur-md">
              {/* Header Bar of Dashboard */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400">
                    LeadCore_Research_Engine v2.4
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Quality Checking</span>
                </div>
              </div>

              {/* Interactive Dashboard Tabs */}
              <div className="flex items-center gap-2 mt-4 p-1 bg-slate-900/90 rounded-lg border border-slate-800 text-xs">
                <button
                  onClick={() => setActiveTab('record')}
                  className={`flex-1 py-1.5 px-2.5 rounded-md font-medium transition-all ${
                    activeTab === 'record'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Prospect Profile
                </button>
                <button
                  onClick={() => setActiveTab('filters')}
                  className={`flex-1 py-1.5 px-2.5 rounded-md font-medium transition-all ${
                    activeTab === 'filters'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Criteria Match
                </button>
                <button
                  onClick={() => setActiveTab('delivery')}
                  className={`flex-1 py-1.5 px-2.5 rounded-md font-medium transition-all ${
                    activeTab === 'delivery'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Export Formats
                </button>
              </div>

              {/* Tab Content 1: Prospect Profile Record Card */}
              {activeTab === 'record' && (
                <div className="mt-4 space-y-3.5">
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/90 hover:border-slate-700 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center font-bold text-white text-base shadow-md">
                          MV
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-white text-sm">Marcus Vance</h3>
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/30">
                              ICP Verified
                            </span>
                          </div>
                          <p className="text-xs text-cyan-300 font-medium">VP of Global Sales</p>
                          <p className="text-[11px] text-slate-400">AuraCloud Technologies • Enterprise SaaS</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          USA
                        </span>
                      </div>
                    </div>

                    {/* Data Fields Pill Grid */}
                    <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-xs">
                      <div className="flex items-center gap-2 text-slate-300 bg-slate-950/60 p-2 rounded-lg border border-slate-800/60">
                        <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate font-mono text-[11px]">m.vance@auracloud...</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300 bg-slate-950/60 p-2 rounded-lg border border-slate-800/60">
                        <Linkedin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span className="truncate font-mono text-[11px]">/in/marcus-vance</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300 bg-slate-950/60 p-2 rounded-lg border border-slate-800/60">
                        <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate font-mono text-[11px]">auracloud-example.com</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300 bg-slate-950/60 p-2 rounded-lg border border-slate-800/60">
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate font-mono text-[11px]">MX & SMTP Passed</span>
                      </div>
                    </div>
                  </div>

                  {/* Connected Network graphic strip */}
                  <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800/70 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-blue-400" />
                      Cross-referenced Apollo + Sales Nav
                    </span>
                    <span className="text-emerald-400 font-mono text-[11px]">Checked Record</span>
                  </div>
                </div>
              )}

              {/* Tab Content 2: Criteria Filter Preview */}
              {activeTab === 'filters' && (
                <div className="mt-4 space-y-2.5 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span className="text-slate-400 block mb-1">Target Geographies:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['United States', 'United Kingdom', 'Canada', 'Australia'].map((c) => (
                        <span key={c} className="px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800/60 text-blue-300 text-[11px]">
                          ✓ {c}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span className="text-slate-400 block mb-1">Target Job Seniority:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['VP / Director', 'C-Suite / Founder', 'Head of Department'].map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 text-[11px]">
                          ✓ {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                    <span className="text-slate-400 block mb-1">Company Headcount:</span>
                    <div className="flex gap-2 text-[11px] text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">11-50</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">51-200</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">201-500+</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab Content 3: Delivery Options */}
              {activeTab === 'delivery' && (
                <div className="mt-4 space-y-2.5 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded bg-emerald-950/60 border border-emerald-700/50 flex items-center justify-center text-emerald-400 font-bold text-xs">
                        CSV
                      </div>
                      <div>
                        <p className="font-semibold text-slate-200">Standard CSV File</p>
                        <p className="text-[11px] text-slate-400">Directly importable to any CRM or outreach tool</p>
                      </div>
                    </div>
                    <span className="text-cyan-400 text-[11px] font-mono">Ready</span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded bg-green-950/60 border border-green-700/50 flex items-center justify-center text-green-400 font-bold text-xs">
                        XLS
                      </div>
                      <div>
                        <p className="font-semibold text-slate-200">Microsoft Excel Workbook</p>
                        <p className="text-[11px] text-slate-400">Formatted with freeze panes & auto-filters</p>
                      </div>
                    </div>
                    <span className="text-cyan-400 text-[11px] font-mono">Ready</span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded bg-blue-950/60 border border-blue-700/50 flex items-center justify-center text-blue-400 font-bold text-xs">
                        GS
                      </div>
                      <div>
                        <p className="font-semibold text-slate-200">Live Google Sheets Link</p>
                        <p className="text-[11px] text-slate-400">Collaborative live access with permissions</p>
                      </div>
                    </div>
                    <span className="text-cyan-400 text-[11px] font-mono">Ready</span>
                  </div>
                </div>
              )}

              {/* Bottom live stats footer */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Tailored to Client ICP</span>
                <span className="text-cyan-400">Format: Standardized Columns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
