import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const SITE_URL = 'https://privatedoc-green.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: '本地文转 (LocalDoc) — 100% 浏览器本地运算，零上传文档转换工具',
  description:
    '极速、安全的纯前端离线文档格式互转站。支持 PDF 转 Markdown、Markdown 转 PDF、Word 转 Markdown、CSV 转 Markdown 表格、图片转 PDF。全程在浏览器内存中运行，零服务器上传，保护企业与商业隐私。',
  keywords: [
    '本地文转',
    'PDF转Markdown',
    'Markdown转PDF',
    'Word转Markdown',
    'CSV转Markdown表格',
    '离线文档转换',
    '隐私保护文件转换',
    '免上传PDF工具',
  ],
  authors: [{ name: 'LocalDoc Team' }],
  openGraph: {
    title: '本地文转 (LocalDoc) — 100% 浏览器本地运算，绝不上传服务器',
    description: '文档格式转换无需上传云端。本地 WebAssembly 内存极速秒转，断网可用，绝密隐私保证。',
    url: SITE_URL,
    siteName: '本地文转 LocalDoc',
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '本地文转 (LocalDoc) — 100% 浏览器本地运算',
    description: '文档格式转换无需上传云端。本地 WebAssembly 内存极速秒转，断网可用。',
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  // Google 搜索结构化数据 (JSON-LD WebApplication)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '本地文转 LocalDoc',
    url: SITE_URL,
    description: '100% 浏览器本地运行的隐私文档格式转换工具，零服务器上传，离线可用。',
    applicationCategory: 'BusinessApplication, DeveloperApplication, UtilityApplication',
    operatingSystem: 'All Modern Browsers',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CNY',
    },
    featureList: [
      '100% 纯前端离线计算',
      'PDF 转 Markdown',
      'Markdown 转 PDF',
      'Word (DOCX) 转 Markdown',
      'CSV 转 Markdown 表格',
      '多图合成 PDF',
    ],
  };

  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {adsenseClientId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 selection:bg-emerald-100 selection:text-emerald-900">
        {children}
      </body>
    </html>
  );
}
