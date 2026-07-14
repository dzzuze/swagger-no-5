import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import Header from '@/components/Header/Header';
import AuthInitializer from '@/components/AuthInitializer';

export const metadata: Metadata = {
  title: 'swagger-no-5',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthInitializer>
            <Header />
            <main className="py-5">{children}</main>
          </AuthInitializer>
        </ThemeProvider>
      </body>
    </html>
  );
}
