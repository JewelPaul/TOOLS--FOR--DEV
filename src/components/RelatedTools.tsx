import { tools } from '../utils/tools';
import { ToolCard } from './ToolCard';

interface RelatedToolsProps {
  currentToolId: string;
  category: string;
  maxTools?: number;
}

export function RelatedTools({ currentToolId, category, maxTools = 4 }: RelatedToolsProps) {
  // Get related tools from the same category, excluding current tool
  const relatedTools = tools
    .filter(tool => tool.category === category && tool.id !== currentToolId)
    .slice(0, maxTools);

  if (relatedTools.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="border-t border-slate-800 pt-8">
        <h2 className="mb-6 text-xl font-bold text-slate-100">Related Tools</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {relatedTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </div>
  );
}
