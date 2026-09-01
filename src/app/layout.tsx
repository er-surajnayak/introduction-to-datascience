import type { Metadata } from 'next';
import './globals.scss';
import { ThemeProvider } from '@/context/ThemeContext';
import { CourseProgressProvider } from '@/context/CourseProgressContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'DI Notes — Introduction to Data Science (DS-201)',
  description:
    'A premium interactive digital notes platform for 2nd-year engineering students studying Introduction to Data Science. Explore Python, NumPy, Pandas, EDA, Time Series, and Linear Regression through visual computational labs.',
  keywords: [
    'Data Science',
    'DI Notes',
    'Python',
    'NumPy',
    'Pandas',
    'Exploratory Data Analysis',
    'Time Series',
    'Linear Regression',
    'Engineering Notes',
    'Interactive Notes',
    'IBM Carbon Design System',
  ],
  authors: [{ name: 'DI Notes Engineering Team' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f1117',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="cds--g100" style={{ colorScheme: 'dark' }}>
      <body>
        <ThemeProvider>
          <CourseProgressProvider>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar />
              <main style={{ flexGrow: 1 }}>{children}</main>
              <Footer />
            </div>
          </CourseProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
