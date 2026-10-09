'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { Mail, ExternalLink, Sparkles } from 'lucide-react';

interface AdSlotProps {
  /** 模式: 'wwads' (国内万维广告，最推荐) | 'adsense' (Google) | 'direct' (自营推广/商务合作) */
  mode?: 'wwads' | 'adsense' | 'direct';
  /** Google AdSense 单元 ID */
  adSenseSlot?: string;
  /** 万维广告 WWAds 广告位 ID (从 wwads.cn 申请获取) */
  wwadsId?: string;
  className?: string;
}

export function AdSenseSlot({
  mode = 'direct',
  adSenseSlot,
  wwadsId,
  className = '',
}: AdSlotProps) {
  const adSenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    if (mode === 'adsense' && adSenseClient && adSenseSlot && typeof window !== 'undefined') {
      try {
        // @ts-expect-error adsbygoogle window global
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, [mode, adSenseClient, adSenseSlot]);

  return (
    <div className={`w-full max-w-5xl mx-auto my-10 ${className}`}>
      {/* 载入万维广告国内高速 CDN 脚本 (仅在启用 wwads 时) */}
      {mode === 'wwads' && wwadsId && (
        <Script
          src="https://cdn.wwads.cn/js/makemoney.js"
          strategy="lazyOnload"
        />
      )}

      <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50/70 p-4 sm:p-5 text-center transition-all">
        {/* 顶部技术小标签 */}
        <div className="flex items-center justify-between border-b border-zinc-200/80 pb-2 mb-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
            SPONSORED / 赞助合作展示区
          </span>
          <span className="text-[10px] font-mono text-zinc-400">
            {mode === 'wwads'
              ? 'WWADS (万维技术联盟)'
              : mode === 'adsense'
              ? 'GOOGLE ADSENSE'
              : 'DIRECT SPONSOR / 自营推荐'}
          </span>
        </div>

        {/* 1. 国内万维广告模式 */}
        {mode === 'wwads' && wwadsId && (
          <div className="min-h-[90px] flex items-center justify-center bg-white rounded-lg border border-zinc-200 p-2">
            <div
              className="wwads-cn wwads-horizontal"
              data-id={wwadsId}
              style={{ maxWidth: '100%' }}
            />
          </div>
        )}

        {/* 2. Google AdSense 模式 */}
        {mode === 'adsense' && (
          <div className="min-h-[90px] flex flex-col items-center justify-center rounded-lg bg-white border border-zinc-200/80 overflow-hidden">
            {adSenseClient && adSenseSlot ? (
              <ins
                className="adsbygoogle"
                style={{ display: 'block', minHeight: '90px', width: '100%' }}
                data-ad-client={adSenseClient}
                data-ad-slot={adSenseSlot}
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
            ) : (
              <div className="py-4 text-xs font-mono text-zinc-400">
                Google AdSense 待配置（在国内建议优先使用万维广告或自营展位）
              </div>
            )}
          </div>
        )}

        {/* 3. 自营展位 / 商业合作直投模式（国内独立开发者最常见、最体面模式） */}
        {mode === 'direct' && (
          <div className="min-h-[80px] flex flex-col sm:flex-row items-center justify-between gap-4 rounded-lg bg-white border border-zinc-200/90 p-4 sm:px-6 text-left">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                  合作推荐
                </span>
                <h4 className="text-xs sm:text-sm font-semibold text-zinc-900">
                  优质开发者服务与云资源赞助展位
                </h4>
              </div>
              <p className="text-[11px] text-zinc-500 max-w-xl leading-relaxed">
                本工具每日为众多工程师、技术创作者提供 100% 本地文档解析。欢迎开发工具、SaaS、云服务品牌洽谈赞助。
              </p>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <a
                href="mailto:contact@yourdomain.com?subject=PrivateDoc%20广告赞助咨询"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 text-xs font-medium transition-all shadow-2xs"
              >
                <Mail className="w-3.5 h-3.5 text-zinc-500" />
                <span>商务合作</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
