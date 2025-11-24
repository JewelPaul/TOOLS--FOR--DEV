import { useState } from 'react';
import { ToolLayout } from '../layouts/ToolLayout';
import { ActionButton } from '../components/ActionButton';
import { Copy, Shuffle } from 'lucide-react';
import { toast } from 'sonner';

const HASHTAG_TEMPLATES: Record<string, string[]> = {
  fitness: ['fitness', 'gym', 'workout', 'health', 'fitfam', 'bodybuilding', 'motivation', 'exercise', 'training', 'fitlife'],
  food: ['food', 'foodie', 'foodporn', 'instafood', 'yummy', 'delicious', 'cooking', 'recipe', 'tasty', 'homemade'],
  travel: ['travel', 'wanderlust', 'explore', 'adventure', 'vacation', 'travelgram', 'instatravel', 'trip', 'tourism', 'travelphotography'],
  fashion: ['fashion', 'style', 'ootd', 'fashionblogger', 'streetstyle', 'fashionista', 'outfit', 'instafashion', 'stylish', 'trendy'],
  tech: ['tech', 'technology', 'coding', 'programming', 'developer', 'software', 'ai', 'innovation', 'digital', 'startup'],
};

export function HashtagGenerator() {
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);

  const generateHashtags = () => {
    const baseHashtags = selectedCategory
      ? HASHTAG_TEMPLATES[selectedCategory] || []
      : [];

    const keywordTags = keyword
      ? [keyword, keyword.replace(/\s+/g, ''), keyword.toLowerCase(), keyword.toUpperCase()]
      : [];

    const allHashtags = [...new Set([...keywordTags, ...baseHashtags])];
    setHashtags(allHashtags.map((tag) => `#${tag.replace(/^#/, '')}`).slice(0, 30));
    toast.success('Hashtags generated!');
  };

  const shuffleHashtags = () => {
    setHashtags([...hashtags].sort(() => Math.random() - 0.5));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hashtags.join(' '));
    toast.success('Hashtags copied to clipboard!');
  };

  return (
    <ToolLayout
      title="Hashtag Generator"
      description="Generate and shuffle popular hashtags for social media"
      breadcrumbs={[{ label: 'Marketing', href: '/category/marketing' }]}
    >
      <div className="space-y-6">
        {/* Input Section */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Keyword</label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter keyword..."
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="">-- Select Category --</option>
              <option value="fitness">Fitness</option>
              <option value="food">Food</option>
              <option value="travel">Travel</option>
              <option value="fashion">Fashion</option>
              <option value="tech">Tech</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2">
          <ActionButton onClick={generateHashtags}>Generate Hashtags</ActionButton>
          {hashtags.length > 0 && (
            <>
              <ActionButton onClick={shuffleHashtags} variant="outline">
                <Shuffle className="mr-2 h-4 w-4" />
                Shuffle
              </ActionButton>
              <ActionButton onClick={handleCopy} variant="outline">
                <Copy className="mr-2 h-4 w-4" />
                Copy All
              </ActionButton>
            </>
          )}
        </div>

        {/* Results */}
        {hashtags.length > 0 && (
          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6">
            <h3 className="mb-4 text-lg font-semibold text-slate-100">
              Generated Hashtags ({hashtags.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {hashtags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-lg bg-indigo-500/20 px-3 py-1 text-sm text-indigo-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
