'use client';

import React from 'react';
import { ArrowRightLeft, FileCode, FileText } from 'lucide-react';

export type TabType = 'pdf-to-md' | 'md-to-pdf';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex p-1 rounded-xl bg-zinc-200/70 border border-zinc-200/90 shadow-2xs">
        <button
          onClick={() => onTabChange('pdf-to-md')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
            activeTab === 'pdf-to-md'
              ? 'bg-white text-zinc-900 shadow-xs'
              : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          <FileText className="w-4 h-4 text-emerald-600" strokeWidth={1.75} />
          <span>PDF to Markdown</span>
          <span className="hidden sm:inline font-mono text-[10px] bg-zinc-100 text-zinc-500 px-1.5 py-0.5 rounded border border-zinc-200">
            PDF → MD
          </span>
        </button>

        <button
          onClick={() => onTabChange('md-to-pdf')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
            activeTab === 'md-to-pdf'
              ? 'bg-white text-zinc-900 shadow-xs'
              : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          <FileCode className="w-4 h-4 text-emerald-600" strokeWidth={1.75} />
          <span>Markdown to PDF</span>
          <span className="hidden sm:inline font-mono text-[10px] bg-zinc-100 text-zinc-500 px-1.5 py-0.5 rounded border border-zinc-200">
            MD → PDF
          </span>
        </button>
      </div>
    </div>
  );
}
