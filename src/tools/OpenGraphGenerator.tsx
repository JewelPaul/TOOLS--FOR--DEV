import { useState } from 'react';
import { ToolLayout } from '../layouts/ToolLayout';
import { ActionButton } from '../components/ActionButton';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

function isSafeImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function OpenGraphGenerator() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [url, setUrl] = useState('');
  const [siteName, setSiteName] = useState('');

  const generateMetaTags = () => {
    return `<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${imageUrl}">
${siteName ? `<meta property="og:site_name" content="${siteName}">` : ''}

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${url}">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${description}">
<meta property="twitter:image" content="${imageUrl}">`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMetaTags());
    toast.success('Meta tags copied to clipboard!');
  };

  return (
    <ToolLayout
      title="Open Graph Generator"
      description="Generate Open Graph meta tags for Facebook, Twitter, and LinkedIn"
      breadcrumbs={[{ label: 'Marketing', href: '/category/marketing' }]}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Form */}
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your awesome title"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief description of your content..."
              rows={3}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Image URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Site Name (Optional)
            </label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              placeholder="Your Site Name"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <ActionButton onClick={handleCopy} disabled={!title || !description || !url}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Meta Tags
          </ActionButton>
        </div>

        {/* Preview */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-100">Preview</h3>
          
          {/* Social Card Preview */}
          {title && (
            <div className="overflow-hidden rounded-lg border border-slate-700 bg-slate-800">
              {isSafeImageUrl(imageUrl) && (
                <img 
                  src={imageUrl} 
                  alt="Preview" 
                  className="h-48 w-full object-cover" 
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }} 
                />
              )}
              <div className="p-4">
                <div className="mb-1 text-sm text-slate-400">{url || 'example.com'}</div>
                <div className="mb-2 text-lg font-semibold text-slate-100">{title}</div>
                <div className="text-sm text-slate-400">{description}</div>
              </div>
            </div>
          )}

          {/* Generated Code */}
          <div>
            <h4 className="mb-2 text-sm font-semibold text-slate-300">Generated Meta Tags</h4>
            <pre className="overflow-x-auto rounded-lg border border-slate-700 bg-slate-800 p-4 text-xs text-slate-300">
              {generateMetaTags()}
            </pre>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
