import { useState } from 'react';
import { ToolLayout } from '../layouts/ToolLayout';
import { ActionButton, ActionButtonGroup } from '../components/ActionButton';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

export function JSONFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError(null);
      toast.success('JSON formatted successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      toast.error('Invalid JSON');
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError(null);
      toast.success('JSON minified successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      toast.error('Invalid JSON');
    }
  };

  const validateJSON = () => {
    try {
      JSON.parse(input);
      setError(null);
      toast.success('Valid JSON');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      toast.error('Invalid JSON');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast.success('Copied to clipboard');
  };

  return (
    <ToolLayout
      title="JSON Formatter"
      description="Format, validate, and minify JSON data"
    >
      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Input JSON</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"name": "John", "age": 30}'
            className="h-64 w-full rounded-lg border border-slate-700 bg-slate-800 p-4 font-mono text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
            <strong>Error:</strong> {error}
          </div>
        )}

        <ActionButtonGroup>
          <ActionButton onClick={formatJSON}>Format (Beautify)</ActionButton>
          <ActionButton onClick={minifyJSON} variant="secondary">
            Minify
          </ActionButton>
          <ActionButton onClick={validateJSON} variant="secondary">
            Validate
          </ActionButton>
          <ActionButton onClick={() => { setInput(''); setOutput(''); setError(null); }} variant="secondary">
            Clear
          </ActionButton>
        </ActionButtonGroup>

        {output && (
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-slate-300">Output</label>
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-2 text-sm text-indigo-400 hover:text-indigo-300"
              >
                <Copy className="h-4 w-4" />
                <span>Copy</span>
              </button>
            </div>
            <textarea
              value={output}
              readOnly
              className="h-64 w-full rounded-lg border border-slate-700 bg-slate-800 p-4 font-mono text-sm text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
