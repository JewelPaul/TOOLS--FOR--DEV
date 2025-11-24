import { type LucideIcon, Image, FileImage, Crop, RefreshCw, EyeOff, FileText, File, SplitSquareVertical, Layers, Type, CaseSensitive, WrapText, Repeat, FileType, Code2, Link, Binary, Hash, Key, Youtube, QrCode, Share2, Twitter, ExternalLink, Palette, Calculator, Clock, ArrowRightLeft, Table, Percent, DollarSign, TrendingUp, CreditCard, Code, Minimize2, FileCode2, Monitor, LinkIcon, Shuffle, RotateCcw, Music, CheckCircle, ImageIcon, Droplet, Shapes, Maximize2 } from 'lucide-react';

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  category: string;
  path: string;
  keywords?: string[];
}

export const tools: Tool[] = [
  // Category A: Image Tools
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Compress PNG/JPG images and reduce file size',
    icon: Image,
    category: 'image',
    path: '/tools/image-compressor',
  },
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    description: 'Resize images by width, height, or percentage',
    icon: RefreshCw,
    category: 'image',
    path: '/tools/image-resizer',
  },
  {
    id: 'image-cropper',
    name: 'Image Cropper',
    description: 'Crop images with presets (1:1, 16:9, 4:3, Free)',
    icon: Crop,
    category: 'image',
    path: '/tools/image-cropper',
  },
  {
    id: 'format-converter',
    name: 'Format Converter',
    description: 'Convert HEIC/WebP/SVG to PNG/JPG',
    icon: FileType,
    category: 'image',
    path: '/tools/format-converter',
  },
  {
    id: 'privacy-blur',
    name: 'Privacy Blur',
    description: 'Blur sensitive areas of images',
    icon: EyeOff,
    category: 'image',
    path: '/tools/privacy-blur',
  },
  
  // Category B: PDF Tools
  {
    id: 'pdf-merger',
    name: 'PDF Merger',
    description: 'Merge multiple PDF files into one',
    icon: Layers,
    category: 'pdf',
    path: '/tools/pdf-merger',
  },
  {
    id: 'pdf-to-image',
    name: 'PDF to Image',
    description: 'Convert PDF pages to images',
    icon: FileImage,
    category: 'pdf',
    path: '/tools/pdf-to-image',
  },
  {
    id: 'image-to-pdf',
    name: 'Image to PDF',
    description: 'Convert images to PDF document',
    icon: File,
    category: 'pdf',
    path: '/tools/image-to-pdf',
  },
  {
    id: 'pdf-splitter',
    name: 'PDF Splitter',
    description: 'Split PDF by page ranges',
    icon: SplitSquareVertical,
    category: 'pdf',
    path: '/tools/pdf-splitter',
  },
  {
    id: 'watermark-pdf',
    name: 'Watermark PDF',
    description: 'Add watermark to PDF pages',
    icon: FileText,
    category: 'pdf',
    path: '/tools/watermark-pdf',
  },
  
  // Category C: Text Utilities
  {
    id: 'word-counter',
    name: 'Word & Character Counter',
    description: 'Count words, characters, and reading time',
    icon: Type,
    category: 'text',
    path: '/tools/word-counter',
  },
  {
    id: 'case-converter',
    name: 'Case Converter',
    description: 'Convert text to different cases (upper, lower, title, camel, etc.)',
    icon: CaseSensitive,
    category: 'text',
    path: '/tools/case-converter',
  },
  {
    id: 'line-breaks-remover',
    name: 'Remove Line Breaks',
    description: 'Remove all or distinct paragraph breaks from text',
    icon: WrapText,
    category: 'text',
    path: '/tools/line-breaks-remover',
  },
  {
    id: 'text-repeater',
    name: 'Text Repeater',
    description: 'Repeat text multiple times with separators',
    icon: Repeat,
    category: 'text',
    path: '/tools/text-repeater',
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder Lorem Ipsum text',
    icon: FileText,
    category: 'text',
    path: '/tools/lorem-ipsum',
  },
  
  // Category D: Developer Tools
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, validate, and minify JSON',
    icon: Code2,
    category: 'developer',
    path: '/tools/json-formatter',
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder/Decoder',
    description: 'Encode and decode URL strings',
    icon: Link,
    category: 'developer',
    path: '/tools/url-encoder',
  },
  {
    id: 'base64-converter',
    name: 'Base64 Converter',
    description: 'Convert text and images to/from Base64',
    icon: Binary,
    category: 'developer',
    path: '/tools/base64-converter',
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate V1/V4 UUIDs in bulk',
    icon: Hash,
    category: 'developer',
    path: '/tools/uuid-generator',
  },
  
  // Category E: Security
  {
    id: 'password-generator',
    name: 'Strong Password Generator',
    description: 'Generate secure passwords with custom options',
    icon: Key,
    category: 'security',
    path: '/tools/password-generator',
  },

  // Category F: Social Media & Marketing
  {
    id: 'youtube-thumbnail-downloader',
    name: 'YouTube Thumbnail Downloader',
    description: 'Extract and download thumbnails from YouTube videos',
    icon: Youtube,
    category: 'marketing',
    path: '/tools/youtube-thumbnail-downloader',
    keywords: ['youtube', 'thumbnail', 'download', 'video'],
  },
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    description: 'Generate QR codes with custom colors and download',
    icon: QrCode,
    category: 'marketing',
    path: '/tools/qr-code-generator',
    keywords: ['qr', 'code', 'generator', 'barcode'],
  },
  {
    id: 'open-graph-generator',
    name: 'Open Graph Generator',
    description: 'Preview Facebook, Twitter, LinkedIn social cards',
    icon: Share2,
    category: 'marketing',
    path: '/tools/open-graph-generator',
    keywords: ['og', 'meta', 'social', 'facebook', 'twitter'],
  },
  {
    id: 'hashtag-generator',
    name: 'Hashtag Generator',
    description: 'Generate and shuffle popular hashtags for keywords',
    icon: Hash,
    category: 'marketing',
    path: '/tools/hashtag-generator',
    keywords: ['hashtag', 'social', 'instagram', 'twitter'],
  },
  {
    id: 'tweet-to-image',
    name: 'Tweet to Image',
    description: 'Create styled tweet mockups and export to PNG',
    icon: Twitter,
    category: 'marketing',
    path: '/tools/tweet-to-image',
    keywords: ['tweet', 'twitter', 'image', 'mockup'],
  },
  {
    id: 'utm-builder',
    name: 'UTM Builder',
    description: 'Build campaign URLs with UTM parameters',
    icon: ExternalLink,
    category: 'marketing',
    path: '/tools/utm-builder',
    keywords: ['utm', 'campaign', 'tracking', 'analytics'],
  },

  // Category G: Advanced Converters
  {
    id: 'color-converter',
    name: 'Color Converter',
    description: 'Convert between HEX, RGB, HSL, CMYK color formats',
    icon: Palette,
    category: 'converters',
    path: '/tools/color-converter',
    keywords: ['color', 'hex', 'rgb', 'hsl', 'cmyk', 'convert'],
  },
  {
    id: 'number-base-converter',
    name: 'Number Base Converter',
    description: 'Convert between Binary, Octal, Decimal, Hexadecimal',
    icon: Calculator,
    category: 'converters',
    path: '/tools/number-base-converter',
    keywords: ['binary', 'hex', 'octal', 'decimal', 'convert'],
  },
  {
    id: 'unix-timestamp-converter',
    name: 'Unix Timestamp Converter',
    description: 'Convert dates to/from Unix timestamps',
    icon: Clock,
    category: 'converters',
    path: '/tools/unix-timestamp-converter',
    keywords: ['timestamp', 'unix', 'date', 'time', 'convert'],
  },
  {
    id: 'json-yaml-converter',
    name: 'JSON ↔ YAML Converter',
    description: 'Convert between JSON and YAML formats',
    icon: ArrowRightLeft,
    category: 'converters',
    path: '/tools/json-yaml-converter',
    keywords: ['json', 'yaml', 'convert'],
  },
  {
    id: 'json-csv-converter',
    name: 'JSON ↔ CSV Converter',
    description: 'Convert JSON arrays to CSV and vice versa',
    icon: Table,
    category: 'converters',
    path: '/tools/json-csv-converter',
    keywords: ['json', 'csv', 'table', 'convert'],
  },

  // Category H: Math & Finance
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    description: 'Calculate percentages with multiple modes',
    icon: Percent,
    category: 'finance',
    path: '/tools/percentage-calculator',
    keywords: ['percentage', 'percent', 'calculate', 'math'],
  },
  {
    id: 'discount-calculator',
    name: 'Discount Calculator',
    description: 'Calculate final price with discount and tax',
    icon: DollarSign,
    category: 'finance',
    path: '/tools/discount-calculator',
    keywords: ['discount', 'price', 'sale', 'savings'],
  },
  {
    id: 'roi-calculator',
    name: 'ROI Calculator',
    description: 'Calculate Return on Investment percentage',
    icon: TrendingUp,
    category: 'finance',
    path: '/tools/roi-calculator',
    keywords: ['roi', 'return', 'investment', 'profit'],
  },
  {
    id: 'loan-calculator',
    name: 'Loan/Mortgage Calculator',
    description: 'Calculate loan payments with amortization chart',
    icon: CreditCard,
    category: 'finance',
    path: '/tools/loan-calculator',
    keywords: ['loan', 'mortgage', 'payment', 'interest'],
  },
  {
    id: 'aspect-ratio-calculator',
    name: 'Aspect Ratio Calculator',
    description: 'Calculate missing dimensions from aspect ratios',
    icon: Maximize2,
    category: 'finance',
    path: '/tools/aspect-ratio-calculator',
    keywords: ['aspect', 'ratio', 'dimension', 'resize'],
  },

  // Category I: Web & Dev Utilities
  {
    id: 'css-minifier',
    name: 'CSS Minifier',
    description: 'Minify CSS by removing whitespace',
    icon: Code,
    category: 'webdev',
    path: '/tools/css-minifier',
    keywords: ['css', 'minify', 'compress', 'optimize'],
  },
  {
    id: 'js-minifier',
    name: 'JS Minifier',
    description: 'Minify JavaScript code',
    icon: Minimize2,
    category: 'webdev',
    path: '/tools/js-minifier',
    keywords: ['javascript', 'js', 'minify', 'compress'],
  },
  {
    id: 'html-entity-encoder',
    name: 'HTML Entity Encoder',
    description: 'Encode/decode HTML entities',
    icon: FileCode2,
    category: 'webdev',
    path: '/tools/html-entity-encoder',
    keywords: ['html', 'entity', 'encode', 'decode'],
  },
  {
    id: 'user-agent-parser',
    name: 'User Agent Parser',
    description: 'Parse and display browser/OS information',
    icon: Monitor,
    category: 'webdev',
    path: '/tools/user-agent-parser',
    keywords: ['user agent', 'browser', 'os', 'parse'],
  },
  {
    id: 'url-parser',
    name: 'URL Parser',
    description: 'Break URL into protocol, host, path, query params',
    icon: LinkIcon,
    category: 'webdev',
    path: '/tools/url-parser',
    keywords: ['url', 'parse', 'query', 'params'],
  },
  {
    id: 'slug-generator',
    name: 'Slug Generator',
    description: 'Convert text to kebab-case slugs',
    icon: Link,
    category: 'webdev',
    path: '/tools/slug-generator',
    keywords: ['slug', 'kebab', 'url', 'seo'],
  },

  // Category J: Text & String Extras
  {
    id: 'random-string-generator',
    name: 'Random String Generator',
    description: 'Generate random strings with custom length and charset',
    icon: Shuffle,
    category: 'text-extra',
    path: '/tools/random-string-generator',
    keywords: ['random', 'string', 'generator', 'password'],
  },
  {
    id: 'binary-text-translator',
    name: 'Binary Text Translator',
    description: 'Convert text to binary and vice versa',
    icon: Binary,
    category: 'text-extra',
    path: '/tools/binary-text-translator',
    keywords: ['binary', 'text', 'translate', 'convert'],
  },
  {
    id: 'morse-code-translator',
    name: 'Morse Code Translator',
    description: 'Convert text to Morse code and vice versa',
    icon: Music,
    category: 'text-extra',
    path: '/tools/morse-code-translator',
    keywords: ['morse', 'code', 'translate', 'dots', 'dashes'],
  },
  {
    id: 'palindrome-checker',
    name: 'Palindrome Checker',
    description: 'Check if text is a palindrome',
    icon: CheckCircle,
    category: 'text-extra',
    path: '/tools/palindrome-checker',
    keywords: ['palindrome', 'check', 'reverse'],
  },
  {
    id: 'reverse-text',
    name: 'Reverse Text',
    description: 'Reverse text and strings',
    icon: RotateCcw,
    category: 'text-extra',
    path: '/tools/reverse-text',
    keywords: ['reverse', 'text', 'backwards'],
  },

  // Category K: Image Extras
  {
    id: 'meme-generator',
    name: 'Meme Generator',
    description: 'Create memes with top and bottom text',
    icon: ImageIcon,
    category: 'image-extra',
    path: '/tools/meme-generator',
    keywords: ['meme', 'image', 'text', 'funny'],
  },
  {
    id: 'image-color-extractor',
    name: 'Image Color Extractor',
    description: 'Extract color hex codes from images',
    icon: Droplet,
    category: 'image-extra',
    path: '/tools/image-color-extractor',
    keywords: ['color', 'extract', 'picker', 'hex'],
  },
  {
    id: 'svg-blob-generator',
    name: 'SVG Blob Generator',
    description: 'Generate random organic SVG shapes',
    icon: Shapes,
    category: 'image-extra',
    path: '/tools/svg-blob-generator',
    keywords: ['svg', 'blob', 'shape', 'generator'],
  },
];

