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
  FileCheck,
  CheckCircle2,
  HelpCircle,
  HardDriveDownload,
  Flame,
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
    <div className="min-h-screen flex flex-col bg-zinc-50/50">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-10 pb-16">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-medium mb-3 border border-emerald-200/50">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% 浏览器沙盒计算 · 零云端上传 · 保护企业商业机密</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
            本地离线文档格式互转站
          </h1>
          <p className="mt-2.5 text-sm sm:text-base text-zinc-500 max-w-2xl mx-auto">
            极速、安全、零泄露风险的纯前端文件转换平台。PDF、Markdown、Word、CSV、图片本地毫秒级互转。
          </p>
        </div>

        <div className="w-full mb-12">
          <UniversalWorkspace />
        </div>

        <div className="my-12">
          <FormatMatrixGrid />
        </div>

        {/* 核心价值与技术架构解密（丰富 Google 索引抓取实质内容） */}
        <section className="my-14 space-y-8">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">
              为什么现代专业人士都在转向“纯本地转换”？
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-zinc-500">
              拒绝把包含财务、法律、人事与知识产权的核心文档上传给未知第三方
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-zinc-900 mb-2">绝对零数据上传</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                所有运算在浏览器 JavaScript/WebAssembly 沙箱内完成，数据绝不经过外部网络传输。完全满足最高等级商业机密与合规要求。
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-zinc-900 mb-2">毫秒级极速响应</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                省去耗费带宽的云端文件上传与远程排队等待，直接释放您本地 CPU 的多线程并行计算能力，拖拽即转，立等可取。
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-zinc-200/80 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-zinc-900 mb-2">支持断网与离线 PWA</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                内置 Service Worker 离线引擎。首次加载后即使在高铁、航班或内网断网环境下，打开浏览器即可随时随地完成文档互转。
              </p>
            </div>
          </div>
        </section>

        {/* 常见问题解答 FAQ 结构化内容 */}
        <section className="my-14 bg-white p-6 sm:p-10 rounded-2xl border border-zinc-200/80 shadow-2xs">
          <div className="flex items-center space-x-2.5 mb-6">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold tracking-tight text-zinc-900">
              常见问题解答 (FAQ)
            </h2>
          </div>

          <div className="divide-y divide-zinc-100">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-4 first:pt-0 last:pb-0">
                <h3 className="text-sm font-semibold text-zinc-900 mb-1.5 flex items-start">
                  <span className="text-emerald-600 font-mono mr-2">Q{idx + 1}.</span>
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 pl-6 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        <AdSenseSlot />
      </main>

      <Footer />
    </div>
  );
}
