'use client';

import React, { useState } from 'react';
import { Coffee, Lock, Cpu, QrCode } from 'lucide-react';
import { SponsorModal } from './SponsorModal';

export function Header() {
  const [isSponsorOpen, setIsSponsorOpen] = useState(false);

  return (
    <>
      <header className="border-b border-zinc-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand & Privacy Status */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white shadow-sm ring-1 ring-zinc-900/10">
                <Lock className="w-4 h-4 text-zinc-100" strokeWidth={2} />
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="font-semibold text-lg tracking-tight text-zinc-900">
                  PrivateDoc
                </span>
                <span className="hidden sm:inline-block font-mono text-[11px] text-zinc-600 bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200">
                  v1.0.0
                </span>
              </div>
            </div>

            <div className="h-4 w-px bg-zinc-200" />

            {/* Local Security Badge */}
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-medium tracking-tight">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium">100% Local & Private</span>
            </div>
          </div>

          {/* Action / Sponsor Button */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-1.5 text-xs font-mono text-zinc-600 bg-zinc-50 border border-zinc-200/80 px-2.5 py-1 rounded-md">
              <Cpu className="w-3.5 h-3.5 text-zinc-500" strokeWidth={1.5} />
              <span>Client RAM Execution</span>
            </div>

            {/* Tap to open WeChat / Alipay sponsor modal */}
            <button
              onClick={() => setIsSponsorOpen(true)}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 hover:text-zinc-900 text-xs font-medium transition-all shadow-xs active:scale-[0.98] -translate-y-[0.5px]"
              title="支持开发者 / 赞助项目"
            >
              <Coffee className="w-3.5 h-3.5 text-amber-600" strokeWidth={1.75} />
              <span>赞助支持 / Buy me coffee</span>
            </button>
          </div>
        </div>
      </header>

      {/* Domestic QR Code Modal */}
      <SponsorModal isOpen={isSponsorOpen} onClose={() => setIsSponsorOpen(false)} />
    </>
  );
}
