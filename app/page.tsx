'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { HowItWorks } from '@/components/HowItWorks';
import { SampleData } from '@/components/SampleData';
import { AboutUs } from '@/components/AboutUs';
import { ContactSection } from '@/components/ContactSection';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { LegalModal } from '@/components/LegalModal';
import { DeploymentGuideModal } from '@/components/DeploymentGuideModal';
import { SITE_CONFIG } from '@/lib/site-config';

export default function HomePage() {
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);
  const [formDefaultMode, setFormDefaultMode] = useState<'Free Sample' | 'Quote Request'>('Free Sample');
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [showDeploymentGuide, setShowDeploymentGuide] = useState(false);

  // Smooth scroll helper to contact form with preselected option
  const scrollToContact = (service?: string, mode?: 'Free Sample' | 'Quote Request') => {
    if (service) setSelectedService(service);
    if (mode) setFormDefaultMode(mode);

    const contactEl = document.querySelector('#contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const servicesEl = document.querySelector('#services');
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Sticky Header Navigation */}
      <Navbar
        onOpenFreeSample={() => scrollToContact(undefined, 'Free Sample')}
        onOpenSetupGuide={() => setShowDeploymentGuide(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero Section with Custom Interactive Dashboard Visual */}
        <Hero
          onGetFreeSample={() => scrollToContact(undefined, 'Free Sample')}
          onExploreServices={scrollToServices}
        />

        {/* 2. Services Section (8 specialized service cards) */}
        <Services
          onRequestService={(serviceName) => scrollToContact(serviceName, 'Quote Request')}
        />

        {/* 3. Why Choose LeadCore Group (7 points + honest accuracy commitment) */}
        <WhyChooseUs />

        {/* 4. How It Works (4-step timeline: horizontal desktop / vertical mobile) */}
        <HowItWorks
          onStartProject={() => scrollToContact(undefined, 'Quote Request')}
        />

        {/* 5. Sample Data / Portfolio (Demo table, filters, CSV download preview) */}
        <SampleData
          onRequestCustomSample={() => scrollToContact(undefined, 'Free Sample')}
        />

        {/* 6. About Us (Research-driven B2B lead gen, Founder Sijan spotlight) */}
        <AboutUs />

        {/* 7. Contact Section with Lead & Quote Form */}
        <ContactSection
          preselectedService={selectedService}
          defaultMode={formDefaultMode}
          onOpenPrivacyNotice={() => setLegalModalType('privacy')}
          onOpenSetupGuide={() => setShowDeploymentGuide(true)}
        />

        {/* 8. Frequently Asked Questions (Accordion) */}
        <FAQ
          onStartInquiry={() => scrollToContact(undefined, 'Quote Request')}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
        onSelectService={(service) => scrollToContact(service, 'Quote Request')}
        onOpenSetupGuide={() => setShowDeploymentGuide(true)}
      />

      {/* Legal Modals (Privacy Policy & Terms of Service) */}
      <LegalModal
        isOpen={Boolean(legalModalType)}
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* Google Sheets Synchronization & Free Deployment Guide Modal */}
      <DeploymentGuideModal
        isOpen={showDeploymentGuide}
        onClose={() => setShowDeploymentGuide(false)}
      />
    </div>
  );
}
