'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Zap, HeartHandshake, Activity, CheckCircle2, Lock } from 'lucide-react';

export function TrustSection() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine);
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
        {/* 区域标题 */}
        <div className="max-w-xl mb-10">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 text-xs font-mono mb-3">
            <span>安全与离线计算规范</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
            为敏感与机密文档打造的纯本地架构
          </h2>
          <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
            不同于大多数需要将合同、财报或私人文档上传到云端公网接口的在线工具，本地文转将所有的转换代码直接下载到你的浏览器内核执行。
          </p>
        </div>

        {/* 非对称技术规格展示 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* 卡片 1 (宽 7 栏): 0% 云端上传与实时沙箱状态 */}
          <div className="lg:col-span-7 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-2xs relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-700">
                  <ShieldCheck className="w-5 h-5" strokeWidth={1.75} />
                </div>
                {/* 实时本地监测指标 */}
                <div className="flex items-center space-x-1.5 font-mono text-xs px-2.5 py-1 rounded-md bg-zinc-50 border border-zinc-200 text-zinc-600">
                  <Activity className="w-3.5 h-3.5 text-emerald-600" />
                  <span>出站网络连接：0 次 / 0 字节</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-zinc-900 mb-2">
                零服务器留存 — 真正物理隔离的浏览器沙箱
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                解析引擎完全打包在本地 WebAssembly 线程中。即便你在断开 Wi-Fi 或开启飞行模式的无网环境下，文档转换依然百分之百正常运转。
              </p>
            </div>

            {/* 安全核验清单 */}
            <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/80 p-4 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-zinc-600 border-b border-zinc-200/60 pb-2">
                <span className="flex items-center space-x-1.5 font-sans font-medium text-zinc-700">
                  <Lock className="w-3.5 h-3.5 text-zinc-500" />
                  <span>隐私合规审计状态</span>
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-100/60 px-1.5 py-0.5 rounded">
                  强效隔离
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-zinc-600 pt-1 font-sans">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>远程数据库存储：无</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>AI 模型抓取训练：无</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>文件留存介质：仅易失性内存</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>离线断网可用性：100% 支持</span>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧两栏 (5 栏): 极速响应 & 永久免费 */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* 卡片 2: 毫秒级直接计算 */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 flex-1 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700 mb-4">
                  <Zap className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-bold text-zinc-900 mb-1.5">
                  毫秒级响应 — 独占本地多核算力
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  不再受限于云端排队等待，无需上传与下载等待大文件传输。直接调度你设备自身的硬件性能，秒级输出格式文件。
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500 font-mono">
                <span>云端上传延迟：数秒至数分钟</span>
                <span className="text-emerald-700 font-semibold font-sans">本地转换：毫秒瞬开</span>
              </div>
            </div>

            {/* 卡片 3: 纯粹无套路 */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 flex-1 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-700 mb-4">
                  <HeartHandshake className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <h3 className="text-base font-bold text-zinc-900 mb-1.5">
                  纯粹无套路 — 永久免费无水印
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  没有“每天限制免费转 2 次”、没有强行打上满屏网站水印、更不需要掏出手机扫码关注公众号。打开即用，专注效率。
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                <span>强制注册：不需要</span>
                <span className="text-zinc-600">每日额度：无限制</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
