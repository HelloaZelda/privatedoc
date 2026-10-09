'use client';

import React from 'react';
import { X } from 'lucide-react';

interface SponsorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SponsorModal({ isOpen, onClose }: SponsorModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xs rounded-2xl bg-white border border-zinc-200 p-6 shadow-xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
          title="关闭"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center">
          <h3 className="text-sm font-semibold text-zinc-900">赞助</h3>
        </div>

        <div className="p-2 rounded-xl border border-zinc-200 bg-zinc-50 flex flex-col items-center justify-center">
          <div className="w-48 h-48 rounded-lg bg-white border border-zinc-200 p-2 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/sponsor-qr.png"
              alt="微信赞助收款码"
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-xs text-zinc-500 mt-2">微信扫码</p>
        </div>
      </div>
    </div>
  );
}
