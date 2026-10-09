export interface ConversionPair {
  slug: string;
  from: string;
  to: string;
  fromExt: string[];
  toExt: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  category: 'document' | 'data' | 'image';
  badge: string;
  sampleInput?: string;
}

export const CONVERSION_PAIRS: ConversionPair[] = [
  // 1. PDF 衍生
  {
    slug: 'pdf-to-markdown',
    from: 'PDF',
    to: 'Markdown',
    fromExt: ['.pdf'],
    toExt: '.md',
    name: 'PDF 转 Markdown',
    shortDesc: '提取 PDF 文档层级、大纲与段落为干净的 Markdown 格式',
    fullDesc: '基于浏览器本地 WebAssembly 引擎提取 PDF 文本与字阶，智能重构标题层级与项目列表，绝不上传云端，保证企业隐私文档绝对安全。',
    category: 'document',
    badge: '最常用',
  },
  {
    slug: 'pdf-to-txt',
    from: 'PDF',
    to: 'TXT (纯文本)',
    fromExt: ['.pdf'],
    toExt: '.txt',
    name: 'PDF 转 纯文本 TXT',
    shortDesc: '极速剥离 PDF 排版，提取纯纯粹文本内容',
    fullDesc: '纯客户端内存运行，秒级剔除 PDF 中复杂的版式与格式干扰，提取无格式纯文本，适合喂给大语言模型或做语料清洗。',
    category: 'document',
    badge: '极速',
  },
  {
    slug: 'pdf-to-images',
    from: 'PDF',
    to: 'PNG 图片',
    fromExt: ['.pdf'],
    toExt: '.png',
    name: 'PDF 转 高清图片 (PNG)',
    shortDesc: '将 PDF 逐页渲染为 2x 超清 PNG 图像直接下载',
    fullDesc: '利用本地 Canvas 硬件加速渲染，将 PDF 每一页渲染为无损 PNG 图片，支持打包或按页另存，画质清晰可读。',
    category: 'document',
    badge: '高清',
  },

  // 2. Markdown 衍生
  {
    slug: 'markdown-to-pdf',
    from: 'Markdown',
    to: 'PDF',
    fromExt: ['.md', '.markdown'],
    toExt: '.pdf',
    name: 'Markdown 转 PDF',
    shortDesc: '高质感排版，将 Markdown 文档导出为 A4 印刷级 PDF',
    fullDesc: '遵循出版级技术文档排版规范，内置代码块高亮、精致表格与引用块渲染，支持本地高清 Direct PDF 导出与矢量打印。',
    category: 'document',
    badge: '出版级排版',
  },
  {
    slug: 'markdown-to-html',
    from: 'Markdown',
    to: 'HTML',
    fromExt: ['.md', '.markdown'],
    toExt: '.html',
    name: 'Markdown 转 HTML',
    shortDesc: '一键将 Markdown 转换为语义化独立 HTML 网页',
    fullDesc: '生成结构标准的 HTML 代码，附带基础排版样式，适合嵌入网站博客或作为静态内容发布。',
    category: 'document',
    badge: '无冗余',
  },

  // 3. Word (DOCX) 衍生
  {
    slug: 'docx-to-markdown',
    from: 'Word (DOCX)',
    to: 'Markdown',
    fromExt: ['.docx'],
    toExt: '.md',
    name: 'Word (DOCX) 转 Markdown',
    shortDesc: '将 Word 文档的标题、加粗、列表快速转为 Markdown',
    fullDesc: '使用 mammoth 纯前端引擎提取 Word 文档内容并转义为精简 Markdown，彻底解决 Office 繁重格式粘贴问题。',
    category: 'document',
    badge: '极力推荐',
  },
  {
    slug: 'docx-to-html',
    from: 'Word (DOCX)',
    to: 'HTML',
    fromExt: ['.docx'],
    toExt: '.html',
    name: 'Word (DOCX) 转 HTML',
    shortDesc: '将 Word 文档转换为轻量干净的 HTML 标记',
    fullDesc: '剔除 Word 复杂的 Mso 专有脏样式，生成符合现代 Web 标准的纯净 HTML 代码。',
    category: 'document',
    badge: '轻量',
  },

  // 4. 数据与表格系列
  {
    slug: 'csv-to-markdown',
    from: 'CSV / 表格',
    to: 'Markdown 表格',
    fromExt: ['.csv', '.tsv'],
    toExt: '.md',
    name: 'CSV 转 Markdown 表格',
    shortDesc: '将 CSV 逗号分隔数据秒转对齐漂亮的 Markdown 表格',
    fullDesc: '程序员与写作人员的高频痛点工具。粘贴或上传 CSV 文件，本地自动计算列宽并生成对齐美观的 Markdown 语法表格。',
    category: 'data',
    badge: '技术刚需',
  },
  {
    slug: 'csv-to-json',
    from: 'CSV',
    to: 'JSON 数据',
    fromExt: ['.csv'],
    toExt: '.json',
    name: 'CSV 转 JSON',
    shortDesc: '将表格行转化为结构化对象数组 JSON 格式',
    fullDesc: '纯客户端处理百万级字段，保留数值与布尔类型推断，无服务器上传，数据工程师首选。',
    category: 'data',
    badge: '高频',
  },
  {
    slug: 'json-to-csv',
    from: 'JSON',
    to: 'CSV 表格',
    fromExt: ['.json'],
    toExt: '.csv',
    name: 'JSON 转 CSV 表格',
    shortDesc: '扁平化 JSON 对象数组并导出为 Excel 可打开的 CSV',
    fullDesc: '自动推导对象所有键头（Keys），安全展开嵌套字段，一键导出为标准 UTF-8 CSV 文件。',
    category: 'data',
    badge: '实用',
  },

  // 5. 图片衍生
  {
    slug: 'images-to-pdf',
    from: '图片 (JPG/PNG)',
    to: 'PDF',
    fromExt: ['.jpg', '.jpeg', '.png', '.webp'],
    toExt: '.pdf',
    name: '多图一键合成 PDF',
    shortDesc: '将多张图片按顺序本地合并生成单个 PDF 文件',
    fullDesc: '零压缩损失、纯客户端 Canvas 合成，支持拖拽调整排序，适合合同发票扫描件、教材拼合等办公需求。',
    category: 'image',
    badge: '办公利器',
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
