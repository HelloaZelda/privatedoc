import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ShieldCheck, Lock, EyeOff, FileText, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy — LocalDoc (100% Client-Side Privacy Converter)',
  description:
    'LocalDoc Privacy Policy: 100% client-side WebAssembly computation. No files are uploaded to our servers. Full Google AdSense cookie compliance disclosures.',
  alternates: {
    canonical: 'https://irisproject.dpdns.org/en/privacy',
  },
};

export default function EnPrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12">
        <div className="mb-6">
          <Link
            href="/en"
            className="inline-flex items-center text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200/80 p-8 sm:p-12 shadow-xs space-y-8 text-zinc-700 leading-relaxed">
          <header className="border-b border-zinc-200 pb-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Client-Side Computation Guarantee</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
              Privacy Policy
            </h1>
            <p className="text-xs text-zinc-400 mt-2 font-mono">
              Effective Date: October 1, 2026 | Last Updated: October 24, 2026
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-900 flex items-center">
              <Lock className="w-4 h-4 mr-2 text-emerald-600" />
              1. Zero Server Uploads: Complete Client-Side Security
            </h2>
            <p className="text-sm">
              At <strong>LocalDoc</strong>, privacy is not a feature; it is our foundation. When you convert documents (PDF, Markdown, Word DOCX, CSV, images), all conversions take place directly within your browser using WebAssembly and pure client-side JavaScript.
            </p>
            <ul className="list-disc list-inside text-sm space-y-1.5 pl-2 text-zinc-600">
              <li>Your files are never transmitted to our servers or any third-party clouds.</li>
              <li>Conversion works offline without internet access. Data exists solely in ephemeral device memory.</li>
              <li>We cannot view, store, copy, or index your documents.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-900 flex items-center">
              <EyeOff className="w-4 h-4 mr-2 text-indigo-600" />
              2. Google AdSense & Advertising Cookies Disclosure
            </h2>
            <p className="text-sm">
              We display advertisements provided by Google AdSense to sustain free access to this service. In compliance with Google publisher requirements:
            </p>
            <ul className="list-disc list-inside text-sm space-y-2 pl-2 text-zinc-600">
              <li>
                Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites.
              </li>
              <li>
                Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to this site and/or other sites on the Internet.
              </li>
              <li>
                Users may opt out of personalized advertising by visiting{' '}
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 underline hover:text-emerald-700"
                >
                  Google Ads Settings
                </a>.
              </li>
              <li>
                Alternatively, users can opt out of third-party vendors' use of cookies for personalized advertising by visiting{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 underline hover:text-emerald-700"
                >
                  www.aboutads.info
                </a>.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-900 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-zinc-600" />
              3. Telemetry & Analytics
            </h2>
            <p className="text-sm">
              We collect privacy-preserving, aggregated visitor statistics through Vercel Web Analytics (e.g., aggregate page views, device categories). No personal identity information (PII) is ever tracked.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-900">
              4. Contact Us
            </h2>
            <p className="text-sm">
              If you have any questions about this Privacy Policy or our client-side architecture, contact us at:
            </p>
            <p className="text-sm text-zinc-500 font-mono">
              Email: support@irisproject.dpdns.org | GitHub: HelloaZelda/privatedoc
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
