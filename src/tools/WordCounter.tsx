import { useState } from 'react';
import { ToolLayout } from '../layouts/ToolLayout';
import { ActionButton, ActionButtonGroup } from '../components/ActionButton';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

export function WordCounter() {
  const [text, setText] = useState('');

  const words = text.trim().length === 0 ? 0 : text.trim().split(/\s+/).length;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0).length;
  const readingTime = Math.ceil(words / 200); // Average reading speed
  const speakingTime = Math.ceil(words / 130); // Average speaking speed

  const copyStats = () => {
    const stats = `Words: ${words}\nCharacters: ${characters}\nSentences: ${sentences}\nParagraphs: ${paragraphs}\nReading time: ${readingTime} min\nSpeaking time: ${speakingTime} min`;
    navigator.clipboard.writeText(stats);
    toast.success('Statistics copied to clipboard');
  };

  return (
    <ToolLayout
      title="Word & Character Counter"
      description="Count words, characters, sentences, and calculate reading time"
    >
      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Enter or paste your text
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your text here..."
            className="h-64 w-full rounded-lg border border-slate-700 bg-slate-800 p-4 text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <div className="text-2xl font-bold text-indigo-400">{words}</div>
            <div className="text-sm text-slate-400">Words</div>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <div className="text-2xl font-bold text-indigo-400">{characters}</div>
            <div className="text-sm text-slate-400">Characters</div>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <div className="text-2xl font-bold text-indigo-400">{charactersNoSpaces}</div>
            <div className="text-sm text-slate-400">Characters (no spaces)</div>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <div className="text-2xl font-bold text-indigo-400">{sentences}</div>
            <div className="text-sm text-slate-400">Sentences</div>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <div className="text-2xl font-bold text-indigo-400">{paragraphs}</div>
            <div className="text-sm text-slate-400">Paragraphs</div>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <div className="text-2xl font-bold text-purple-400">{readingTime} min</div>
            <div className="text-sm text-slate-400">Reading time</div>
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <div className="text-2xl font-bold text-purple-400">{speakingTime} min</div>
            <div className="text-sm text-slate-400">Speaking time</div>
          </div>
        </div>

        <ActionButtonGroup>
          <ActionButton onClick={copyStats} icon={<Copy className="h-4 w-4" />}>
            Copy Statistics
          </ActionButton>
          <ActionButton onClick={() => setText('')} variant="secondary">
            Clear
          </ActionButton>
        </ActionButtonGroup>
      </div>
    </ToolLayout>
  );
}
