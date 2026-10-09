'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { TabNavigation, TabType } from '@/components/TabNavigation';
import { PdfToMarkdownWorkspace } from '@/components/PdfToMarkdownWorkspace';
import { MarkdownToPdfWorkspace } from '@/components/MarkdownToPdfWorkspace';
import { UniversalWorkspace } from '@/components/UniversalWorkspace';
import { FormatMatrixGrid } from '@/components/FormatMatrixGrid';
import { AdSenseSlot } from '@/components/AdSenseSlot';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('pdf-to-md');
  const [activeMode, setActiveMode] = useState<'universal' | 'specialized'>('universal');

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-10 pb-16">
        {/* 顶部标题：直接明了，不扯废话 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
            本地文档格式转换
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            直接在你的浏览器里本地转换，不上传服务器，保护隐私。
          </p>

          {/* 模式切换 */}
          <div className="mt-5 flex justify-center">
            <div className="inline-flex p-1 bg-zinc-200/80 rounded-xl text-xs font-medium">
              <button
                onClick={() => setActiveMode('universal')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeMode === 'universal'
                    ? 'bg-white text-zinc-900 shadow-xs font-semibold'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                通用转换（拖入任意文件）
              </button>
              <button
                onClick={() => setActiveMode('specialized')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeMode === 'specialized'
                    ? 'bg-white text-zinc-900 shadow-xs font-semibold'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                PDF ↔ Markdown 深度工作区
              </button>
            </div>
          </div>
        </div>

        {/* 核心工作区 */}
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

        {/* 常用格式互转索引 */}
        <FormatMatrixGrid />

        {/* 赞助展示位 */}
        <AdSenseSlot />
      </main>

      <Footer />
    </div>
  );
}
