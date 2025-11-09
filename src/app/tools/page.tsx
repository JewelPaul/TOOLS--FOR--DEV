import Link from 'next/link';
import { Search, Zap } from 'lucide-react';
import { tools, toolCategories } from '@/lib/data/tools';

export default function ToolsPage() {
  const groupedTools = toolCategories.map((category) => ({
    ...category,
    tools: tools.filter((tool) => tool.category === category.id),
  }));

  return (
    <div className="container px-4 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          All{' '}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Developer Tools
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
          Browse our complete collection of 60+ professional tools
        </p>
      </div>

      {/* Search Bar */}
      <div className="mx-auto mb-12 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search tools by name, category, or tag..."
            className="w-full rounded-lg border bg-background px-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-12 flex flex-wrap justify-center gap-2">
        <button className="rounded-full border bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          All Tools
        </button>
        {toolCategories.map((category) => (
          <button
            key={category.id}
            className="rounded-full border bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Tools by Category */}
      <div className="space-y-16">
        {groupedTools.map((category) => (
          <section key={category.id}>
            <div className="mb-6">
              <h2 className="mb-2 text-2xl font-bold">{category.name}</h2>
              <p className="text-muted-foreground">{category.description}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.tools.map((tool) => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.slug}`}
                  className="group relative overflow-hidden rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="mb-2 font-semibold group-hover:text-primary">
                        {tool.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                    </div>
                    {tool.premium && (
                      <span className="ml-2 flex-shrink-0">
                        <Zap className="h-4 w-4 text-yellow-500" />
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {tool.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-20 rounded-lg border bg-gradient-to-r from-blue-50 to-purple-50 p-8 text-center dark:from-blue-950/30 dark:to-purple-950/30">
        <h2 className="mb-4 text-2xl font-bold">Need More Power?</h2>
        <p className="mb-6 text-muted-foreground">
          Upgrade to Pro for unlimited access, no watermarks, and priority support
        </p>
        <Link
          href="/pricing"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
        >
          View Pricing
        </Link>
      </div>
    </div>
  );
}
