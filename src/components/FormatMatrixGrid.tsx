'use client';

import React from 'react';
import Link from 'next/link';
import { CONVERSION_PAIRS } from '@/lib/format-registry';
import { ArrowRight } from 'lucide-react';

export function FormatMatrixGrid() {
  return (
    <section className="py-8 border-t border-zinc-200">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-sm font-semibold text-zinc-900 mb-4">
          格式列表
        </h2>

        {/* 紧凑清爽的网格 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {CONVERSION_PAIRS.map((pair) => (
            <Link
              key={pair.slug}
              href={`/convert/${pair.slug}`}
              className="group p-3 rounded-xl border border-zinc-200/90 bg-white hover:border-zinc-400 hover:shadow-2xs transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-900 group-hover:text-emerald-700 transition-colors">
                  {pair.name}
                </span>
                <ArrowRight className="w-3 h-3 text-zinc-400 group-hover:text-emerald-700 transform group-hover:translate-x-0.5 transition-all" />
              </div>
              <span className="text-[11px] text-zinc-400 mt-1 font-mono">
                {pair.from} → {pair.to}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
