'use client';

import React from 'react';
import { Lock, Shield, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* 左侧品牌与定位 */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-md bg-zinc-900 flex items-center justify-center text-white">
                <Lock className="w-3.5 h-3.5" strokeWidth={2} />
              </div>
              <span className="font-bold text-zinc-900 text-sm tracking-tight">本地文转</span>
              <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                100% 浏览器本地运算
              </span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-md">
              专为隐私与数据安全设计的纯客户端文档格式互转工具。无需注册、不设限制、零服务器留存，让文件处理回归安全与纯粹。
            </p>
          </div>

          {/* 隐私承诺卡片 */}
          <div className="md:col-span-6 rounded-xl border border-zinc-200 bg-zinc-50/70 p-4 text-xs text-zinc-600 space-y-1.5">
            <div className="flex items-center space-x-2 text-zinc-800 font-semibold text-xs">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>零知识本地架构承诺</span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-500">
              所有文件仅在您本机的内存中解析，转换完毕立刻释放。本站不设后端存储服务，不记录任何文档内容或文件名，完全杜绝商业机密与个人隐私外泄。
            </p>
          </div>
        </div>

        {/* 底部版权 */}
        <div className="border-t border-zinc-100 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-3">
          <p>© 2026 本地文转 (LocalDoc). 基于浏览器 WebAssembly 引擎驱动.</p>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-zinc-500">
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
              <span>用匠心打磨纯粹工具</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
