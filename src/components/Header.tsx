'use client';

import React, { useState } from 'react';
import { Lock, Heart, ShieldCheck } from 'lucide-react';
import { SponsorModal } from './SponsorModal';
import Link from 'next/link';

export function Header() {
  const [isSponsorOpen, setIsSponsorOpen] = useState(false);

  return (
    <>
      <header className="border-b border-zinc-200/90 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* 品牌 Logo 与核心承诺 */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white shadow-xs group-hover:bg-zinc-800 transition-colors">
                <Lock className="w-4 h-4 text-zinc-100" strokeWidth={2} />
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="font-bold text-lg tracking-tight text-zinc-900">
                  本地文转
                </span>
                <span className="hidden sm:inline-block font-mono text-[10px] text-zinc-400">
                  LocalDoc
                </span>
              </div>
            </Link>

            <div className="h-4 w-px bg-zinc-200" />

            {/* 本地离线安全徽标 */}
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>100% 浏览器本地运算</span>
            </div>
          </div>

          {/* 右侧赞助支持 */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsSponsorOpen(true)}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 hover:text-zinc-900 text-xs font-medium transition-all shadow-2xs active:scale-[0.98]"
              title="赞助支持作者"
            >
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>赞助支持</span>
            </button>
          </div>
        </div>
      </header>

      {/* 赞助二维码弹窗 */}
      <SponsorModal isOpen={isSponsorOpen} onClose={() => setIsSponsorOpen(false)} />
    </>
  );
}
