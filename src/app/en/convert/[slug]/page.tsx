import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdSenseSlot } from '@/components/AdSenseSlot';
import { UniversalWorkspace } from '@/components/UniversalWorkspace';
import { FormatMatrixGrid } from '@/components/FormatMatrixGrid';
import { CONVERSION_PAIRS, getConversionPairBySlug, getEnglishPairData } from '@/lib/format-registry';
import { ArrowLeft, CheckCircle2, HelpCircle, FileType, ShieldCheck } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const SITE_URL = 'https://doc.irisproject.dpdns.org';

export function generateStaticParams() {
  return CONVERSION_PAIRS.map((pair) => ({
    slug: pair.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pair = getConversionPairBySlug(slug);
  if (!pair) return { title: 'Format Not Found' };

  const enData = getEnglishPairData(pair);
  const canonicalUrl = `${SITE_URL}/en/convert/${pair.slug}`;

  return {
    title: `${enData.title} - LocalDoc`,
    description: `${enData.shortDesc} Fast, private and free online converter.`,
    keywords: [
      enData.name,
      `convert ${pair.from} to ${pair.to}`,
      `${pair.from} to ${pair.to} online free`,
      `free ${pair.slug} converter`,
      'no sign up converter',
      'client side file converter',
      'localdoc',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${enData.title} | LocalDoc`,
      description: enData.shortDesc,
      url: canonicalUrl,
      type: 'website',
    },
  };
}

export default async function EnglishConvertPage({ params }: PageProps) {
  const { slug } = await params;
  const pair = getConversionPairBySlug(slug);

  if (!pair) {
    notFound();
  }

  const enData = getEnglishPairData(pair);

  // Schema.org FAQPage & SoftwareApplication
  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: enData.name,
        operatingSystem: 'Any (Web Browser)',
        applicationCategory: 'MultimediaApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: enData.shortDesc,
      },
      {
        '@type': 'FAQPage',
        mainEntity: enData.faqs.map((faq) => ({
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
      <Header lang="en" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-6 pb-16">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center space-x-2 text-xs text-zinc-500">
          <Link href="/en" className="hover:text-zinc-900 transition-colors flex items-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-zinc-900 font-medium">{enData.name}</span>
        </div>

        {/* H1 Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
            {enData.h1}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-zinc-500">
            {enData.shortDesc}
          </p>
        </div>

        {/* Main Workspace */}
        <div className="mb-14">
          <UniversalWorkspace initialSlug={pair.slug} lang="en" />
        </div>

        {/* Encyclopedic Knowledge */}
        <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-zinc-200/90 bg-white">
            <div className="flex items-center space-x-2 mb-2 text-zinc-900 font-semibold text-sm">
              <FileType className="w-4 h-4 text-emerald-600" />
              <span>What is {pair.from}?</span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              {enData.whatIsFrom}
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-zinc-200/90 bg-white">
            <div className="flex items-center space-x-2 mb-2 text-zinc-900 font-semibold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Why convert to {pair.to}?</span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              {enData.whyConvert}
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        {enData.faqs.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center space-x-2 mb-4">
              <HelpCircle className="w-4 h-4 text-zinc-700" />
              <h2 className="text-sm font-semibold text-zinc-900">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-3">
              {enData.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-zinc-200/90 bg-white">
                  <h3 className="text-xs sm:text-sm font-semibold text-zinc-900 mb-1.5 flex items-start space-x-2">
                    <span className="text-emerald-700 font-mono font-bold">Q.</span>
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed pl-5">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Local privacy notice */}
        <section className="mb-12 p-5 rounded-2xl border border-emerald-200/80 bg-emerald-50/40 flex items-start space-x-3.5">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="text-xs text-emerald-950 space-y-1">
            <div className="font-semibold text-sm text-emerald-900">100% In-Browser Privacy Guarantee</div>
            <p className="text-emerald-800/90 leading-relaxed">
              All files are processed entirely in your web browser memory. Zero files are sent to remote servers or third parties.
            </p>
          </div>
        </section>

        <FormatMatrixGrid lang="en" />

        <AdSenseSlot />
      </main>

      <Footer />
    </div>
  );
}
