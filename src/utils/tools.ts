import { type LucideIcon, Image, FileImage, Crop, RefreshCw, EyeOff, FileText, File, SplitSquareVertical, Layers, Type, CaseSensitive, WrapText, Repeat, FileType, Code2, Link, Binary, Hash, Key } from 'lucide-react';

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  category: string;
  path: string;
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
];

export const categories = [
  { id: 'image', name: 'Image Tools', description: '5 tools for image processing' },
  { id: 'pdf', name: 'PDF Tools', description: '5 tools for PDF manipulation' },
  { id: 'text', name: 'Text Utilities', description: '5 tools for text processing' },
  { id: 'developer', name: 'Developer Tools', description: '4 tools for developers' },
  { id: 'security', name: 'Security', description: '1 tool for password generation' },
];

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter(tool => tool.category === category);
}

export function getToolById(id: string): Tool | undefined {
  return tools.find(tool => tool.id === id);
}
