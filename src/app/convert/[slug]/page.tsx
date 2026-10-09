import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdSenseSlot } from '@/components/AdSenseSlot';
import { UniversalWorkspace } from '@/components/UniversalWorkspace';
import { FormatMatrixGrid } from '@/components/FormatMatrixGrid';
import { CONVERSION_PAIRS, getConversionPairBySlug } from '@/lib/format-registry';
import { ArrowLeft } from 'lucide-react';

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
    title: `${pair.name} - 本地直接转，不上传文件`,
    description: `在浏览器本地快速将 ${pair.from} 转为 ${pair.to}，文件不上传服务器，保护隐私。`,
    keywords: [
      pair.name,
      `${pair.from} 转 ${pair.to}`,
      `${pair.from} to ${pair.to}`,
      '本地文件转换',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function ConvertPage({ params }: PageProps) {
  const { slug } = await params;
  const pair = getConversionPairBySlug(slug);

  if (!pair) {
    notFound();
  }

  // Google 结构化数据（爬虫抓取使用，不污染前台页面）
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `转换 ${pair.from} 文件会上传到服务器吗？`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `不会。本地文转采用纯前端运行，转换全部在您本机的浏览器内存中完成，不上传服务器。`,
        },
      },
      {
        '@type': 'Question',
        name: `${pair.name} 免费吗？`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `完全免费，无排队限制。`,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-6 pb-16">
        {/* 返回首页导航 */}
        <div className="mb-6 flex items-center space-x-2 text-xs text-zinc-500">
          <Link href="/" className="hover:text-zinc-900 transition-colors flex items-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>首页</span>
          </Link>
          <span>/</span>
          <span className="text-zinc-900 font-medium">{pair.name}</span>
        </div>

        {/* 顶部标题 */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
            {pair.name}
          </h1>
        </div>

        {/* 转换工作区 */}
        <div className="mb-12">
          <UniversalWorkspace initialSlug={pair.slug} />
        </div>

        {/* 其他格式推荐 */}
        <FormatMatrixGrid />

        {/* 赞助展示位 */}
        <AdSenseSlot />
      </main>

      <Footer />
    </div>
  );
}
