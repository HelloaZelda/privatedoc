'use client';

import React from 'react';
import { FileText, FileCode } from 'lucide-react';

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
              ? 'bg-white text-zinc-900 shadow-xs font-semibold'
              : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          <FileText className="w-4 h-4 text-emerald-600" strokeWidth={1.75} />
          <span>PDF 转 Markdown</span>
        </button>

        <button
          onClick={() => onTabChange('md-to-pdf')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
            activeTab === 'md-to-pdf'
              ? 'bg-white text-zinc-900 shadow-xs font-semibold'
              : 'text-zinc-600 hover:text-zinc-900'
          }`}
        >
          <FileCode className="w-4 h-4 text-emerald-600" strokeWidth={1.75} />
          <span>Markdown 转 PDF</span>
        </button>
      </div>
    </div>
  );
}
