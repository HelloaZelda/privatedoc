'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { UniversalWorkspace } from '@/components/UniversalWorkspace';
import { FormatMatrixGrid } from '@/components/FormatMatrixGrid';
import { AdSenseSlot } from '@/components/AdSenseSlot';
import { Footer } from '@/components/Footer';

export default function EnglishHome() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50">
      <Header lang="en" />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-10 pb-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
            Private File & Document Converter
          </h1>
        </div>

        <div className="w-full mb-12">
          <UniversalWorkspace lang="en" />
        </div>

        <FormatMatrixGrid lang="en" />

        <AdSenseSlot />
      </main>

      <Footer />
    </div>
  );
}
