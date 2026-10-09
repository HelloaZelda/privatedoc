'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { TabNavigation, TabType } from '@/components/TabNavigation';
import { PdfToMarkdownWorkspace } from '@/components/PdfToMarkdownWorkspace';
import { MarkdownToPdfWorkspace } from '@/components/MarkdownToPdfWorkspace';
import { TrustSection } from '@/components/TrustSection';
import { AdSenseSlot } from '@/components/AdSenseSlot';
import { Footer } from '@/components/Footer';
import { ShieldCheck, HardDriveDownload } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('pdf-to-md');

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50 selection:bg-emerald-100 selection:text-emerald-900">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-10 pb-16">
        {/* Subtle, Engineering-Grade Hero Banner */}
        <div className="max-w-2xl mx-auto text-center mb-8">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>AIR-GAPPED COMPUTE SANDBOX</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900">
            Convert documents locally in your browser.
          </h1>

          <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed max-w-xl mx-auto">
            Zero cloud uploads. Zero queuing delays. Fast, client-side bidirectional conversion between PDF and clean Markdown without sacrificing confidentiality.
          </p>
        </div>

        {/* Tab Selection */}
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Workspace Container */}
        <div className="w-full">
          {activeTab === 'pdf-to-md' ? (
            <PdfToMarkdownWorkspace />
          ) : (
            <MarkdownToPdfWorkspace />
          )}
        </div>

        {/* Trust & Architecture Section */}
        <TrustSection />

        {/* Google AdSense Slot */}
        <AdSenseSlot />
      </main>

      <Footer />
    </div>
  );
}
