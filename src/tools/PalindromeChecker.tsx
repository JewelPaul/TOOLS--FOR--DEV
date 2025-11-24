import { useState } from 'react';
import { ToolLayout } from '../layouts/ToolLayout';
import { CheckCircle, X } from 'lucide-react';

export function PalindromeChecker() {
  const [text, setText] = useState('');

  const isPalindrome = (str: string): boolean => {
    const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return clean === clean.split('').reverse().join('');
  };

  const result = text.trim() ? isPalindrome(text) : null;

  return (
    <ToolLayout
      title="Palindrome Checker"
      description="Check if text is a palindrome"
      breadcrumbs={[{ label: 'Text Extras', href: '/category/text-extra' }]}
    >
      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="racecar"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {result !== null && (
          <div className={`rounded-lg border p-6 text-center ${result ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'}`}>
            {result ? (
              <>
                <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-400" />
                <div className="text-2xl font-bold text-green-400">It's a Palindrome!</div>
              </>
            ) : (
              <>
                <X className="mx-auto mb-4 h-16 w-16 text-red-400" />
                <div className="text-2xl font-bold text-red-400">Not a Palindrome</div>
              </>
            )}
          </div>
        )}

        <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
          <h4 className="mb-2 text-sm font-semibold text-slate-300">Examples of Palindromes</h4>
          <div className="space-y-1 text-sm text-slate-400">
            <div>• racecar</div>
            <div>• A man a plan a canal Panama</div>
            <div>• Was it a car or a cat I saw?</div>
            <div>• 12321</div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
