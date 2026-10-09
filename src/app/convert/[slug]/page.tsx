import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdSenseSlot } from '@/components/AdSenseSlot';
import { TrustSection } from '@/components/TrustSection';
import { UniversalWorkspace } from '@/components/UniversalWorkspace';
import { FormatMatrixGrid } from '@/components/FormatMatrixGrid';
import { CONVERSION_PAIRS, getConversionPairBySlug } from '@/lib/format-registry';
import { ShieldCheck, ArrowLeft, CheckCircle2 } from 'lucide-react';

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
  if (!pair) return { title: '格式转换未找到' };

  const canonicalUrl = `${SITE_URL}/convert/${pair.slug}`;

  return {
    title: `${pair.name} 在线工具 (100% 浏览器本地运算，零上传) — 本地文转`,
    description: `${pair.fullDesc} 纯本地处理，零云端上传，保护隐私与商业机密，断网可用，秒级出结果。`,
    keywords: [
      pair.name,
      `${pair.from} 转 ${pair.to}`,
      `${pair.from} to ${pair.to}`,
      '本地文件转换',
      '隐私保护转换器',
      '无需上传转换',
      '纯前端离线工具',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${pair.name} 在线工具 (100% 浏览器本地运算) — 本地文转`,
      description: `${pair.fullDesc} 纯本地安全处理，绝不上传服务器。`,
      url: canonicalUrl,
      type: 'website',
      siteName: '本地文转 LocalDoc',
    },
  };
}

export default async function ConvertPage({ params }: PageProps) {
  const { slug } = await params;
  const pair = getConversionPairBySlug(slug);

  if (!pair) {
    notFound();
  }

  // Google 搜索富媒体 FAQ 结构化数据 (Schema.org FAQPage)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `使用本地文转进行 ${pair.from} 转 ${pair.to} 会将文件上传到服务器吗？`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `绝对不会。本地文转采用 100% 客户端本地计算架构，所有 ${pair.from} 数据的读取、解析与输出均在您电脑浏览器的内存中完成，无任何网络数据包上传。`,
        },
      },
      {
        '@type': 'Question',
        name: `${pair.name} 是免费的吗？有文件大小限制吗？`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `永久免费且无套路。因为计算调度的是您本机的硬件算力而非消耗服务器云算力，因此无排队限制，日常大文件均可自由转换。`,
        },
      },
      {
        '@type': 'Question',
        name: '断网状态下还能进行转换吗？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `完全可以。网页加载完成后，核心 WebAssembly 解析引擎已经就绪，即便关闭网络或开启飞行模式，依然能够顺畅转换。`,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50">
      <Header />

      {/* Google 搜索引擎专用 FAQPage 结构化标记 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 pb-16">
        {/* 面包屑导航 */}
        <div className="mb-6 flex items-center space-x-2 text-xs text-zinc-500">
          <Link href="/" className="hover:text-zinc-900 transition-colors flex items-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>首页</span>
          </Link>
          <span>/</span>
          <span>格式矩阵</span>
          <span>/</span>
          <span className="text-zinc-900 font-medium">{pair.name}</span>
        </div>

        {/* 顶部标题 */}
        <div className="max-w-2xl mx-auto text-center mb-8">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% 本地内存执行 • 零网络数据外发</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
            {pair.name}
          </h1>

          <p className="mt-3 text-sm text-zinc-600 leading-relaxed max-w-xl mx-auto">
            {pair.fullDesc}
          </p>
        </div>

        {/* 专属转换工作区 */}
        <div className="mb-14">
          <UniversalWorkspace initialSlug={pair.slug} />
        </div>

        {/* SEO 核心优势问答模块 */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 mb-12 shadow-2xs">
          <h2 className="text-base font-bold text-zinc-900 mb-4">
            为什么选择本地文转进行 {pair.from} → {pair.to} 转换？
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-600">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-1.5 text-zinc-900 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>绝不泄露商业数据</span>
              </div>
              <p className="leading-relaxed">
                传统转换网站会将你的 {pair.from} 文件上传到远程服务器或公有云。本地文转直接在你的电脑本地浏览器中解构数据，文件从始至终只在内存中存在。
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center space-x-1.5 text-zinc-900 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>无限制，无排队延迟</span>
              </div>
              <p className="leading-relaxed">
                没有“免费用户排队等待 10 分钟”或“超过 5MB 请升级付费”的套路。调用你本地 CPU 算力直接转换，即使大文件也能瞬间出结果。
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center space-x-1.5 text-zinc-900 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>断网状态下也能使用</span>
              </div>
              <p className="leading-relaxed">
                网页加载完成后，你可以关闭 Wi-Fi 或开启飞行模式，整个转换过程依然顺畅无阻，完全独立于任何后端 API 服务。
              </p>
            </div>
          </div>
        </div>

        {/* 隐私与安全规格 */}
        <TrustSection />

        {/* 全格式互转导航（利于内部链接权重传递） */}
        <FormatMatrixGrid />

        {/* 赞助展示位 */}
        <AdSenseSlot />
      </main>

      <Footer />
    </div>
  );
}
