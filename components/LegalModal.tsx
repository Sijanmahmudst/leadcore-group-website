'use client';

import React from 'react';
import { X, Shield, FileText } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export function LegalModal({ isOpen, type, onClose }: LegalModalProps) {
  if (!isOpen || !type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[85vh] rounded-2xl bg-[#091122] border border-slate-700 shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            {type === 'privacy' ? (
              <Shield className="w-5 h-5 text-cyan-400" />
            ) : (
              <FileText className="w-5 h-5 text-blue-400" />
            )}
            <h3 className="text-lg font-bold text-white">
              {type === 'privacy' ? 'Privacy Notice & Policy' : 'Terms of Service'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {type === 'privacy' ? (
            <>
              <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-800/40 text-cyan-300 text-xs">
                <strong>Notice:</strong> This is a standard template privacy notice designed for LeadCore Group.
                Please review and customize with your regional legal counsel prior to formal commercial operations.
              </div>

              <h4 className="text-sm font-bold text-white">1. Information We Collect</h4>
              <p>
                When you submit an inquiry, request a sample, or contact LeadCore Group, we collect the details you provide:
                your name, business email address, company name, website URL, target criteria, and project specifications.
              </p>

              <h4 className="text-sm font-bold text-white">2. How We Use Your Information</h4>
              <p>
                We use the submitted information exclusively to:
                evaluate your project requirements, communicate with you regarding your inquiry, prepare research samples,
                and provide service quotes. We do not sell, rent, or trade your contact details with external third-party advertisers.
              </p>

              <h4 className="text-sm font-bold text-white">3. Public and Business Research Data</h4>
              <p>
                LeadCore Group specializes in B2B prospect research using publicly available professional registers, corporate websites,
                and authorized data platforms (such as Apollo.io and LinkedIn). We strictly respect opt-out requests from individuals whose public
                corporate contacts are researched.
              </p>

              <h4 className="text-sm font-bold text-white">4. Data Retention & Security</h4>
              <p>
                Client project inquiries and deliverable lists are stored securely and retained only for the duration required to support
                your engagement and maintain communication records.
              </p>

              <h4 className="text-sm font-bold text-white">5. Contact & Corrections</h4>
              <p>
                To request modification or deletion of your inquiry details, please contact us at our designated business email address.
              </p>
            </>
          ) : (
            <>
              <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-800/40 text-cyan-300 text-xs">
                <strong>Notice:</strong> These terms govern research agreements and deliverables provided by LeadCore Group.
                Review and modify to reflect your specific jurisdiction and order fulfillment terms.
              </div>

              <h4 className="text-sm font-bold text-white">1. Scope of Services</h4>
              <p>
                LeadCore Group provides custom B2B prospect research, data enrichment, and list formatting according to the
                specifications agreed upon in the project scope. Each list is compiled based on the client&apos;s designated ICP criteria.
              </p>

              <h4 className="text-sm font-bold text-white">2. Data Quality & Accuracy Disclaimer</h4>
              <p>
                Due to continuous shifts in corporate personnel, employment transitions, and corporate domain configurations,
                no data provider can guarantee 100% permanent accuracy of every record. LeadCore Group applies systematic manual
                and automated verification checks where supported to maximize relevance and minimize bounce rates.
              </p>

              <h4 className="text-sm font-bold text-white">3. Client Responsibilities & Compliance</h4>
              <p>
                Clients are solely responsible for ensuring that their outreach practices comply with applicable data protection and
                commercial messaging laws in their recipient jurisdictions (including but not limited to the CAN-SPAM Act, GDPR, CASL, and PECR).
              </p>

              <h4 className="text-sm font-bold text-white">4. Delivery & Revisions</h4>
              <p>
                Deliverables are provided in agreed spreadsheet formats (CSV, Microsoft Excel, or Google Sheets). Reasonable revisions
                concerning criteria mismatches are addressed according to the agreed project scope.
              </p>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
