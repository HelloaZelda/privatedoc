'use client';

import React from 'react';
import { Lock, Shield, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-3">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-zinc-700">本地文转 LocalDoc</span>
          <span>·</span>
          <span>纯本地转换，不上传服务器</span>
        </div>
        <p>© 2026 LocalDoc</p>
      </div>
    </footer>
  );
}

