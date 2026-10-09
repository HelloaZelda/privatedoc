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

const SAMPLE_MARKDOWN = `# 本地文转技术规格与安全白皮书
**文档编号：** SEC-2026-LOCAL  
**保密等级：** 商业机密 / 离线绝密  
**发行团队：** 本地文转核心架构小组  

---

## 1. 架构总览
本地文转（LocalDoc）专为高保密要求行业（律所、金融研究、商业谈判与技术开发）设计。文档的二进制数据流仅保存在浏览器分配的虚拟内存中，不经过任何外部网络中转。

### 核心安全准则
- **零服务器留存：** 数据流全部封存于前端 \`ArrayBuffer\`，处理结束立即回收。
- **硬件级处理性能：** 本地多核 CPU 与 WebAssembly 协程调度，秒级转换。
- **出版级排版系统：** 继承现代排版美学，精准还原层级大纲与代码表格。

---

## 2. 云端与本地处理对比

| 评测维度 | 传统云端转换网站 | 本地文转 (LocalDoc) | 核心优势 |
| :--- | :--- | :--- | :--- |
| **网络数据出站** | 100% 完整文件上传 | **0 KB (零网络外发)** | 彻底阻断数据泄露 |
| **处理等待排队** | 3秒 - 15秒 (或付费插队) | **毫秒级 (直接计算)** | 零排队延迟 |
| **账号与权限** | 强制手机号/邮箱登录 | **免注册即开即用** | 纯粹无打扰 |

---

## 3. 本地沙箱代码示例

\`\`\`typescript
// 纯前端内存隔离执行
const buffer = await file.arrayBuffer();
const worker = new Worker('/pdf.worker.min.mjs');
worker.postMessage({ buffer }, [buffer]); // 零网络网络往返
\`\`\`

> *"真正的隐私不是服务条款上的承诺，而是架构底层无法窃取。"*
`;

