import { useState, useEffect } from 'react';
import { ToolLayout } from '../layouts/ToolLayout';
import { ActionButton } from '../components/ActionButton';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

export function UnixTimestampConverter() {
  const [timestamp, setTimestamp] = useState('');
  const [dateString, setDateString] = useState('');
  const [currentTimestamp, setCurrentTimestamp] = useState(() => Math.floor(Date.now() / 1000));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timestampToDate = (ts: string) => {
    const num = parseInt(ts, 10);
    if (!isNaN(num)) {
      const date = new Date(num * 1000);
      setDateString(date.toISOString().slice(0, 19));
    }
  };

  const dateToTimestamp = (dateStr: string) => {
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      setTimestamp(Math.floor(date.getTime() / 1000).toString());
    }
  };

  return (
    <ToolLayout
      title="Unix Timestamp Converter"
      description="Convert between dates and Unix timestamps"
      breadcrumbs={[{ label: 'Converters', href: '/category/converters' }]}
    >
      <div className="space-y-6">
        <div className="rounded-lg border border-indigo-500/30 bg-indigo-500/10 p-4">
          <div className="mb-2 text-sm font-medium text-slate-300">Current Unix Timestamp</div>
          <div className="flex items-center gap-2">
            <code className="flex-1 rounded bg-slate-800 px-3 py-2 text-lg font-mono text-indigo-300">
              {currentTimestamp}
            </code>
            <ActionButton
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(currentTimestamp.toString());
                toast.success('Copied!');
              }}
            >
              <Copy className="h-4 w-4" />
            </ActionButton>
          </div>
          <div className="mt-2 text-xs text-slate-400">
            {new Date(currentTimestamp * 1000).toLocaleString()}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-100">Timestamp to Date</h3>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Unix Timestamp</label>
              <input
                type="text"
                value={timestamp}
                onChange={(e) => {
                  setTimestamp(e.target.value);
                  timestampToDate(e.target.value);
                }}
                placeholder="1234567890"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            {timestamp && dateString && (
              <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                <div className="mb-1 text-xs text-slate-400">Result</div>
                <div className="font-mono text-slate-100">{dateString}</div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-100">Date to Timestamp</h3>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Date & Time</label>
              <input
                type="datetime-local"
                value={dateString}
                onChange={(e) => {
                  setDateString(e.target.value);
                  dateToTimestamp(e.target.value);
                }}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            {timestamp && dateString && (
              <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                <div className="mb-1 text-xs text-slate-400">Result</div>
                <div className="font-mono text-slate-100">{timestamp}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
