import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions - Tools For Dev',
  description:
    'Read our terms and conditions to understand the rules and guidelines for using Tools For Dev.',
};

export default function TermsPage() {
  return (
    <div className="container px-4 py-16">
      <header className="mb-12 text-center">
        <h1 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
          Terms & Conditions
        </h1>
        <p className="text-lg text-muted-foreground">Last updated: February 5, 2024</p>
      </header>

      <div className="prose prose-lg mx-auto dark:prose-invert">
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground">
            By accessing and using Tools For Dev, you accept and agree to be bound by the terms and
            provision of this agreement.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">2. Use License</h2>
          <p className="mb-4 text-muted-foreground">
            Permission is granted to temporarily use our tools for personal, non-commercial
            transitory viewing only. This is the grant of a license, not a transfer of title, and
            under this license you may not:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Attempt to decompile or reverse engineer any software contained on the site</li>
            <li>Remove any copyright or other proprietary notations</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">3. Disclaimer</h2>
          <p className="mb-4 text-muted-foreground">
            The materials on Tools For Dev are provided on an 'as is' basis. We make no warranties,
            expressed or implied, and hereby disclaim and negate all other warranties including,
            without limitation:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Implied warranties or merchantability</li>
            <li>Fitness for a particular purpose</li>
            <li>Non-infringement of intellectual property</li>
            <li>Accuracy, reliability, and availability of the tools</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">4. Limitations</h2>
          <p className="text-muted-foreground">
            In no event shall Tools For Dev or its suppliers be liable for any damages (including,
            without limitation, damages for loss of data or profit, or due to business interruption)
            arising out of the use or inability to use our tools.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">5. Accuracy of Materials</h2>
          <p className="text-muted-foreground">
            The materials appearing on our website could include technical, typographical, or
            photographic errors. We do not warrant that any of the materials are accurate, complete,
            or current.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">6. Links</h2>
          <p className="text-muted-foreground">
            We have not reviewed all of the sites linked to our website and are not responsible for
            the contents of any such linked site. The inclusion of any link does not imply
            endorsement by us of the site.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">7. Modifications</h2>
          <p className="text-muted-foreground">
            We may revise these terms of service at any time without notice. By using this website,
            you are agreeing to be bound by the current version of these terms of service.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">8. Governing Law</h2>
          <p className="text-muted-foreground">
            These terms and conditions are governed by and construed in accordance with the laws and
            you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about these Terms & Conditions, please contact us through our
            contact page.
          </p>
        </section>
      </div>
    </div>
  );
}
