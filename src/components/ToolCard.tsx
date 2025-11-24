import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { type Tool } from '../utils/tools';
import { cn } from '../utils/cn';

interface ToolCardProps {
  tool: Tool;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export function ToolCard({ tool, isFavorite = false, onToggleFavorite }: ToolCardProps) {
  const Icon = tool.icon;

  return (
    <Link
      to={tool.path}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-slate-800 bg-slate-900 p-6 transition-all hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500/10 transition-colors group-hover:bg-indigo-500/20">
          <Icon className="h-6 w-6 text-indigo-400" />
        </div>
        
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite?.();
          }}
          className={cn(
            'rounded-full p-1.5 transition-colors hover:bg-slate-800',
            isFavorite ? 'text-yellow-400' : 'text-slate-600'
          )}
        >
          <Star className={cn('h-4 w-4', isFavorite && 'fill-current')} />
        </button>
      </div>

      <h3 className="mb-2 text-lg font-semibold text-slate-100 group-hover:text-indigo-400">
        {tool.name}
      </h3>
      
      <p className="text-sm text-slate-400">{tool.description}</p>

      <div className="mt-4 flex items-center text-sm font-medium text-indigo-400 opacity-0 transition-opacity group-hover:opacity-100">
        Open Tool
        <svg
          className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
