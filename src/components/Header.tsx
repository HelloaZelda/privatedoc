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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-zinc-900 flex items-center justify-center text-white">
              <Lock className="w-3.5 h-3.5" strokeWidth={2} />
            </div>
            <span className="font-bold text-base tracking-tight text-zinc-900">
              本地文转
            </span>
          </Link>

          <button
            onClick={() => setIsSponsorOpen(true)}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 hover:text-zinc-900 text-xs font-medium transition-all"
          >
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>赞助</span>
          </button>
        </div>
      </header>

      {/* 赞助二维码弹窗 */}
      <SponsorModal isOpen={isSponsorOpen} onClose={() => setIsSponsorOpen(false)} />
    </>
  );
}
