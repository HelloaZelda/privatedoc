import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ShieldCheck, Lock, EyeOff, FileText, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: '隐私政策 (Privacy Policy) — 本地文转 LocalDoc',
  description:
    '本地文转 (LocalDoc) 严格承诺：所有文件转换均在您的浏览器本地内存中完成，绝不上传至任何服务器。了解我们如何保护您的个人隐私与广告 Cookie 政策。',
  alternates: {
    canonical: 'https://irisproject.dpdns.org/privacy',
  },
};

export default function PrivacyPage() {
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
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% 客户端本地计算承诺</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
              隐私权政策 (Privacy Policy)
            </h1>
            <p className="text-xs text-zinc-400 mt-2 font-mono">
              生效日期：2026 年 10 月 1 日 | 最近更新：2026 年 10 月 24 日
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-900 flex items-center">
              <Lock className="w-4 h-4 mr-2 text-emerald-600" />
              1. 核心承诺：零服务器文件上传
            </h2>
            <p className="text-sm">
              <strong>本地文转 (LocalDoc)</strong> 的设计核心原则是<strong>“隐私第一”</strong>。当您使用本站进行 PDF、Markdown、Word (DOCX)、CSV、图片等格式转换时，转换逻辑完全由您本地浏览器中的 WebAssembly (Wasm) 与 JavaScript 执行。
            </p>
            <ul className="list-disc list-inside text-sm space-y-1.5 pl-2 text-zinc-600">
              <li>您的文件内容绝不会离开您的设备或上传到我们或任何第三方的云端服务器。</li>
              <li>无论断网与否，转换运算均在本地设备沙盒内存中完成。转换完成后页面关闭即刻销毁，无任何持久化留存。</li>
              <li>我们无法、也绝不会查看、存储或分发您的任何商业文档、私密数据或文件内容。</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-900 flex items-center">
              <EyeOff className="w-4 h-4 mr-2 text-indigo-600" />
              2. Google 广告与 Cookie 政策 (Google AdSense Disclosure)
            </h2>
            <p className="text-sm">
              为了维持本站免费开放运行，我们接入了 Google AdSense 第三方广告投放服务。按照 Google 发布商合规政策，特此作出以下声明：
            </p>
            <ul className="list-disc list-inside text-sm space-y-2 pl-2 text-zinc-600">
              <li>
                <strong>第三方供应商（包括 Google）</strong>会使用 Cookie 根据用户此前访问本网站或其他网站的记录来投放广告。
              </li>
              <li>
                Google 使用的广告 Cookie 能够使 Google 及其合作伙伴根据用户对本网站和/或互联网上其他网站的访问记录向用户投放合适的广告。
              </li>
              <li>
                用户可以访问{' '}
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 underline hover:text-emerald-700"
                >
                  Google 广告设置 (Ads Settings)
                </a>{' '}
                选择停用个性化广告。
              </li>
              <li>
                或者，用户也可以访问{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 underline hover:text-emerald-700"
                >
                  www.aboutads.info
                </a>{' '}
                选择停用部分第三方供应商用于个性化广告的 Cookie。
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-900 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-zinc-600" />
              3. 网站流量与统计分析 (Analytics)
            </h2>
            <p className="text-sm">
              我们使用匿名化的 Vercel Web Analytics 统计服务来监控站点的基本运行状态（例如页面浏览量、访客大致所在国家、设备浏览器类型）。这些统计数据不包含任何个人身份信息 (PII)，更不涉及您所处理的文件内容。
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-900">
              4. 政策变更与联系方式
            </h2>
            <p className="text-sm">
              我们可能会不定期更新本隐私政策以反映技术更新或法规要求。如果您对本隐私政策或本地计算架构有任何疑问，请通过开源仓库或邮件与我们联系。
            </p>
            <p className="text-sm text-zinc-500 font-mono">
              联系邮箱：support@irisproject.dpdns.org / GitHub: HelloaZelda/privatedoc
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
