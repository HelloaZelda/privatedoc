'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  FileUp,
  FileCheck2,
  Copy,
  Check,
  Download,
  RotateCcw,
  Sparkles,
  AlertCircle,
  ChevronDown,
  Heart,
} from 'lucide-react';
import { SponsorModal } from './SponsorModal';
import { detectSupportedTargetFormats, ConversionPair, CONVERSION_PAIRS } from '@/lib/format-registry';
import {
  convertPdfToTxt,
  convertPdfToImages,
  convertDocxToMarkdown,
  convertDocxToHtml,
  convertDocxToTxt,
  convertCsvToMarkdownTable,
  convertCsvToJson,
  convertJsonToCsv,
  convertImagesToPdf,
  convertImageFormat,
  convertJsonToYaml,
  convertYamlToJson,
  convertHtmlToMarkdown,
} from '@/lib/multi-converter';
import { convertPdfToMarkdown } from '@/lib/pdf-to-markdown';
import { parseMarkdownToHtml, exportElementToPdf } from '@/lib/markdown-to-pdf';

interface UniversalWorkspaceProps {
  initialSlug?: string;
  lang?: 'zh' | 'en';
}

export function UniversalWorkspace({ initialSlug, lang = 'zh' }: UniversalWorkspaceProps) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [availableTargets, setAvailableTargets] = useState<ConversionPair[]>([]);
  const [selectedTarget, setSelectedTarget] = useState<ConversionPair | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [resultContent, setResultContent] = useState<string>('');
  const [resultImages, setResultImages] = useState<string[]>([]);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSponsorOpen, setIsSponsorOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const lockedPair = initialSlug ? CONVERSION_PAIRS.find((p) => p.slug === initialSlug) : null;

  useEffect(() => {
    if (lockedPair) {
      setSelectedTarget(lockedPair);
    }
  }, [lockedPair]);

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
      onFileChosen(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const chosen = e.target.files?.[0];
    if (chosen) {
      onFileChosen(chosen);
    }
  };

  const onFileChosen = (chosenFile: File) => {
    setError(null);
    setFile(chosenFile);
    setResultContent('');
    setResultImages([]);
    setResultBlob(null);

    const matches = detectSupportedTargetFormats(chosenFile.name);
    setAvailableTargets(matches);

    // If on a specific programmatic landing page (e.g. /convert/webp-to-png)
    if (lockedPair) {
      const isMatching = matches.some((m) => m.slug === lockedPair.slug);
      if (isMatching) {
        setSelectedTarget(lockedPair);
        executeConversion(chosenFile, lockedPair);
        return;
      }
    }

    if (matches.length > 0) {
      const defaultTarget = matches[0];
      setSelectedTarget(defaultTarget);
      // Auto execute if only one conversion target exists
      if (matches.length === 1) {
        executeConversion(chosenFile, defaultTarget);
      }
    } else {
      setSelectedTarget(null);
      setError(`当前格式暂未支持。支持格式包括：PDF, Word, CSV, JSON, Markdown, PNG, JPG, WebP`);
    }
  };

  const executeConversion = async (targetFile: File, target: ConversionPair) => {
    setIsProcessing(true);
    setStatusText(`正在本地处理为 ${target.to}...`);
    setError(null);

    try {
      if (target.slug === 'pdf-to-markdown') {
        const md = await convertPdfToMarkdown(targetFile, (curr, total, msg) => setStatusText(msg));
        setResultContent(md);
      } else if (target.slug === 'pdf-to-txt') {
        const txt = await convertPdfToTxt(targetFile, (msg) => setStatusText(msg));
        setResultContent(txt);
      } else if (target.slug === 'pdf-to-images') {
        const imgs = await convertPdfToImages(targetFile);
        setResultImages(imgs);
      } else if (target.slug === 'webp-to-png' || target.slug === 'jpg-to-png' || target.slug === 'svg-to-png') {
        const res = await convertImageFormat(targetFile, 'image/png');
        setResultBlob(res.blob);
        setResultImages([res.dataUrl]);
      } else if (target.slug === 'png-to-webp' || target.slug === 'jpg-to-webp') {
        const res = await convertImageFormat(targetFile, 'image/webp', 0.9);
        setResultBlob(res.blob);
        setResultImages([res.dataUrl]);
      } else if (target.slug === 'png-to-jpg' || target.slug === 'webp-to-jpg') {
        const res = await convertImageFormat(targetFile, 'image/jpeg', 0.95);
        setResultBlob(res.blob);
        setResultImages([res.dataUrl]);
      } else if (target.slug === 'docx-to-markdown') {
        const md = await convertDocxToMarkdown(targetFile);
        setResultContent(md);
      } else if (target.slug === 'docx-to-html') {
        const html = await convertDocxToHtml(targetFile);
        setResultContent(html);
      } else if (target.slug === 'docx-to-txt') {
        const txt = await convertDocxToTxt(targetFile);
        setResultContent(txt);
      } else if (target.slug === 'markdown-to-html') {
        const text = await targetFile.text();
        const html = parseMarkdownToHtml(text);
        setResultContent(html);
      } else if (target.slug === 'html-to-markdown') {
        const text = await targetFile.text();
        const md = convertHtmlToMarkdown(text);
        setResultContent(md);
      } else if (target.slug === 'csv-to-markdown') {
        const text = await targetFile.text();
        const mdTable = convertCsvToMarkdownTable(text);
        setResultContent(mdTable);
      } else if (target.slug === 'csv-to-json') {
        const text = await targetFile.text();
        const json = convertCsvToJson(text);
        setResultContent(json);
      } else if (target.slug === 'json-to-csv') {
        const text = await targetFile.text();
        const csv = convertJsonToCsv(text);
        setResultContent(csv);
      } else if (target.slug === 'json-to-yaml') {
        const text = await targetFile.text();
        const yaml = await convertJsonToYaml(text);
        setResultContent(yaml);
      } else if (target.slug === 'yaml-to-json') {
        const text = await targetFile.text();
        const json = await convertYamlToJson(text);
        setResultContent(json);
      } else if (target.slug === 'images-to-pdf') {
        const blob = await convertImagesToPdf([targetFile]);
        setResultBlob(blob);
      }
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : '转换发生异常，请检查文件格式。');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resultBlob && selectedTarget) {
      const url = URL.createObjectURL(resultBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${file?.name.replace(/\.[^/.]+$/, '') || 'converted'}${selectedTarget.toExt}`;
      a.click();
      URL.revokeObjectURL(url);
      return;
    }

    if (resultContent && selectedTarget) {
      const mime = selectedTarget.toExt === '.json' ? 'application/json' : 'text/plain;charset=utf-8;';
      const blob = new Blob([resultContent], { type: mime });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${file?.name.replace(/\.[^/.]+$/, '') || 'converted'}${selectedTarget.toExt}`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleCopy = async () => {
    if (!resultContent) return;
    try {
      await navigator.clipboard.writeText(resultContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const resetAll = () => {
    setFile(null);
    setAvailableTargets([]);
    if (!lockedPair) {
      setSelectedTarget(null);
    }
    setResultContent('');
    setResultImages([]);
    setResultBlob(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const imagePairs = CONVERSION_PAIRS.filter((p) => p.category === 'image');
  const documentPairs = CONVERSION_PAIRS.filter((p) => p.category === 'document');
  const dataPairs = CONVERSION_PAIRS.filter((p) => p.category === 'data');
  const isEn = lang === 'en';

  return (
    <div className="w-full space-y-4">
      {/* 快捷下拉选择 xx 转 xx */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
        <div className="flex items-center space-x-2">
          <label htmlFor="format-select" className="text-xs sm:text-sm font-medium text-zinc-600 whitespace-nowrap">
            {isEn ? 'Convert:' : '选择转换：'}
          </label>
          <div className="relative inline-block w-full sm:w-auto">
            <select
              id="format-select"
              value={initialSlug || ''}
              onChange={(e) => {
                const val = e.target.value;
                const prefix = isEn ? '/en' : '';
                if (val) {
                  router.push(`${prefix}/convert/${val}`);
                } else {
                  router.push(prefix || '/');
                }
              }}
              className="w-full sm:w-64 appearance-none bg-white border border-zinc-200 hover:border-zinc-300 text-zinc-900 text-xs sm:text-sm font-medium rounded-xl pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 cursor-pointer shadow-2xs transition-colors"
            >
              <option value="">{isEn ? 'Universal (Auto Detect)' : '通用（拖入自动识别）'}</option>
              <optgroup label={isEn ? 'Images' : '图片'}>
                {imagePairs.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {isEn ? `${p.from} to ${p.to}` : p.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label={isEn ? 'Documents' : '文档'}>
                {documentPairs.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {isEn ? `${p.from} to ${p.to}` : p.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label={isEn ? 'Data' : '数据'}>
                {dataPairs.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {isEn ? `${p.from} to ${p.to}` : p.name}
                  </option>
                ))}
              </optgroup>
            </select>
            <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {initialSlug && (
          <button
            onClick={() => router.push(isEn ? '/en' : '/')}
            className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors self-start sm:self-center"
          >
            {isEn ? 'Reset' : '重置为通用'}
          </button>
        )}
      </div>

      {/* Upload Dropzone - Double Bezel Architecture */}
      {!file && (
        <div className="p-2 sm:p-2.5 rounded-[2.5rem] bg-gradient-to-b from-zinc-200/70 via-zinc-100/40 to-zinc-200/70 border border-zinc-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`rounded-[calc(2.5rem-0.625rem)] border-2 border-dashed p-8 sm:p-14 text-center cursor-pointer transition-all duration-300 relative overflow-hidden group ${
              isDragging
                ? 'border-emerald-500 bg-emerald-50/60 shadow-[0_0_40px_rgba(16,185,129,0.15)]'
                : 'border-zinc-200/90 hover:border-emerald-500/80 bg-white hover:bg-zinc-50/40'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={lockedPair ? lockedPair.fromExt.join(',') : undefined}
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="max-w-md mx-auto flex flex-col items-center relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex items-center justify-center text-zinc-700 mb-5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),0_4px_12px_rgba(0,0,0,0.04)] group-hover:scale-105 group-hover:border-emerald-300 transition-all duration-300">
                <FileUp className="w-7 h-7 text-zinc-800 group-hover:text-emerald-700 transition-colors" strokeWidth={1.5} />
              </div>

              <h3 className="text-base sm:text-xl font-bold tracking-tight text-zinc-900 mb-2">
                {lockedPair ? (
                  isEn ? (
                    <>
                      Drop <span className="text-zinc-900 font-black">{lockedPair.from}</span> to convert to{' '}
                      <span className="text-emerald-700 font-black">{lockedPair.to}</span>
                    </>
                  ) : (
                    <>
                      拖入 <span className="text-zinc-900 font-black">{lockedPair.from}</span> 文件，直接转为{' '}
                      <span className="text-emerald-700 font-black">{lockedPair.to}</span>
                    </>
                  )
                ) : (
                  isEn ? (
                    <>
                      Drop documents here, or <span className="text-emerald-700 underline underline-offset-4 font-black">browse</span>
                    </>
                  ) : (
                    <>
                      拖拽文件至此，或 <span className="text-emerald-700 underline underline-offset-4 font-black">点击浏览</span>
                    </>
                  )
                )}
              </h3>

              <p className="text-xs text-zinc-400 mb-6 font-medium">
                {isEn ? '100% In-Browser · No Registration · Instant Local RAM Processing' : '无需注册 · 零服务器上传 · 浏览器内存极速秒转'}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] font-mono text-zinc-600">
                {lockedPair ? (
                  lockedPair.fromExt.map((ext) => (
                    <span key={ext} className="px-2.5 py-1 rounded-lg bg-zinc-100/90 border border-zinc-200/90 uppercase font-bold text-zinc-800 shadow-3xs">
                      {ext}
                    </span>
                  ))
                ) : (
                  <>
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-100/90 border border-zinc-200/90 font-semibold shadow-3xs">.PDF</span>
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-100/90 border border-zinc-200/90 font-semibold shadow-3xs">.DOCX</span>
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-100/90 border border-zinc-200/90 font-semibold shadow-3xs">.MD</span>
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-100/90 border border-zinc-200/90 font-semibold shadow-3xs">.CSV</span>
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-100/90 border border-zinc-200/90 font-semibold shadow-3xs">.WEBP</span>
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-100/90 border border-zinc-200/90 font-semibold shadow-3xs">.PNG</span>
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-100/90 border border-zinc-200/90 font-semibold shadow-3xs">.JPG</span>
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-100/90 border border-zinc-200/90 font-semibold shadow-3xs">.JSON</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Target Format Selector when File is loaded and multiple options available */}
      {file && !resultContent && resultImages.length === 0 && !resultBlob && !isProcessing && (
        <div className="p-2 sm:p-2.5 rounded-[2rem] bg-zinc-200/60 border border-zinc-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.03)]">
          <div className="rounded-[calc(2rem-0.625rem)] border border-zinc-200/80 bg-white p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-5">
              <div className="flex items-center space-x-3.5">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-700 shadow-3xs">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900">{file.name}</h4>
                  <p className="text-xs font-mono text-zinc-500">
                    {(file.size / 1024).toFixed(1)} KB · 待处理
                  </p>
                </div>
              </div>

              <button
                onClick={resetAll}
                className="inline-flex items-center px-3 py-1.5 rounded-full border border-zinc-200 text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-colors"
              >
                {isEn ? 'Change file' : '更换文件'}
              </button>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-700 block mb-3">
                {isEn ? 'Select Target Conversion Pipeline:' : '选择目标转换通道：'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {availableTargets.map((target) => (
                  <button
                    key={target.slug}
                    onClick={() => {
                      setSelectedTarget(target);
                      executeConversion(file, target);
                    }}
                    className={`text-left p-4 rounded-2xl border transition-all duration-200 ${
                      selectedTarget?.slug === target.slug
                        ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20 shadow-xs'
                        : 'border-zinc-200/80 bg-zinc-50/50 hover:bg-white hover:border-zinc-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-bold text-zinc-900">
                        {isEn ? `Convert to ${target.to}` : `转为 ${target.to}`}
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-zinc-200/80 text-zinc-800">
                        {target.toExt}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {target.shortDesc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Processing Indicator */}
      {isProcessing && (
        <div className="p-2 sm:p-2.5 rounded-[2rem] bg-zinc-200/60 border border-zinc-200/80">
          <div className="rounded-[calc(2rem-0.625rem)] border border-zinc-200/80 bg-white p-8 sm:p-12 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-4 shadow-3xs">
              <Sparkles className="w-6 h-6 text-emerald-600 animate-spin" />
            </div>
            <h4 className="text-base font-bold text-zinc-900 mb-1">{statusText || '正在本地沙箱中运算...'}</h4>
            <p className="text-xs text-zinc-400 font-mono">100% Client-Side WebAssembly Processing</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50/70 p-4 sm:p-5 flex items-start space-x-3 text-red-800 text-sm shadow-xs">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-xs sm:text-sm">{error}</p>
          </div>
          <button onClick={() => setError(null)} className="text-xs underline font-medium">
            关闭
          </button>
        </div>
      )}

      {/* Converted Result Workspace - Double Bezel */}
      {(resultContent || resultImages.length > 0 || resultBlob) && (
        <div className="p-2 sm:p-2.5 rounded-[2rem] bg-zinc-200/60 border border-zinc-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
          <div className="rounded-[calc(2rem-0.625rem)] border border-zinc-200/80 bg-white overflow-hidden">
            {/* Header Action Bar */}
            <div className="border-b border-zinc-200/80 bg-zinc-50/80 px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-zinc-900 font-mono">
                  {file?.name} → {selectedTarget?.name}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                {resultContent && (
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-800 text-xs font-medium transition-all shadow-3xs active:scale-95"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="font-semibold">{isEn ? 'Copied' : '已复制'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{isEn ? 'Copy' : '复制文本'}</span>
                      </>
                    )}
                  </button>
                )}

                <button
                  onClick={handleDownload}
                  className="inline-flex items-center space-x-2 pl-4 pr-2.5 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold shadow-xs active:scale-95 transition-all"
                >
                  <span>{isEn ? `Download (${selectedTarget?.toExt})` : `下载 (${selectedTarget?.toExt})`}</span>
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <Download className="w-3 h-3 text-white" />
                  </span>
                </button>

                <button
                  onClick={() => setIsSponsorOpen(true)}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-rose-200 bg-rose-50/70 hover:bg-rose-100/70 text-rose-700 text-xs font-medium transition-all active:scale-95 shadow-3xs"
                  title={isEn ? 'Buy developer a coffee' : '赞助作者'}
                >
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  <span>{isEn ? 'Tip' : '请喝咖啡'}</span>
                </button>

                <button
                  onClick={resetAll}
                  className="p-1.5 rounded-full border border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                  title={isEn ? 'Convert another file' : '转换另一个文件'}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Result Content Body (Text) */}
            {resultContent && (
              <div className="p-4 sm:p-6 bg-zinc-50/30">
                <textarea
                  value={resultContent}
                  onChange={(e) => setResultContent(e.target.value)}
                  className="w-full font-mono text-xs sm:text-[13px] leading-relaxed text-zinc-800 bg-white p-4 sm:p-5 rounded-2xl border border-zinc-200/90 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 shadow-inner"
                  rows={16}
                  spellCheck={false}
                />
              </div>
            )}

            {/* Render Images if Converted to Images */}
            {resultImages.length > 0 && (
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-zinc-50/50">
                {resultImages.map((imgSrc, idx) => (
                  <div key={idx} className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-3xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imgSrc} alt={`Converted preview ${idx + 1}`} className="w-full rounded-xl border max-h-80 object-contain bg-zinc-100" />
                    <div className="mt-3 flex items-center justify-between text-xs font-mono text-zinc-500 px-1">
                      <span>{selectedTarget?.to} {isEn ? 'Preview' : '预览'}</span>
                      <a
                        href={imgSrc}
                        download={`${file?.name.replace(/\.[^/.]+$/, '') || 'image'}${selectedTarget?.toExt || '.png'}`}
                        className="text-emerald-700 font-bold hover:underline"
                      >
                        {isEn ? 'Save' : '单独保存'}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 赞助弹窗 */}
      <SponsorModal isOpen={isSponsorOpen} onClose={() => setIsSponsorOpen(false)} lang={lang} />
    </div>
  );
}
