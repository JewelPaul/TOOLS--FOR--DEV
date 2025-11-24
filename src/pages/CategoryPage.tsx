import { useParams, Navigate } from 'react-router-dom';
import { categories, getToolsByCategory } from '../utils/tools';
import { ToolCard } from '../components/ToolCard';
import { SEO } from '../components/SEO';

export function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  
  const categoryInfo = categories.find(cat => cat.id === category);
  
  if (!categoryInfo) {
    return <Navigate to="/" replace />;
  }

  const categoryTools = getToolsByCategory(category!);

  return (
    <>
      <SEO
        title={categoryInfo.name}
        description={`${categoryInfo.description} - Browse our collection of ${categoryTools.length} professional tools.`}
        keywords={[categoryInfo.name.toLowerCase(), 'online tools', 'free tools']}
      />
      <div className="space-y-8">
      {/* Category Header */}
      <div>
        <h1 className="mb-2 text-3xl font-bold text-slate-100">{categoryInfo.name}</h1>
        <p className="text-lg text-slate-400">{categoryInfo.description}</p>
      </div>

      {/* Tools Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categoryTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>

      {categoryTools.length === 0 && (
        <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
          <div className="mb-4 text-6xl">🔍</div>
          <h3 className="mb-2 text-xl font-semibold text-slate-100">No Tools Found</h3>
          <p className="text-slate-400">
            There are no tools in this category yet. Check back soon!
          </p>
        </div>
      )}
    </div>
    </>
  );
}
