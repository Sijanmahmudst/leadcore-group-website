export interface LeadRecord {
  id: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  company: string;
  companyWebsite: string;
  industry: string;
  country: string;
  linkedinUrl: string;
  emailStatus: 'Checked & Valid' | 'Catch-All Verified' | 'Direct Pattern Checked';
  phoneAvailability: 'Direct Line' | 'HQ Switchboard' | 'Mobile Available';
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  deliverables: string[];
}

export const SITE_CONFIG = {
  companyName: 'LeadCore Group',
  founderName: 'Sijan',
  founderRole: 'B2B Lead Generation Specialist & Fiverr Level 2 Seller',
  tagline: 'Find the Right Prospects. Build Better Business.',
  subheading:
    'LeadCore Group helps businesses and sales teams connect with their ideal customers through targeted B2B lead generation, accurate prospect research, and reliable business data.',
  
  // Editable contact placeholders (Replace these with your actual details)
  contact: {
    email: 'contact@leadcoregroup.com', // EDITABLE: Replace with your real business email
    fiverrUrl: 'https://www.fiverr.com', // EDITABLE: Replace with your Fiverr profile link
    linkedinUrl: 'https://www.linkedin.com', // EDITABLE: Replace with your LinkedIn profile link
    availableHours: 'Mon - Sat (24-hour response time)',
    location: 'Serving clients in USA, UK, Canada, Australia & Globally',
  },

  valueProps: [
    {
      title: 'Targeted Prospect Research',
      description: 'Precision audience profiling mapped to your exact industry, niche, job titles, and ICP.',
    },
    {
      title: 'Quality-Checked Data',
      description: 'Systematic manual verification checks applied to reduce bounce rates and invalid contacts.',
    },
    {
      title: 'Flexible Delivery Options',
      description: 'Ready-to-use structured delivery formatted in CSV, Microsoft Excel, or shared Google Sheets.',
    },
  ],

  services: [
    {
      id: 'b2b-lead-generation',
      title: 'B2B Lead Generation',
      iconName: 'Users',
      shortDesc: 'Build targeted prospect lists based on industry, location, company size, job title, and the client’s ideal customer profile.',
      fullDesc: 'Custom prospect research built from the ground up according to your specified market sector, geographic criteria, decision-maker seniority, and organization size.',
      deliverables: ['Custom ICP Filtering', 'Decision-Maker Mapping', 'Multi-Source Cross Referencing'],
    },
    {
      id: 'apollo-research',
      title: 'Apollo.io Data Research and Export',
      iconName: 'Database',
      shortDesc: 'Research and organize relevant company and contact records using appropriate Apollo.io workflows and client requirements.',
      fullDesc: 'Leverage comprehensive Apollo.io search filters, verified exports, and data structuring tailored to your target parameters without data clutter.',
      deliverables: ['Advanced Boolean Filters', 'Clean List Exports', 'Deduplicated Account Records'],
    },
    {
      id: 'linkedin-sales-nav',
      title: 'LinkedIn Sales Navigator Research',
      iconName: 'Linkedin',
      shortDesc: 'Find relevant companies and professionals using targeted LinkedIn Sales Navigator research and permitted data collection methods.',
      fullDesc: 'Pinpoint active executives, department heads, and key stakeholders using advanced Sales Navigator filters and authorized research methodologies.',
      deliverables: ['Executive & Buyer Identification', 'Company Headcount Tracking', 'Verified Profile Links'],
    },
    {
      id: 'business-email-research',
      title: 'Business Email Research',
      iconName: 'MailCheck',
      shortDesc: 'Research professional business email addresses and apply available verification checks where supported.',
      fullDesc: 'Identify direct corporate email addresses using syntax validation, domain MX record checks, and SMTP ping verification tools where supported. Never claims an email is verified unless thoroughly checked.',
      deliverables: ['Domain Health Verification', 'Catch-All Detection', 'Bounce Minimization Checks'],
    },
    {
      id: 'phone-research',
      title: 'Direct Phone and Mobile Research',
      iconName: 'PhoneCall',
      shortDesc: 'Research available business phone numbers and professional contact numbers using appropriate sources.',
      fullDesc: 'Locate direct corporate desk lines, headquarters switchboards, and verified professional phone contact numbers across reputable business registers and directories.',
      deliverables: ['Direct Line Research', 'HQ Switchboard & Ext', 'Regional Country Format Standardized'],
    },
    {
      id: 'data-enrichment',
      title: 'Company Data and Contact Enrichment',
      iconName: 'Sparkles',
      shortDesc: 'Enrich existing lead lists with company websites, LinkedIn company pages, industries, job titles, locations, and other available business information.',
      fullDesc: 'Enhance your incomplete or outdated contact database by filling in missing data points, website URLs, employee counts, revenue brackets, and corporate socials.',
      deliverables: ['Missing Field Completion', 'LinkedIn Company URLs', 'Industry & Headcount Tagging'],
    },
    {
      id: 'custom-prospect-research',
      title: 'Custom Prospect Research',
      iconName: 'Target',
      shortDesc: 'Create customized prospect lists for specific industries, niche markets, and complex ideal customer profiles.',
      fullDesc: 'Deep-dive custom investigative research for boutique verticals, specialized enterprise accounts, local service providers, or hard-to-reach decision-makers.',
      deliverables: ['Niche Market Discovery', 'Bespoke Criteria Filtering', 'Tailored Account Intelligence'],
    },
    {
      id: 'data-cleaning',
      title: 'Data Cleaning and Spreadsheet Formatting',
      iconName: 'FileSpreadsheet',
      shortDesc: 'Clean, organize, standardize, and deduplicate existing prospect lists and prepare them for outreach workflows.',
      fullDesc: 'Transform messy raw spreadsheets into pristine, CRM-ready files with uniform capitalization, clean URLs, removed duplicates, and properly aligned columns.',
      deliverables: ['Deduplication', 'Uniform Formatting (Case/Whitespace)', 'CRM-Ready Column Mapping'],
    },
  ] as ServiceItem[],

  serviceOptions: [
    'B2B Lead Generation',
    'Apollo.io Research and Export',
    'LinkedIn Sales Navigator Research',
    'Business Email Research',
    'Phone Number Research',
    'Company Data Enrichment',
    'Custom Prospect Research',
    'Data Cleaning',
    'Other',
  ],

  sampleRecords: [
    {
      id: 'DEMO-01',
      firstName: 'Marcus',
      lastName: 'Vance',
      jobTitle: 'VP of Global Sales',
      company: 'AuraCloud Technologies',
      companyWebsite: 'https://auracloud-example.com',
      industry: 'Enterprise SaaS',
      country: 'United States',
      linkedinUrl: 'https://linkedin.com/in/demo-marcus-vance',
      emailStatus: 'Checked & Valid',
      phoneAvailability: 'Direct Line',
    },
    {
      id: 'DEMO-02',
      firstName: 'Elena',
      lastName: 'Rostova',
      jobTitle: 'Head of Growth Marketing',
      company: 'Nordic Logistics Group',
      companyWebsite: 'https://nordiclogistics-example.com',
      industry: 'Logistics & Supply Chain',
      country: 'United Kingdom',
      linkedinUrl: 'https://linkedin.com/in/demo-elena-rostova',
      emailStatus: 'Checked & Valid',
      phoneAvailability: 'HQ Switchboard',
    },
    {
      id: 'DEMO-03',
      firstName: 'Julian',
      lastName: 'Chen',
      jobTitle: 'Chief Commercial Officer',
      company: 'Apex Health Systems',
      companyWebsite: 'https://apexhealth-example.com',
      industry: 'Healthcare Technology',
      country: 'Canada',
      linkedinUrl: 'https://linkedin.com/in/demo-julian-chen',
      emailStatus: 'Direct Pattern Checked',
      phoneAvailability: 'Direct Line',
    },
    {
      id: 'DEMO-04',
      firstName: 'Sarah',
      lastName: 'Jenkins',
      jobTitle: 'Director of Business Development',
      company: 'Meridian Capital Partners',
      companyWebsite: 'https://meridian-example.com',
      industry: 'Financial Services',
      country: 'Australia',
      linkedinUrl: 'https://linkedin.com/in/demo-sarah-jenkins',
      emailStatus: 'Checked & Valid',
      phoneAvailability: 'Mobile Available',
    },
    {
      id: 'DEMO-05',
      firstName: 'David',
      lastName: 'Miller',
      jobTitle: 'Managing Partner',
      company: 'Beacon Strategic Advisory',
      companyWebsite: 'https://beaconstrategic-example.com',
      industry: 'Management Consulting',
      country: 'United States',
      linkedinUrl: 'https://linkedin.com/in/demo-david-miller',
      emailStatus: 'Checked & Valid',
      phoneAvailability: 'HQ Switchboard',
    },
    {
      id: 'DEMO-06',
      firstName: 'Fiona',
      lastName: 'Gallagher',
      jobTitle: 'Chief Revenue Officer',
      company: 'CyberGuard Solutions',
      companyWebsite: 'https://cyberguard-example.com',
      industry: 'Cybersecurity',
      country: 'United Kingdom',
      linkedinUrl: 'https://linkedin.com/in/demo-fiona-gallagher',
      emailStatus: 'Catch-All Verified',
      phoneAvailability: 'Direct Line',
    },
    {
      id: 'DEMO-07',
      firstName: 'Liam',
      lastName: 'O’Connor',
      jobTitle: 'Operations Director',
      company: 'OmniTrade Direct',
      companyWebsite: 'https://omnitrade-example.com',
      industry: 'B2B Wholesale / E-commerce',
      country: 'Australia',
      linkedinUrl: 'https://linkedin.com/in/demo-liam-oconnor',
      emailStatus: 'Checked & Valid',
      phoneAvailability: 'HQ Switchboard',
    },
    {
      id: 'DEMO-08',
      firstName: 'Chloe',
      lastName: 'Bouchard',
      jobTitle: 'VP of Talent Acquisition',
      company: 'Synergy Talent Partners',
      companyWebsite: 'https://synergytalent-example.com',
      industry: 'Staffing & Recruiting',
      country: 'Canada',
      linkedinUrl: 'https://linkedin.com/in/demo-chloe-bouchard',
      emailStatus: 'Checked & Valid',
      phoneAvailability: 'Mobile Available',
    },
  ] as LeadRecord[],

  steps: [
    {
      step: '01',
      title: 'Share Your Requirements',
      desc: 'The client explains their target industry, country, company size, job titles, and required data fields.',
      detail: 'Specify your ideal prospect persona, target geographies, and specific criteria through our structured request form.',
    },
    {
      step: '02',
      title: 'Define the Target Audience',
      desc: 'LeadCore Group develops a research approach based on the agreed ideal customer profile.',
      detail: 'We outline the search criteria, identify the best sources (LinkedIn, Apollo, company directories), and confirm all parameters.',
    },
    {
      step: '03',
      title: 'Research and Quality Check',
      desc: 'Relevant records are collected, reviewed, and organized according to the project requirements.',
      detail: 'Targeted research is conducted with manual checks where appropriate to verify relevance and remove inconsistencies.',
    },
    {
      step: '04',
      title: 'Receive Your Lead List',
      desc: 'The final data is delivered in the agreed format, such as CSV, Excel, or Google Sheets.',
      detail: 'Get a clean, neatly formatted, ready-to-use dataset directly delivered to your inbox or shared Google Drive.',
    },
  ],

  whyChooseUs: [
    {
      title: 'Research Tailored to Your Requirements',
      desc: 'Every project is built according to your precise criteria. No generic pre-packaged lists that have been recycled across dozens of buyers.',
      icon: 'Sliders',
    },
    {
      title: 'Manual Quality Checks Where Appropriate',
      desc: 'We perform human oversight on prospect titles, company active statuses, and domain validity to catch discrepancies that scrapers miss.',
      icon: 'CheckCircle2',
    },
    {
      title: 'Clear & Transparent Communication',
      desc: 'Prompt updates on project status, realistic expectations on data availability, and direct communication throughout your order.',
      icon: 'MessageSquareText',
    },
    {
      title: 'Flexible Project Sizes',
      desc: 'Whether you need 50 niche contacts to test an outreach angle or 5,000 records for a major campaign, we adapt to your requirements.',
      icon: 'Layers',
    },
    {
      title: 'Organized File Delivery',
      desc: 'Delivered in your preferred format (CSV, Microsoft Excel, or live Google Sheets) with clean column structures ready for your sales workflow.',
      icon: 'FolderDown',
    },
    {
      title: 'Free Sample Availability',
      desc: 'Request a preliminary sample for your target criteria to evaluate data structure, column layout, and relevance before moving forward.',
      icon: 'Gift',
    },
    {
      title: 'Focus on Relevance & Data Quality',
      desc: 'We focus on locating genuine decision-makers rather than inflating row counts with unqualified or inactive contacts.',
      icon: 'ShieldCheck',
    },
  ],

  faqs: [
    {
      q: 'What is B2B lead generation?',
      a: 'It is the process of identifying and researching relevant business prospects for sales and business development.',
    },
    {
      q: 'Can you target specific industries and countries?',
      a: 'Yes. Projects can be customized according to the agreed industry, location, company size, job titles, and ideal customer profile.',
    },
    {
      q: 'What data can be included?',
      a: 'Depending on availability and project scope, fields may include names, job titles, company information, business websites, LinkedIn URLs, business emails, and phone numbers.',
    },
    {
      q: 'Can I request a free sample?',
      a: 'Yes. You can submit a request to discuss a suitable sample based on your requirements.',
    },
    {
      q: 'Which file formats do you deliver?',
      a: 'CSV, Excel, and Google Sheets can be arranged according to the project requirements.',
    },
    {
      q: 'Do you guarantee 100% accuracy?',
      a: 'No data provider can responsibly guarantee that every record will always be accurate. Appropriate checks are performed according to the agreed project scope.',
    },
    {
      q: 'How do I start?',
      a: 'Submit the quote request form with your target audience and required data fields.',
    },
  ],

  // Google Apps Script template code that can be deployed to automatically save rows into Google Sheets
  googleAppsScriptCode: `/**
 * LeadCore Group - Google Sheets Form Sync Script
 * ----------------------------------------------------
 * Instructions:
 * 1. Open Google Sheets (create a new blank spreadsheet).
 * 2. In Row 1, set header columns:
 *    Submission ID | Submission Date | Full Name | Business Email | Company Name | Website | Country | Service Required | Target Industry | Target Job Titles | Company Size | Target Location | Estimated Leads | Required Data Fields | Budget | Deadline | Additional Requirements | Submission Type | Status
 * 3. In the top menu, click Extensions > Apps Script.
 * 4. Delete any code in the editor and paste THIS entire script.
 * 5. Click "Deploy" > "New deployment".
 * 6. Under "Select type" (gear icon), select "Web app".
 * 7. Set:
 *    - Description: "LeadCore Group Web Intake"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (crucial for webhooks to send submissions)
 * 8. Click "Deploy", review permissions, and copy the Web App URL (starts with https://script.google.com/macros/s/...).
 * 9. Set this Web App URL in your .env as GOOGLE_SHEETS_SCRIPT_URL or in the website settings.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Ensure header row exists if empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Submission ID", "Submission Date", "Full Name", "Business Email",
        "Company Name", "Website", "Country", "Service Required",
        "Target Industry", "Target Job Titles", "Company Size", "Target Location",
        "Estimated Leads", "Required Data Fields", "Budget", "Deadline",
        "Additional Requirements", "Submission Type", "Status"
      ]);
    }

    var data = JSON.parse(e.postData.contents);

    var row = [
      data.submissionId || "LCG-" + new Date().getTime(),
      data.submissionDate || new Date().toISOString(),
      data.fullName || "",
      data.businessEmail || "",
      data.companyName || "",
      data.website || "",
      data.country || "",
      data.serviceRequired || "",
      data.targetIndustry || "",
      data.targetJobTitles || "",
      data.companySize || "",
      data.targetLocation || "",
      data.estimatedLeads || "",
      Array.isArray(data.requiredDataFields) ? data.requiredDataFields.join(", ") : (data.requiredDataFields || ""),
      data.budget || "Not Specified",
      data.deadline || "Flexible",
      data.additionalRequirements || "",
      data.submissionType || "Quote Request",
      "Pending Review"
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", submissionId: row[0] }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "active", message: "LeadCore Group Google Sheets Webhook is active." }))
    .setMimeType(ContentService.MimeType.JSON);
}
`,
};
