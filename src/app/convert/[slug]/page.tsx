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
import { ShieldCheck, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CONVERSION_PAIRS.map((pair) => ({
    slug: pair.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pair = getConversionPairBySlug(slug);
  if (!pair) return { title: '格式转换未找到' };

  return {
    title: `${pair.name} 在线转换器 (100% 浏览器本地运算) — PrivateDoc`,
    description: `${pair.fullDesc} 纯本地处理，零云端上传，保护隐私与商业机密，秒出结果。`,
    keywords: [
      pair.name,
      `${pair.from} 转 ${pair.to}`,
      `${pair.from} to ${pair.to}`,
      '本地文件转换',
      '隐私保护转换器',
      '无需上传转换',
    ],
  };
}

export default async function ConvertPage({ params }: PageProps) {
  const { slug } = await params;
  const pair = getConversionPairBySlug(slug);

  if (!pair) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 pb-16">
        {/* Navigation Breadcrumbs */}
        <div className="mb-6 flex items-center space-x-2 text-xs font-mono text-zinc-500">
          <Link href="/" className="hover:text-zinc-900 transition-colors flex items-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>主页</span>
          </Link>
          <span>/</span>
          <span>格式矩阵</span>
          <span>/</span>
          <span className="text-zinc-900 font-medium">{pair.name}</span>
        </div>

        {/* Hero Section */}
        <div className="max-w-2xl mx-auto text-center mb-8">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% 本地内存执行 • 0% 网络传输</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
            {pair.name}
          </h1>

          <p className="mt-3 text-sm text-zinc-600 leading-relaxed max-w-xl mx-auto">
            {pair.fullDesc}
          </p>
        </div>

        {/* Dedicated Workspace */}
        <div className="mb-14">
          <UniversalWorkspace initialSlug={pair.slug} />
        </div>

        {/* SEO Structured FAQ & Advantages */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 mb-12 shadow-2xs">
          <h2 className="text-base font-bold text-zinc-900 mb-4">
            为什么选择 PrivateDoc 进行 {pair.from} → {pair.to} 转换？
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-600">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-1.5 text-zinc-900 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>绝不泄露商业数据</span>
              </div>
              <p className="leading-relaxed">
                传统转换网站会将你的 {pair.from} 文件上传到远程服务器或公有云。PrivateDoc 直接在你的电脑本地浏览器中解构数据，文件从始至终只在内存中存在。
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center space-x-1.5 text-zinc-900 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>无限制，无排队延迟</span>
              </div>
              <p className="leading-relaxed">
                没有“免费用户排队等待 10 分钟”或“超过 5MB 请升级付费”的套路。调用你本地 CPU 算力直接转换，哪怕 50MB 也能瞬间出结果。
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

        {/* Trust Section */}
        <TrustSection />

        {/* Full Format Matrix for cross-linking */}
        <FormatMatrixGrid />

        {/* AdSense Slot */}
        <AdSenseSlot />
      </main>

      <Footer />
    </div>
  );
}
