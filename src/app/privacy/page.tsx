import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Tools For Dev',
  description: 'Read our privacy policy to understand how we handle your data at Tools For Dev.',
};

export default function PrivacyPage() {
  return (
    <div className="container px-4 py-16">
      <header className="mb-12 text-center">
        <h1 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
          Privacy Policy
        </h1>
        <p className="text-lg text-muted-foreground">Last updated: February 5, 2024</p>
      </header>

      <div className="prose prose-lg mx-auto dark:prose-invert">
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Introduction</h2>
          <p className="text-muted-foreground">
            At Tools For Dev, we take your privacy seriously. This Privacy Policy explains how we
            collect, use, and protect your information when you use our website and tools.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Information We Don't Collect</h2>
          <p className="mb-4 text-muted-foreground">
            We believe in minimal data collection. Our tools run entirely in your browser, and we:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Do not collect personal information</li>
            <li>Do not use cookies for tracking</li>
            <li>Do not store your tool inputs or outputs</li>
            <li>Do not share any data with third parties</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Information We Do Collect</h2>
          <p className="mb-4 text-muted-foreground">
            We collect only anonymous usage statistics through our hosting provider, including:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Pages visited</li>
            <li>Time spent on site</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">How We Use Information</h2>
          <p className="mb-4 text-muted-foreground">
            The anonymous usage statistics help us:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Improve our tools and services</li>
            <li>Fix bugs and technical issues</li>
            <li>Understand which tools are most useful</li>
            <li>Make decisions about future development</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Security</h2>
          <p className="mb-4 text-muted-foreground">
            We implement security measures to protect your privacy:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>All tools run locally in your browser</li>
            <li>No data is transmitted to our servers</li>
            <li>HTTPS encryption for all connections</li>
            <li>Regular security audits and updates</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Changes to This Policy</h2>
          <p className="text-muted-foreground">
            We may update this Privacy Policy from time to time. We will notify you of any changes
            by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about this Privacy Policy, please contact us through our
            contact page.
          </p>
        </section>
      </div>
    </div>
  );
}
