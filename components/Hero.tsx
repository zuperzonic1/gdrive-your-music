interface HeroProps {
  onConnect: () => void;
}

export default function Hero({ onConnect }: HeroProps) {
  return (
    <section className="px-6 pt-20 pb-8">
      <div className="max-w-5xl mx-auto">
        {/* Top badge */}
        <div className="flex justify-center mb-7">
          <a
            href="https://github.com/zuperzonic1/gdrive-your-music"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-violet-500/25 bg-violet-500/10 hover:bg-violet-500/20 transition-colors rounded-full px-4 py-1.5 text-xs text-violet-300"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Open source on GitHub — star it if you find it useful ⭐
          </a>
        </div>

        {/* Headline */}
        <div className="text-center mb-10">
          <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight tracking-tight mb-5">
            Your Music.{' '}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-400 bg-clip-text text-transparent">
              Your Drive.
            </span>
            <br />
            Anywhere.
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Upload your local music collection to Google Drive, get direct download
            links per track, and export playlists as XML or CSV — free, open source,
            no subscriptions.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
          <button
            onClick={onConnect}
            className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold px-8 py-3 rounded-xl transition-all text-sm shadow-lg shadow-violet-900/50"
          >
            Connect to Google Drive
          </button>
          <a
            href="https://github.com/zuperzonic1/gdrive-your-music"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-white/10 hover:bg-white/10 text-gray-300 font-semibold px-8 py-3 rounded-xl transition-colors text-sm"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>

        {/* YouTube Video */}
        <div className="relative mx-auto max-w-3xl">
          {/* Glow effect */}
          <div className="absolute -inset-2 bg-violet-600/20 rounded-2xl blur-2xl" aria-hidden="true" />
          <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black/50 backdrop-blur-sm aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/udu4jwIoFjc?rel=0&modestbranding=1"
              title="GDrive Your Music — Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}