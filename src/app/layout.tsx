import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { Navigation } from '@/shared/ui/Navigation';
import { AuthProvider } from '@/features/auth/contexts/AuthContext';
import { ThemeProvider } from '@/shared/contexts/ThemeContext';
import '@/shared/styles/globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata = {
  title: 'BS - Создавайте красивые страницы',
  description: 'Создавайте и публикуйте красивые страницы без кода',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <Navigation />
            <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
              {children}
            </main>
            <Toaster position="top-right" />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 