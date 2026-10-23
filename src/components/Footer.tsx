import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Globe, Code2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-zinc-200/80 bg-white/60 backdrop-blur-xs py-8 mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-zinc-800">本地文转 LocalDoc</span>
            <span>·</span>
            <span className="inline-flex items-center text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-mono text-[11px]">
              <ShieldCheck className="w-3 h-3 mr-1" />
              100% 浏览器本地运算
            </span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-zinc-600">
            <Link href="/" className="hover:text-zinc-900 transition-colors">
              首页
            </Link>
            <Link href="/about" className="hover:text-zinc-900 transition-colors">
              关于我们
            </Link>
            <Link href="/privacy" className="hover:text-zinc-900 transition-colors font-medium">
              隐私政策
            </Link>
            <Link href="/terms" className="hover:text-zinc-900 transition-colors">
              服务条款
            </Link>
            <Link href="/en" className="hover:text-zinc-900 transition-colors">
              English
            </Link>
            <a
              href="https://github.com/HelloaZelda/privatedoc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center hover:text-zinc-900 transition-colors"
            >
              <Code2 className="w-3.5 h-3.5 mr-1" />
              开源仓库
            </a>
          </nav>
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-zinc-400">
          <div>
            © 2026 LocalDoc. 全程本地内存运行 · 零云端上传 · 保护商业与企业隐私。
          </div>
          <div>
            Powered by WebAssembly & Modern Browser Sandbox
          </div>
        </div>
      </div>
    </footer>
  );
}
