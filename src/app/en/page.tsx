'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { UniversalWorkspace } from '@/components/UniversalWorkspace';
import { FormatMatrixGrid } from '@/components/FormatMatrixGrid';
import { AdSenseSlot } from '@/components/AdSenseSlot';
import { Footer } from '@/components/Footer';
import {
  ShieldCheck,
  Zap,
  Lock,
  Cpu,
  HelpCircle,
} from 'lucide-react';

export default function EnglishHome() {
  const faqs = [
    {
      q: 'Why is LocalDoc 100% private and secure?',
      a: 'Unlike traditional online converters that upload files to cloud servers, LocalDoc runs entirely inside your browser using WebAssembly (Wasm). All document transformations happen in local RAM without sending a single byte across the internet.',
    },
    {
      q: 'Is there any file size limit?',
      a: 'No artificial server quotas. Because processing relies on your local CPU and available memory, large files and high-resolution images convert instantly without queueing.',
    },
    {
      q: 'Where are converted files stored?',
      a: 'Downloaded files are saved directly into your device download folder via browser memory blobs. Once you close or reload the tab, memory is cleared with zero persistent traces.',
    },
    {
      q: 'Does it work offline?',
      a: 'Yes! LocalDoc is equipped with a Progressive Web App (PWA) Service Worker. Once loaded, you can convert documents on airplanes, trains, or air-gapped corporate environments without an active internet connection.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50">
      <Header lang="en" />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-10 pb-16">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-medium mb-3 border border-emerald-200/50">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Client-Side In-Browser Conversion · Zero Server Upload</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
            Offline & Private Document Converter
          </h1>
          <p className="mt-2.5 text-sm sm:text-base text-zinc-500 max-w-2xl mx-auto">
            High-speed, confidential document conversion for developers, enterprises, and creators. Convert PDF, Markdown, Word, and CSV in milliseconds.
          </p>
        </div>

        <div className="w-full mb-12">
          <UniversalWorkspace lang="en" />
        </div>

        <div className="my-12">
          <FormatMatrixGrid lang="en" />
        </div>

        {/* Feature Highlights */}
        <section className="my-14 space-y-8">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">
              Why Choose Local In-Browser Processing?
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-zinc-500">
              Never risk sensitive financial, legal, or intellectual property on unknown servers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-zinc-900 mb-2">Zero Data Upload</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Calculations execute in your browser WebAssembly sandbox. Files never touch any remote server, fulfilling strict compliance demands.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-zinc-900 mb-2">Instant Millisecond Speed</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Skip slow network transfers and server queues. Maximize multi-threaded local hardware for instantaneous rendering.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-zinc-900 mb-2">Offline PWA Engine</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Equipped with service workers for uninterrupted offline work. Convert files anywhere even without internet connectivity.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="my-14 bg-white p-6 sm:p-10 rounded-2xl border border-zinc-200/80 shadow-2xs">
          <div className="flex items-center space-x-2.5 mb-6">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold tracking-tight text-zinc-900">
              Frequently Asked Questions (FAQ)
            </h2>
          </div>

          <div className="divide-y divide-zinc-100">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-4 first:pt-0 last:pb-0">
                <h3 className="text-sm font-semibold text-zinc-900 mb-1.5 flex items-start">
                  <span className="text-emerald-600 font-mono mr-2">Q{idx + 1}.</span>
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 pl-6 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        <AdSenseSlot />
      </main>

      <Footer />
    </div>
  );
}
