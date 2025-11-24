import { useState } from 'react';
import { ToolLayout } from '../layouts/ToolLayout';
import { ActionButton } from '../components/ActionButton';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

export function SlugGenerator() {
  const [text, setText] = useState('');

  const generateSlug = (input: string): string => {
    return input
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const slug = generateSlug(text);

  const handleCopy = () => {
    navigator.clipboard.writeText(slug);
    toast.success('Slug copied to clipboard!');
  };

  return (
    <ToolLayout
      title="Slug Generator"
      description="Convert text to kebab-case slugs for URLs"
      breadcrumbs={[{ label: 'Web & Dev', href: '/category/webdev' }]}
    >
      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Input Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Hello World - This is a Test!"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {slug && (
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-100">Generated Slug</h3>
              <ActionButton onClick={handleCopy} size="sm">
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </ActionButton>
            </div>
            <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
              <code className="text-lg text-indigo-300">{slug}</code>
            </div>
          </div>
        )}

        <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
          <h4 className="mb-2 text-sm font-semibold text-slate-300">Examples</h4>
          <div className="space-y-2 text-sm text-slate-400">
            <div>"Hello World" → <code className="text-indigo-300">hello-world</code></div>
            <div>"My First Blog Post!" → <code className="text-indigo-300">my-first-blog-post</code></div>
            <div>"Product Name 2024" → <code className="text-indigo-300">product-name-2024</code></div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
