'use client';

import React, { useState } from 'react';
import { SITE_CONFIG } from '@/lib/site-config';
import { LeadForm } from './LeadForm';
import {
  Mail,
  ExternalLink,
  Clock,
  MapPin,
  Check,
  Copy,
  Sparkles,
  HelpCircle,
  FileSpreadsheet,
} from 'lucide-react';

interface ContactSectionProps {
  preselectedService?: string;
  defaultMode?: 'Free Sample' | 'Quote Request';
  onOpenPrivacyNotice: () => void;
  onOpenSetupGuide: () => void;
}

export function ContactSection({
  preselectedService,
  defaultMode,
  onOpenPrivacyNotice,
  onOpenSetupGuide,
}: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-300">
            <span>Direct Communication & Inquiry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Connect with LeadCore Group
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Ready to test a sample or obtain a tailored project quote? Submit your criteria below, or contact
            specialist Sijan directly through our verified channels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Business Inquiry Information & Editable Placeholders */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Card */}
            <div className="p-6 rounded-2xl bg-[#091122] border border-slate-800 space-y-5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-cyan-400" />
                <span>Business Inquiries</span>
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                Direct queries, RFP documents, or existing prospect spreadsheets can be submitted via the intake form or sent directly to our business inbox.
              </p>

              {/* Direct Email (Clearly marked editable placeholder in lib/site-config.ts) */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
                    Business Email (Editable Placeholder)
                  </span>
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="text-sm font-mono text-cyan-300 hover:text-cyan-200 truncate block font-medium"
                  >
                    {SITE_CONFIG.contact.email}
                  </a>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors shrink-0"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Turnaround & Availability */}
              <div className="space-y-3 pt-2 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-200 block">Response Time:</span>
                    <span>Typically within 24 hours (Monday – Saturday)</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-200 block">Geographic Coverage:</span>
                    <span>{SITE_CONFIG.contact.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verified Platforms & Profile Links */}
            <div className="p-6 rounded-2xl bg-[#091122] border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">
                Verified External Profiles
              </h3>

              <div className="space-y-3">
                {/* Fiverr Profile */}
                <a
                  href={SITE_CONFIG.contact.fiverrUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-950/60 border border-emerald-700/50 flex items-center justify-center font-bold text-emerald-400 text-sm">
                      fi
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                        Fiverr Level 2 Seller Profile
                      </p>
                      <p className="text-[11px] text-slate-400">Direct order escrow & reviews</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </a>

                {/* LinkedIn Profile */}
                <a
                  href={SITE_CONFIG.contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-950/60 border border-blue-700/50 flex items-center justify-center font-bold text-blue-400 text-sm">
                      in
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                        LinkedIn Professional Profile
                      </p>
                      <p className="text-[11px] text-slate-400">Connect with Founder Sijan</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </a>
              </div>
            </div>

            {/* Note on Google Sheets Integration */}
            <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-900/50 flex items-start gap-3 text-xs text-slate-300">
              <FileSpreadsheet className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block">Google Sheets Sync Support:</span>
                Your inquiries can stream automatically to your private Google Sheet without paid database subscriptions.
                <button
                  type="button"
                  onClick={onOpenSetupGuide}
                  className="ml-1 text-cyan-400 underline hover:text-cyan-300 font-medium"
                >
                  View deployment guide
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Full Interactive Quote & Sample Intake Form */}
          <div className="lg:col-span-7">
            <LeadForm
              preselectedService={preselectedService}
              defaultMode={defaultMode}
              onOpenPrivacyNotice={onOpenPrivacyNotice}
              onOpenSetupGuide={onOpenSetupGuide}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
