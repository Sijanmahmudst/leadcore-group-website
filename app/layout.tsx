import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#070b14',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'LeadCore Group | Targeted B2B Lead Generation & Prospect Research',
  description:
    'LeadCore Group helps businesses and sales teams connect with their ideal customers through targeted B2B lead generation, accurate prospect research, and reliable business data.',
  keywords: [
    'LeadCore Group',
    'B2B Lead Generation',
    'Prospect Research',
    'Apollo.io Data Research',
    'LinkedIn Sales Navigator',
    'Data Enrichment',
    'Business Email Research',
    'Prospect List Building',
  ],
  authors: [{ name: 'LeadCore Group' }, { name: 'Sijan' }],
  openGraph: {
    title: 'LeadCore Group | Targeted B2B Lead Generation & Prospect Research',
    description:
      'LeadCore Group helps businesses and sales teams connect with their ideal customers through targeted B2B lead generation, accurate prospect research, and reliable business data.',
    type: 'website',
    siteName: 'LeadCore Group',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LeadCore Group | Targeted B2B Lead Generation & Prospect Research',
    description:
      'LeadCore Group helps businesses and sales teams connect with their ideal customers through targeted B2B lead generation, accurate prospect research, and reliable business data.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'LeadCore Group',
    description:
      'Targeted B2B Lead Generation, Prospect Research, and Business Data Enrichment agency led by specialist Sijan.',
    founder: {
      '@type': 'Person',
      name: 'Sijan',
      jobTitle: 'B2B Lead Generation Specialist & Fiverr Level 2 Seller',
    },
    serviceType: [
      'B2B Lead Generation',
      'Apollo.io Data Research and Export',
      'LinkedIn Sales Navigator Research',
      'Business Email Research',
      'Direct Phone Research',
      'Company Data Enrichment',
      'Custom Prospect Research',
      'Data Cleaning',
    ],
    areaServed: ['United States', 'United Kingdom', 'Canada', 'Australia', 'Global'],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free Sample available for client review upon request',
    },
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#070b14] text-slate-100 antialiased min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
