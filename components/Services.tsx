'use client';

import React from 'react';
import { SITE_CONFIG, ServiceItem } from '@/lib/site-config';
import {
  Users,
  Database,
  Linkedin,
  MailCheck,
  PhoneCall,
  Sparkles,
  Target,
  FileSpreadsheet,
  ArrowRight,
  Check,
} from 'lucide-react';

interface ServicesProps {
  onRequestService: (serviceName: string) => void;
}

export function Services({ onRequestService }: ServicesProps) {
  // Map icon names to Lucide components
  const renderIcon = (iconName: string) => {
    const props = { className: 'w-6 h-6 text-cyan-400' };
    switch (iconName) {
      case 'Users':
        return <Users {...props} />;
      case 'Database':
        return <Database {...props} />;
      case 'Linkedin':
        return <Linkedin {...props} />;
      case 'MailCheck':
        return <MailCheck {...props} />;
      case 'PhoneCall':
        return <PhoneCall {...props} />;
      case 'Sparkles':
        return <Sparkles {...props} />;
      case 'Target':
        return <Target {...props} />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet {...props} />;
      default:
        return <Users {...props} />;
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/60 text-xs font-semibold text-cyan-400">
            <span>Specialized Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Comprehensive B2B Prospect & Data Services
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            From discovering high-intent decision-makers to enriching existing CRM lists, LeadCore Group provides
            structured data research tailored to your outbound goals.
          </p>
        </div>

        {/* 8-Card Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SITE_CONFIG.services.map((service: ServiceItem, index: number) => (
            <div
              key={service.id}
              className="group relative flex flex-col justify-between rounded-2xl bg-[#0a1020] border border-slate-800/90 hover:border-cyan-500/50 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20 hover:-translate-y-1"
            >
              {/* Subtle hover gradient wash */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-blue-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div>
                {/* Top Icon Badge & Service Number */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center group-hover:border-cyan-400/60 group-hover:bg-blue-950/50 transition-colors shadow-sm">
                    {renderIcon(service.iconName)}
                  </div>
                  <span className="text-xs font-mono font-medium text-slate-500">
                    0{index + 1}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2.5">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-5">
                  {service.shortDesc}
                </p>

                {/* Deliverables Bullet List */}
                <div className="space-y-1.5 pt-4 border-t border-slate-800/80 mb-6">
                  {service.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-400">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Working CTA Button preselecting the service in the quote form */}
              <button
                onClick={() => onRequestService(service.title)}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-200 bg-slate-900/90 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 hover:text-white border border-slate-800 hover:border-transparent transition-all shadow-sm group/btn"
              >
                <span>Request This Service</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
