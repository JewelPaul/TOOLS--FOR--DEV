import Link from 'next/link';
import {
  Code,
  Image,
  FileText,
  Hash,
  Globe,
  Palette,
  Clock,
  Shield,
  ArrowRight,
} from 'lucide-react';

const toolCategories = [
  {
    name: 'Text & String Tools',
    icon: FileText,
    description: '15 tools for text manipulation and formatting',
    href: '/tools/text',
    color: 'text-blue-500',
  },
  {
    name: 'Code & Developer',
    icon: Code,
    description: '10 tools for code formatting and validation',
    href: '/tools/code',
    color: 'text-green-500',
  },
  {
    name: 'Image & Media',
    icon: Image,
    description: '10 tools for image processing and generation',
    href: '/tools/image',
    color: 'text-purple-500',
  },
  {
    name: 'Data & Converters',
    icon: Hash,
    description: '6 tools for data conversion and validation',
    href: '/tools/data',
    color: 'text-yellow-500',
  },
  {
    name: 'SEO & Marketing',
    icon: Globe,
    description: '6 tools for SEO and content optimization',
    href: '/tools/seo',
    color: 'text-orange-500',
  },
  {
    name: 'Security Tools',
    icon: Shield,
    description: '6 tools for security and cryptography',
    href: '/tools/security',
    color: 'text-red-500',
  },
  {
    name: 'Design Tools',
    icon: Palette,
    description: 'Color pickers, gradients, and design utilities',
    href: '/tools/design',
    color: 'text-pink-500',
  },
  {
    name: 'Productivity',
    icon: Clock,
    description: '5 tools to boost your productivity',
    href: '/tools/productivity',
    color: 'text-indigo-500',
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-background to-muted/20 py-20 md:py-32">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
              Your Ultimate{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Developer Toolkit
              </span>
            </h1>
            <p className="mb-8 text-xl text-muted-foreground">
              Access 60+ professional tools for developers, designers, and content creators - all
              in one place, completely free.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/tools"
                className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Explore Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-md border bg-background px-8 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Browse by Category</h2>
            <p className="text-lg text-muted-foreground">
              Find the perfect tool for your needs from our extensive collection
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {toolCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.name}
                  href={category.href}
                  className="group relative overflow-hidden rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="mb-4">
                    <Icon className={`h-8 w-8 ${category.color}`} />
                  </div>
                  <h3 className="mb-2 font-semibold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                  <div className="mt-4 flex items-center text-sm font-medium text-primary">
                    Explore
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-muted/30 py-20">
        <div className="container px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Why Choose Tools For Dev?</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Privacy First</h3>
              <p className="text-sm text-muted-foreground">
                Most tools run entirely in your browser. Your data never leaves your device.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Developer Friendly</h3>
              <p className="text-sm text-muted-foreground">
                Built by developers, for developers. Clean UI, fast performance, keyboard shortcuts.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Always Free</h3>
              <p className="text-sm text-muted-foreground">
                Core tools are free forever. Premium features available for power users.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
