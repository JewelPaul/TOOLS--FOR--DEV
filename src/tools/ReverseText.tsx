import { useState } from 'react';
import { ToolLayout } from '../layouts/ToolLayout';
import { ActionButton } from '../components/ActionButton';
import { RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

export function ReverseText() {
  const [text, setText] = useState('');

  const reverse = (str: string): string => {
    return str.split('').reverse().join('');
  };

  const handleReverse = () => {
    setText(reverse(text));
    toast.success('Text reversed!');
  };

  return (
    <ToolLayout
      title="Reverse Text"
      description="Reverse text and strings"
      breadcrumbs={[{ label: 'Text Extras', href: '/category/text-extra' }]}
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to reverse..."
            rows={10}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <ActionButton onClick={handleReverse}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Reverse Text
        </ActionButton>
      </div>
    </ToolLayout>
  );
}
