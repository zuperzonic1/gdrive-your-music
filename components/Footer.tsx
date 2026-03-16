import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20 py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-gray-500">
        {/* Brand */}
        <p className="text-gray-400 font-medium">
          GDrive Your Music
          <span className="ml-2 text-gray-600">— open source, MIT license</span>
        </p>

        {/* Links */}
        <nav className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2">
          <Link href="/faq" className="hover:text-gray-200 transition-colors">FAQ</Link>
          <Link href="/comparisons" className="hover:text-gray-200 transition-colors">Compare</Link>
          <Link href="/terms" className="hover:text-gray-200 transition-colors">Terms</Link>
          <Link href="/privacy" className="hover:text-gray-200 transition-colors">Privacy</Link>
          <a
            href="https://github.com/zuperzonic1/gdrive-your-music"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200 transition-colors flex items-center gap-1"
          >
            {/* GitHub icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
        </nav>

        <p className="text-gray-600 text-xs">© {new Date().getFullYear()} GDrive Your Music</p>
      </div>
    </footer>
  );
}