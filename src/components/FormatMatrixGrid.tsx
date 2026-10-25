'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CONVERSION_PAIRS, ConversionPair } from '@/lib/format-registry';
import { ArrowUpRight, FileText, Image as ImageIcon, Database, Layers } from 'lucide-react';

export function FormatMatrixGrid({ lang = 'zh' }: { lang?: 'zh' | 'en' }) {
  const isEn = lang === 'en';
  const [activeTab, setActiveTab] = useState<'all' | 'document' | 'image' | 'data'>('all');

  const filteredPairs = activeTab === 'all'
    ? CONVERSION_PAIRS
    : CONVERSION_PAIRS.filter((p) => p.category === activeTab);

  const tabs = [
    { id: 'all', label: isEn ? 'All Formats' : '全部格式', icon: Layers },
    { id: 'document', label: isEn ? 'Documents' : '文档互转', icon: FileText },
    { id: 'image', label: isEn ? 'Images' : '图片转换', icon: ImageIcon },
    { id: 'data', label: isEn ? 'Data & Tables' : '数据表格', icon: Database },
  ] as const;

  return (
    <section className="my-16">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full mb-2">
              <span>{isEn ? 'Format Catalog' : '全格式目录'}</span>
              <span>·</span>
              <span>{filteredPairs.length} {isEn ? 'Tools' : '组独立工具'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">
              {isEn ? 'Explore Supported Format Pipelines' : '探索支持的高保真转换矩阵'}
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center p-1 rounded-full bg-zinc-200/60 border border-zinc-200/80 text-xs overflow-x-auto self-start sm:self-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full font-medium transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-zinc-900 shadow-xs font-semibold'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento Grid of Format Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredPairs.map((pair) => (
            <Link
              key={pair.slug}
              href={isEn ? `/en/convert/${pair.slug}` : `/convert/${pair.slug}`}
              className="group relative p-4 rounded-2xl border border-zinc-200/80 bg-white hover:bg-zinc-50/80 hover:border-zinc-300 shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.04)] transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-zinc-100 border border-zinc-200/80 text-[11px] font-mono font-bold text-zinc-800 uppercase">
                      {pair.from}
                    </span>
                    <span className="text-zinc-300 text-xs font-mono">→</span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200/80 text-[11px] font-mono font-bold text-emerald-800 uppercase">
                      {pair.to}
                    </span>
                  </div>

                  <div className="w-6 h-6 rounded-full bg-zinc-50 border border-zinc-200/60 flex items-center justify-center text-zinc-400 group-hover:text-emerald-700 group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                  {isEn ? `${pair.from} to ${pair.to}` : pair.name}
                </h3>
              </div>

              <div className="mt-3 pt-2.5 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400">
                <span className="font-mono">{pair.slug}</span>
                <span className="group-hover:text-zinc-600 transition-colors">
                  {isEn ? 'Convert' : '立即转换'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
