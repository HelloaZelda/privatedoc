// Client-side only Markdown to PDF rendering and download
// Uses marked for HTML synthesis and jsPDF + html2canvas for canvas-based export

import { marked } from 'marked';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Configure marked with security and clean formatting
marked.setOptions({
  gfm: true,
  breaks: true,
});

export function parseMarkdownToHtml(markdown: string): string {
  try {
    return marked.parse(markdown) as string;
  } catch (err) {
    console.error('Failed to parse markdown', err);
    return `<p class="text-red-500 font-mono text-sm">Markdown Parsing Error</p>`;
  }
}

export async function exportElementToPdf(
  element: HTMLElement,
  filename: string = 'document.pdf',
  onProgress?: (percent: number, message: string) => void
): Promise<void> {
  onProgress?.(20, 'Rasterizing document layout...');

  // Capture element using html2canvas with high DPI
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    windowWidth: element.scrollWidth,
  });

  onProgress?.(60, 'Calculating A4 page metrics...');

  const imgWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;

  const pdf = new jsPDF('p', 'mm', 'a4');
  let position = 0;

  onProgress?.(80, 'Compiling PDF pages...');

  const imgData = canvas.toDataURL('image/jpeg', 0.95);
  pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  onProgress?.(95, 'Finalizing download...');
  pdf.save(filename);
  onProgress?.(100, 'Complete');
}
