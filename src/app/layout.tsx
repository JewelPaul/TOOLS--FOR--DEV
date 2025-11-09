import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Tools For Dev - Free Online Developer Tools",
  description: "Access a comprehensive collection of free online tools for developers, designers, and content creators. Text tools, color tools, image tools, and more.",
  keywords: ["developer tools", "online tools", "web tools", "code tools", "design tools"],
  authors: [{ name: "Tools For Dev" }],
  openGraph: {
    title: "Tools For Dev - Free Online Developer Tools",
    description: "Access a comprehensive collection of free online tools for developers, designers, and content creators.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
