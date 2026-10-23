import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Info, Code2, Cpu, ShieldCheck, ArrowLeft, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: '关于我们 (About Us) — 本地文转 LocalDoc',
  description: '了解本地文转 (LocalDoc) 的诞生初衷、技术架构及隐私哲学。',
  alternates: {
    canonical: 'https://irisproject.dpdns.org/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            返回首页
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200/80 p-8 sm:p-12 shadow-xs space-y-8 text-zinc-700 leading-relaxed">
          <header className="border-b border-zinc-200 pb-6">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
              关于本地文转 (About LocalDoc)
            </h1>
            <p className="text-sm text-zinc-500 mt-2">
              为数字时代敏感文档打造的 100% 浏览器沙盒转换基础设施
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-zinc-900 flex items-center">
              <ShieldCheck className="w-4 h-4 mr-2 text-emerald-600" />
              我们的使命
            </h2>
            <p className="text-sm">
              市面上充斥着大量宣称“免费”的文件转换在线网站，但它们几乎无一例外地要求将文件上传到云端服务器解析。这意味着财务报表、个人合同、研发代码、医疗数据等高度机密文件面临着泄露、转售和被大模型无授权抓取的严重风险。
            </p>
            <p className="text-sm">
              <strong>LocalDoc</strong> 建立在一条不可违背的技术红线上：<strong>所有算力交由用户本地设备，零网络传输</strong>。借助现代浏览器的 WebAssembly、Canvas 硬件加速与纯客户端引擎，我们在不触碰您任何数据的前提下，完成毫秒级的格式转换。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-zinc-900 flex items-center">
              <Cpu className="w-4 h-4 mr-2 text-indigo-600" />
              底层开源驱动栈
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-zinc-200/80 bg-zinc-50">
                <span className="font-semibold text-zinc-900 block mb-1">Mozilla PDF.js</span>
                纯本地高精度 PDF 结构解析与流式文本提取
              </div>
              <div className="p-3.5 rounded-xl border border-zinc-200/80 bg-zinc-50">
                <span className="font-semibold text-zinc-900 block mb-1">Mammoth.js</span>
                Word DOCX 原生样式向标准化 HTML/Markdown 的离线编译
              </div>
              <div className="p-3.5 rounded-xl border border-zinc-200/80 bg-zinc-50">
                <span className="font-semibold text-zinc-900 block mb-1">jsPDF + html2canvas</span>
                浏览器矢量 Canvas 本地高保真 PDF 渲染引擎
              </div>
              <div className="p-3.5 rounded-xl border border-zinc-200/80 bg-zinc-50">
                <span className="font-semibold text-zinc-900 block mb-1">PapaParse & Marked</span>
                CSV 极速流式分块解析器与零依赖 Markdown AST 编译引擎
              </div>
            </div>
          </section>

          <section className="space-y-3 pt-2">
            <h2 className="text-lg font-semibold text-zinc-900 flex items-center">
              <Mail className="w-4 h-4 mr-2 text-zinc-600" />
              联络方式
            </h2>
            <p className="text-sm">
              如有功能建议、缺陷反馈或合作咨询，欢迎通过 GitHub Issue 与我们探讨。
            </p>
            <div className="flex items-center space-x-4 pt-1 text-xs">
              <a
                href="https://github.com/HelloaZelda/privatedoc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 rounded-lg border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-800 transition-colors"
              >
                <Code2 className="w-3.5 h-3.5 mr-1.5" />
                GitHub 源码仓库
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
