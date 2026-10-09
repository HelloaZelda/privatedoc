'use client';

import React, { useState, useRef } from 'react';
import {
  FileUp,
  FileText,
  Copy,
  Check,
  Download,
  RotateCcw,
  Eye,
  Code2,
  Columns,
  AlertCircle,
  FileCheck2,
} from 'lucide-react';
import { convertPdfToMarkdown } from '@/lib/pdf-to-markdown';
import { parseMarkdownToHtml } from '@/lib/markdown-to-pdf';

export function PdfToMarkdownWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 1, message: '' });
  const [markdown, setMarkdown] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'raw' | 'split'>('split');
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      processSelectedFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processSelectedFile(selectedFile);
    }
  };

  const processSelectedFile = async (targetFile: File) => {
    if (!targetFile.name.toLowerCase().endsWith('.pdf')) {
      setError('请选择标准的 PDF 文档文件（.pdf 后缀）。');
      return;
    }

    setError(null);
    setFile(targetFile);
    setIsProcessing(true);
    setProgress({ current: 0, total: 1, message: '正在初始化本地内存解析沙箱...' });

    try {
      const result = await convertPdfToMarkdown(targetFile, (current, total, message) => {
        setProgress({ current, total, message });
      });
      setMarkdown(result);
    } catch (err: unknown) {
      console.error('PDF parsing error:', err);
      const errMsg = err instanceof Error ? err.message : '无法从该 PDF 中提取文本内容。';
      setError(`提取失败：${errMsg}。请确认文件未被密码保护。`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = async () => {
    if (!markdown) return;
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('复制失败', err);
    }
  };

  const handleDownload = () => {
    if (!markdown) return;
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const baseName = file?.name ? file.name.replace(/\.[^/.]+$/, '') : 'document';
    a.download = `${baseName}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setFile(null);
    setMarkdown('');
    setError(null);
    setProgress({ current: 0, total: 1, message: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const characterCount = markdown.length;
  const wordCount = markdown.trim() ? markdown.trim().split(/\s+/).length : 0;
  const lineCount = markdown ? markdown.split('\n').length : 0;

  return (
    <div className="w-full space-y-6">
      {/* 拖拽上传区 */}
      {!markdown && !isProcessing && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-10 sm:p-14 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-emerald-500 bg-emerald-50/40 ring-4 ring-emerald-500/10'
              : 'border-zinc-200/90 hover:border-zinc-400 bg-white/70 hover:bg-zinc-50/50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="max-w-md mx-auto flex flex-col items-center">
            <div className="w-14 h-14 rounded-xl bg-zinc-100 border border-zinc-200/80 flex items-center justify-center text-zinc-700 mb-4 shadow-2xs">
              <FileUp className="w-6 h-6 text-zinc-800" strokeWidth={1.5} />
            </div>

            <h3 className="text-base sm:text-lg font-semibold text-zinc-900 mb-1">
              将 PDF 拖入此处，或 <span className="text-emerald-700 underline underline-offset-2">点击浏览本地文件</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mb-4">
              文本与大纲解析全部在浏览器内存中运行，零数据上传，断网亦可顺畅转换。
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono text-zinc-500">
              <span className="px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200">支持原生与扫描版 PDF</span>
              <span className="px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200">不限文件体积</span>
              <span className="px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200">本地 RAM 计算</span>
            </div>
          </div>
        </div>
      )}

      {/* 转换进度展示 */}
      {isProcessing && (
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 sm:p-12 text-center shadow-xs">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6 text-emerald-600 animate-pulse" strokeWidth={1.75} />
            </div>

            <div>
              <h4 className="text-base font-semibold text-zinc-900">{file?.name}</h4>
              <p className="text-xs text-zinc-500 mt-0.5">
                {progress.message || '正在提取排版与文本内容...'}
              </p>
            </div>

            {/* 进度条 */}
            <div className="w-full bg-zinc-100 rounded-full h-2 overflow-hidden border border-zinc-200">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${progress.total > 0 ? Math.round((progress.current / progress.total) * 100) : 10}%`,
                }}
              />
            </div>

            <div className="flex justify-between text-[11px] font-mono text-zinc-500">
              <span>本地 Worker 线程运行中</span>
              <span>
                {progress.current} / {progress.total} 页
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 异常报错提示 */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50/60 p-4 flex items-start space-x-3 text-red-800 text-sm">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" strokeWidth={1.5} />
          <div className="flex-1">
            <p className="font-medium text-xs sm:text-sm">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-xs text-red-600 hover:text-red-900 underline"
          >
            忽略
          </button>
        </div>
      )}

      {/* 转换完成工作台 */}
      {markdown && !isProcessing && (
        <div className="rounded-2xl border border-zinc-200/90 bg-white shadow-xs overflow-hidden">
          {/* 工具栏 */}
          <div className="border-b border-zinc-200/90 bg-zinc-50/70 px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-3">
            {/* 文档基本信息 */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100/70 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <FileCheck2 className="w-4 h-4" strokeWidth={1.75} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-zinc-900 truncate max-w-[200px] sm:max-w-xs">
                  {file?.name || 'document.pdf'}
                </h4>
                <div className="flex items-center space-x-2 text-[11px] font-mono text-zinc-500">
                  <span>{wordCount.toLocaleString()} 词</span>
                  <span>•</span>
                  <span>{characterCount.toLocaleString()} 字符</span>
                  <span>•</span>
                  <span>{lineCount} 行</span>
                </div>
              </div>
            </div>

            {/* 视图模式切换 */}
            <div className="flex items-center bg-zinc-100 p-0.5 rounded-lg border border-zinc-200 text-xs">
              <button
                onClick={() => setViewMode('split')}
                className={`hidden md:inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md transition-all ${
                  viewMode === 'split'
                    ? 'bg-white text-zinc-900 font-semibold shadow-2xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <Columns className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>分栏对照</span>
              </button>
              <button
                onClick={() => setViewMode('raw')}
                className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md transition-all ${
                  viewMode === 'raw'
                    ? 'bg-white text-zinc-900 font-semibold shadow-2xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>源码编辑</span>
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md transition-all ${
                  viewMode === 'preview'
                    ? 'bg-white text-zinc-900 font-semibold shadow-2xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>排版预览</span>
              </button>
            </div>

            {/* 操作按钮 */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopy}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-800 text-xs font-medium transition-all shadow-2xs active:scale-[0.98]"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" strokeWidth={2} />
                    <span className="text-emerald-700">已复制</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-500" strokeWidth={1.5} />
                    <span>一键复制</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownload}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium transition-all shadow-2xs active:scale-[0.98]"
              >
                <Download className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>下载 .md 文件</span>
              </button>

              <button
                onClick={handleReset}
                title="转换另一个文件"
                className="p-1.5 rounded-lg border border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* 编辑与排版双栏 */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-200 min-h-[460px]">
            {/* Markdown 源码编辑栏 */}
            {(viewMode === 'raw' || viewMode === 'split') && (
              <div
                className={`flex flex-col bg-zinc-50/30 ${
                  viewMode === 'raw' ? 'md:col-span-2' : ''
                }`}
              >
                <div className="border-b border-zinc-200/60 px-4 py-2 bg-zinc-100/50 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>MARKDOWN 源码 (可直接修改)</span>
                  <span>UTF-8 纯文本</span>
                </div>
                <textarea
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  className="w-full flex-1 p-4 font-mono text-xs sm:text-[13px] leading-relaxed text-zinc-800 bg-transparent resize-none focus:outline-none focus:ring-0 border-0"
                  rows={20}
                  spellCheck={false}
                />
              </div>
            )}

            {/* 排版渲染栏 */}
            {(viewMode === 'preview' || viewMode === 'split') && (
              <div
                className={`flex flex-col bg-white overflow-y-auto max-h-[640px] ${
                  viewMode === 'preview' ? 'md:col-span-2' : ''
                }`}
              >
                <div className="border-b border-zinc-200/60 px-4 py-2 bg-zinc-50 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>效果渲染预览</span>
                  <span>标准排版规范</span>
                </div>
                <div className="p-6 sm:p-8 overflow-x-auto">
                  <div
                    className="prose-technical max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: parseMarkdownToHtml(markdown),
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
