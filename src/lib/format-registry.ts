export interface ConversionFaq {
  q: string;
  a: string;
}

export interface ConversionPair {
  slug: string;
  from: string;
  to: string;
  fromExt: string[];
  toExt: string;
  name: string;
  englishTitle: string;
  chineseTitle: string;
  h1: string;
  shortDesc: string;
  category: 'image' | 'document' | 'data';
  badge: string;
  whatIsFrom: string;
  whyConvert: string;
  faqs: ConversionFaq[];
}

export const CONVERSION_PAIRS: ConversionPair[] = [
  // ================= 1. 图片格式长尾词 (High Search Volume) =================
  {
    slug: 'webp-to-png',
    from: 'WebP',
    to: 'PNG',
    fromExt: ['.webp'],
    toExt: '.png',
    name: 'WebP 转 PNG',
    englishTitle: 'Free WebP to PNG Converter - Fast & No Sign Up',
    chineseTitle: '免费 WebP 转 PNG 在线转换器 - 免登录·不限大小',
    h1: 'WebP 转 PNG 在线转换器 (Free WebP to PNG)',
    shortDesc: '将 WebP 图片无损解码为通用透明 PNG 格式',
    category: 'image',
    badge: '热门',
    whatIsFrom: 'WebP 是 Google 推出的一种现代图片格式，具有高压缩率，但部分老旧看图软件、设计工具（如旧版 Photoshop）和办公软件无法直接打开或编辑。',
    whyConvert: 'PNG 支持无损压缩和透明 Alpha 通道，被所有操作系统、图像处理软件和网页端原生兼容，方便排版、二次设计与跨平台分发。',
    faqs: [
      {
        q: '转换 WebP 图片会上传到服务器吗？',
        a: '不会。整个转换过程使用您本机的浏览器 Canvas 引擎在内存中解码与重绘，0 流量上传远程服务器，保护隐私。',
      },
      {
        q: '是否有文件大小限制或收费？',
        a: '完全免费，没有文件大小限制，也没有每日转换次数限制，不需要注册登录。',
      },
      {
        q: '转换后的 PNG 会保留透明背景吗？',
        a: '是的，本地解码器完整保留源 WebP 的 Alpha 透明通道数据。',
      },
      {
        q: '支持断网离线使用吗？',
        a: '支持。只要页面完成加载，即使切断网络连接也能正常拖入文件并下载。',
      },
    ],
  },
  {
    slug: 'png-to-webp',
    from: 'PNG',
    to: 'WebP',
    fromExt: ['.png'],
    toExt: '.webp',
    name: 'PNG 转 WebP',
    englishTitle: 'Free PNG to WebP Converter - Compress Images Fast',
    chineseTitle: '免费 PNG 转 WebP 在线转换器 - 高压缩率·大幅缩小体积',
    h1: 'PNG 转 WebP 在线转换器 (Free PNG to WebP)',
    shortDesc: '压缩 PNG 为高压缩率 WebP 格式，减小 30%~70% 体积',
    category: 'image',
    badge: '优化',
    whatIsFrom: 'PNG 是一种高质量无损位图格式，但文件体积通常偏大，直接用于网站加载会拖慢页面速度并浪费带宽。',
    whyConvert: 'WebP 在保持相同视觉清晰度的前提下，体积通常比 PNG 小 30% 到 70%，是现代网站提速和 SEO 优化的首选格式。',
    faqs: [
      {
        q: 'PNG 转为 WebP 体积能缩小多少？',
        a: '根据图像复杂度不同，通常可以减小 30% 到 70% 的文件大小，同时肉眼几乎看不出画质差异。',
      },
      {
        q: '批量转换有数量限制吗？',
        a: '没有数量限制，直接在本地浏览器中运行，不消耗云端配额。',
      },
      {
        q: '文件是否安全？',
        a: '绝对安全，所有数据仅存在于您本机的临时内存中，页面关闭即焚。',
      },
    ],
  },
  {
    slug: 'jpg-to-png',
    from: 'JPG / JPEG',
    to: 'PNG',
    fromExt: ['.jpg', '.jpeg'],
    toExt: '.png',
    name: 'JPG 转 PNG',
    englishTitle: 'Free JPG to PNG Converter - Fast & Lossless Online',
    chineseTitle: '免费 JPG 转 PNG 在线转换器 - 格式标准化·无损导出',
    h1: 'JPG 转 PNG 在线转换器 (Free JPG to PNG)',
    shortDesc: '将压缩的 JPG 图像转为标准的无损 PNG 格式',
    category: 'image',
    badge: '常用',
    whatIsFrom: 'JPG/JPEG 是最常见的有损压缩图像格式，不支持透明通道，多次保存容易产生伪影。',
    whyConvert: '转为 PNG 便于后期做抠图、添加透明蒙版，或者用于不支持 JPG 的特定开发与印刷流程。',
    faqs: [
      {
        q: '转换会损失画质吗？',
        a: '不会，本地解码器读取原始像素并在 Canvas 中无损导出为高质量 PNG。',
      },
      {
        q: '需要安装客户端或插件吗？',
        a: '不需要，现代浏览器（Chrome、Edge、Safari、Firefox）均可直接运行。',
      },
    ],
  },
  {
    slug: 'png-to-jpg',
    from: 'PNG',
    to: 'JPG',
    fromExt: ['.png'],
    toExt: '.jpg',
    name: 'PNG 转 JPG',
    englishTitle: 'Free PNG to JPG Converter - Fast & Clean Image Export',
    chineseTitle: '免费 PNG 转 JPG 在线转换器 - 自动填白底·通用兼容',
    h1: 'PNG 转 JPG 在线转换器 (Free PNG to JPG)',
    shortDesc: '将透明或高容量 PNG 转为轻巧的通用 JPG 格式',
    category: 'image',
    badge: '常用',
    whatIsFrom: 'PNG 图像文件体积大，在部分要求上传证件照、考试报名照片的官方系统上常被拒绝。',
    whyConvert: 'JPG 格式兼容性极佳、体积紧凑，本工具会自动将透明背景填充为纯白背景，符合各类系统上传规范。',
    faqs: [
      {
        q: '透明背景会变成黑色吗？',
        a: '不会，系统已自动加入白色底色补偿逻辑，导出为干净的白底 JPG。',
      },
      {
        q: '有水印或强制压缩吗？',
        a: '绝无水印，保持 95% 高品质色彩导出。',
      },
    ],
  },
  {
    slug: 'webp-to-jpg',
    from: 'WebP',
    to: 'JPG',
    fromExt: ['.webp'],
    toExt: '.jpg',
    name: 'WebP 转 JPG',
    englishTitle: 'Free WebP to JPG Converter - Quick Batch & No Limits',
    chineseTitle: '免费 WebP 转 JPG 在线转换器 - 免登录·完美兼容',
    h1: 'WebP 转 JPG 在线转换器 (Free WebP to JPG)',
    shortDesc: '快速将 WebP 图片转为通用的 JPG 照片格式',
    category: 'image',
    badge: '常用',
    whatIsFrom: '网页保存下来的图片常常是 WebP 格式，发给微信好友、PPT 插入或旧版看图软件常常无法识别。',
    whyConvert: 'JPG 是全世界兼容性最广的静态图像格式，可以在任何设备、系统和老旧软件中正常打开。',
    faqs: [
      {
        q: '为什么网页保存下来的图片打不开？',
        a: '因为许多网站为了加速采用 WebP 格式，而旧版系统没有相应解码器，转为 JPG 即可彻底解决。',
      },
    ],
  },
  {
    slug: 'jpg-to-webp',
    from: 'JPG / JPEG',
    to: 'WebP',
    fromExt: ['.jpg', '.jpeg'],
    toExt: '.webp',
    name: 'JPG 转 WebP',
    englishTitle: 'Free JPG to WebP Converter - Optimize & Compress Photos',
    chineseTitle: '免费 JPG 转 WebP 在线转换器 - 照片极致压缩·网站加速',
    h1: 'JPG 转 WebP 在线转换器 (Free JPG to WebP)',
    shortDesc: '在保证画质的前提下进一步压缩 JPG 体积',
    category: 'image',
    badge: '优化',
    whatIsFrom: 'JPG 虽然流行，但在网络传输中的压缩效率已落后于现代标准。',
    whyConvert: 'WebP 能够在相同的 SSIM 图像质量下再节省 25%~35% 的带宽，是站长与开发者的加速利器。',
    faqs: [
      {
        q: '适合大批量处理吗？',
        a: '适合，依托本地 CPU/GPU 并行渲染，速度极快。',
      },
    ],
  },
  {
    slug: 'images-to-pdf',
    from: '图片 (PNG/JPG)',
    to: 'PDF',
    fromExt: ['.jpg', '.jpeg', '.png', '.webp'],
    toExt: '.pdf',
    name: '图片转 PDF',
    englishTitle: 'Free Images to PDF Converter - Combine JPG & PNG into PDF',
    chineseTitle: '免费图片转 PDF 在线转换器 - 多图合并·A4排版',
    h1: '图片转 PDF 在线转换器 (Images to PDF)',
    shortDesc: '将一张或多张图片合并生成标准 A4 PDF 文档',
    category: 'image',
    badge: '办公利器',
    whatIsFrom: '合同扫描件、报销发票、手写笔记等通常以分散的 PNG 或 JPG 图片形式存在。',
    whyConvert: '合并为单个标准 PDF 便于邮件归档、打印、上传政务平台或向客户交付，防止页面遗失。',
    faqs: [
      {
        q: '可以合并多张图片吗？',
        a: '可以，按顺序拖入多张图片即可自动拼接为多页 PDF。',
      },
      {
        q: '排版尺寸是什么规格？',
        a: '默认自适应居中适配国际标准 A4 页面，留出美观边距。',
      },
    ],
  },

  // ================= 2. 文档与文本格式长尾词 =================
  {
    slug: 'pdf-to-markdown',
    from: 'PDF',
    to: 'Markdown',
    fromExt: ['.pdf'],
    toExt: '.md',
    name: 'PDF 转 Markdown',
    englishTitle: 'Free PDF to Markdown Converter - Fast & 100% Private',
    chineseTitle: '免费 PDF 转 Markdown 在线转换器 - 提取排版大纲·AI语料清洗',
    h1: 'PDF 转 Markdown 在线转换器 (PDF to Markdown)',
    shortDesc: '智能提取 PDF 文本与标题层级，输出干净 Markdown',
    category: 'document',
    badge: 'AI刚需',
    whatIsFrom: 'PDF 是面向固定版面印刷的终端格式，内部文字缺乏清晰的语义标记，难以直接编辑或粘贴进笔记软件。',
    whyConvert: 'Markdown 是现代知识管理（Obsidian、Notion）和大模型知识库最友好的格式，提取后便于再次编辑与结构化归档。',
    faqs: [
      {
        q: 'PDF 中的商业合同或私密论文会泄漏吗？',
        a: '绝不。PDF 在您浏览器的 WebAssembly 内存中解析，全程不发出任何网络请求，即使拔掉网线也能正常转。',
      },
      {
        q: '支持多大页数的 PDF？',
        a: '受限于本机内存大小，常规几百页的 PDF 均可在数秒内完成解析。',
      },
    ],
  },
  {
    slug: 'markdown-to-pdf',
    from: 'Markdown',
    to: 'PDF',
    fromExt: ['.md', '.markdown'],
    toExt: '.pdf',
    name: 'Markdown 转 PDF',
    englishTitle: 'Free Markdown to PDF Converter - Clean Styling, No Watermark',
    chineseTitle: '免费 Markdown 转 PDF 在线转换器 - 优雅排版·无水印',
    h1: 'Markdown 转 PDF 在线转换器 (Markdown to PDF)',
    shortDesc: '将 Markdown 文档导出为印刷级 A4 格式 PDF',
    category: 'document',
    badge: '出版级',
    whatIsFrom: 'Markdown 是轻量标记语言，但很多非技术客户或正式归档需要标准的 PDF 格式。',
    whyConvert: '内置优雅的技术排版样式表，自动处理代码块、表格、引用与标题阶梯，导出标准无水印的 PDF。',
    faqs: [
      {
        q: '导出的 PDF 有水印吗？',
        a: '没有任何水印，完全属于您自己的干净文档。',
      },
    ],
  },
  {
    slug: 'pdf-to-txt',
    from: 'PDF',
    to: 'TXT (纯文本)',
    fromExt: ['.pdf'],
    toExt: '.txt',
    name: 'PDF 转 TXT',
    englishTitle: 'Free PDF to TXT Converter - Extract Pure Text Fast',
    chineseTitle: '免费 PDF 转 TXT 在线转换器 - 极速提取文本·去除干扰',
    h1: 'PDF 转 TXT 在线转换器 (PDF to TXT)',
    shortDesc: '剥离 PDF 复杂版式，极速提取纯文本',
    category: 'document',
    badge: '极速',
    whatIsFrom: 'PDF 常常带有复杂的表格排版、页眉页脚与换行符干扰。',
    whyConvert: '提取干净无格式的 TXT 纯文本，适合喂给大语言模型（LLM）微调、总结或做自然语言处理。',
    faqs: [
      {
        q: '速度有多快？',
        a: '常规几十页的 PDF 几乎在 1 秒内完成提取。',
      },
    ],
  },
  {
    slug: 'pdf-to-images',
    from: 'PDF',
    to: 'PNG 图片',
    fromExt: ['.pdf'],
    toExt: '.png',
    name: 'PDF 转 PNG 图片',
    englishTitle: 'Free PDF to PNG Converter - Render PDF Pages to High-Res Images',
    chineseTitle: '免费 PDF 转 PNG 在线转换器 - 2x超清渲染·逐页另存',
    h1: 'PDF 转 PNG 在线转换器 (PDF to PNG Images)',
    shortDesc: '将 PDF 每一页渲染为 2x 超清 PNG 图片',
    category: 'document',
    badge: '高清',
    whatIsFrom: 'PDF 无法直接发朋友圈、小红书或嵌入不支持 PDF 预览的网页。',
    whyConvert: '逐页渲染为 2x 超清 PNG 图片，画质清晰可读，方便社交平台分享或插入演示文稿。',
    faqs: [
      {
        q: '画质清晰吗？',
        a: '采用 2.0 倍高清视网膜比例渲染，文字与矢量细节清晰锐利。',
      },
    ],
  },
  {
    slug: 'docx-to-markdown',
    from: 'Word (DOCX)',
    to: 'Markdown',
    fromExt: ['.docx'],
    toExt: '.md',
    name: 'Word DOCX 转 Markdown',
    englishTitle: 'Free DOCX to Markdown Converter - Clean Office Text Fast',
    chineseTitle: '免费 Word 转 Markdown 在线转换器 - 剥离脏格式·保留标题结构',
    h1: 'Word DOCX 转 Markdown 在线转换器',
    shortDesc: '提取 Word 内容，自动转换为规范 Markdown 格式',
    category: 'document',
    badge: '推荐',
    whatIsFrom: 'Microsoft Word 的 .docx 文件复制到笔记或网页中会带来极其臃肿的专有样式代码。',
    whyConvert: '纯前端 Mammoth 引擎精准提取标题、加粗、斜体和列表，生成干净利落的 Markdown。',
    faqs: [
      {
        q: '旧版 .doc 格式支持吗？',
        a: '目前支持现代标准的 .docx 文件（Office 2007 至今的标准格式）。',
      },
    ],
  },
  {
    slug: 'docx-to-html',
    from: 'Word (DOCX)',
    to: 'HTML',
    fromExt: ['.docx'],
    toExt: '.html',
    name: 'Word DOCX 转 HTML',
    englishTitle: 'Free Word to HTML Converter - Clean Semantic HTML from DOCX',
    chineseTitle: '免费 Word 转 HTML 在线转换器 - 语义化标记·极简轻量',
    h1: 'Word DOCX 转 HTML 在线转换器',
    shortDesc: '将 Word 文档转换为轻量纯净的 HTML 标记',
    category: 'document',
    badge: '排版',
    whatIsFrom: 'Word 自带的“另存为网页”会产生几十 KB 乃至几百 KB 的冗余 XML 垃圾标签。',
    whyConvert: '本工具生成符合 W3C 标准的极简语义化 HTML，方便直接贴进网站后台或富文本编辑器。',
    faqs: [
      {
        q: '转换后的代码包含内联样式吗？',
        a: '只生成标准的语义化标签（h1-h6, p, ul, ol, strong 等），干净无污染。',
      },
    ],
  },
  {
    slug: 'docx-to-txt',
    from: 'Word (DOCX)',
    to: 'TXT (纯文本)',
    fromExt: ['.docx'],
    toExt: '.txt',
    name: 'Word DOCX 转 纯文本 TXT',
    englishTitle: 'Free DOCX to TXT Converter - Fast Text Extraction from Word',
    chineseTitle: '免费 Word 转 TXT 在线转换器 - 秒级抽取全文·无格式留存',
    h1: 'Word DOCX 转 TXT 在线转换器',
    shortDesc: '秒级抽离 Word 文档中的全部纯文本文字',
    category: 'document',
    badge: '极速',
    whatIsFrom: '打开大型 Word 文档常常需要启动沉重的办公套件。',
    whyConvert: '秒级剥离文字，方便快速阅读、统计字数或转入大语言模型分析。',
    faqs: [
      {
        q: '需要电脑装有 Office 吗？',
        a: '完全不需要，由纯前端原生 JavaScript 模块解析。',
      },
    ],
  },
  {
    slug: 'markdown-to-html',
    from: 'Markdown',
    to: 'HTML',
    fromExt: ['.md', '.markdown'],
    toExt: '.html',
    name: 'Markdown 转 HTML',
    englishTitle: 'Free Markdown to HTML Converter - Fast Render Online',
    chineseTitle: '免费 Markdown 转 HTML 在线转换器 - 标准解析·一键复制',
    h1: 'Markdown 转 HTML 在线转换器 (Markdown to HTML)',
    shortDesc: '将 Markdown 解析为带排版样式的 HTML 页面',
    category: 'document',
    badge: '代码',
    whatIsFrom: 'Markdown 文件通常需要专门的查看器才能良好预览。',
    whyConvert: '转换为独立的 HTML 文件，任何浏览器双击即可直接打开阅览，也可嵌入博客或邮件模板。',
    faqs: [
      {
        q: '代码块有高亮吗？',
        a: '包含标准的 code/pre 标签，兼容所有主流高亮主题。',
      },
    ],
  },

  // ================= 3. 数据与表格格式长尾词 =================
  {
    slug: 'csv-to-markdown',
    from: 'CSV 表格',
    to: 'Markdown 表格',
    fromExt: ['.csv', '.tsv'],
    toExt: '.md',
    name: 'CSV 转 Markdown 表格',
    englishTitle: 'Free CSV to Markdown Table Converter - Instant Alignment',
    chineseTitle: '免费 CSV 转 Markdown 表格在线转换器 - 自动对齐列宽',
    h1: 'CSV 转 Markdown 表格在线转换器',
    shortDesc: '自动计算列宽并生成对齐美观的 Markdown 语法表格',
    category: 'data',
    badge: '高频痛点',
    whatIsFrom: 'Excel 导出的 CSV 文件是逗号分隔纯文本，手工敲成 Markdown 表格极度繁琐耗时。',
    whyConvert: '本地自动计算各列最大宽度并补齐空格与分割线，一键生成整齐美观的 Markdown 表格代码。',
    faqs: [
      {
        q: '支持制表符分隔的 TSV 格式吗？',
        a: '支持，系统会自动嗅探逗号或制表符作为分隔符。',
      },
    ],
  },
  {
    slug: 'csv-to-json',
    from: 'CSV 表格',
    to: 'JSON 数据',
    fromExt: ['.csv'],
    toExt: '.json',
    name: 'CSV 转 JSON',
    englishTitle: 'Free CSV to JSON Converter - Parse Rows to Object Array Fast',
    chineseTitle: '免费 CSV 转 JSON 在线转换器 - 自动推断类型·本地解析',
    h1: 'CSV 转 JSON 在线转换器 (CSV to JSON)',
    shortDesc: '将表格行转化为标准的结构化对象数组 JSON',
    category: 'data',
    badge: '开发者',
    whatIsFrom: 'CSV 是扁平的行列格式，现代前端接口或后端数据库通常需要结构化的 JSON 格式。',
    whyConvert: '基于 PapaParse 纯客户端引擎秒级解析，自动将表头作为 Key，并保留数值、布尔值类型推断。',
    faqs: [
      {
        q: '处理几十兆大文件会卡死吗？',
        a: '引擎经过优化，几十万行数据通常在数百毫秒内即可完成转换。',
      },
    ],
  },
  {
    slug: 'json-to-csv',
    from: 'JSON 数据',
    to: 'CSV 表格',
    fromExt: ['.json'],
    toExt: '.csv',
    name: 'JSON 转 CSV 表格',
    englishTitle: 'Free JSON to CSV Converter - Export JSON Array to Excel CSV',
    chineseTitle: '免费 JSON 转 CSV 在线转换器 - 展平对象·Excel秒开',
    h1: 'JSON 转 CSV 在线转换器 (JSON to CSV)',
    shortDesc: '提取 JSON 对象数组并导出为 Excel 可直接打开的 CSV 表格',
    category: 'data',
    badge: '数据处理',
    whatIsFrom: 'API 返回的 JSON 数据不便于非技术同事或运营人员用 Excel 进行筛选与统计。',
    whyConvert: '自动汇总所有对象的键并扁平化导出为带 UTF-8 BOM 的标准 CSV，双击即可在 Excel 中正常显示中文。',
    faqs: [
      {
        q: '用 Excel 打开中文会乱码吗？',
        a: '不会，导出时特别包含了 UTF-8 BOM 标头，保证微软 Office 默认不乱码。',
      },
    ],
  },
  {
    slug: 'json-to-yaml',
    from: 'JSON',
    to: 'YAML',
    fromExt: ['.json'],
    toExt: '.yaml',
    name: 'JSON 转 YAML',
    englishTitle: 'Free JSON to YAML Converter - Fast & Clean Config Export',
    chineseTitle: '免费 JSON 转 YAML 在线转换器 - 格式化配置·DevOps利器',
    h1: 'JSON 转 YAML 在线转换器 (JSON to YAML)',
    shortDesc: '将 JSON 数据转为易读的 YAML 配置文件',
    category: 'data',
    badge: '配置利器',
    whatIsFrom: 'JSON 包含大量花括号与引号，配置 Kubernetes、CI/CD 或 Docker Compose 时繁琐冗长。',
    whyConvert: 'YAML 缩进语法清晰、免去繁杂标点，是现代云原生与微服务配置的主流格式。',
    faqs: [
      {
        q: '支持多层嵌套吗？',
        a: '完整支持复杂嵌套对象与数组语法。',
      },
    ],
  },
  {
    slug: 'yaml-to-json',
    from: 'YAML',
    to: 'JSON',
    fromExt: ['.yaml', '.yml'],
    toExt: '.json',
    name: 'YAML 转 JSON',
    englishTitle: 'Free YAML to JSON Converter - Parse K8s & Docker Configs Fast',
    chineseTitle: '免费 YAML 转 JSON 在线转换器 - 校验格式·接口调试',
    h1: 'YAML 转 JSON 在线转换器 (YAML to JSON)',
    shortDesc: '将 YAML 配置文件快速解析为标准 JSON 格式',
    category: 'data',
    badge: '开发者',
    whatIsFrom: 'K8s、Ansible 等配置文件常以 YAML 编写，但在前端调用或写脚本处理时 JSON 更便捷。',
    whyConvert: '秒级解析 YAML 语法树并输出美化对齐的 2 空格缩进 JSON。',
    faqs: [
      {
        q: '语法有错误会有提示吗？',
        a: '如果有缩进或格式错误，会在界面立即高亮提醒。',
      },
    ],
  },
  {
    slug: 'html-to-markdown',
    from: 'HTML',
    to: 'Markdown',
    fromExt: ['.html', '.htm'],
    toExt: '.md',
    name: 'HTML 转 Markdown',
    englishTitle: 'Free HTML to Markdown Converter - Clean Web Articles to MD',
    chineseTitle: '免费 HTML 转 Markdown 在线转换器 - 网页转笔记·剥离标签',
    h1: 'HTML 转 Markdown 在线转换器 (HTML to Markdown)',
    shortDesc: '剥离复杂 HTML 标签，提取干净的正文与标题大纲为 Markdown',
    category: 'document',
    badge: '笔记神器',
    whatIsFrom: '网页源代码包含大量 div、span 与样式标签，难以直接导入笔记管理软件。',
    whyConvert: '转为轻量简洁的 Markdown，方便导入 Obsidian、Notion 等知识库。',
    faqs: [
      {
        q: '会保留链接和图片吗？',
        a: '会完整保留原始页面中的超链接与图片嵌入语法。',
      },
    ],
  },
  {
    slug: 'svg-to-png',
    from: 'SVG 矢量图',
    to: 'PNG',
    fromExt: ['.svg'],
    toExt: '.png',
    name: 'SVG 转 PNG',
    englishTitle: 'Free SVG to PNG Converter - Rasterize Vector Graphics Online',
    chineseTitle: '免费 SVG 转 PNG 在线转换器 - 矢量栅格化·超清导出',
    h1: 'SVG 转 PNG 在线转换器 (SVG to PNG)',
    shortDesc: '将矢量 SVG 图标与插画高清渲染栅格化为透明 PNG',
    category: 'image',
    badge: '设计常用',
    whatIsFrom: 'SVG 是 XML 描述的矢量图，部分办公文档、社交媒体或老旧看图软件不支持直接插入 SVG。',
    whyConvert: '栅格化为高质量透明底 PNG，适配所有设计、排版与日常分享平台。',
    faqs: [
      {
        q: '导出的 PNG 清晰吗？',
        a: '按原始矢量视口尺寸完整栅格化，边缘锐利。',
      },
    ],
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
