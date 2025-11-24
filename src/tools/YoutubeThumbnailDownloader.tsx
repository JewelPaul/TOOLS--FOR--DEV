import { useState } from 'react';
import { ToolLayout } from '../layouts/ToolLayout';
import { ActionButton } from '../components/ActionButton';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

export function YoutubeThumbnailDownloader() {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [thumbnails, setThumbnails] = useState<{ quality: string; url: string }[]>([]);

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /^[a-zA-Z0-9_-]{11}$/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      const id = match ? (match[1] || match[0]) : null;
      if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
    }
    return null;
  };

  const handleExtract = () => {
    const id = extractVideoId(videoUrl);
    if (!id) {
      toast.error('Invalid YouTube URL or Video ID');
      return;
    }

    setVideoId(id);
    setThumbnails([
      { quality: 'Default (120x90)', url: `https://img.youtube.com/vi/${id}/default.jpg` },
      { quality: 'Medium (320x180)', url: `https://img.youtube.com/vi/${id}/mqdefault.jpg` },
      { quality: 'High (480x360)', url: `https://img.youtube.com/vi/${id}/hqdefault.jpg` },
      { quality: 'Standard (640x480)', url: `https://img.youtube.com/vi/${id}/sddefault.jpg` },
      { quality: 'Max Resolution (1280x720)', url: `https://img.youtube.com/vi/${id}/maxresdefault.jpg` },
    ]);
    toast.success('Thumbnails extracted successfully!');
  };

  const handleDownload = (url: string, quality: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `youtube-thumbnail-${videoId}-${quality.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    link.target = '_blank';
    link.click();
    toast.success('Download started!');
  };

  return (
    <ToolLayout
      title="YouTube Thumbnail Downloader"
      description="Extract and download thumbnails from YouTube videos in various qualities"
      breadcrumbs={[{ label: 'Marketing', href: '/category/marketing' }]}
    >
      <div className="space-y-6">
        {/* Input Section */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            YouTube URL or Video ID
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=dQw4w9WgXcQ or dQw4w9WgXcQ"
              className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <ActionButton onClick={handleExtract} disabled={!videoUrl}>
              Extract
            </ActionButton>
          </div>
        </div>

        {/* Thumbnails Display */}
        {thumbnails.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-100">Available Thumbnails</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {thumbnails.map((thumb) => (
                <div
                  key={thumb.quality}
                  className="rounded-lg border border-slate-700 bg-slate-800/50 p-4 transition-colors hover:border-slate-600"
                >
                  <img
                    src={thumb.url}
                    alt={thumb.quality}
                    className="mb-3 w-full rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="mb-2 text-sm font-medium text-slate-200">{thumb.quality}</div>
                  <ActionButton
                    onClick={() => handleDownload(thumb.url, thumb.quality)}
                    size="sm"
                    className="w-full"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </ActionButton>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info */}
        {thumbnails.length === 0 && (
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6 text-center text-slate-400">
            <p>Enter a YouTube video URL or video ID to extract thumbnails</p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
