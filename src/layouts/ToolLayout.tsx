import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { SEO } from '../components/SEO';

interface ToolLayoutProps {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href: string }[];
  children: ReactNode;
  keywords?: string[];
}

export function ToolLayout({ title, description, breadcrumbs = [], children, keywords = [] }: ToolLayoutProps) {
  return (
    <>
      <SEO
        title={title}
        description={description || `${title} - Free online tool`}
        keywords={[title.toLowerCase(), 'online tool', 'free', ...keywords]}
      />
      <div className="mx-auto max-w-7xl">
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <nav className="mb-4 flex items-center space-x-2 text-sm text-slate-400">
          <Link to="/" className="hover:text-slate-100">
            Home
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center space-x-2">
              <ChevronRight className="h-4 w-4" />
              <Link to={crumb.href} className="hover:text-slate-100">
                {crumb.label}
              </Link>
            </div>
          ))}
          <ChevronRight className="h-4 w-4" />
          <span className="text-slate-100">{title}</span>
        </nav>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-slate-100">{title}</h1>
        {description && <p className="text-slate-400">{description}</p>}
      </div>

      {/* Content */}
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">{children}</div>
    </div>
    </>
  );
}
