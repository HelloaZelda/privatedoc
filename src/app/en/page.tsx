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
  ArrowRight,
  CheckCircle2,
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
    <div className="min-h-screen flex flex-col bg-zinc-50/70 relative overflow-x-hidden selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Ambient Lighting Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[480px] overflow-hidden -z-10 pointer-events-none select-none">
        <div className="absolute top-[-140px] left-1/2 -translate-x-1/2 w-[760px] h-[360px] bg-gradient-to-b from-emerald-200/40 via-teal-100/25 to-transparent blur-3xl rounded-full" />
      </div>

      <Header lang="en" />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-20">
        {/* Hero Section */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-zinc-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.03)] mb-5 ring-1 ring-black/[0.02]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-zinc-700 tracking-wide font-mono">
              100% In-Browser Sandbox · Zero Server Uploads · Enterprise Safe
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 leading-[1.12]">
            Confidential Document <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">Conversion</span>
          </h1>

          <p className="mt-3.5 sm:mt-4 text-sm sm:text-base lg:text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed font-normal">
            A high-speed, local WebAssembly conversion engine designed for developers, legal teams, and privacy-conscious users. PDF, Word, Markdown, and CSV processed securely on your device.
          </p>
        </div>

        {/* Universal Workspace Dropzone */}
        <div className="w-full mb-14">
          <UniversalWorkspace lang="en" />
        </div>

        {/* Format Matrix Bento */}
        <FormatMatrixGrid lang="en" />

        {/* Asymmetrical Bento Grid */}
        <section className="my-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full mb-2.5">
              <span>Security Blueprint</span>
              <span>·</span>
              <span>Why LocalDoc</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">
              Why Professionals Reject Cloud File Uploads
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-500 max-w-xl mx-auto">
              Uploading confidential financial reports, contracts, or source code to remote servers creates irreversible breach and AI scraping risks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {/* Bento Card 1 - Double Width Highlight */}
            <div className="md:col-span-2 p-2 sm:p-2.5 rounded-[2rem] bg-gradient-to-b from-zinc-200/70 via-zinc-100/50 to-zinc-200/70 border border-zinc-200/90 shadow-[0_15px_35px_rgba(0,0,0,0.02)]">
              <div className="h-full rounded-[calc(2rem-0.625rem)] bg-white p-7 sm:p-9 border border-zinc-200/80 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/70 text-emerald-700 flex items-center justify-center mb-5 shadow-3xs">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-lg sm:text-xl text-zinc-900 mb-2.5">
                    Zero Network Telemetry · Ephemeral Memory Sandbox
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-xl">
                    Every conversion algorithm executes inside your device memory via Mozilla PDF.js, Mammoth, and WebAssembly. Disconnect your internet connection at any time—conversion will continue to operate with 100% fidelity.
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-zinc-100 flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-500">
                  <span className="inline-flex items-center text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    Complete Local Isolation
                  </span>
                  <span className="inline-flex items-center text-zinc-600 bg-zinc-100 px-2.5 py-1 rounded-lg">
                    GDPR & Enterprise Compliant
                  </span>
                </div>
              </div>
            </div>

            {/* Bento Card 2 - Speed */}
            <div className="p-2 sm:p-2.5 rounded-[2rem] bg-zinc-200/60 border border-zinc-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.02)]">
              <div className="h-full rounded-[calc(2rem-0.625rem)] bg-white p-7 border border-zinc-200/80 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/70 text-amber-700 flex items-center justify-center mb-5 shadow-3xs">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-zinc-900 mb-2">
                    Native CPU Acceleration
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Skip network delays and remote server queues. Harness your multi-core processor for multi-threaded parallel document processing.
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-100 text-[11px] font-mono text-amber-800 font-bold">
                  ⚡ 0 Upload Latency · 0 Queue Wait
                </div>
              </div>
            </div>

            {/* Bento Card 3 - Offline PWA */}
            <div className="md:col-span-3 p-2 sm:p-2.5 rounded-[2rem] bg-zinc-200/60 border border-zinc-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.02)]">
              <div className="rounded-[calc(2rem-0.625rem)] bg-white p-6 sm:p-8 border border-zinc-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200/70 text-indigo-700 flex items-center justify-center shrink-0 shadow-3xs">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-zinc-900">
                      Offline Airplane & Air-Gapped Compatibility
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Equipped with Service Worker caching. Convert files securely on flights, high-speed rail, or secure air-gapped corporate environments.
                    </p>
                  </div>
                </div>

                <Link
                  href="/about"
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-xs font-semibold text-zinc-800 transition-colors self-start sm:self-auto shrink-0"
                >
                  <span>Learn Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Bento Section */}
        <section className="my-20 p-2 sm:p-2.5 rounded-[2.5rem] bg-gradient-to-b from-zinc-200/60 via-zinc-100/30 to-zinc-200/60 border border-zinc-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.02)]">
          <div className="rounded-[calc(2.5rem-0.625rem)] bg-white p-6 sm:p-10 border border-zinc-200/80">
            <div className="flex items-center space-x-2.5 mb-8">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200/70 text-emerald-700 flex items-center justify-center shadow-3xs">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-zinc-900">
                  Frequently Asked Questions (FAQ)
                </h2>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">
                  Frequently Asked Questions & Technical Specifications
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-zinc-50/70 border border-zinc-200/70">
                  <h3 className="text-sm font-bold text-zinc-900 mb-2 flex items-start">
                    <span className="text-emerald-700 font-mono mr-2 font-black">Q{idx + 1}.</span>
                    {faq.q}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed pl-5 font-normal">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AdSense Slot */}
        <div className="my-10">
          <AdSenseSlot />
        </div>
      </main>

      <Footer />
    </div>
  );
}
