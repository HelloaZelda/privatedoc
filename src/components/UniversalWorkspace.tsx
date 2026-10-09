'use client';

import React, { useState, useRef } from 'react';
import {
  FileUp,
  FileCheck2,
  Copy,
  Check,
  Download,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Layers,
  AlertCircle,
  FileText,
  FileCode,
  Table,
  Image as ImageIcon,
} from 'lucide-react';
import { detectSupportedTargetFormats, ConversionPair, CONVERSION_PAIRS } from '@/lib/format-registry';
import {
  convertPdfToTxt,
  convertPdfToImages,
  convertDocxToMarkdown,
  convertDocxToHtml,
  convertCsvToMarkdownTable,
  convertCsvToJson,
  convertJsonToCsv,
  convertImagesToPdf,
} from '@/lib/multi-converter';
import { convertPdfToMarkdown } from '@/lib/pdf-to-markdown';
import { parseMarkdownToHtml } from '@/lib/markdown-to-pdf';

interface UniversalWorkspaceProps {
  initialSlug?: string;
}

export function UniversalWorkspace({ initialSlug }: UniversalWorkspaceProps) {
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

  const fileInputRef = useRef<HTMLInputElement>(null);

  // If initialSlug is passed, find matching pair
  React.useEffect(() => {
    if (initialSlug) {
      const match = CONVERSION_PAIRS.find((p) => p.slug === initialSlug);
      if (match) setSelectedTarget(match);
    }
  }, [initialSlug]);

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

    if (matches.length > 0) {
      // Pick first matching target or keep if already matches
      setSelectedTarget(matches[0]);
    } else {
      setSelectedTarget(null);
      setError(`当前格式暂未支持。支持的格式包括：.pdf, .md, .docx, .csv, .json, .png, .jpg`);
    }
  };

  const executeConversion = async (target: ConversionPair) => {
    if (!file) return;
    setIsProcessing(true);
    setStatusText(`正在调用本地 Web Worker 转换为 ${target.to}...`);
    setError(null);

    try {
      if (target.slug === 'pdf-to-markdown') {
        const md = await convertPdfToMarkdown(file, (curr, total, msg) => setStatusText(msg));
        setResultContent(md);
      } else if (target.slug === 'pdf-to-txt') {
        const txt = await convertPdfToTxt(file, (msg) => setStatusText(msg));
        setResultContent(txt);
      } else if (target.slug === 'pdf-to-images') {
        const imgs = await convertPdfToImages(file);
        setResultImages(imgs);
      } else if (target.slug === 'docx-to-markdown') {
        const md = await convertDocxToMarkdown(file);
        setResultContent(md);
      } else if (target.slug === 'docx-to-html') {
        const html = await convertDocxToHtml(file);
        setResultContent(html);
      } else if (target.slug === 'csv-to-markdown') {
        const text = await file.text();
        const mdTable = convertCsvToMarkdownTable(text);
        setResultContent(mdTable);
      } else if (target.slug === 'csv-to-json') {
        const text = await file.text();
        const json = convertCsvToJson(text);
        setResultContent(json);
      } else if (target.slug === 'json-to-csv') {
        const text = await file.text();
        const csv = convertJsonToCsv(text);
        setResultContent(csv);
      } else if (target.slug === 'images-to-pdf') {
        const blob = await convertImagesToPdf([file]);
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
      a.download = `${file?.name.replace(/\.[^/.]+$/, '') || 'document'}${selectedTarget.toExt}`;
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
      a.download = `${file?.name.replace(/\.[^/.]+$/, '') || 'document'}${selectedTarget.toExt}`;
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
    setSelectedTarget(null);
    setResultContent('');
    setResultImages([]);
    setResultBlob(null);
    setError(null);
  };

  return (
    <div className="w-full space-y-6">
      {/* File Upload / Dropzone */}
      {!file && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-10 sm:p-14 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-emerald-500 bg-emerald-50/50'
              : 'border-zinc-200/90 hover:border-zinc-400 bg-white/80 hover:bg-zinc-50/40'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="max-w-md mx-auto flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-700 mb-4 shadow-2xs">
              <FileUp className="w-6 h-6 text-zinc-800" strokeWidth={1.5} />
            </div>

            <h3 className="text-base sm:text-lg font-semibold text-zinc-900 mb-1">
              拖入任意文件，或 <span className="text-emerald-700 underline underline-offset-2">点击浏览</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mb-4">
              自动识别格式（PDF、Word、CSV、JSON、Markdown、图片），100% 浏览器本地运算秒转。
            </p>

            <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] font-mono text-zinc-600">
              <span className="px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200">.PDF</span>
              <span className="px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200">.DOCX (Word)</span>
              <span className="px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200">.CSV</span>
              <span className="px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200">.JSON</span>
              <span className="px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200">.MD</span>
              <span className="px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200">.PNG / .JPG</span>
            </div>
          </div>
        </div>
      )}

      {/* Target Format Selector when File is loaded */}
      {file && !resultContent && resultImages.length === 0 && !resultBlob && (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-700">
                <FileCheck2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-900">{file.name}</h4>
                <p className="text-xs font-mono text-zinc-500">
                  {(file.size / 1024).toFixed(1)} KB • 已就绪
                </p>
              </div>
            </div>

            <button
              onClick={resetAll}
              className="text-xs font-mono text-zinc-500 hover:text-zinc-900 underline"
            >
              更换文件
            </button>
          </div>

          <div>
            <label className="text-xs font-mono text-zinc-500 uppercase tracking-wider block mb-3">
              选择你希望转换的目标格式：
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {availableTargets.map((target) => (
                <button
                  key={target.slug}
                  onClick={() => {
                    setSelectedTarget(target);
                    executeConversion(target);
                  }}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    selectedTarget?.slug === target.slug
                      ? 'border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-500/20'
                      : 'border-zinc-200 bg-zinc-50/50 hover:bg-white hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-zinc-900">
                      转为 {target.to}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-200/80 text-zinc-700">
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
      )}

      {/* Processing Indicator */}
      {isProcessing && (
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-5 h-5 text-emerald-600 animate-spin" />
          </div>
          <h4 className="text-sm font-semibold text-zinc-900">{statusText}</h4>
          <p className="text-xs font-mono text-zinc-500 mt-1">本地 RAM 运算，无需等待排队</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50/60 p-4 flex items-start space-x-3 text-red-800 text-sm">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium text-xs sm:text-sm">{error}</p>
          </div>
          <button onClick={() => setError(null)} className="text-xs underline">
            关闭
          </button>
        </div>
      )}

      {/* Converted Result Workspace */}
      {(resultContent || resultImages.length > 0 || resultBlob) && (
        <div className="rounded-2xl border border-zinc-200 bg-white shadow-xs overflow-hidden">
          {/* Header Action Bar */}
          <div className="border-b border-zinc-200 bg-zinc-50/70 px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-zinc-900">
                {file?.name} → {selectedTarget?.name}
              </span>
              <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                转换成功
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {resultContent && (
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-800 text-xs font-medium transition-all shadow-2xs"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>已复制</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-500" />
                      <span>一键复制</span>
                    </>
                  )}
                </button>
              )}

              <button
                onClick={handleDownload}
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium transition-all shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>下载文件 ({selectedTarget?.toExt})</span>
              </button>

              <button
                onClick={resetAll}
                className="p-1.5 rounded-lg border border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                title="转换另一个文件"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Result Content Body */}
          {resultContent && (
            <div className="p-4 sm:p-6 bg-zinc-50/30">
              <textarea
                value={resultContent}
                onChange={(e) => setResultContent(e.target.value)}
                className="w-full font-mono text-xs sm:text-[13px] leading-relaxed text-zinc-800 bg-white p-4 rounded-xl border border-zinc-200 focus:outline-none"
                rows={16}
                spellCheck={false}
              />
            </div>
          )}

          {/* Render Images if PDF to Images */}
          {resultImages.length > 0 && (
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-zinc-50/50">
              {resultImages.map((imgSrc, idx) => (
                <div key={idx} className="rounded-xl border border-zinc-200 bg-white p-2 shadow-2xs">
                  <img src={imgSrc} alt={`Page ${idx + 1}`} className="w-full rounded border" />
                  <div className="mt-2 flex items-center justify-between text-xs font-mono text-zinc-500 px-1">
                    <span>第 {idx + 1} 页</span>
                    <a
                      href={imgSrc}
                      download={`page-${idx + 1}.png`}
                      className="text-emerald-700 hover:underline"
                    >
                      单张另存
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
