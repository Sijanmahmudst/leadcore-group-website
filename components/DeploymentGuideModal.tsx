'use client';

import React, { useState } from 'react';
import { SITE_CONFIG } from '@/lib/site-config';
import {
  X,
  Copy,
  Check,
  FileSpreadsheet,
  Globe,
  Rocket,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Terminal,
} from 'lucide-react';

interface DeploymentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeploymentGuideModal({ isOpen, onClose }: DeploymentGuideModalProps) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'sheets' | 'hosting' | 'test'>('sheets');
  const [testUrl, setTestUrl] = useState('');
  const [testingStatus, setTestingStatus] = useState<null | {
    success: boolean;
    message: string;
  }>(null);
  const [isTesting, setIsTesting] = useState(false);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(SITE_CONFIG.googleAppsScriptCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleTestEndpoint = async () => {
    if (!testUrl || !testUrl.startsWith('https://script.google.com')) {
      setTestingStatus({
        success: false,
        message: 'Please provide a valid Google Apps Script Web App URL starting with https://script.google.com/macros/s/...',
      });
      return;
    }

    setIsTesting(true);
    setTestingStatus(null);

    try {
      // Send a test ping payload
      const testPayload = {
        submissionId: `TEST-${Date.now().toString(36).toUpperCase()}`,
        submissionDate: new Date().toISOString(),
        fullName: 'LeadCore Group System Test',
        businessEmail: 'test@leadcoregroup.com',
        companyName: 'Verification Check',
        website: 'https://leadcoregroup.com',
        country: 'Global',
        serviceRequired: 'Integration Verification',
        targetIndustry: 'Verification Test',
        targetJobTitles: 'Administrator',
        companySize: '1-10',
        targetLocation: 'Global',
        estimatedLeads: 'Diagnostic ping',
        requiredDataFields: ['System Check'],
        budget: 'N/A',
        deadline: 'Immediate',
        additionalRequirements: 'Diagnostic automated ping from website setup modal',
        submissionType: 'Connection Verification',
      };

      const res = await fetch(testUrl, {
        method: 'POST',
        mode: 'no-cors', // Google Apps Script Web Apps often redirect; no-cors allows dispatching safely
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testPayload),
      });

      setTestingStatus({
        success: true,
        message: 'Test submission dispatched! Check your Google Sheet to confirm that a "LeadCore Group System Test" row was added.',
      });
    } catch (err) {
      setTestingStatus({
        success: false,
        message: `Connection attempt failed: ${(err as Error).message}. Ensure deployment has "Who has access: Anyone".`,
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl bg-[#091122] border border-slate-700 shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-[#0c1427]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-cyan-400">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Launch &amp; Free Integration Guide
              </h3>
              <p className="text-xs text-slate-400">
                Google Sheets synchronization &amp; $0 free hosting walkthrough
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-5 pt-3 gap-2 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('sheets')}
            className={`pb-2.5 px-3 font-semibold transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'sheets'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>1. Google Sheets Setup</span>
          </button>

          <button
            onClick={() => setActiveTab('hosting')}
            className={`pb-2.5 px-3 font-semibold transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'hosting'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>2. 100% Free Hosting (Vercel / GitHub)</span>
          </button>

          <button
            onClick={() => setActiveTab('test')}
            className={`pb-2.5 px-3 font-semibold transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'test'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>3. Test Endpoint &amp; Verification</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {/* TAB 1: Google Sheets Setup */}
          {activeTab === 'sheets' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/40 flex items-start gap-3">
                <FileSpreadsheet className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white">Zero Database Hosting Cost: </strong>
                  By using Google Apps Script as a webhook receiver, client inquiries and sample requests stream
                  directly into your own private Google Spreadsheet without paid third-party database subscriptions.
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">1</span>
                  Create Your Intake Spreadsheet
                </h4>
                <p className="text-xs text-slate-300">
                  Open Google Drive and create a new blank Google Sheet named <code>LeadCore Group - Inquiries</code>.
                  The script will automatically configure all 19 columns on its first submission:
                </p>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-cyan-300 overflow-x-auto whitespace-nowrap">
                  Submission ID | Date | Full Name | Email | Company | Website | Country | Service | Industry | Titles | Headcount | Location | Leads | Data Fields | Budget | Deadline | Additional Reqs | Type | Status
                </div>

                <h4 className="text-sm font-bold text-white flex items-center gap-2 pt-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">2</span>
                  Add the Google Apps Script
                </h4>
                <p className="text-xs text-slate-300">
                  In your spreadsheet menu, click <strong>Extensions &gt; Apps Script</strong>. Delete any placeholder code and paste the code below:
                </p>

                {/* Code Box with Copy Button */}
                <div className="relative rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs">
                    <span className="font-mono text-slate-400">LeadCoreGroupSheetsWebhook.gs</span>
                    <button
                      onClick={handleCopyCode}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Copied Code!' : 'Copy Script Code'}</span>
                    </button>
                  </div>
                  <pre className="p-4 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-56">
                    {SITE_CONFIG.googleAppsScriptCode}
                  </pre>
                </div>

                <h4 className="text-sm font-bold text-white flex items-center gap-2 pt-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">3</span>
                  Deploy as Web App
                </h4>
                <ol className="list-decimal list-inside space-y-1 text-xs text-slate-300">
                  <li>Click <strong>Deploy &gt; New deployment</strong> in the top-right of Apps Script.</li>
                  <li>Click the gear icon next to &ldquo;Select type&rdquo; and choose <strong>Web app</strong>.</li>
                  <li>Set <strong>Execute as:</strong> &ldquo;Me&rdquo;.</li>
                  <li>Set <strong>Who has access:</strong> &ldquo;Anyone&rdquo; (essential so the website form can post to it).</li>
                  <li>Click <strong>Deploy</strong>, grant Google permissions, and copy the Web App URL (starts with <code>https://script.google.com/macros/s/.../exec</code>).</li>
                </ol>

                <h4 className="text-sm font-bold text-white flex items-center gap-2 pt-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">4</span>
                  Configure in Website Environment
                </h4>
                <p className="text-xs text-slate-300">
                  Add the copied Web App URL to your environment variables as <code>GOOGLE_SHEETS_SCRIPT_URL</code> in your <code>.env.local</code> or Vercel dashboard. The website backend API automatically dispatches every validated submission there!
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: Free Hosting */}
          {activeTab === 'hosting' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/40 text-xs">
                <strong className="text-white">Free Deployment Guidance: </strong>
                You can host this entire Next.js agency website for $0 without recurring hosting fees.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Option A: Vercel (Recommended for Next.js) */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Option A (Recommended)</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-800/60">Free Tier Forever</span>
                  </div>
                  <h4 className="text-base font-bold text-white">Vercel 1-Click Free Hosting</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Vercel provides native zero-configuration hosting for Next.js with full serverless API routes, free SSL certificate, global CDN, and a free <code>.vercel.app</code> subdomain.
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-xs text-slate-400 pt-1">
                    <li>Push this project to a GitHub repository.</li>
                    <li>Sign up for free at <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-cyan-400 underline">vercel.com</a> with GitHub.</li>
                    <li>Click &ldquo;Add New &gt; Project&rdquo; and import the repository.</li>
                    <li>In &ldquo;Environment Variables&rdquo;, add <code>GOOGLE_SHEETS_SCRIPT_URL</code>.</li>
                    <li>Click &ldquo;Deploy&rdquo;. Your website goes live in under 2 minutes.</li>
                  </ol>
                  <div className="pt-2 text-[11px] text-slate-400">
                    💡 <em>Custom Domain:</em> Optional. When you buy a custom domain (e.g. leadcoregroup.com) later, you can bind it on Vercel for free with automated SSL.
                  </div>
                </div>

                {/* Option B: GitHub Pages / Cloudflare Pages */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Option B</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-950/60 text-blue-300 border border-blue-800/60">100% Free</span>
                  </div>
                  <h4 className="text-base font-bold text-white">GitHub Pages / Cloudflare Pages</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    If you prefer a pure static export hosted on GitHub Pages:
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-xs text-slate-400 pt-1">
                    <li>In <code>next.config.ts</code>, add <code>output: &apos;export&apos;</code>.</li>
                    <li>Update the form in <code>LeadForm.tsx</code> to post directly to your Apps Script Web App URL.</li>
                    <li>Run <code>npm run build</code> to produce the static <code>/out</code> directory.</li>
                    <li>Host for free on GitHub Pages under <code>username.github.io/leadcore-group</code>.</li>
                  </ol>
                  <div className="pt-2 text-[11px] text-slate-400">
                    💡 <em>Recommendation:</em> Option A (Vercel) is preferred because it handles the Next.js API route seamlessly without exposing the script URL directly in client code!
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Diagnostic Connection Test */}
          {activeTab === 'test' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <span className="font-semibold text-white block mb-1">Verify Before Going Live:</span>
                Paste your deployed Google Apps Script Web App URL below and click &ldquo;Send Test Submission&rdquo;.
                This will dispatch an illustrative diagnostic row to test your sheet integration.
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-semibold text-slate-200">
                  Google Apps Script Web App URL
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="url"
                    placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
                    value={testUrl}
                    onChange={(e) => setTestUrl(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    onClick={handleTestEndpoint}
                    disabled={isTesting}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shrink-0 disabled:opacity-50"
                  >
                    {isTesting ? 'Sending Ping...' : 'Send Test Submission'}
                  </button>
                </div>
              </div>

              {testingStatus && (
                <div
                  className={`p-4 rounded-xl border text-xs ${
                    testingStatus.success
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                      : 'bg-rose-950/40 border-rose-500/50 text-rose-300'
                  }`}
                >
                  <div className="flex items-center gap-2 font-semibold">
                    {testingStatus.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    <span>{testingStatus.success ? 'Diagnostic Ping Sent' : 'Verification Issue'}</span>
                  </div>
                  <p className="mt-1">{testingStatus.message}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between text-xs text-slate-400">
          <span>LeadCore Group Free Deployment Setup</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
