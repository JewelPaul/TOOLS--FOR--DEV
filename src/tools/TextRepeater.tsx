import { useState } from 'react';
import { ToolLayout } from '../layouts/ToolLayout';
import { ActionButton, ActionButtonGroup } from '../components/ActionButton';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

export function TextRepeater() {
  const [text, setText] = useState('');
  const [count, setCount] = useState(10);
  const [separator, setSeparator] = useState('\n');
  const [result, setResult] = useState('');

  const repeatText = () => {
    if (!text) {
      toast.error('Please enter some text');
      return;
    }

    const repeated = Array(count).fill(text).join(separator);
    setResult(repeated);
    toast.success('Text repeated successfully');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast.success('Copied to clipboard');
  };

  return (
    <ToolLayout
      title="Text Repeater"
      description="Repeat text multiple times with custom separators"
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Text to repeat</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to repeat..."
              className="h-32 w-full rounded-lg border border-slate-700 bg-slate-800 p-4 text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Repeat count: {count}
              </label>
              <input
                type="number"
                value={count}
                onChange={(e) => setCount(Math.max(1, Math.min(10000, Number(e.target.value))))}
                min="1"
                max="10000"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Separator</label>
              <select
                value={separator}
                onChange={(e) => setSeparator(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="\n">New Line</option>
                <option value=" ">Space</option>
                <option value=", ">Comma</option>
                <option value="">No Separator</option>
                <option value=" | ">Pipe</option>
                <option value="\n\n">Double New Line</option>
              </select>
            </div>

            <ActionButton onClick={repeatText} className="w-full">
              Repeat Text
            </ActionButton>
          </div>
        </div>

        {result && (
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-slate-300">Result</label>
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-2 text-sm text-indigo-400 hover:text-indigo-300"
              >
                <Copy className="h-4 w-4" />
                <span>Copy</span>
              </button>
            </div>
            <textarea
              value={result}
              readOnly
              className="h-64 w-full rounded-lg border border-slate-700 bg-slate-800 p-4 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        )}

        <ActionButtonGroup>
          <ActionButton
            onClick={() => {
              setText('');
              setResult('');
            }}
            variant="secondary"
          >
            Clear All
          </ActionButton>
        </ActionButtonGroup>
      </div>
    </ToolLayout>
  );
}
