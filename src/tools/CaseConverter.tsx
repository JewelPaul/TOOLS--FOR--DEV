import { useState } from 'react';
import { ToolLayout } from '../layouts/ToolLayout';
import { ActionButton, ActionButtonGroup } from '../components/ActionButton';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

type CaseType = 'upper' | 'lower' | 'title' | 'sentence' | 'camel' | 'pascal' | 'snake' | 'kebab';

export function CaseConverter() {
  const [text, setText] = useState('');

  const toTitleCase = (str: string) => {
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const toSentenceCase = (str: string) => {
    return str.toLowerCase().replace(/(^\w|\.\s+\w)/g, (char) => char.toUpperCase());
  };

  const toCamelCase = (str: string) => {
    return str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase());
  };

  const toPascalCase = (str: string) => {
    const camel = toCamelCase(str);
    return camel.charAt(0).toUpperCase() + camel.slice(1);
  };

  const toSnakeCase = (str: string) => {
    return str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, '_')
      .replace(/(^_|_$)/g, '');
  };

  const toKebabCase = (str: string) => {
    return str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const convert = (type: CaseType): string => {
    switch (type) {
      case 'upper':
        return text.toUpperCase();
      case 'lower':
        return text.toLowerCase();
      case 'title':
        return toTitleCase(text);
      case 'sentence':
        return toSentenceCase(text);
      case 'camel':
        return toCamelCase(text);
      case 'pascal':
        return toPascalCase(text);
      case 'snake':
        return toSnakeCase(text);
      case 'kebab':
        return toKebabCase(text);
      default:
        return text;
    }
  };

  const copyToClipboard = (convertedText: string) => {
    navigator.clipboard.writeText(convertedText);
    toast.success('Copied to clipboard');
  };

  const cases: { type: CaseType; label: string; example: string }[] = [
    { type: 'upper', label: 'UPPER CASE', example: 'HELLO WORLD' },
    { type: 'lower', label: 'lower case', example: 'hello world' },
    { type: 'title', label: 'Title Case', example: 'Hello World' },
    { type: 'sentence', label: 'Sentence case', example: 'Hello world' },
    { type: 'camel', label: 'camelCase', example: 'helloWorld' },
    { type: 'pascal', label: 'PascalCase', example: 'HelloWorld' },
    { type: 'snake', label: 'snake_case', example: 'hello_world' },
    { type: 'kebab', label: 'kebab-case', example: 'hello-world' },
  ];

  return (
    <ToolLayout
      title="Case Converter"
      description="Convert text to different cases: upper, lower, title, camel, pascal, snake, kebab"
    >
      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Enter your text
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="h-32 w-full rounded-lg border border-slate-700 bg-slate-800 p-4 text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map(({ type, label, example }) => {
            const converted = text ? convert(type) : example;
            return (
              <div key={type} className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-medium text-slate-300">{label}</h3>
                  <button
                    onClick={() => copyToClipboard(converted)}
                    className="rounded p-1 hover:bg-slate-700"
                    disabled={!text}
                  >
                    <Copy className="h-4 w-4 text-slate-400" />
                  </button>
                </div>
                <div className="min-h-[60px] rounded bg-slate-900 p-3 font-mono text-sm text-slate-100">
                  {converted}
                </div>
              </div>
            );
          })}
        </div>

        <ActionButtonGroup>
          <ActionButton onClick={() => setText('')} variant="secondary">
            Clear
          </ActionButton>
        </ActionButtonGroup>
      </div>
    </ToolLayout>
  );
}
