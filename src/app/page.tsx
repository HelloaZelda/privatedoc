'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { UniversalWorkspace } from '@/components/UniversalWorkspace';
import { FormatMatrixGrid } from '@/components/FormatMatrixGrid';
import { AdSenseSlot } from '@/components/AdSenseSlot';
import { Footer } from '@/components/Footer';
import {
  ShieldCheck,
  Zap,
  Lock,
  Cpu,
  HelpCircle,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  FileText,
} from 'lucide-react';

export default function Home() {
  const faqs = [
    {
      q: '为什么说 LocalDoc 转换是 100% 隐私安全的？',
      a: '与传统在线转换工具不同，LocalDoc 不设立任何后端文件上传接收服务。所有 PDF 解析、DOCX 拆解、Markdown 渲染及图片转换均直接调用现代浏览器内置的 WebAssembly (Wasm) 与 Canvas 引擎在您设备的本地内存中完成。即使在断网模式下，本工具仍能完全独立工作。',
    },
    {
      q: '支持转换的文件大小有限制吗？',
      a: '没有硬性服务器限制。因为转换完全依托您设备的本地硬件与运行内存 (RAM)，只要您的浏览器可用内存充足，数百兆乃至上千页的文档和高清大图都能瞬间秒级完成转换，无需漫长等待上传。',
    },
    {
      q: '转换后的文件会保存在哪里？',
      a: '转换后的结果直接生成为浏览器临时 Blob 下载流，保存在您电脑或手机的默认下载目录中。页面一旦刷新或关闭，内存沙盒立即自动释放，零本地残留，更无云端存储。',
    },
    {
      q: '转换后的文档排版是否能保持高保真？',
      a: '是的。针对 PDF 转 Markdown，我们使用深度几何文本流式重组算法重构段落与标题；针对 Word DOCX，精准保留标题层级、引用块、代码与表格；针对 Markdown 转 PDF，内置了优雅的排版样式引擎与分页算法。',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/70 relative overflow-x-hidden selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Ambient Lighting Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[480px] overflow-hidden -z-10 pointer-events-none select-none">
        <div className="absolute top-[-140px] left-1/2 -translate-x-1/2 w-[760px] h-[360px] bg-gradient-to-b from-emerald-200/40 via-teal-100/25 to-transparent blur-3xl rounded-full" />
      </div>

      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-20">
        {/* Hero Section */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-zinc-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.03)] mb-5 ring-1 ring-black/[0.02]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-zinc-700 tracking-wide font-mono">
              100% 浏览器客户端沙盒 · 零云端上传 · 保护商业机密
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 leading-[1.12]">
            本地文档格式 <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">极速秒转</span>
          </h1>

          <p className="mt-3.5 sm:mt-4 text-sm sm:text-base lg:text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed font-normal">
            专为财务、法务、开发者及敏感内容打造的纯前端文档互转基础设施。PDF、Word、Markdown、CSV 本地毫秒级转换，数据不离本机。
          </p>
        </div>

        {/* Universal Workspace Dropzone */}
        <div className="w-full mb-14">
          <UniversalWorkspace />
        </div>

        {/* Format Matrix Bento */}
        <FormatMatrixGrid />

        {/* Asymmetrical Bento Grid: Why LocalDoc */}
        <section className="my-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full mb-2.5">
              <span>架构解密</span>
              <span>·</span>
              <span>Why LocalDoc</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">
              为什么企业与专业人士都在拒绝“云端上传”？
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-500 max-w-xl mx-auto">
              把包含未公开财报、人事合同或核心代码的文件上传到云端服务器，存在不可逆的泄露与模型非法抓取风险
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {/* Bento Card 1 - Double Width Highlight */}
            <div className="md:col-span-2 p-2 sm:p-2.5 rounded-[2rem] bg-gradient-to-b from-zinc-200/70 via-zinc-100/50 to-zinc-200/70 border border-zinc-200/90 shadow-[0_15px_35px_rgba(0,0,0,0.02)]">
              <div className="h-full rounded-[calc(2rem-0.625rem)] bg-white p-7 sm:p-9 border border-zinc-200/80 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/70 text-emerald-700 flex items-center justify-center mb-5 shadow-3xs">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-lg sm:text-xl text-zinc-900 mb-2.5">
                    绝对零网络回传 · 内存沙箱即用即毁
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-xl">
                    所有的文件格式转换逻辑均通过 Mozilla PDF.js、Mammoth 及纯前端 WebAssembly 模块编译运行在您设备的本地内存中。断网模式下所有转换功能依然 100% 正常运转，完全杜绝第三方拦截与云端存储。
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-zinc-100 flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-500">
                  <span className="inline-flex items-center text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    端到端本地隔离
                  </span>
                  <span className="inline-flex items-center text-zinc-600 bg-zinc-100 px-2.5 py-1 rounded-lg">
                    GDPR / 企业数据合规
                  </span>
                </div>
              </div>
            </div>

            {/* Bento Card 2 - Speed */}
            <div className="p-2 sm:p-2.5 rounded-[2rem] bg-zinc-200/60 border border-zinc-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.02)]">
              <div className="h-full rounded-[calc(2rem-0.625rem)] bg-white p-7 border border-zinc-200/80 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/70 text-amber-700 flex items-center justify-center mb-5 shadow-3xs">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-zinc-900 mb-2">
                    本地 CPU 硬件加速
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    无需忍受漫长的公网文件上传与远程排队，直接调用本机多核 CPU 进行并行流式解析，数百页文档毫秒级秒出。
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-100 text-[11px] font-mono text-amber-800 font-bold">
                  ⚡ 0 宽带消耗 · 0 排队等待
                </div>
              </div>
            </div>

            {/* Bento Card 3 - Offline PWA */}
            <div className="md:col-span-3 p-2 sm:p-2.5 rounded-[2rem] bg-zinc-200/60 border border-zinc-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.02)]">
              <div className="rounded-[calc(2rem-0.625rem)] bg-white p-6 sm:p-8 border border-zinc-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200/70 text-indigo-700 flex items-center justify-center shrink-0 shadow-3xs">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-zinc-900">
                      支持离线飞行模式与断网 PWA
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      内置 Service Worker 离线引擎。在飞机航班、高铁隧道或无公网内网机房，随时打开浏览器即可完成文档互转。
                    </p>
                  </div>
                </div>

                <Link
                  href="/about"
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-xs font-semibold text-zinc-800 transition-colors self-start sm:self-auto shrink-0"
                >
                  <span>阅读技术白皮书</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Bento Section */}
        <section className="my-20 p-2 sm:p-2.5 rounded-[2.5rem] bg-gradient-to-b from-zinc-200/60 via-zinc-100/30 to-zinc-200/60 border border-zinc-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.02)]">
          <div className="rounded-[calc(2.5rem-0.625rem)] bg-white p-6 sm:p-10 border border-zinc-200/80">
            <div className="flex items-center space-x-2.5 mb-8">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200/70 text-emerald-700 flex items-center justify-center shadow-3xs">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-zinc-900">
                  常见问题解答 (FAQ)
                </h2>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">
                  Frequently Asked Questions & Technical Specifications
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-zinc-50/70 border border-zinc-200/70">
                  <h3 className="text-sm font-bold text-zinc-900 mb-2 flex items-start">
                    <span className="text-emerald-700 font-mono mr-2 font-black">Q{idx + 1}.</span>
                    {faq.q}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed pl-5 font-normal">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AdSense Slot */}
        <div className="my-10">
          <AdSenseSlot />
        </div>
      </main>

      <Footer />
    </div>
  );
}
