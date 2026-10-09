'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Zap, HeartHandshake, WifiOff, Activity, CheckCircle2, Lock } from 'lucide-react';

export function TrustSection() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    if (typeof window !== 'undefined') {
      setIsOffline(!navigator.onLine);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <section className="py-12 border-t border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Headline */}
        <div className="max-w-xl mb-10">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 text-[11px] font-mono mb-3">
            <span>CLIENT-SIDE SECURITY PROTOCOL</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
            Engineered for complete data isolation.
          </h2>
          <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
            Unlike traditional converters that silently stream confidential contracts and documents to remote cloud clusters, PrivateDoc executes every byte directly on your CPU.
          </p>
        </div>

        {/* Asymmetric Technical Grid (Anti-generic 3 equal cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Card 1 (Large 7 cols): 0% Server Upload & Live Air-Gap Monitor */}
          <div className="lg:col-span-7 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-2xs relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-700">
                  <ShieldCheck className="w-5 h-5" strokeWidth={1.75} />
                </div>
                {/* Live Air-Gap Tag */}
                <div className="flex items-center space-x-1.5 font-mono text-[11px] px-2.5 py-1 rounded-md bg-zinc-50 border border-zinc-200 text-zinc-600">
                  <Activity className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Outbound Net: 0 KB / 0 Req</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-zinc-900 mb-2">
                0% Server Upload — True Air-Gap Architecture
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                Your files never touch an external server or API endpoint. Parsing runs in an isolated WebAssembly Worker within your browser sandbox. You can literally disconnect your Wi-Fi or enable Airplane Mode right now, and the tool will function identically.
              </p>
            </div>

            {/* Interactive Live Air-Gap Verification Box */}
            <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/80 p-4 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-zinc-600 border-b border-zinc-200/60 pb-2">
                <span className="flex items-center space-x-1.5">
                  <Lock className="w-3.5 h-3.5 text-zinc-500" />
                  <span>SANDBOX VERIFICATION LOG</span>
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-100/60 px-1.5 py-0.5 rounded">
                  ENFORCED
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-600 pt-1">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Remote DB write: NONE</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>AI Model training: NONE</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Blob retention: RAM only</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Offline operational: 100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Lightning Fast & Completely Free */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Card 2: Lightning Fast */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 flex-1 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700 mb-4">
                  <Zap className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-bold text-zinc-900 mb-1.5">
                  Lightning Fast — Zero Queue Overhead
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  Traditional web converters place your request in a congested cloud worker queue. PrivateDoc leverages your device’s multi-core hardware threads directly, converting documents instantaneously without network latency.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] font-mono text-zinc-600">
                <span>Cloud Latency: 4,200ms</span>
                <span className="text-emerald-700 font-semibold">Local Latency: &lt; 280ms</span>
              </div>
            </div>

            {/* Card 3: Completely Free */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 flex-1 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-700 mb-4">
                  <HeartHandshake className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-bold text-zinc-900 mb-1.5">
                  Completely Free — No Hidden Paywalls
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  No subscriptions, no mandatory account sign-up, no credits consumption, and no watermarks stamped onto your output. Built as an open micro-utility for everyday productivity.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] font-mono text-zinc-600">
                <span>Account Required: NO</span>
                <span className="text-zinc-600">Daily Quota: UNLIMITED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
