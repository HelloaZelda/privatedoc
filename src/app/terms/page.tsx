import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FileCheck, Shield, AlertCircle, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: '服务条款 (Terms of Service) — 本地文转 LocalDoc',
  description: '本地文转 (LocalDoc) 服务使用条款与免责声明。',
  alternates: {
    canonical: 'https://irisproject.dpdns.org/terms',
  },
};

export default function TermsPage() {
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
              服务条款 (Terms of Service)
            </h1>
            <p className="text-xs text-zinc-400 mt-2 font-mono">
              生效日期：2026 年 10 月 1 日
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-900 flex items-center">
              <FileCheck className="w-4 h-4 mr-2 text-emerald-600" />
              1. 服务说明
            </h2>
            <p className="text-sm">
              本地文转 (LocalDoc) 是一套纯前端在线文件格式互转工具。本服务免费向公众提供，旨在为个人和企业用户提供无需上传云端即可安全高效转换文档的途径。
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-900 flex items-center">
              <Shield className="w-4 h-4 mr-2 text-indigo-600" />
              2. 用户文件所有权与知识产权
            </h2>
            <p className="text-sm">
              您使用本工具转换的所有文档、图片、文字和表格内容，其知识产权完全归属于您本人或合法权利人。本站不获取、不主张任何文件的任何权利。
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-900 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 text-amber-600" />
              3. 免责声明 (Disclaimer of Warranties)
            </h2>
            <p className="text-sm">
              本站按“现状 (As Is)”提供服务。尽管我们竭力确保本地转换算法的准确性与高保真度，但在不同浏览器环境和特殊排版格式下，转换结果可能存在排版差异。在对关键商业文件进行不可逆替换前，请务必备份原始文件。
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
