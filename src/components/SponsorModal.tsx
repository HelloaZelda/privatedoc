'use client';

import React, { useState } from 'react';
import {
  X,
  Coffee,
  Heart,
  QrCode,
  ExternalLink,
  Copy,
  Check,
  CreditCard,
  Coins,
  Sparkles,
} from 'lucide-react';

interface SponsorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'zh' | 'en';
}

type PaymentChannel = 'wechat' | 'alipay' | 'afdian' | 'coffee' | 'usdt';

export function SponsorModal({ isOpen, onClose, lang = 'zh' }: SponsorModalProps) {
  const [activeChannel, setActiveChannel] = useState<PaymentChannel>('wechat');
  const [copiedUsdt, setCopiedUsdt] = useState(false);
  const [hasAlipayImg, setHasAlipayImg] = useState(true);

  if (!isOpen) return null;
  const isEn = lang === 'en';

  const usdtAddress = 'TQxN8Z9JmK2p8P3xY1w9v7u5t4s3r2q1Z'; // 预留标准化 TRC-20 格式

  const handleCopyUsdt = async () => {
    try {
      await navigator.clipboard.writeText(usdtAddress);
      setCopiedUsdt(true);
      setTimeout(() => setCopiedUsdt(false), 2000);
    } catch {
      // ignore
    }
  };

  const channels = [
    {
      id: 'wechat' as PaymentChannel,
      name: isEn ? 'WeChat' : '微信支付',
      badge: '推荐',
      color: 'emerald',
    },
    {
      id: 'alipay' as PaymentChannel,
      name: isEn ? 'Alipay' : '支付宝',
      badge: null,
      color: 'blue',
    },
    {
      id: 'afdian' as PaymentChannel,
      name: isEn ? 'Afdian' : '爱发电',
      badge: '月度',
      color: 'purple',
    },
    {
      id: 'coffee' as PaymentChannel,
      name: isEn ? 'BuyMeaCoffee' : '海外信用卡',
      badge: 'Global',
      color: 'amber',
    },
    {
      id: 'usdt' as PaymentChannel,
      name: 'USDT',
      badge: 'TRC20',
      color: 'teal',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm sm:max-w-md rounded-[2rem] bg-white border border-zinc-200/90 p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.18)] space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full border border-zinc-200/80 bg-zinc-50 hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-700 transition-colors shadow-3xs"
          title={isEn ? 'Close' : '关闭'}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center pr-6 pl-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold mb-2.5 border border-rose-200/60">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>{isEn ? 'Buy developer a coffee' : '请作者喝杯咖啡 ☕'}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black tracking-tight text-zinc-900">
            {isEn ? 'Support LocalDoc Project' : '赞助支持本地文转'}
          </h3>
          <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
            {isEn
              ? 'LocalDoc is 100% free and in-browser. Your tip keeps the project running and independent.'
              : 'LocalDoc 坚持 100% 免费开源与零数据上传，您的鼓励是作者持续维护与扩充格式的最大动力！'}
          </p>
        </div>

        {/* Payment Channels Segmented Navigation */}
        <div className="flex items-center p-1 rounded-2xl bg-zinc-100/90 border border-zinc-200/80 text-xs overflow-x-auto gap-1">
          {channels.map((ch) => {
            const isActive = activeChannel === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => setActiveChannel(ch.id)}
                className={`flex-1 min-w-[64px] py-1.5 px-2 rounded-xl font-medium transition-all duration-200 whitespace-nowrap text-center text-xs flex flex-col items-center justify-center ${
                  isActive
                    ? 'bg-white text-zinc-900 shadow-xs font-bold'
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-white/40'
                }`}
              >
                <span>{ch.name}</span>
                {ch.badge && (
                  <span
                    className={`text-[9px] font-mono leading-none mt-0.5 px-1 py-0.2 rounded ${
                      isActive ? 'bg-zinc-100 text-zinc-700 font-bold' : 'text-zinc-400'
                    }`}
                  >
                    {ch.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Channel Details Card - Double Bezel */}
        <div className="p-2 rounded-2xl bg-zinc-100/80 border border-zinc-200/80">
          <div className="rounded-[calc(1rem-0.125rem)] bg-white p-5 border border-zinc-200/70 flex flex-col items-center justify-center text-center">
            {/* 1. 微信支付 */}
            {activeChannel === 'wechat' && (
              <div className="space-y-3 flex flex-col items-center animate-in fade-in duration-150">
                <div className="w-48 h-48 sm:w-52 sm:h-52 rounded-xl bg-white border border-zinc-200 p-2 shadow-inner flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/sponsor-qr.png"
                    alt="微信赞助收款码"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <div className="text-xs text-zinc-500">
                  <span className="font-semibold text-emerald-700">微信扫码</span> 自由赞助任意金额
                </div>
              </div>
            )}

            {/* 2. 支付宝 */}
            {activeChannel === 'alipay' && (
              <div className="space-y-3 flex flex-col items-center animate-in fade-in duration-150 w-full">
                {hasAlipayImg ? (
                  <div className="w-48 h-48 sm:w-52 sm:h-52 rounded-xl bg-white border border-zinc-200 p-2 shadow-inner flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/alipay-qr.png"
                      alt="支付宝收款码"
                      className="w-full h-full object-contain rounded-lg"
                      onError={() => setHasAlipayImg(false)}
                    />
                  </div>
                ) : (
                  <div className="w-48 h-48 sm:w-52 sm:h-52 rounded-xl bg-blue-50/50 border border-dashed border-blue-200 p-4 flex flex-col items-center justify-center text-center">
                    <QrCode className="w-10 h-10 text-blue-500 mb-2" />
                    <p className="text-xs font-bold text-zinc-800">支付宝通道支持</p>
                    <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                      将支付宝收款码重命名为 <code className="bg-zinc-200/80 px-1 rounded font-mono">public/alipay-qr.png</code> 即可自动显现
                    </p>
                  </div>
                )}
                <div className="text-xs text-zinc-500">
                  <span className="font-semibold text-blue-600">支付宝扫码</span> 转账或打赏
                </div>
              </div>
            )}

            {/* 3. 爱发电 */}
            {activeChannel === 'afdian' && (
              <div className="space-y-4 py-4 flex flex-col items-center animate-in fade-in duration-150 w-full max-w-xs">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center shadow-3xs">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900">爱发电 (Afdian)</h4>
                  <p className="text-xs text-zinc-500 mt-1">
                    国内支持微信、支付宝、银行卡的原生赞助平台
                  </p>
                </div>
                <a
                  href="https://afdian.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs transition-all active:scale-95"
                >
                  <span>前往爱发电页面</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* 4. Buy Me a Coffee / 海外 */}
            {activeChannel === 'coffee' && (
              <div className="space-y-4 py-4 flex flex-col items-center animate-in fade-in duration-150 w-full max-w-xs">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shadow-3xs">
                  <Coffee className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900">Buy Me a Coffee / PayPal</h4>
                  <p className="text-xs text-zinc-500 mt-1">
                    Support with Visa, Mastercard, Apple Pay, Google Pay or PayPal
                  </p>
                </div>
                <a
                  href="https://buymeacoffee.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-full bg-amber-400 hover:bg-amber-500 text-zinc-900 text-xs font-bold shadow-xs transition-all active:scale-95"
                >
                  <span>Buy Me a Coffee ☕</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* 5. USDT 加密货币 */}
            {activeChannel === 'usdt' && (
              <div className="space-y-4 py-3 flex flex-col items-center animate-in fade-in duration-150 w-full">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center shadow-3xs">
                  <Coins className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900">USDT (TRC-20)</h4>
                  <p className="text-xs text-zinc-500 mt-1">
                    Web3 / 匿名多币种链上赞助支持
                  </p>
                </div>

                <div className="w-full bg-zinc-50 p-2.5 rounded-xl border border-zinc-200/80 flex items-center justify-between text-xs font-mono text-zinc-700">
                  <span className="truncate max-w-[220px] select-all">{usdtAddress}</span>
                  <button
                    onClick={handleCopyUsdt}
                    className="ml-2 inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white border border-zinc-200 hover:bg-zinc-100 text-xs text-zinc-800 font-sans transition-colors shrink-0 shadow-3xs active:scale-95"
                  >
                    {copiedUsdt ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">已复制</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-zinc-500" />
                        <span>复制</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-[11px] text-zinc-400 font-mono">
          © LocalDoc · 感谢每一位支持独立软件的开发者与用户
        </div>
      </div>
    </div>
  );
}
