export interface ConversionPair {
  slug: string;
  from: string;
  to: string;
  fromExt: string[];
  toExt: string;
  name: string;
  shortDesc: string;
  category: 'document' | 'data' | 'image';
  badge: string;
  sampleInput?: string;
}

export const CONVERSION_PAIRS: ConversionPair[] = [
  // 1. PDF
  {
    slug: 'pdf-to-markdown',
    from: 'PDF',
    to: 'Markdown',
    fromExt: ['.pdf'],
    toExt: '.md',
    name: 'PDF 转 Markdown',
    shortDesc: '提取文本与大纲为 Markdown',
    category: 'document',
    badge: '常用',
  },
  {
    slug: 'pdf-to-txt',
    from: 'PDF',
    to: 'TXT',
    fromExt: ['.pdf'],
    toExt: '.txt',
    name: 'PDF 转 TXT',
    shortDesc: '提取纯文本内容',
    category: 'document',
    badge: '常用',
  },
  {
    slug: 'pdf-to-images',
    from: 'PDF',
    to: 'PNG 图片',
    fromExt: ['.pdf'],
    toExt: '.png',
    name: 'PDF 转 PNG 图片',
    shortDesc: '逐页导出为 PNG 图片',
    category: 'document',
    badge: '图片',
  },

  // 2. Markdown
  {
    slug: 'markdown-to-pdf',
    from: 'Markdown',
    to: 'PDF',
    fromExt: ['.md', '.markdown'],
    toExt: '.pdf',
    name: 'Markdown 转 PDF',
    shortDesc: '导出为 PDF 文档',
    category: 'document',
    badge: '常用',
  },
  {
    slug: 'markdown-to-html',
    from: 'Markdown',
    to: 'HTML',
    fromExt: ['.md', '.markdown'],
    toExt: '.html',
    name: 'Markdown 转 HTML',
    shortDesc: '转为 HTML 网页',
    category: 'document',
    badge: '代码',
  },

  // 3. Word DOCX
  {
    slug: 'docx-to-markdown',
    from: 'Word (DOCX)',
    to: 'Markdown',
    fromExt: ['.docx'],
    toExt: '.md',
    name: 'Word 转 Markdown',
    shortDesc: '转为 Markdown 格式',
    category: 'document',
    badge: '常用',
  },
  {
    slug: 'docx-to-html',
    from: 'Word (DOCX)',
    to: 'HTML',
    fromExt: ['.docx'],
    toExt: '.html',
    name: 'Word 转 HTML',
    shortDesc: '转为 HTML 页面',
    category: 'document',
    badge: '代码',
  },

  // 4. 数据表格
  {
    slug: 'csv-to-markdown',
    from: 'CSV',
    to: 'Markdown 表格',
    fromExt: ['.csv', '.tsv'],
    toExt: '.md',
    name: 'CSV 转 Markdown 表格',
    shortDesc: '转为 Markdown 表格',
    category: 'data',
    badge: '数据',
  },
  {
    slug: 'csv-to-json',
    from: 'CSV',
    to: 'JSON',
    fromExt: ['.csv'],
    toExt: '.json',
    name: 'CSV 转 JSON',
    shortDesc: '转为 JSON 格式',
    category: 'data',
    badge: '数据',
  },
  {
    slug: 'json-to-csv',
    from: 'JSON',
    to: 'CSV',
    fromExt: ['.json'],
    toExt: '.csv',
    name: 'JSON 转 CSV',
    shortDesc: '转为 CSV 表格',
    category: 'data',
    badge: '数据',
  },

  // 5. 图片
  {
    slug: 'images-to-pdf',
    from: '图片 (JPG/PNG)',
    to: 'PDF',
    fromExt: ['.jpg', '.jpeg', '.png', '.webp'],
    toExt: '.pdf',
    name: '图片转 PDF',
    shortDesc: '合并多张图片为 PDF',
    category: 'image',
    badge: '图片',
  },
];

export function getConversionPairBySlug(slug: string): ConversionPair | undefined {
  return CONVERSION_PAIRS.find((item) => item.slug === slug);
}

export function detectSupportedTargetFormats(filename: string): ConversionPair[] {
  const lower = filename.toLowerCase();
  const ext = lower.slice(lower.lastIndexOf('.'));
  return CONVERSION_PAIRS.filter((pair) => pair.fromExt.includes(ext));
}
