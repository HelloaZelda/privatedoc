// Client-side multi-format conversion engine
// 100% In-Browser Execution without server API calls

import Papa from 'papaparse';
import jsPDF from 'jspdf';
import { convertPdfToMarkdown } from './pdf-to-markdown';
import { parseMarkdownToHtml, exportElementToPdf } from './markdown-to-pdf';

export interface MultiConversionResult {
  content: string;
  filename: string;
  mimeType: string;
  isBinary?: boolean;
  blob?: Blob;
  images?: string[]; // for PDF to images
}

// 1. PDF to Text
export async function convertPdfToTxt(file: File, onProgress?: (msg: string) => void): Promise<string> {
  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

  onProgress?.('Reading PDF binary...');
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer), useSystemFonts: true }).promise;
  const numPages = pdf.numPages;
  const textPages: string[] = [];

  for (let i = 1; i <= numPages; i++) {
    onProgress?.(`Extracting text from page ${i}/${numPages}...`);
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = (content.items as Array<{ str: string }>).map((item) => item.str);
    textPages.push(strings.join(' '));
  }

  return textPages.join('\n\n--- Page Break ---\n\n');
}

// 2. PDF to PNG Images (First page or pages)
export async function convertPdfToImages(
  file: File,
  onProgress?: (current: number, total: number) => void
): Promise<string[]> {
  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer), useSystemFonts: true }).promise;
  const numPages = pdf.numPages;
  const images: string[] = [];

  for (let i = 1; i <= Math.min(numPages, 10); i++) {
    onProgress?.(i, numPages);
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2.0 }); // 2x high resolution
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) continue;

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    // @ts-expect-error canvas render
    await page.render({ canvasContext: ctx, viewport }).promise;
    images.push(canvas.toDataURL('image/png'));
  }

  return images;
}

// 3. Word (DOCX) to Markdown & HTML
export async function convertDocxToMarkdown(file: File): Promise<string> {
  const mammoth = await import('mammoth');
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.convertToHtml({ arrayBuffer });
  const html = result.value;

  // Transform standard HTML elements to clean Markdown
  let md = html
    .replace(/<h1>(.*?)<\/h1>/gi, '# $1\n\n')
    .replace(/<h2>(.*?)<\/h2>/gi, '## $1\n\n')
    .replace(/<h3>(.*?)<\/h3>/gi, '### $1\n\n')
    .replace(/<p><strong>(.*?)<\/strong><\/p>/gi, '**$1**\n\n')
    .replace(/<p>(.*?)<\/p>/gi, '$1\n\n')
    .replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<em>(.*?)<\/em>/gi, '*$1*')
    .replace(/<li>(.*?)<\/li>/gi, '- $1\n')
    .replace(/<ul>/gi, '\n')
    .replace(/<\/ul>/gi, '\n')
    .replace(/<ol>/gi, '\n')
    .replace(/<\/ol>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ''); // strip remaining tags

  // Clean extra blank lines
  md = md.replace(/\n{3,}/g, '\n\n').trim();
  return md;
}

export async function convertDocxToHtml(file: File): Promise<string> {
  const mammoth = await import('mammoth');
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.convertToHtml({ arrayBuffer });
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${file.name.replace(/\.[^/.]+$/, '')}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #333; }
    h1, h2, h3 { color: #111; }
  </style>
</head>
<body>
${result.value}
</body>
</html>`;
}

// 4. CSV to Markdown Table
export function convertCsvToMarkdownTable(csvContent: string): string {
  const parsed = Papa.parse<string[]>(csvContent.trim(), { skipEmptyLines: true });
  const rows = parsed.data;
  if (!rows || rows.length === 0) return '';

  const header = rows[0];
  const separator = header.map(() => ':---');

  const lines = [
    `| ${header.join(' | ')} |`,
    `| ${separator.join(' | ')} |`,
  ];

  for (let i = 1; i < rows.length; i++) {
    lines.push(`| ${rows[i].join(' | ')} |`);
  }

  return lines.join('\n');
}

// 5. CSV to JSON
export function convertCsvToJson(csvContent: string): string {
  const parsed = Papa.parse(csvContent, { header: true, skipEmptyLines: true, dynamicTyping: true });
  return JSON.stringify(parsed.data, null, 2);
}

// 6. JSON to CSV
export function convertJsonToCsv(jsonContent: string): string {
  try {
    const data = JSON.parse(jsonContent);
    return Papa.unparse(data);
  } catch (err) {
    throw new Error('Invalid JSON format. Please ensure input is a valid JSON array or object.');
  }
}

// 7. Images to Single PDF
export async function convertImagesToPdf(files: File[]): Promise<Blob> {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = 210;
  const pageHeight = 297;

  for (let i = 0; i < files.length; i++) {
    if (i > 0) pdf.addPage();
    const file = files[i];
    const dataUrl = await readFileAsDataUrl(file);

    // Calculate dimensions
    const img = await loadImage(dataUrl);
    const imgRatio = img.width / img.height;
    const pageRatio = pageWidth / pageHeight;

    let renderW = pageWidth - 20; // 10mm margin
    let renderH = renderW / imgRatio;

    if (renderH > pageHeight - 20) {
      renderH = pageHeight - 20;
      renderW = renderH * imgRatio;
    }

    const posX = (pageWidth - renderW) / 2;
    const posY = (pageHeight - renderH) / 2;

    pdf.addImage(dataUrl, 'JPEG', posX, posY, renderW, renderH);
  }

  return pdf.output('blob');
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
