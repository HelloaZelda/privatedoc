'use client';

import React, { useState, useRef } from 'react';
import {
  FileUp,
  Download,
  Printer,
  Copy,
  Check,
  FileText,
  RotateCcw,
  Sparkles,
  Heading,
  Bold,
  List,
  Code,
  Table as TableIcon,
} from 'lucide-react';
import { parseMarkdownToHtml, exportElementToPdf } from '@/lib/markdown-to-pdf';

const SAMPLE_MARKDOWN = `# Technical Specification & Security Architecture
**Document ID:** PRIV-2026-09  
**Classification:** Confidential / Client-Local  
**Author:** PrivateDoc Core Engineering  

---

## 1. Executive Summary
PrivateDoc implements an **air-gapped client runtime model** for privacy-critical document synthesis. By loading compilation engines directly into WebAssembly workers, zero outbound socket connections are spawned during execution.

### Key Architectural Tenets
- **Zero Server Retention:** Binary streams stay encapsulated within browser \`ArrayBuffer\` instances.
- **Deterministic Latency:** Independent of cloud concurrency or remote queueing overhead.
- **Lossless Typographic Pipeline:** High-fidelity conversion preserves structural semantics.

---

## 2. Benchmark Metrics

| Metric | Cloud Processing | PrivateDoc (Local) | Advantage |
| :--- | :--- | :--- | :--- |
| **Network Egress** | 100% File Size | **0 KB (0 bytes)** | Absolute Privacy |
| **Queue Latency** | 2.4s - 8.1s | **0.00s (Instant)** | 100% Real-time |
| **Auth Required** | Yes | **No (Open Tool)** | Frictionless |

---

## 3. Implementation Code

\`\`\`typescript
// Local Execution Guarantee
const buffer = await file.arrayBuffer();
const worker = new Worker('/pdf.worker.min.mjs');
worker.postMessage({ buffer }, [buffer]); // Zero server round-trip
\`\`\`

> *"True privacy is architectural, not contractual."*

### Verification Checklist
- [x] Sandboxed Web Worker initialized
- [x] Memory freed upon component unmount
- [x] Zero tracking or analytics cookies injected
`;

