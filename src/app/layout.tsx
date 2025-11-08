import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tools For Dev - Free Online Developer Tools",
  description: "Access a comprehensive collection of free online tools for developers, designers, and content creators. Text tools, color tools, image tools, and more.",
  keywords: ["developer tools", "online tools", "web tools", "code tools", "design tools"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
