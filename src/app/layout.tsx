import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Deepthi Learning Hub",
  description: "Interactive classroom learning for early learners — Malayalam & English",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ml">
      <head>
        {/* Noto Sans Malayalam for proper rendering */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Malayalam:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-bg font-body">{children}</body>
    </html>
  );
}
