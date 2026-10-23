'use client';

import React, { useState, useEffect } from 'react';
import { SITE_CONFIG } from '@/lib/site-config';
import {
  Send,
  Gift,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Building,
  Mail,
  User,
  Globe,
  Briefcase,
  Layers,
  MapPin,
  Calendar,
  DollarSign,
  FileSpreadsheet,
  Check,
} from 'lucide-react';

interface LeadFormProps {
  preselectedService?: string;
  defaultMode?: 'Free Sample' | 'Quote Request';
  onOpenPrivacyNotice: () => void;
  onOpenSetupGuide: () => void;
}

const AVAILABLE_FIELDS = [
  'First & Last Name',
  'Job Title',
  'Business Email',
  'Direct / HQ Phone',
  'Company Name & Domain',
  'LinkedIn Contact URL',
  'LinkedIn Company Page',
  'Location (City/Country)',
  'Employee Headcount',
  'Industry & Sub-niche',
  'Annual Revenue Estimate',
];

export function LeadForm({
  preselectedService,
  defaultMode = 'Free Sample',
  onOpenPrivacyNotice,
  onOpenSetupGuide,
}: LeadFormProps) {
  // Form fields state
  const [submissionType, setSubmissionType] = useState<'Free Sample' | 'Quote Request'>(defaultMode);
  const [fullName, setFullName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [country, setCountry] = useState('');
  const [serviceRequired, setServiceRequired] = useState(
    preselectedService || SITE_CONFIG.serviceOptions[0]
  );
  const [targetIndustry, setTargetIndustry] = useState('');
  const [targetJobTitles, setTargetJobTitles] = useState('');
  const [companySize, setCompanySize] = useState('11-50 employees');
  const [targetLocation, setTargetLocation] = useState('');
  const [estimatedLeads, setEstimatedLeads] = useState('100 - 250 leads');
  const [requiredDataFields, setRequiredDataFields] = useState<string[]>([
    'First & Last Name',
    'Job Title',
    'Business Email',
    'Company Name & Domain',
    'LinkedIn Contact URL',
  ]);
  const [budget, setBudget] = useState('');
  const [deadline, setDeadline] = useState('');
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Status and error states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<null | {
    submissionId: string;
    submissionDate: string;
    message: string;
    submissionType: string;
    googleSheetsStatus?: string;
  }>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  // State tracking during render when props change from external triggers
  const [prevPreselectedService, setPrevPreselectedService] = useState(preselectedService);
  if (preselectedService && preselectedService !== prevPreselectedService) {
    setPrevPreselectedService(preselectedService);
    setServiceRequired(preselectedService);
  }

  const [prevDefaultMode, setPrevDefaultMode] = useState(defaultMode);
  if (defaultMode && defaultMode !== prevDefaultMode) {
    setPrevDefaultMode(defaultMode);
    setSubmissionType(defaultMode);
  }

  // Toggle data field selection
  const toggleDataField = (field: string) => {
    setRequiredDataFields((prev) =>
      prev.includes(field) ? prev.filter((item) => item !== field) : [...prev, field]
    );
  };

  // Validate form client-side
  const validateForm = (): boolean => {
    const errs: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = 'Full Name is required (minimum 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!businessEmail.trim()) {
      errs.businessEmail = 'Business Email is required.';
    } else if (!emailRegex.test(businessEmail.trim())) {
      errs.businessEmail = 'Please enter a valid email address (e.g. name@company.com).';
    }

    if (!companyName.trim()) {
      errs.companyName = 'Company Name is required.';
    }

    if (!country.trim()) {
      errs.country = 'Your Country / Location is required.';
    }

    if (!serviceRequired) {
      errs.serviceRequired = 'Please select a required service.';
    }

    if (!targetIndustry.trim()) {
      errs.targetIndustry = 'Target Industry / Niche is required.';
    }

    if (!targetJobTitles.trim()) {
      errs.targetJobTitles = 'Target Job Titles are required (e.g. Founder, VP Sales).';
    }

    if (!companySize) {
      errs.companySize = 'Please select target company size.';
    }

    if (!targetLocation.trim()) {
      errs.targetLocation = 'Target Location is required (e.g. USA, UK, Australia).';
    }

    if (!estimatedLeads) {
      errs.estimatedLeads = 'Please select estimated number of leads.';
    }

    if (requiredDataFields.length === 0) {
      errs.requiredDataFields = 'Please select at least one required data field.';
    }

    if (!agreedToTerms) {
      errs.agreedToTerms = 'You must confirm agreement to be contacted and acknowledge the privacy notice.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Handle actual form submission
  const handleSubmit = async (chosenType: 'Free Sample' | 'Quote Request') => {
    setSubmissionType(chosenType);
    setServerError(null);

    // Validate
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorEl = document.querySelector('.form-error-marker');
      if (firstErrorEl) {
        firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionType: chosenType,
          fullName,
          businessEmail,
          companyName,
          website,
          country,
          serviceRequired,
          targetIndustry,
          targetJobTitles,
          companySize,
          targetLocation,
          estimatedLeads,
          requiredDataFields,
          budget,
          deadline,
          additionalRequirements,
          agreedToTerms,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to record your inquiry. Please try again.');
      }

      // Success
      setSubmitSuccess({
        submissionId: data.submissionId,
        submissionDate: data.submissionDate,
        message: data.message,
        submissionType: chosenType,
        googleSheetsStatus: data.googleSheetsStatus,
      });

      // Clear input fields
      setFullName('');
      setBusinessEmail('');
      setCompanyName('');
      setWebsite('');
      setCountry('');
      setTargetIndustry('');
      setTargetJobTitles('');
      setTargetLocation('');
      setBudget('');
      setDeadline('');
      setAdditionalRequirements('');
      setAgreedToTerms(false);
      setErrors({});
    } catch (err) {
      setServerError((err as Error).message || 'Network error encountered. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative rounded-3xl bg-[#091122] border border-slate-800 shadow-2xl p-6 sm:p-8 lg:p-10">
      {/* Background soft glow */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-600/10 blur-[100px] pointer-events-none" />

      {/* Top Form Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80 mb-8">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
            Intake & Inquiry Portal
          </span>
          <h3 className="text-2xl font-bold text-white mt-1">
            Free Sample & Custom Quote Request
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Share your target prospect parameters. We review every request and respond with custom recommendations.
          </p>
        </div>

        {/* Submission Mode Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-700/80 rounded-xl shrink-0">
          <button
            type="button"
            onClick={() => setSubmissionType('Free Sample')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              submissionType === 'Free Sample'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Free Sample</span>
          </button>
          <button
            type="button"
            onClick={() => setSubmissionType('Quote Request')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              submissionType === 'Quote Request'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Full Quote</span>
          </button>
        </div>
      </div>

      {/* SUCCESS BANNER: Displayed only after genuine backend verification */}
      {submitSuccess && (
        <div className="mb-8 p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-left animate-in fade-in duration-300">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white">
                  {submitSuccess.submissionType} Successfully Received
                </h4>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-700/60">
                  ID: {submitSuccess.submissionId}
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 leading-relaxed">
                {submitSuccess.message}
              </p>
              <div className="pt-2 text-[11px] text-slate-400 font-mono border-t border-emerald-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span>Timestamp: {new Date(submitSuccess.submissionDate).toLocaleString()}</span>
                <span className="text-cyan-400">{submitSuccess.googleSheetsStatus}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-900/40 flex items-center justify-end">
            <button
              onClick={() => setSubmitSuccess(null)}
              className="text-xs text-emerald-300 hover:text-white font-medium underline"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      )}

      {/* SERVER ERROR BANNER */}
      {serverError && (
        <div className="mb-8 p-4 rounded-xl bg-rose-950/50 border border-rose-500/40 flex items-center gap-3 text-xs text-rose-200">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      {/* FORM FIELDS */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(submissionType);
        }}
        noValidate
        className="space-y-6"
      >
        {/* ROW 1: Name & Business Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1.5">
              Full Name <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="e.g. Johnathan Smith"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors({ ...errors, fullName: '' });
                }}
                disabled={isSubmitting}
                className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900/90 border text-sm text-white placeholder-slate-400 focus:outline-none transition-colors ${
                  errors.fullName
                    ? 'border-rose-500 focus:border-rose-400 form-error-marker'
                    : 'border-slate-800 focus:border-cyan-400'
                }`}
              />
            </div>
            {errors.fullName && (
              <p className="mt-1 text-xs text-rose-400">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1.5">
              Business Email <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="e.g. john@yourcompany.com"
                value={businessEmail}
                onChange={(e) => {
                  setBusinessEmail(e.target.value);
                  if (errors.businessEmail) setErrors({ ...errors, businessEmail: '' });
                }}
                disabled={isSubmitting}
                className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900/90 border text-sm text-white placeholder-slate-400 focus:outline-none transition-colors ${
                  errors.businessEmail
                    ? 'border-rose-500 focus:border-rose-400 form-error-marker'
                    : 'border-slate-800 focus:border-cyan-400'
                }`}
              />
            </div>
            {errors.businessEmail && (
              <p className="mt-1 text-xs text-rose-400">{errors.businessEmail}</p>
            )}
          </div>
        </div>

        {/* ROW 2: Company Name & Website & Country */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1.5">
              Company Name <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Your Agency / Company"
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                  if (errors.companyName) setErrors({ ...errors, companyName: '' });
                }}
                disabled={isSubmitting}
                className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900/90 border text-sm text-white placeholder-slate-400 focus:outline-none transition-colors ${
                  errors.companyName ? 'border-rose-500 form-error-marker' : 'border-slate-800 focus:border-cyan-400'
                }`}
              />
            </div>
            {errors.companyName && (
              <p className="mt-1 text-xs text-rose-400">{errors.companyName}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1.5">
              Company Website <span className="text-slate-400 text-[10px]">(Optional)</span>
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                placeholder="https://example.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                disabled={isSubmitting}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-cyan-400 text-sm text-white placeholder-slate-400 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1.5">
              Your Country / Headquarters <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="e.g. USA, UK, Canada, Australia"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  if (errors.country) setErrors({ ...errors, country: '' });
                }}
                disabled={isSubmitting}
                className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900/90 border text-sm text-white placeholder-slate-400 focus:outline-none transition-colors ${
                  errors.country ? 'border-rose-500 form-error-marker' : 'border-slate-800 focus:border-cyan-400'
                }`}
              />
            </div>
            {errors.country && (
              <p className="mt-1 text-xs text-rose-400">{errors.country}</p>
            )}
          </div>
        </div>

        {/* ROW 3: Service Required (Dropdown matching prompt) */}
        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1.5">
            Service Required <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <Briefcase className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={serviceRequired}
              onChange={(e) => setServiceRequired(e.target.value)}
              disabled={isSubmitting}
              className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-cyan-400 text-sm text-white focus:outline-none transition-colors appearance-none cursor-pointer"
            >
              {SITE_CONFIG.serviceOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-slate-950 text-white">
                  {opt}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* ROW 4: Target Audience Definition (Industry, Job Titles, Company Size, Location) */}
        <div className="p-5 rounded-2xl bg-[#070d1a] border border-slate-800/90 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Target Audience Parameters (ICP Definition)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Target Industry / Vertical <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. B2B SaaS, Commercial Real Estate, Fintech"
                value={targetIndustry}
                onChange={(e) => {
                  setTargetIndustry(e.target.value);
                  if (errors.targetIndustry) setErrors({ ...errors, targetIndustry: '' });
                }}
                disabled={isSubmitting}
                className={`w-full px-3.5 py-2 rounded-lg bg-slate-900 border text-xs text-white placeholder-slate-400 focus:outline-none ${
                  errors.targetIndustry ? 'border-rose-500 form-error-marker' : 'border-slate-800 focus:border-cyan-400'
                }`}
              />
              {errors.targetIndustry && (
                <p className="mt-1 text-[11px] text-rose-400">{errors.targetIndustry}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Target Job Titles / Seniority <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. VP Sales, Chief Technology Officer, Founder, HR Director"
                value={targetJobTitles}
                onChange={(e) => {
                  setTargetJobTitles(e.target.value);
                  if (errors.targetJobTitles) setErrors({ ...errors, targetJobTitles: '' });
                }}
                disabled={isSubmitting}
                className={`w-full px-3.5 py-2 rounded-lg bg-slate-900 border text-xs text-white placeholder-slate-400 focus:outline-none ${
                  errors.targetJobTitles ? 'border-rose-500 form-error-marker' : 'border-slate-800 focus:border-cyan-400'
                }`}
              />
              {errors.targetJobTitles && (
                <p className="mt-1 text-[11px] text-rose-400">{errors.targetJobTitles}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Target Company Size <span className="text-rose-400">*</span>
              </label>
              <select
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
                disabled={isSubmitting}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="1-10 employees (Startups)">1-10 employees (Startups)</option>
                <option value="11-50 employees (Small)">11-50 employees (Small)</option>
                <option value="51-200 employees (Mid-Market)">51-200 employees (Mid-Market)</option>
                <option value="201-500 employees (Mid-Large)">201-500 employees (Mid-Large)</option>
                <option value="500-1,000+ employees (Enterprise)">500-1,000+ employees (Enterprise)</option>
                <option value="Any Size / Mixed">Any Size / Mixed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Target Geographic Location <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. USA, UK & London, California, Australia"
                value={targetLocation}
                onChange={(e) => {
                  setTargetLocation(e.target.value);
                  if (errors.targetLocation) setErrors({ ...errors, targetLocation: '' });
                }}
                disabled={isSubmitting}
                className={`w-full px-3 py-2 rounded-lg bg-slate-900 border text-xs text-white placeholder-slate-400 focus:outline-none ${
                  errors.targetLocation ? 'border-rose-500 form-error-marker' : 'border-slate-800 focus:border-cyan-400'
                }`}
              />
              {errors.targetLocation && (
                <p className="mt-1 text-[11px] text-rose-400">{errors.targetLocation}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Estimated Number of Leads <span className="text-rose-400">*</span>
              </label>
              <select
                value={estimatedLeads}
                onChange={(e) => setEstimatedLeads(e.target.value)}
                disabled={isSubmitting}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Free Sample Request (10-25 demo records)">Free Sample (10-25 records)</option>
                <option value="50 - 100 leads">50 - 100 leads</option>
                <option value="100 - 250 leads">100 - 250 leads</option>
                <option value="250 - 500 leads">250 - 500 leads</option>
                <option value="500 - 1,000 leads">500 - 1,000 leads</option>
                <option value="1,000 - 2,500 leads">1,000 - 2,500 leads</option>
                <option value="2,500 - 5,000+ leads">2,500 - 5,000+ leads</option>
              </select>
            </div>
          </div>
        </div>

        {/* ROW 5: Required Data Fields Checklist */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-semibold text-slate-200">
              Required Data Fields <span className="text-rose-400">*</span>
            </label>
            <span className="text-[11px] text-slate-400">
              Select columns needed in your CSV/Google Sheet
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {AVAILABLE_FIELDS.map((field) => {
              const isSelected = requiredDataFields.includes(field);
              return (
                <button
                  type="button"
                  key={field}
                  onClick={() => toggleDataField(field)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    isSelected
                      ? 'bg-blue-600/30 border-blue-500 text-cyan-200'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] ${
                      isSelected
                        ? 'bg-blue-500 border-blue-400 text-white'
                        : 'border-slate-700 bg-slate-950 text-transparent'
                    }`}
                  >
                    ✓
                  </span>
                  <span>{field}</span>
                </button>
              );
            })}
          </div>
          {errors.requiredDataFields && (
            <p className="mt-1.5 text-xs text-rose-400">{errors.requiredDataFields}</p>
          )}
        </div>

        {/* ROW 6: Budget & Deadline (Optional) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1.5">
              Project Budget <span className="text-slate-400 text-[10px]">(Optional)</span>
            </label>
            <div className="relative">
              <DollarSign className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="e.g. $100 - $300, or Flexible"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                disabled={isSubmitting}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-cyan-400 text-sm text-white placeholder-slate-400 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1.5">
              Target Deadline <span className="text-slate-400 text-[10px]">(Optional)</span>
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="e.g. Within 48 hours, Within 1 week"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                disabled={isSubmitting}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-cyan-400 text-sm text-white placeholder-slate-400 focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* ROW 7: Additional Requirements (Optional) */}
        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1.5">
            Additional Requirements & Instructions <span className="text-slate-400 text-[10px]">(Optional)</span>
          </label>
          <textarea
            rows={3}
            placeholder="Share any special qualification criteria, exclude list, specific technologies used, or instructions for the researcher..."
            value={additionalRequirements}
            onChange={(e) => setAdditionalRequirements(e.target.value)}
            disabled={isSubmitting}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-cyan-400 text-sm text-white placeholder-slate-400 focus:outline-none transition-colors"
          />
        </div>

        {/* Terms & Privacy Notice Checkbox */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => {
                setAgreedToTerms(e.target.checked);
                if (errors.agreedToTerms) setErrors({ ...errors, agreedToTerms: '' });
              }}
              disabled={isSubmitting}
              className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-cyan-500"
            />
            <span className="text-xs text-slate-300 leading-relaxed">
              I agree to be contacted regarding this inquiry and acknowledge that I have reviewed the{' '}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenPrivacyNotice();
                }}
                className="text-cyan-400 hover:text-cyan-300 underline font-medium"
              >
                Privacy Notice
              </button>
              . LeadCore Group does not sell or distribute submitted contact details.
            </span>
          </label>
          {errors.agreedToTerms && (
            <p className="mt-1 text-xs text-rose-400">{errors.agreedToTerms}</p>
          )}
        </div>

        {/* SUBMISSION BUTTONS (Two distinct triggers requested) */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit('Free Sample')}
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-600 via-cyan-500 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {isSubmitting && submissionType === 'Free Sample' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing Sample Request...</span>
              </>
            ) : (
              <>
                <Gift className="w-4 h-4" />
                <span>Request a Free Sample</span>
              </>
            )}
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit('Quote Request')}
            className="w-full sm:flex-1 inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-700 hover:from-blue-600 hover:to-cyan-600 shadow-lg shadow-blue-700/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {isSubmitting && submissionType === 'Quote Request' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing Quote Request...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Request a Quote</span>
              </>
            )}
          </button>
        </div>

        {/* Integration Status Footer Note */}
        <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <span className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-cyan-400" />
            Duplicate protection enabled • Data verified server-side
          </span>
          <button
            type="button"
            onClick={onOpenSetupGuide}
            className="text-cyan-400 hover:text-cyan-300 underline font-mono flex items-center gap-1"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            View Google Sheets sync configuration
          </button>
        </div>
      </form>
    </div>
  );
}
