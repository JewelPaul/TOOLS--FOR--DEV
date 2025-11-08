'use client';

import { useState } from 'react';
import { ToolPageLayout, ToolCard, ToolSidebarInfo } from '@/components/tool-layout';

type CaseType =
  | 'uppercase'
  | 'lowercase'
  | 'titlecase'
  | 'sentencecase'
  | 'camelcase'
  | 'pascalcase'
  | 'snakecase'
  | 'kebabcase';

const convertCase = (text: string, type: CaseType): string => {
  if (!text) return '';

  switch (type) {
    case 'uppercase':
      return text.toUpperCase();
    case 'lowercase':
      return text.toLowerCase();
    case 'titlecase':
      return text
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    case 'sentencecase':
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    case 'camelcase':
      return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
        .replace(/^[A-Z]/, (chr) => chr.toLowerCase());
    case 'pascalcase':
      return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
        .replace(/^[a-z]/, (chr) => chr.toUpperCase());
    case 'snakecase':
      return text
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, '');
    case 'kebabcase':
      return text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
    default:
      return text;
  }
};

export default function CaseConverterPage() {
  const [inputText, setInputText] = useState('');
  const [selectedCase, setSelectedCase] = useState<CaseType>('uppercase');

  const outputText = convertCase(inputText, selectedCase);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(outputText);
  };

  const caseOptions: { value: CaseType; label: string; example: string }[] = [
    { value: 'uppercase', label: 'UPPER CASE', example: 'HELLO WORLD' },
    { value: 'lowercase', label: 'lower case', example: 'hello world' },
    { value: 'titlecase', label: 'Title Case', example: 'Hello World' },
    { value: 'sentencecase', label: 'Sentence case', example: 'Hello world' },
    { value: 'camelcase', label: 'camelCase', example: 'helloWorld' },
    { value: 'pascalcase', label: 'PascalCase', example: 'HelloWorld' },
    { value: 'snakecase', label: 'snake_case', example: 'hello_world' },
    { value: 'kebabcase', label: 'kebab-case', example: 'hello-world' },
  ];

  return (
    <ToolPageLayout
      title="Text Case Converter"
      description="Convert text between different cases: upper, lower, title, sentence, camel, pascal, snake, and kebab case"
      onCopy={handleCopy}
      sidebar={
        <ToolSidebarInfo>
          <p className="mb-2">
            This tool converts your text between different case formats commonly used in
            programming and writing.
          </p>
          <ul className="space-y-1 text-xs">
            <li>• <strong>UPPER CASE:</strong> All letters capitalized</li>
            <li>• <strong>lower case:</strong> All letters lowercase</li>
            <li>• <strong>Title Case:</strong> First letter of each word capitalized</li>
            <li>• <strong>camelCase:</strong> Used in JavaScript variables</li>
            <li>• <strong>PascalCase:</strong> Used in class names</li>
            <li>• <strong>snake_case:</strong> Used in Python and databases</li>
            <li>• <strong>kebab-case:</strong> Used in URLs and CSS</li>
          </ul>
        </ToolSidebarInfo>
      }
    >
      {/* Case Selection */}
      <ToolCard title="Select Case Type">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {caseOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedCase(option.value)}
              className={`rounded-md border p-3 text-left text-sm transition-colors ${
                selectedCase === option.value
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'hover:bg-accent'
              }`}
            >
              <div className="font-medium">{option.label}</div>
              <div className="mt-1 text-xs text-muted-foreground">{option.example}</div>
            </button>
          ))}
        </div>
      </ToolCard>

      {/* Input */}
      <ToolCard title="Input Text">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your text here..."
          className="min-h-[200px] w-full rounded-md border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <div className="mt-2 text-xs text-muted-foreground">
          Characters: {inputText.length} | Words: {inputText.trim().split(/\s+/).filter(Boolean).length}
        </div>
      </ToolCard>

      {/* Output */}
      <ToolCard title="Converted Text">
        <div className="min-h-[200px] w-full rounded-md border bg-muted/50 p-3 text-sm font-mono">
          {outputText || (
            <span className="text-muted-foreground">Output will appear here...</span>
          )}
        </div>
      </ToolCard>
    </ToolPageLayout>
  );
}
