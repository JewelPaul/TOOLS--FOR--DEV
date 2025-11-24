import { tools, categories } from '../utils/tools';
import { ToolCard } from '../components/ToolCard';

export function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-slate-100 sm:text-5xl">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            OmniTools Pro
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-400">
          Access 50 professional tools for image processing, PDF manipulation, text utilities, and more.
          All running entirely in your browser.
        </p>
      </div>

      {/* Categories with Tools */}
      {categories.map((category) => {
        const categoryTools = tools.filter((tool) => tool.category === category.id);
        
        if (categoryTools.length === 0) return null;

        return (
          <div key={category.id}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-100">{category.name}</h2>
              <p className="text-slate-400">{category.description}</p>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categoryTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
