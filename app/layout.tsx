import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Project Management',
  description: 'A clean project management app for vibe coders',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-text-primary min-h-screen">
        {children}
      </body>
    </html>
  );
}
