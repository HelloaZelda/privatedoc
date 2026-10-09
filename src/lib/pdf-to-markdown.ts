// Client-side only PDF to Markdown extraction
// 100% in-browser processing via pdfjs-dist

interface TextBlock {
  text: string;
  x: number;
  y: number;
  height: number;
  width: number;
}

interface TextLine {
  y: number;
  height: number;
  items: TextBlock[];
}

export async function convertPdfToMarkdown(
  file: File,
  onProgress?: (current: number, total: number, message: string) => void
): Promise<string> {
  // Dynamically import pdfjs-dist only on client
  const pdfjsLib = await import('pdfjs-dist');
  
  // Set local worker to guarantee offline execution without any external network request
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

  onProgress?.(0, 1, 'Initializing local WebAssembly sandbox...');
  const arrayBuffer = await file.arrayBuffer();

  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(arrayBuffer),
    useSystemFonts: true,
  });

  const pdf = await loadingTask.promise;
  const totalPages = pdf.numPages;
  const markdownPages: string[] = [];

  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    onProgress?.(pageNum, totalPages, `Analyzing page ${pageNum} of ${totalPages}...`);
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    const items = textContent.items as Array<{
      str: string;
      transform: number[]; // [scaleX, skewY, skewX, scaleY, transX, transY]
      width: number;
      height: number;
    }>;

    if (!items || items.length === 0) {
      markdownPages.push(`<!-- Page ${pageNum}: Empty or image-only -->\n`);
      continue;
    }

    // Extract blocks with coordinates
    const blocks: TextBlock[] = [];
    const heights: number[] = [];

    for (const item of items) {
      if (!item.str || item.str.trim() === '') continue;
      const height = Math.abs(item.transform[3]) || item.height || 12;
      heights.push(height);
      blocks.push({
        text: item.str,
        x: item.transform[4],
        y: item.transform[5],
        height,
        width: item.width || 0,
      });
    }

    if (blocks.length === 0) {
      markdownPages.push(`<!-- Page ${pageNum}: No selectable text -->\n`);
      continue;
    }

    // Calculate median font height for heading threshold detection
    heights.sort((a, b) => a - b);
    const medianHeight = heights[Math.floor(heights.length / 2)] || 12;

    // Group blocks into lines (Y coordinate in PDF is 0 at bottom, increasing upwards)
    // Sort blocks by Y descending (top to bottom), then X ascending (left to right)
    blocks.sort((a, b) => {
      const yDiff = b.y - a.y;
      if (Math.abs(yDiff) > 3) return yDiff;
      return a.x - b.x;
    });

    const lines: TextLine[] = [];
    for (const block of blocks) {
      const existingLine = lines.find((line) => Math.abs(line.y - block.y) <= Math.max(3, block.height * 0.4));
      if (existingLine) {
        existingLine.items.push(block);
        existingLine.items.sort((a, b) => a.x - b.x);
        existingLine.height = Math.max(existingLine.height, block.height);
      } else {
        lines.push({
          y: block.y,
          height: block.height,
          items: [block],
        });
      }
    }

    // Sort lines from top to bottom
    lines.sort((a, b) => b.y - a.y);

    const pageLines: string[] = [];
    let prevY: number | null = null;
    let prevHeight: number = medianHeight;

    for (const line of lines) {
      // Reconstruct line text with intelligent word spacing
      let lineText = '';
      let prevBlockX: number | null = null;
      let prevBlockWidth = 0;

      for (const block of line.items) {
        if (prevBlockX !== null) {
          const gap = block.x - (prevBlockX + prevBlockWidth);
          // If there's a visible horizontal gap and no trailing space, insert space
          if (gap > 2 && !lineText.endsWith(' ') && !block.text.startsWith(' ')) {
            lineText += ' ';
          }
        }
        lineText += block.text;
        prevBlockX = block.x;
        prevBlockWidth = block.width;
      }

      const trimmed = lineText.trim();
      if (!trimmed) continue;

      // Vertical gap check for paragraph separation
      if (prevY !== null) {
        const verticalGap = prevY - line.y;
        if (verticalGap > prevHeight * 1.8) {
          pageLines.push(''); // Add paragraph break
        }
      }
      prevY = line.y;
      prevHeight = line.height;

      // Heading detection based on font size relative to median
      const lineHeightRatio = line.height / medianHeight;
      if (lineHeightRatio >= 1.7 && trimmed.length < 80) {
        pageLines.push(`# ${trimmed}`);
      } else if (lineHeightRatio >= 1.35 && trimmed.length < 100) {
        pageLines.push(`## ${trimmed}`);
      } else if (lineHeightRatio >= 1.15 && trimmed.length < 120 && trimmed.endsWith(':')) {
        pageLines.push(`### ${trimmed}`);
      } else if (/^[-*•·]\s/.test(trimmed)) {
        // Standardize bullet points
        pageLines.push(`- ${trimmed.replace(/^[-*•·]\s*/, '')}`);
      } else if (/^\d+[\.\)]\s/.test(trimmed)) {
        // Numbered list
        pageLines.push(trimmed);
      } else {
        pageLines.push(trimmed);
      }
    }

    const pageContent = pageLines.join('\n');
    markdownPages.push(
      totalPages > 1
        ? `<!-- Page ${pageNum} -->\n${pageContent}`
        : pageContent
    );
  }

  onProgress?.(totalPages, totalPages, 'Done! Generating Markdown...');
  return markdownPages.join('\n\n---\n\n');
}
