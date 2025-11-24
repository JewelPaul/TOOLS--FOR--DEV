import { useState } from 'react';
import { ToolLayout } from '../layouts/ToolLayout';
import { ActionButton } from '../components/ActionButton';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

export function UTMBuilder() {
  const [baseUrl, setBaseUrl] = useState('');
  const [source, setSource] = useState('');
  const [medium, setMedium] = useState('');
  const [campaign, setCampaign] = useState('');
  const [term, setTerm] = useState('');
  const [content, setContent] = useState('');

  const buildURL = () => {
    if (!baseUrl) return '';

    const params = new URLSearchParams();
    if (source) params.append('utm_source', source);
    if (medium) params.append('utm_medium', medium);
    if (campaign) params.append('utm_campaign', campaign);
    if (term) params.append('utm_term', term);
    if (content) params.append('utm_content', content);

    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}${params.toString()}`;
  };

  const generatedURL = buildURL();

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedURL);
    toast.success('URL copied to clipboard!');
  };

  return (
    <ToolLayout
      title="UTM Builder"
      description="Build campaign tracking URLs with UTM parameters"
      breadcrumbs={[{ label: 'Marketing', href: '/category/marketing' }]}
    >
      <div className="space-y-6">
        {/* URL Input */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Website URL <span className="text-red-400">*</span>
          </label>
          <input
            type="url"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        {/* UTM Parameters */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Campaign Source <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="google, facebook, newsletter"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <p className="mt-1 text-xs text-slate-400">Where the traffic comes from</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Campaign Medium <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={medium}
              onChange={(e) => setMedium(e.target.value)}
              placeholder="cpc, email, social"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <p className="mt-1 text-xs text-slate-400">Marketing medium</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Campaign Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
              placeholder="spring_sale, product_launch"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <p className="mt-1 text-xs text-slate-400">Specific campaign name</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Campaign Term (Optional)
            </label>
            <input
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="running+shoes"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <p className="mt-1 text-xs text-slate-400">Paid search keywords</p>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Campaign Content (Optional)
            </label>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="header_link, sidebar_ad"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <p className="mt-1 text-xs text-slate-400">
              Differentiate ads or links pointing to the same URL
            </p>
          </div>
        </div>

        {/* Generated URL */}
        {generatedURL && (
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-100">Generated URL</h3>
              <ActionButton onClick={handleCopy} size="sm">
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </ActionButton>
            </div>
            <div className="overflow-x-auto rounded-lg border border-slate-700 bg-slate-900 p-4">
              <code className="break-all text-sm text-indigo-300">{generatedURL}</code>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