export function MarkdownToPdfWorkspace() {
  const [markdown, setMarkdown] = useState<string>(SAMPLE_MARKDOWN);
  const [filename, setFilename] = useState<string>('document');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportProgress, setExportProgress] = useState<{ percent: number; message: string }>({
    percent: 0,
    message: '',
  });
  const [copied, setCopied] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const printContainerRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      loadFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      loadFile(selectedFile);
    }
  };

  const loadFile = async (targetFile: File) => {
    try {
      const text = await targetFile.text();
      setMarkdown(text);
      const cleanName = targetFile.name.replace(/\.[^/.]+$/, '');
      setFilename(cleanName || 'document');
    } catch (err) {
      console.error('Failed to read file', err);
    }
  };

  const handleExportPdf = async () => {
    if (!printContainerRef.current) return;
    setIsExporting(true);
    setExportProgress({ percent: 10, message: 'Preparing PDF canvas engine...' });

    try {
      await exportElementToPdf(
        printContainerRef.current,
        `${filename || 'document'}.pdf`,
        (percent, message) => {
          setExportProgress({ percent, message });
        }
      );
    } catch (err) {
      console.error('PDF Export failed', err);
      alert('PDF export failed. Try using the "System Print" button for native vector PDF.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleSystemPrint = () => {
    window.print();
  };

  const handleCopyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  const insertSnippet = (prefix: string, suffix: string = '') => {
    setMarkdown((prev) => `${prev}\n${prefix}Content${suffix}\n`);
  };

  return (
    <div className="w-full space-y-6">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".md,.markdown,.txt"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Editor & Preview Grid */}
      <div className="rounded-2xl border border-zinc-200/90 bg-white shadow-xs overflow-hidden">
        {/* Action Header */}
        <div className="border-b border-zinc-200/90 bg-zinc-50/70 px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-3">
          {/* File naming & Drag trigger */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-700">
              <FileText className="w-4 h-4" strokeWidth={1.75} />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                placeholder="document"
                className="text-xs sm:text-sm font-semibold text-zinc-900 bg-transparent border-b border-dashed border-zinc-300 focus:border-zinc-800 focus:outline-none px-1 py-0.5"
                title="Click to rename output PDF"
              />
              <span className="text-xs font-mono text-zinc-500">.pdf</span>
            </div>
          </div>

          {/* Quick Markdown Formatting Controls */}
          <div className="hidden lg:flex items-center space-x-1 bg-zinc-100/80 p-0.5 rounded-lg border border-zinc-200 text-zinc-600">
            <button
              onClick={() => insertSnippet('## ')}
              className="p-1.5 hover:text-zinc-900 hover:bg-white rounded transition-colors text-xs"
              title="Heading 2"
            >
              <Heading className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => insertSnippet('**', '**')}
              className="p-1.5 hover:text-zinc-900 hover:bg-white rounded transition-colors text-xs"
              title="Bold"
            >
              <Bold className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => insertSnippet('- ')}
              className="p-1.5 hover:text-zinc-900 hover:bg-white rounded transition-colors text-xs"
              title="Bulleted List"
            >
              <List className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => insertSnippet('```\n', '\n```')}
              className="p-1.5 hover:text-zinc-900 hover:bg-white rounded transition-colors text-xs"
              title="Code Block"
            >
              <Code className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
            <button
              onClick={() =>
                insertSnippet('| Column 1 | Column 2 |\n| :--- | :--- |\n| Value A | Value B |')
              }
              className="p-1.5 hover:text-zinc-900 hover:bg-white rounded transition-colors text-xs"
              title="Table"
            >
              <TableIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-medium transition-all shadow-2xs active:scale-[0.98]"
            >
              <FileUp className="w-3.5 h-3.5 text-zinc-500" strokeWidth={1.5} />
              <span className="hidden sm:inline">Upload .md</span>
            </button>

            <button
              onClick={handleSystemPrint}
              title="Print directly or save as vector PDF with native browser engine"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-medium transition-all shadow-2xs active:scale-[0.98]"
            >
              <Printer className="w-3.5 h-3.5 text-zinc-500" strokeWidth={1.5} />
              <span className="hidden sm:inline">Vector Print</span>
            </button>

            <button
              onClick={handleExportPdf}
              disabled={isExporting}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-400 text-white text-xs font-medium transition-all shadow-2xs active:scale-[0.98]"
            >
              <Download className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>{isExporting ? 'Generating...' : 'Download PDF'}</span>
            </button>
          </div>
        </div>

        {/* Progress Bar (if generating) */}
        {isExporting && (
          <div className="bg-emerald-50 border-b border-emerald-200/80 px-4 py-2 flex items-center justify-between text-xs text-emerald-800">
            <span className="font-medium font-mono">{exportProgress.message}</span>
            <span className="font-mono">{exportProgress.percent}%</span>
          </div>
        )}

        {/* Split Editor / A4 Preview View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200 min-h-[520px]">
          {/* Left: Markdown Editor */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex flex-col bg-zinc-50/40 relative ${
              isDragging ? 'bg-emerald-50/50 ring-2 ring-emerald-500/30' : ''
            }`}
          >
            <div className="border-b border-zinc-200/60 px-4 py-2 bg-zinc-100/50 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>MARKDOWN SOURCE EDITOR</span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setMarkdown(SAMPLE_MARKDOWN)}
                  className="hover:text-zinc-900 flex items-center space-x-1 text-emerald-700"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Sample</span>
                </button>
                <button
                  onClick={handleCopyMarkdown}
                  className="hover:text-zinc-900 flex items-center space-x-1"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={() => setMarkdown('')}
                  className="hover:text-zinc-900 flex items-center space-x-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              </div>
            </div>

            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Paste or write Markdown here... (Drag & Drop .md file supported)"
              className="w-full flex-1 p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-zinc-800 bg-transparent resize-none focus:outline-none border-0"
              rows={24}
              spellCheck={false}
            />

            {isDragging && (
              <div className="absolute inset-0 bg-emerald-50/80 backdrop-blur-xs flex items-center justify-center border-2 border-dashed border-emerald-500 rounded-lg m-2 pointer-events-none">
                <p className="text-sm font-semibold text-emerald-800">Drop .md file to load</p>
              </div>
            )}
          </div>

          {/* Right: Simulated A4 Printable Sheet */}
          <div className="flex flex-col bg-zinc-100/60 overflow-y-auto max-h-[720px] p-4 sm:p-6">
            <div className="mb-2 flex items-center justify-between text-[11px] font-mono text-zinc-600">
              <span>LIVE A4 DOCUMENT PREVIEW</span>
              <span>210mm × 297mm</span>
            </div>

            {/* A4 Paper Container */}
            <div
              id="printable-document"
              ref={printContainerRef}
              className="w-full bg-white rounded-lg shadow-sm border border-zinc-200/90 p-8 sm:p-12 min-h-[600px] transition-all"
            >
              <div
                className="prose-technical max-w-none"
                dangerouslySetInnerHTML={{
                  __html: parseMarkdownToHtml(markdown || '*No content to render. Start typing on the left.*'),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
