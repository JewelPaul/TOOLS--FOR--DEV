import { useState, useRef } from 'react';
import { ToolLayout } from '../layouts/ToolLayout';
import { ActionButton } from '../components/ActionButton';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

export function TweetToImage() {
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [tweetText, setTweetText] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleExport = () => {
    toast.info('Export feature coming soon! Take a screenshot for now.');
  };

  return (
    <ToolLayout
      title="Tweet to Image"
      description="Create styled tweet mockups and export to PNG"
      breadcrumbs={[{ label: 'Marketing', href: '/category/marketing' }]}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Form */}
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="John Doe"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="johndoe"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Tweet Text</label>
            <textarea
              value={tweetText}
              onChange={(e) => setTweetText(e.target.value)}
              placeholder="What's happening?"
              rows={5}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Timestamp</label>
            <input
              type="text"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder="12:34 PM · Jan 1, 2024"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <ActionButton onClick={handleExport} disabled={!tweetText || !username} className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Export as PNG
          </ActionButton>
        </div>

        {/* Preview */}
        <div className="flex items-center justify-center">
          <div
            ref={canvasRef}
            className="w-full max-w-lg rounded-xl border border-slate-700 bg-white p-6 text-black shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%), white',
            }}
          >
            <div className="flex items-start space-x-3">
              <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600" />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold">{displayName || 'Display Name'}</span>
                  <span className="text-slate-500">@{username || 'username'}</span>
                </div>
                <div className="mt-2 whitespace-pre-wrap text-base">
                  {tweetText || 'Your tweet text will appear here...'}
                </div>
                <div className="mt-3 text-sm text-slate-500">
                  {timestamp || '12:34 PM · Jan 1, 2024'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
