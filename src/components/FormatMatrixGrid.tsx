'use client';

import React from 'react';
import Link from 'next/link';
import { CONVERSION_PAIRS } from '@/lib/format-registry';
import { FileText, Table, Image as ImageIcon, ArrowRight } from 'lucide-react';

export function FormatMatrixGrid() {
  const documentPairs = CONVERSION_PAIRS.filter((p) => p.category === 'document');
  const dataPairs = CONVERSION_PAIRS.filter((p) => p.category === 'data');
  const imagePairs = CONVERSION_PAIRS.filter((p) => p.category === 'image');

  return (
    <section className="py-12 border-t border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-xl mb-8">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 text-[11px] font-mono mb-2">
            <span>MULTI-FORMAT MATRIX HUB</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">
            全格式矩阵工具箱 — 纯本地秒转
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-zinc-600">
            涵盖日常办公与技术写作最高频的文档、表格、数据与图片本地互转。
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-8">
          {/* 1. Document conversions */}
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-zinc-500 uppercase tracking-wider mb-3">
              <FileText className="w-3.5 h-3.5 text-emerald-600" />
              <span>文档排版互转 (PDF / Markdown / Word)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {documentPairs.map((pair) => (
                <Link
                  key={pair.slug}
                  href={`/convert/${pair.slug}`}
                  className="group rounded-xl border border-zinc-200 bg-white p-4 hover:border-zinc-300 hover:shadow-2xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-zinc-900 group-hover:text-emerald-700 transition-colors">
                        {pair.name}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200">
                        {pair.badge}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                      {pair.shortDesc}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-zinc-100 flex items-center justify-between text-[11px] font-mono text-zinc-400 group-hover:text-emerald-700">
                    <span>{pair.from} → {pair.to}</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* 2. Data & Table conversions */}
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-zinc-500 uppercase tracking-wider mb-3">
              <Table className="w-3.5 h-3.5 text-blue-600" />
              <span>表格与数据结构 (CSV / JSON / Markdown 表格)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {dataPairs.map((pair) => (
                <Link
                  key={pair.slug}
                  href={`/convert/${pair.slug}`}
                  className="group rounded-xl border border-zinc-200 bg-white p-4 hover:border-zinc-300 hover:shadow-2xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-zinc-900 group-hover:text-blue-700 transition-colors">
                        {pair.name}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200">
                        {pair.badge}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                      {pair.shortDesc}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-zinc-100 flex items-center justify-between text-[11px] font-mono text-zinc-400 group-hover:text-blue-700">
                    <span>{pair.from} → {pair.to}</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* 3. Image conversions */}
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-zinc-500 uppercase tracking-wider mb-3">
              <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
              <span>图片与办公合成 (多图转 PDF / 导出图片)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {imagePairs.map((pair) => (
                <Link
                  key={pair.slug}
                  href={`/convert/${pair.slug}`}
                  className="group rounded-xl border border-zinc-200 bg-white p-4 hover:border-zinc-300 hover:shadow-2xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-zinc-900 group-hover:text-amber-700 transition-colors">
                        {pair.name}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200">
                        {pair.badge}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                      {pair.shortDesc}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-zinc-100 flex items-center justify-between text-[11px] font-mono text-zinc-400 group-hover:text-amber-700">
                    <span>{pair.from} → {pair.to}</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
