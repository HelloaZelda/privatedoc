'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { TabNavigation, TabType } from '@/components/TabNavigation';
import { PdfToMarkdownWorkspace } from '@/components/PdfToMarkdownWorkspace';
import { MarkdownToPdfWorkspace } from '@/components/MarkdownToPdfWorkspace';
import { UniversalWorkspace } from '@/components/UniversalWorkspace';
import { FormatMatrixGrid } from '@/components/FormatMatrixGrid';
import { TrustSection } from '@/components/TrustSection';
import { AdSenseSlot } from '@/components/AdSenseSlot';
import { Footer } from '@/components/Footer';
import { ShieldCheck, Sparkles, Layers } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('pdf-to-md');
  const [activeMode, setActiveMode] = useState<'universal' | 'specialized'>('universal');

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50 selection:bg-emerald-100 selection:text-emerald-900">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-10 pb-16">
        {/* Engineering-Grade Hero Banner */}
        <div className="max-w-2xl mx-auto text-center mb-8">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% 浏览器本地运算 • 绝不上传服务器</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900">
            全格式智能文档转换站
          </h1>

          <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed max-w-xl mx-auto">
            拖入任意文件（PDF、Word、Markdown、CSV、JSON、图片），本地 WebAssembly 引擎瞬间自动识别并秒转。断网可用，0 隐私风险。
          </p>

          {/* Mode Switcher */}
          <div className="mt-6 flex justify-center">
            <div className="inline-flex p-1 bg-zinc-200/70 border border-zinc-200/90 rounded-xl text-xs font-medium">
              <button
                onClick={() => setActiveMode('universal')}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg transition-all ${
                  activeMode === 'universal'
                    ? 'bg-white text-zinc-900 shadow-2xs font-semibold'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>智能全能转换舱 (拖入任意文件)</span>
              </button>
              <button
                onClick={() => setActiveMode('specialized')}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg transition-all ${
                  activeMode === 'specialized'
                    ? 'bg-white text-zinc-900 shadow-2xs font-semibold'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-zinc-500" />
                <span>PDF ↔ MD 深度工作台</span>
              </button>
            </div>
          </div>
        </div>

        {/* Workspace Display */}
        <div className="w-full mb-12">
          {activeMode === 'universal' ? (
            <UniversalWorkspace />
          ) : (
            <div>
              <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
              {activeTab === 'pdf-to-md' ? (
                <PdfToMarkdownWorkspace />
              ) : (
                <MarkdownToPdfWorkspace />
              )}
            </div>
          )}
        </div>

        {/* Multi-Format Matrix Grid for Broad SEO and Easy Navigation */}
        <FormatMatrixGrid />

        {/* Trust & Architecture Section */}
        <TrustSection />

        {/* Google / Domestic AdSense Slot */}
        <AdSenseSlot />
      </main>

      <Footer />
    </div>
  );
}
