'use client';

import React from 'react';
import { Logo } from './Logo';
import { SITE_CONFIG } from '@/lib/site-config';
import { Mail, ArrowUpRight, Shield, FileText } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onSelectService: (serviceName: string) => void;
  onOpenSetupGuide: () => void;
}

export function Footer({
  onOpenPrivacy,
  onOpenTerms,
  onSelectService,
  onOpenSetupGuide,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#050811] border-t border-slate-800/80 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand & Description (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="md" showTagline={true} />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              LeadCore Group helps businesses and sales teams connect with their ideal customers through targeted B2B lead generation, accurate prospect research, and reliable business data.
            </p>
            <div className="pt-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-300 block">Founder:</span>
              <span>Led by Sijan • B2B Lead Generation Specialist & Fiverr Level 2 Seller</span>
            </div>
          </div>

          {/* Col 2: Quick Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {['Home', 'Services', 'How It Works', 'Sample Data', 'About Us', 'FAQ', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={(e) => handleScrollTo(e, `#${item.toLowerCase().replace(/\s+/g, '-')}`)}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {SITE_CONFIG.services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => onSelectService(service.title)}
                    className="hover:text-cyan-400 text-left transition-colors truncate max-w-full block"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Tools (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
              Client Channels
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="flex items-center gap-2 hover:text-cyan-400 transition-colors font-mono"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">{SITE_CONFIG.contact.email}</span>
              </a>

              <a
                href={SITE_CONFIG.contact.fiverrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
              >
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Fiverr Level 2 Profile</span>
              </a>

              <a
                href={SITE_CONFIG.contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
              >
                <ArrowUpRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>LinkedIn Profile</span>
              </a>

              <div className="pt-2">
                <button
                  onClick={onOpenSetupGuide}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 underline font-mono flex items-center gap-1.5"
                >
                  <FileText className="w-3 h-3" />
                  <span>Deployment & Google Sheets Guide</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {currentYear} LeadCore Group. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-cyan-400 transition-colors underline-offset-4 hover:underline"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={onOpenTerms}
              className="hover:text-cyan-400 transition-colors underline-offset-4 hover:underline"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