export const categories = [
  { id: 'image', name: 'Image Tools', description: '5 tools for image processing' },
  { id: 'pdf', name: 'PDF Tools', description: '5 tools for PDF manipulation' },
  { id: 'text', name: 'Text Utilities', description: '5 tools for text processing' },
  { id: 'developer', name: 'Developer Tools', description: '4 tools for developers' },
  { id: 'security', name: 'Security', description: '1 tool for password generation' },
  { id: 'marketing', name: 'Social Media & Marketing', description: '6 tools for marketing and social media' },
  { id: 'converters', name: 'Advanced Converters', description: '5 tools for format conversion' },
  { id: 'finance', name: 'Math & Finance', description: '5 tools for calculations and finance' },
  { id: 'webdev', name: 'Web & Dev Utilities', description: '6 tools for web development' },
  { id: 'text-extra', name: 'Text & String Extras', description: '5 tools for text manipulation' },
  { id: 'image-extra', name: 'Image Extras', description: '3 tools for creative image work' },
];

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter(tool => tool.category === category);
}

export function getToolById(id: string): Tool | undefined {
  return tools.find(tool => tool.id === id);
}

export function searchTools(query: string): Tool[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return tools;

  return tools.filter(tool => {
    // Search in name
    if (tool.name.toLowerCase().includes(lowerQuery)) return true;
    
    // Search in description
    if (tool.description.toLowerCase().includes(lowerQuery)) return true;
    
    // Search in keywords
    if (tool.keywords?.some(keyword => keyword.toLowerCase().includes(lowerQuery))) return true;
    
    return false;
  });
}
