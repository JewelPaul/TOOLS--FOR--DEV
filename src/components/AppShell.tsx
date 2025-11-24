import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Settings, Home, Star } from 'lucide-react';
import { cn } from '../utils/cn';
import { categories, searchTools } from '../utils/tools';

export function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const searchResults = searchQuery.trim() ? searchTools(searchQuery) : [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(e.target.value.trim().length > 0);
  };

  const handleToolSelect = (path: string) => {
    navigate(path);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-800 bg-slate-900 transition-all duration-300 lg:static',
          sidebarOpen ? 'w-64' : 'w-0 lg:w-16'
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-4">
          {sidebarOpen && (
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600" />
              <span className="text-lg font-bold">OmniTools Pro</span>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-lg p-2 hover:bg-slate-800 lg:hidden"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {sidebarOpen && (
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              <Link
                to="/"
                className={cn(
                  'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  location.pathname === '/'
                    ? 'bg-indigo-500/20 text-indigo-400'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                )}
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>
              
              <div className="pt-4">
                <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Categories
                </h3>
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.id}`}
                    className={cn(
                      'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      location.pathname.includes(`/category/${category.id}`)
                        ? 'bg-indigo-500/20 text-indigo-400'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                    )}
                  >
                    <span>{category.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-2 hover:bg-slate-800 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery.trim() && setShowSearchResults(true)}
                className="w-64 rounded-lg border border-slate-700 bg-slate-800 py-2 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div 
                  className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-lg border border-slate-700 bg-slate-800 shadow-xl"
                  role="listbox"
                  aria-label="Search results"
                >
                  {searchResults.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => handleToolSelect(tool.path)}
                      className="flex w-full items-start gap-3 border-b border-slate-700 px-4 py-3 text-left transition-colors hover:bg-slate-700 last:border-b-0"
                      role="option"
                    >
                      <tool.icon className="h-5 w-5 flex-shrink-0 text-indigo-400" />
                      <div>
                        <div className="font-medium text-slate-100">{tool.name}</div>
                        <div className="text-xs text-slate-400">{tool.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              
              {showSearchResults && searchResults.length === 0 && (
                <div 
                  className="absolute left-0 right-0 top-full z-50 mt-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-center text-sm text-slate-400 shadow-xl"
                  role="status"
                  aria-live="polite"
                >
                  No tools found
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="rounded-lg p-2 hover:bg-slate-800">
              <Star className="h-5 w-5" />
            </button>
            <button className="rounded-lg p-2 hover:bg-slate-800">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-950 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
