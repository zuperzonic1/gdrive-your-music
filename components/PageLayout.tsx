import Link from 'next/link';
import Footer from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  backHref?: string;
  backLabel?: string;
  maxWidth?: 'max-w-4xl' | 'max-w-5xl' | 'max-w-6xl';
}

export default function PageLayout({
  children,
  backHref = '/',
  backLabel = '← Back to Home',
  maxWidth = 'max-w-4xl',
}: PageLayoutProps) {
  return (
    <div className="min-h-screen text-white">
      <div className={`${maxWidth} mx-auto px-6 py-12`}>
        <div className="mb-8">
          <Link
            href={backHref}
            className="text-sm text-gray-500 hover:text-gray-200 transition-colors"
          >
            {backLabel}
          </Link>
        </div>
        {children}
      </div>
      <Footer />
    </div>
  );
}