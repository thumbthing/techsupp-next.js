import GlobalProvider from '../redux/provider/GlobalProvider';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <GlobalProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </GlobalProvider>
  );
}
