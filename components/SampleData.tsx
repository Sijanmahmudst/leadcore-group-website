'use client';

import React, { useState, useMemo } from 'react';
import { SITE_CONFIG, LeadRecord } from '@/lib/site-config';
import {
  Download,
  Search,
  Filter,
  CheckCircle,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  Database,
  Building,
  Mail,
  Phone,
  FileSpreadsheet,
} from 'lucide-react';

interface SampleDataProps {
  onRequestCustomSample: () => void;
}

export function SampleData({ onRequestCustomSample }: SampleDataProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');

  const countries = ['All', 'United States', 'United Kingdom', 'Canada', 'Australia'];

  const filteredRecords = useMemo(() => {
    return SITE_CONFIG.sampleRecords.filter((rec) => {
      const matchesSearch =
        rec.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.industry.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCountry = selectedCountry === 'All' || rec.country === selectedCountry;

      return matchesSearch && matchesCountry;
    });
  }, [searchTerm, selectedCountry]);

  // Generate downloadable sample CSV
  const handleDownloadCsv = () => {
    const headers = [
      'Sample ID',
      'First Name',
      'Last Name',
      'Job Title',
      'Company Name',
      'Website',
      'Industry',
      'Country',
      'LinkedIn URL',
      'Email Status',
      'Phone Availability',
      'Note',
    ];

    const rows = SITE_CONFIG.sampleRecords.map((r) => [
      r.id,
      r.firstName,
      r.lastName,
      r.jobTitle,
      r.company,
      r.companyWebsite,
      r.industry,
      r.country,
      r.linkedinUrl,
      r.emailStatus,
      r.phoneAvailability,
      'Fictional illustrative record',
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'LeadCore_Group_Sample_Dataset.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="sample-data" className="py-20 lg:py-28 relative bg-[#080e1d]/70 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-300">
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>Standard Data Layout</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Sample Data / Portfolio Preview
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Inspect our standard column structure and data formatting. All records below are fictional demo entries
              created solely to demonstrate format structure and layout quality.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadCsv}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all shadow-sm"
              title="Download Sample CSV File"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download Sample CSV</span>
            </button>

            <button
              onClick={onRequestCustomSample}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 transition-all shadow-md shadow-blue-600/20"
            >
              <span>Request a Custom Sample</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Prominent Mandatory Compliance Disclaimer */}
        <div className="mb-6 p-3.5 rounded-xl bg-blue-950/40 border border-blue-900/60 flex items-start gap-3 text-xs text-slate-300">
          <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-cyan-300">DEMO DATASET NOTICE: </span>
            All names, corporate entities, and domain examples in this table are illustrative, fictional demo records
            provided for formatting demonstration only. Never display real people&apos;s personal information without authorization.
            Actual client projects are researched according to your specific criteria.
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-5 p-3 rounded-xl bg-[#0b1325] border border-slate-800">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search title, company, industry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs text-slate-400 flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5" /> Country:
            </span>
            {countries.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCountry(c)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors shrink-0 ${
                  selectedCountry === c
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Interactive Table */}
        <div className="rounded-2xl border border-slate-800 bg-[#091122] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4">Contact Name</th>
                  <th className="py-3 px-4">Job Title</th>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Industry</th>
                  <th className="py-3 px-4">Country</th>
                  <th className="py-3 px-4">LinkedIn Profile</th>
                  <th className="py-3 px-4">Business Email Status</th>
                  <th className="py-3 px-4">Phone Availability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredRecords.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    {/* Name */}
                    <td className="py-3.5 px-4 font-semibold text-white whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-blue-900/50 border border-blue-700/50 flex items-center justify-center text-[10px] text-cyan-300 font-bold">
                          {item.firstName[0]}
                          {item.lastName[0]}
                        </span>
                        <span>
                          {item.firstName} {item.lastName}
                        </span>
                      </div>
                    </td>

                    {/* Job Title */}
                    <td className="py-3.5 px-4 text-cyan-300 font-medium whitespace-nowrap">
                      {item.jobTitle}
                    </td>

                    {/* Company */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="text-slate-200">{item.company}</span>
                      </div>
                    </td>

                    {/* Industry */}
                    <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                      {item.industry}
                    </td>

                    {/* Country */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
                        {item.country}
                      </span>
                    </td>

                    {/* LinkedIn */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 font-mono">
                        View Profile <ExternalLink className="w-3 h-3" />
                      </span>
                    </td>

                    {/* Email Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-[11px]">
                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                        {item.emailStatus}
                      </span>
                    </td>

                    {/* Phone Availability */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[11px]">
                        <Phone className="w-3 h-3 text-cyan-400" />
                        {item.phoneAvailability}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRecords.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-xs">
              No demo records matched your filter. Try adjusting your search query.
            </div>
          )}

          {/* Table Footer */}
          <div className="p-4 bg-slate-900/60 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
              <span>Showing {filteredRecords.length} illustrative records</span>
            </div>
            <button
              onClick={onRequestCustomSample}
              className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1"
            >
              Want a free tailored sample for your niche? Submit request →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
