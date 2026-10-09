import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdSenseSlot } from '@/components/AdSenseSlot';
import { UniversalWorkspace } from '@/components/UniversalWorkspace';
import { FormatMatrixGrid } from '@/components/FormatMatrixGrid';
import { CONVERSION_PAIRS, getConversionPairBySlug } from '@/lib/format-registry';
import { ArrowLeft, CheckCircle2, XCircle, HelpCircle, FileType, ShieldCheck } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const SITE_URL = 'https://privatedoc-green.vercel.app';

export function generateStaticParams() {
  return CONVERSION_PAIRS.map((pair) => ({
    slug: pair.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pair = getConversionPairBySlug(slug);
  if (!pair) return { title: '格式未找到' };

  const canonicalUrl = `${SITE_URL}/convert/${pair.slug}`;

  return {
    title: `${pair.englishTitle} | ${pair.chineseTitle} - LocalDoc`,
    description: `100% Client-side ${pair.name} online converter. No registration, no file size limit, zero server upload. ${pair.shortDesc}`,
    keywords: [
      pair.name,
      `convert ${pair.from} to ${pair.to}`,
      `${pair.from} to ${pair.to} online free`,
      `${pair.from} 转 ${pair.to}`,
      `free ${pair.slug} converter`,
      'no sign up converter',
      'local doc converter',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${pair.englishTitle} | LocalDoc`,
      description: pair.shortDesc,
      url: canonicalUrl,
      type: 'website',
    },
  };
}

export default async function ConvertPage({ params }: PageProps) {
  const { slug } = await params;
  const pair = getConversionPairBySlug(slug);

  if (!pair) {
    notFound();
  }

  // Schema.org FAQPage & SoftwareApplication 结构化数据（Google 抓取核心）
  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: pair.name,
        operatingSystem: 'Any (Web Browser)',
        applicationCategory: 'MultimediaApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: pair.shortDesc,
      },
      {
        '@type': 'FAQPage',
        mainEntity: pair.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-6 pb-16">
        {/* 面包屑导航 */}
        <div className="mb-6 flex items-center space-x-2 text-xs text-zinc-500">
          <Link href="/" className="hover:text-zinc-900 transition-colors flex items-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>首页</span>
          </Link>
          <span>/</span>
          <span className="text-zinc-900 font-medium">{pair.name}</span>
        </div>

        {/* 顶部精准 H1 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
            {pair.h1}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-zinc-500">
            {pair.shortDesc}
          </p>
        </div>

        {/* 核心工作区（直接锁定该格式，拖入即转） */}
        <div className="mb-14">
          <UniversalWorkspace initialSlug={pair.slug} />
        </div>

        {/* 语义化格式百科（SEO 长尾关键词落地区） */}
        <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-zinc-200/90 bg-white">
            <div className="flex items-center space-x-2 mb-2 text-zinc-900 font-semibold text-sm">
              <FileType className="w-4 h-4 text-emerald-600" />
              <span>什么是 {pair.from}？</span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              {pair.whatIsFrom}
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-zinc-200/90 bg-white">
            <div className="flex items-center space-x-2 mb-2 text-zinc-900 font-semibold text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>为什么转换为 {pair.to}？</span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              {pair.whyConvert}
            </p>
          </div>
        </section>

        {/* 传统云端竞品 vs 本地文转 对比表 */}
        <section className="mb-12 rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-zinc-900 mb-4">
            与传统在线转换工具（CloudConvert / ILovePDF）对比
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 text-zinc-500 font-medium">
                  <th className="py-2.5 px-3">功能特性</th>
                  <th className="py-2.5 px-3 text-emerald-700">本地文转 (LocalDoc)</th>
                  <th className="py-2.5 px-3 text-zinc-400">传统云端转换站</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-700">
                <tr>
                  <td className="py-2.5 px-3 font-medium">注册/登录</td>
                  <td className="py-2.5 px-3 text-emerald-700 font-semibold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>完全免登录，开箱即用</span>
                  </td>
                  <td className="py-2.5 px-3 text-zinc-500">常常强制弹窗注册</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium">文件大小限制</td>
                  <td className="py-2.5 px-3 text-emerald-700 font-semibold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>不限大小（依赖本机内存）</span>
                  </td>
                  <td className="py-2.5 px-3 text-zinc-500">超 5MB/10MB 弹收费提示</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium">数据隐私安全</td>
                  <td className="py-2.5 px-3 text-emerald-700 font-semibold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>0 上传，100% 浏览器本地运算</span>
                  </td>
                  <td className="py-2.5 px-3 text-zinc-500">必须上传到第三方云服务器</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium">广告与干扰</td>
                  <td className="py-2.5 px-3 text-emerald-700 font-semibold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>纯净极简，无全屏跳转</span>
                  </td>
                  <td className="py-2.5 px-3 text-zinc-500">全屏浮窗与诱导下载广告</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 常见问题 FAQ 展开卡片（与 Schema.org 一致） */}
        <section className="mb-12">
          <div className="flex items-center space-x-2 mb-4">
            <HelpCircle className="w-4 h-4 text-zinc-500" />
            <h2 className="text-sm font-semibold text-zinc-900">常见问题解答 (FAQ)</h2>
          </div>
          <div className="space-y-3">
            {pair.faqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl border border-zinc-200/90 bg-white p-4">
                <h3 className="text-xs font-semibold text-zinc-900 mb-1.5">{faq.q}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 其他格式矩阵 */}
        <FormatMatrixGrid />

        {/* 赞助展示位 */}
        <AdSenseSlot />
      </main>

      <Footer />
    </div>
  );
}
