const features = [
  {
    icon: '📁',
    title: 'Folder & Playlist Support',
    description:
      'Upload entire music folders at once. Your directory structure is preserved as playlists in Google Drive.',
  },
  {
    icon: '🔗',
    title: 'Direct Download Links',
    description:
      'Every file gets a shareable direct link. Drop them in games, media players, or share with friends.',
  },
  {
    icon: '🔐',
    title: 'Secure OAuth 2.0',
    description:
      'Authenticates via Google OAuth. Tokens are stored in HTTP-only cookies — never exposed to the browser.',
  },
  {
    icon: '📤',
    title: 'Export Playlists',
    description:
      'Export your entire library as XML (game-ready) or CSV. Perfect for Growtopia, media servers, and more.',
  },
  {
    icon: '☁️',
    title: 'Your Drive, Your Data',
    description:
      'Files are uploaded to your own Google Drive account. No third-party storage. No subscriptions.',
  },
  {
    icon: '🎵',
    title: '9+ Audio Formats',
    description:
      'Supports MP3, FLAC, WAV, M4A, OGG, AAC, WMA, Opus, and WebM out of the box.',
  },
];

export default function Features() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Everything you need to self-host your music
        </h2>
        <p className="text-gray-400 text-center mb-12 text-sm">
          Free. Open source. No lock-in.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/[0.07] transition-colors"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-white mb-1 text-sm">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}