export function MarkdownToPdfWorkspace() {
  const [markdown, setMarkdown] = useState<string>(SAMPLE_MARKDOWN);
  const [filename, setFilename] = useState<string>('技术报告');
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
      console.error('无法读取文件', err);
    }
  };

  const handleExportPdf = async () => {
    if (!printContainerRef.current) return;
    setIsExporting(true);
    setExportProgress({ percent: 10, message: '正在启动本地 PDF 渲染引擎...' });

    try {
      await exportElementToPdf(
        printContainerRef.current,
        `${filename || 'document'}.pdf`,
        (percent, message) => {
          setExportProgress({ percent, message });
        }
      );
    } catch (err) {
      console.error('导出失败', err);
      alert('导出失败，你也可以尝试点击旁边的“矢量打印”直接保存为 PDF。');
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
      console.error('复制失败', err);
    }
  };

  const insertSnippet = (prefix: string, suffix: string = '') => {
    setMarkdown((prev) => `${prev}\n${prefix}内容${suffix}\n`);
  };

  return (
    <div className="w-full space-y-6">
      <input
        ref={fileInputRef}
        type="file"
        accept=".md,.markdown,.txt"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="rounded-2xl border border-zinc-200/90 bg-white shadow-xs overflow-hidden">
        {/* 操作栏 */}
        <div className="border-b border-zinc-200/90 bg-zinc-50/70 px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-3">
          {/* 文件名重命名 */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-700">
              <FileText className="w-4 h-4" strokeWidth={1.75} />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-zinc-500 font-mono">导知名：</span>
              <input
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                placeholder="文档名称"
                className="text-xs sm:text-sm font-semibold text-zinc-900 bg-transparent border-b border-dashed border-zinc-300 focus:border-zinc-800 focus:outline-none px-1 py-0.5"
                title="点击重命名导出文件"
              />
              <span className="text-xs font-mono text-zinc-500">.pdf</span>
            </div>
          </div>

          {/* 快捷排版工具条 */}
          <div className="hidden lg:flex items-center space-x-1 bg-zinc-100/80 p-0.5 rounded-lg border border-zinc-200 text-zinc-600">
            <button
              onClick={() => insertSnippet('## ')}
              className="p-1.5 hover:text-zinc-900 hover:bg-white rounded transition-colors text-xs"
              title="插入二级标题"
            >
              <Heading className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => insertSnippet('**', '**')}
              className="p-1.5 hover:text-zinc-900 hover:bg-white rounded transition-colors text-xs"
              title="加粗"
            >
              <Bold className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => insertSnippet('- ')}
              className="p-1.5 hover:text-zinc-900 hover:bg-white rounded transition-colors text-xs"
              title="无序列表"
            >
              <List className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => insertSnippet('```\n', '\n```')}
              className="p-1.5 hover:text-zinc-900 hover:bg-white rounded transition-colors text-xs"
              title="代码块"
            >
              <Code className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
            <button
              onClick={() =>
                insertSnippet('| 项目 | 说明 |\n| :--- | :--- |\n| 参数 A | 参数 B |')
              }
              className="p-1.5 hover:text-zinc-900 hover:bg-white rounded transition-colors text-xs"
              title="表格"
            >
              <TableIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
          </div>

          {/* 导出操作 */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-medium transition-all shadow-2xs active:scale-[0.98]"
            >
              <FileUp className="w-3.5 h-3.5 text-zinc-500" strokeWidth={1.5} />
              <span className="hidden sm:inline">导入 .md 文件</span>
            </button>

            <button
              onClick={handleSystemPrint}
              title="通过系统打印对话框直接保存为无损矢量 PDF"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-medium transition-all shadow-2xs active:scale-[0.98]"
            >
              <Printer className="w-3.5 h-3.5 text-zinc-500" strokeWidth={1.5} />
              <span className="hidden sm:inline">矢量打印 / 导出</span>
            </button>

            <button
              onClick={handleExportPdf}
              disabled={isExporting}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-400 text-white text-xs font-medium transition-all shadow-2xs active:scale-[0.98]"
            >
              <Download className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>{isExporting ? '正在生成...' : '下载 PDF 文档'}</span>
            </button>
          </div>
        </div>

        {/* 导出进度条 */}
        {isExporting && (
          <div className="bg-emerald-50 border-b border-emerald-200/80 px-4 py-2 flex items-center justify-between text-xs text-emerald-800 font-mono">
            <span>{exportProgress.message}</span>
            <span>{exportProgress.percent}%</span>
          </div>
        )}

        {/* 编辑器与 A4 预览 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200 min-h-[520px]">
          {/* 左侧：编辑器 */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex flex-col bg-zinc-50/40 relative ${
              isDragging ? 'bg-emerald-50/50 ring-2 ring-emerald-500/30' : ''
            }`}
          >
            <div className="border-b border-zinc-200/60 px-4 py-2 bg-zinc-100/50 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>MARKDOWN 编辑器</span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setMarkdown(SAMPLE_MARKDOWN)}
                  className="hover:text-zinc-900 flex items-center space-x-1 text-emerald-700"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>加载范例文档</span>
                </button>
                <button
                  onClick={handleCopyMarkdown}
                  className="hover:text-zinc-900 flex items-center space-x-1"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? '已复制' : '复制全文'}</span>
                </button>
                <button
                  onClick={() => setMarkdown('')}
                  className="hover:text-zinc-900 flex items-center space-x-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>清空</span>
                </button>
              </div>
            </div>

            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="在此粘贴或书写 Markdown 文档（支持直接拖入 .md 文件）..."
              className="w-full flex-1 p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-zinc-800 bg-transparent resize-none focus:outline-none border-0"
              rows={24}
              spellCheck={false}
            />

            {isDragging && (
              <div className="absolute inset-0 bg-emerald-50/80 backdrop-blur-xs flex items-center justify-center border-2 border-dashed border-emerald-500 rounded-lg m-2 pointer-events-none">
                <p className="text-sm font-semibold text-emerald-800">释放鼠标载入 .md 文件</p>
              </div>
            )}
          </div>

          {/* 右侧：A4 文档渲染区 */}
          <div className="flex flex-col bg-zinc-100/60 overflow-y-auto max-h-[720px] p-4 sm:p-6">
            <div className="mb-2 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>A4 纸张排版效果</span>
              <span>210mm × 297mm 标准比例</span>
            </div>

            {/* 纸张容器 */}
            <div
              id="printable-document"
              ref={printContainerRef}
              className="w-full bg-white rounded-lg shadow-sm border border-zinc-200/90 p-8 sm:p-12 min-h-[600px] transition-all"
            >
              <div
                className="prose-technical max-w-none"
                dangerouslySetInnerHTML={{
                  __html: parseMarkdownToHtml(markdown || '*暂无内容，请在左侧编辑器中输入 Markdown 文本*'),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
