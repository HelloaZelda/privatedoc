'use client';

import React from 'react';
import { X, Heart, Coffee } from 'lucide-react';

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
        className="relative w-full max-w-sm rounded-2xl bg-white border border-zinc-200/90 p-6 shadow-xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
          title="关闭"
        >
          <X className="w-4 h-4" />
        </button>

        {/* 弹窗标题 */}
        <div className="text-center space-y-1 pt-1">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-700 mx-auto mb-2">
            <Heart className="w-5 h-5 fill-emerald-600 text-emerald-600" />
          </div>
          <h3 className="text-base font-bold text-zinc-900">赞助支持</h3>
          <p className="text-xs text-zinc-500">
            觉得好用可以请作者喝杯咖啡 ☕
          </p>
        </div>

        {/* 收款码展示区 */}
        <div className="p-3 rounded-xl border border-zinc-200/80 bg-zinc-50/70 flex flex-col items-center justify-center">
          <div className="w-52 h-52 rounded-lg bg-white border border-zinc-200 p-2 shadow-2xs flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/sponsor-qr.png"
              alt="微信赞助收款码"
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-xs text-zinc-600 mt-2.5">
            微信扫一扫
          </p>
        </div>

        {/* 底部 */}
        <div className="text-center pt-1 border-t border-zinc-100">
          <p className="text-[11px] text-zinc-400">
            感谢支持！
          </p>
        </div>
      </div>
    </div>
  );
}
