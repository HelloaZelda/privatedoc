'use client';

import React, { useState } from 'react';
import { Lock, Heart, ShieldCheck, Globe, Sparkles } from 'lucide-react';
import { SponsorModal } from './SponsorModal';
import Link from 'next/link';

export function Header({ lang = 'zh' }: { lang?: 'zh' | 'en' }) {
  const [isSponsorOpen, setIsSponsorOpen] = useState(false);
  const isEn = lang === 'en';

  return (
    <>
      <header className="sticky top-0 sm:top-3 z-40 w-full max-w-5xl mx-auto px-3 sm:px-6 transition-all duration-300">
        <div className="bg-white/85 backdrop-blur-xl border border-zinc-200/90 rounded-2xl sm:rounded-full px-3.5 sm:px-5 py-2.5 shadow-[0_8px_25px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.02] flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <Link
            href={isEn ? '/en' : '/'}
            className="flex items-center space-x-2.5 group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-0.5 shadow-xs border border-zinc-700/50 shrink-0 group-hover:scale-105 transition-transform duration-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icon.svg" alt="LocalDoc Logo" className="w-full h-full object-cover rounded-[10px]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-zinc-900 group-hover:text-emerald-700 transition-colors">
                  {isEn ? 'LocalDoc' : '本地文转'}
                </span>
                <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[10px] font-mono font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                  <span className="w-1 h-1 rounded-full bg-emerald-500 mr-1 animate-pulse"></span>
                  Wasm
                </span>
              </div>
              <span className="hidden sm:inline-block text-[10px] font-mono text-zinc-400 -mt-0.5">
                {isEn ? '100% Client-Side Engine' : '100% 浏览器本地运算'}
              </span>
            </div>
          </Link>

          {/* Action Center */}
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            <Link
              href={isEn ? '/' : '/en'}
              className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-full border border-zinc-200/80 bg-zinc-50/80 hover:bg-zinc-100/80 text-zinc-600 hover:text-zinc-900 text-xs font-mono font-medium transition-all active:scale-95"
              title={isEn ? '切换为中文' : 'Switch to English'}
            >
              <Globe className="w-3 h-3 text-zinc-400" />
              <span>{isEn ? '中文' : 'EN'}</span>
            </Link>

            <button
              onClick={() => setIsSponsorOpen(true)}
              className="group inline-flex items-center space-x-1.5 px-3 sm:px-3.5 py-1.5 rounded-full border border-rose-200/70 bg-gradient-to-r from-rose-50/90 to-pink-50/80 hover:from-rose-100/90 hover:to-pink-100/90 text-rose-700 text-xs font-medium transition-all shadow-[0_2px_8px_rgba(244,63,94,0.08)] active:scale-95"
            >
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 group-hover:scale-110 transition-transform" />
              <span>{isEn ? 'Sponsor' : '赞助支持'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 赞助二维码弹窗 */}
      <SponsorModal isOpen={isSponsorOpen} onClose={() => setIsSponsorOpen(false)} lang={lang} />
    </>
  );
}
