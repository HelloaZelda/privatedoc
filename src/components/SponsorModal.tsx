'use client';

import React, { useState } from 'react';
import { X, QrCode, Heart, Coffee, Check, Copy } from 'lucide-react';

interface SponsorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SponsorModal({ isOpen, onClose }: SponsorModalProps) {
  const [activeChannel, setActiveChannel] = useState<'wechat' | 'alipay'>('wechat');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-sm rounded-2xl bg-white border border-zinc-200 p-6 shadow-xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 mx-auto mb-2">
            <Coffee className="w-5 h-5" strokeWidth={1.75} />
          </div>
          <h3 className="text-base font-bold text-zinc-900">支持 PrivateDoc 持续运行</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            本项目承诺 100% 浏览器本地运算，永久免费且绝不上传服务器。你的支持是项目持续维护的动力！
          </p>
        </div>

        {/* Channel Switcher */}
        <div className="flex p-1 bg-zinc-100 rounded-lg border border-zinc-200 text-xs font-medium">
          <button
            onClick={() => setActiveChannel('wechat')}
            className={`flex-1 py-1.5 rounded-md transition-all ${
              activeChannel === 'wechat'
                ? 'bg-white text-emerald-700 font-semibold shadow-2xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            微信赞助码
          </button>
          <button
            onClick={() => setActiveChannel('alipay')}
            className={`flex-1 py-1.5 rounded-md transition-all ${
              activeChannel === 'alipay'
                ? 'bg-white text-sky-700 font-semibold shadow-2xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            支付宝赞助
          </button>
        </div>

        {/* QR Code Container */}
        <div className="p-4 rounded-xl border border-zinc-200/80 bg-zinc-50 flex flex-col items-center justify-center min-h-[220px]">
          {/* Replace src with your actual QR code image path in /public/wechat-pay.png or alipay.png */}
          <div className="w-44 h-44 rounded-lg bg-white border border-zinc-200 flex flex-col items-center justify-center p-2 shadow-2xs text-center">
            {/* Fallback mockup QR illustration until user replaces image */}
            <div className="w-full h-full border border-dashed border-zinc-300 rounded flex flex-col items-center justify-center p-3 text-zinc-400 space-y-2">
              <QrCode className="w-12 h-12 text-zinc-400" strokeWidth={1.5} />
              <p className="text-[11px] font-mono text-zinc-500">
                请放置你的赞助码图片到 <br />
                <code className="text-zinc-700 bg-zinc-100 px-1 py-0.5 rounded text-[10px]">
                  public/{activeChannel}.png
                </code>
              </p>
            </div>
          </div>

          <p className="text-[11px] font-mono text-zinc-500 mt-3">
            {activeChannel === 'wechat' ? '打开微信扫一扫' : '打开支付宝扫一扫'}
          </p>
        </div>

        {/* Footer Note */}
        <div className="text-center pt-1 border-t border-zinc-100">
          <p className="text-[11px] text-zinc-400">
            一杯咖啡的温暖，助推开源与独立小工具 ❤️
          </p>
        </div>
      </div>
    </div>
  );
}
