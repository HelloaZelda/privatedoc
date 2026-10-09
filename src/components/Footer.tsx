'use client';

import React from 'react';
import { Lock, Shield, Heart, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Brand & Guarantee */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-md bg-zinc-900 flex items-center justify-center text-white">
                <Lock className="w-3.5 h-3.5" strokeWidth={2} />
              </div>
              <span className="font-semibold text-zinc-900 text-sm tracking-tight">PrivateDoc</span>
              <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                100% Client-Side
              </span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed max-w-md">
              A private, zero-upload document utility designed for confidentiality-conscious engineers, researchers, and professionals. All conversions run locally using WebAssembly and client-side JavaScript.
            </p>
          </div>

          {/* Privacy Statement Callout */}
          <div className="md:col-span-6 rounded-xl border border-zinc-200 bg-zinc-50/70 p-4 font-mono text-xs text-zinc-600 space-y-1.5">
            <div className="flex items-center space-x-2 text-zinc-700 font-semibold text-[11px]">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>STRICT CLIENT PRIVACY PLEDGE</span>
            </div>
            <p className="text-[11px] leading-relaxed text-zinc-600">
              No files are transmitted across the wire. No telemetry logs containing document filenames or content are ever collected. Memory allocated during execution is released immediately after processing.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-100 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-600 gap-3">
          <p>© 2026 PrivateDoc. All rights reserved. Zero-Knowledge Architecture.</p>
          <div className="flex items-center space-x-4">
            <a
              href="https://buymeacoffee.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 transition-colors flex items-center space-x-1"
            >
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
              <span>Donate</span>
            </a>
            <span>•</span>
            <span className="font-mono text-[11px]">Made for Local Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
