'use client';

import React, { useEffect, useRef } from 'react';

interface AdSlotProps {
  adSenseSlot?: string;
  className?: string;
}

export function AdSenseSlot({
  adSenseSlot,
  className = '',
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-1769420671918341';

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        // @ts-expect-error adsbygoogle window global
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch {
      // Ignore if AdSense blocked by adblocker
    }
  }, []);

  return (
    <div className={`w-full max-w-5xl mx-auto my-8 ${className}`}>
      <div className="rounded-2xl border border-zinc-200/90 bg-white p-3 sm:p-4 shadow-2xs overflow-hidden text-center">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-1.5 mb-2.5">
          <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">
            Advertisement
          </span>
          <span className="text-[10px] font-mono text-zinc-300">
            Google Ad
          </span>
        </div>
        <div className="min-h-[90px] sm:min-h-[100px] flex items-center justify-center overflow-hidden w-full">
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block', minHeight: '90px', width: '100%' }}
            data-ad-client={clientId}
            data-ad-slot={adSenseSlot || undefined}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    </div>
  );
}
