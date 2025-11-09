import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Tools For Dev',
  description: 'Learn more about Tools For Dev and our mission to provide free, high-quality developer tools.',
};

export default function AboutPage() {
  return (
    <div className="container px-4 py-16">
      <header className="mb-12 text-center">
        <h1 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
          About Us
        </h1>
        <p className="text-lg text-muted-foreground">
          Learn about our mission and commitment to developers
        </p>
      </header>

      <div className="prose prose-lg mx-auto dark:prose-invert">
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Our Mission</h2>
          <p className="text-muted-foreground">
            At Tools For Dev, we're dedicated to providing developers and designers with
            high-quality, free tools that make their daily work easier and more efficient. Our
            platform is built by developers who understand the needs of the community.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">What We Offer</h2>
          <p className="mb-4 text-muted-foreground">
            We provide a comprehensive suite of development and design tools, all accessible
            through a clean, modern interface. Our tools are:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Free to use</li>
            <li>No registration required</li>
            <li>Regularly updated</li>
            <li>Built with modern web standards</li>
            <li>Optimized for performance</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Our Values</h2>
          <p className="mb-4 text-muted-foreground">We believe in:</p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Open and accessible tools for everyone</li>
            <li>Privacy-first approach - no data collection</li>
            <li>Clean, intuitive user interfaces</li>
            <li>Continuous improvement based on user feedback</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
