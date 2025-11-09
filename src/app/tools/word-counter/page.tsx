'use client';

import { useState, useMemo } from 'react';
import { ToolPageLayout, ToolCard, ToolSidebarInfo } from '@/components/tool-layout';

interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTime: number; // in minutes
  speakingTime: number; // in minutes
}

const calculateStats = (text: string): TextStats => {
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim().length > 0).length;
  const lines = text.split(/\n/).filter(Boolean).length;
  const readingTime = Math.ceil(words / 200); // Average reading speed
  const speakingTime = Math.ceil(words / 130); // Average speaking speed

  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs,
    lines,
    readingTime,
    speakingTime,
  };
};

export default function WordCounterPage() {
  const [inputText, setInputText] = useState('');

  const stats = useMemo(() => calculateStats(inputText), [inputText]);

  const statItems = [
    { label: 'Characters', value: stats.characters, color: 'text-blue-500' },
    { label: 'Characters (no spaces)', value: stats.charactersNoSpaces, color: 'text-green-500' },
    { label: 'Words', value: stats.words, color: 'text-purple-500' },
    { label: 'Sentences', value: stats.sentences, color: 'text-orange-500' },
    { label: 'Paragraphs', value: stats.paragraphs, color: 'text-pink-500' },
    { label: 'Lines', value: stats.lines, color: 'text-indigo-500' },
    {
      label: 'Reading Time',
      value: `${stats.readingTime} min`,
      color: 'text-yellow-500',
    },
    {
      label: 'Speaking Time',
      value: `${stats.speakingTime} min`,
      color: 'text-red-500',
    },
  ];

  return (
    <ToolPageLayout
      title="Word & Character Counter"
      description="Count words, characters, sentences, paragraphs with detailed statistics and reading time estimates"
      showActions={false}
      sidebar={
        <ToolSidebarInfo>
          <p className="mb-2">
            This tool provides comprehensive text statistics including character count, word count,
            and estimated reading/speaking time.
          </p>
          <ul className="space-y-1 text-xs">
            <li>• <strong>Reading Time:</strong> Based on 200 words/minute</li>
            <li>• <strong>Speaking Time:</strong> Based on 130 words/minute</li>
            <li>• Updates in real-time as you type</li>
            <li>• Counts sentences based on punctuation (.!?)</li>
            <li>• Paragraphs separated by blank lines</li>
          </ul>
        </ToolSidebarInfo>
      }
    >
      {/* Statistics Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statItems.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border bg-card p-4 shadow-sm"
          >
            <div className="mb-1 text-sm text-muted-foreground">{item.label}</div>
            <div className={`text-3xl font-bold ${item.color}`}>
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <ToolCard title="Enter Your Text">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          className="min-h-[400px] w-full rounded-md border bg-background p-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </ToolCard>

      {/* Additional Info */}
      {inputText && (
        <ToolCard title="Text Analysis">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Average Word Length:</span>
              <span className="font-medium">
                {stats.words > 0
                  ? (stats.charactersNoSpaces / stats.words).toFixed(2)
                  : 0}{' '}
                characters
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Average Sentence Length:</span>
              <span className="font-medium">
                {stats.sentences > 0
                  ? (stats.words / stats.sentences).toFixed(1)
                  : 0}{' '}
                words
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Density:</span>
              <span className="font-medium">
                {stats.characters > 0
                  ? ((stats.words / stats.characters) * 100).toFixed(1)
                  : 0}
                % words
              </span>
            </div>
          </div>
        </ToolCard>
      )}
    </ToolPageLayout>
  );
}
