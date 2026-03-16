import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';

export const metadata: Metadata = {
  title: 'Compare GDrive Your Music - Alternatives & Pricing',
  description:
    'Compare GDrive Your Music with alternatives like Dropbox, OneDrive, and paid services. Free, open-source, with direct Google Drive integration.',
  other: {
    'article:modified_time': '2026-02-21T15:06:00Z',
  },
};

const comparisonRows = [
  { feature: 'Bulk folder upload', ours: '✓ Automatic', theirs: 'Manual selection', theirsColor: 'text-yellow-400' },
  { feature: 'Preserve folder structure', ours: '✓ Automatic', theirs: 'Create manually', theirsColor: 'text-yellow-400' },
  { feature: 'Generate shareable links', ours: '✓ Automatic', theirs: 'Per-file manual', theirsColor: 'text-yellow-400' },
  { feature: 'Playlist organization', ours: '✓ Automatic', theirs: 'Not available', theirsColor: 'text-red-400' },
  { feature: 'XML export', ours: '✓ One-click', theirs: 'Not available', theirsColor: 'text-red-400' },
  { feature: 'Setup time (1000 songs)', ours: '~5 minutes', theirs: '2–3 hours', theirsColor: 'text-red-400' },
  { feature: 'Price', ours: 'Free', theirs: 'Free', theirsColor: 'text-green-400' },
  { feature: 'Open source', ours: '✓ MIT License', theirs: 'N/A', theirsColor: 'text-gray-400' },
];

const specificQuestions = [
  {
    q: 'Can GDrive Your Music bulk upload FLAC files to Google Drive for free?',
    a: "Yes! GDrive Your Music supports bulk FLAC upload completely free. You can upload entire folders of FLAC files (up to 50MB per file) and they'll be stored in your Google Drive account. Unlike paid services, there's no monthly fee — you only use your existing free Google Drive storage (15GB free, expandable with Google One).",
  },
  {
    q: 'Does GDrive Your Music preserve folder structure when uploading music playlists?',
    a: 'Yes! When you upload a folder, GDrive Your Music automatically preserves your complete folder structure including nested subfolders. Each folder becomes a playlist, making it perfect for organizing music by genre, artist, or album.',
  },
  {
    q: 'Can I use GDrive Your Music to get direct download links for osu! beatmaps?',
    a: "Absolutely! GDrive Your Music generates direct download URLs that work perfectly with osu!, Clone Hero, and other rhythm games. Upload your audio files, copy the direct links, and use them in your beatmaps. The links are permanent and don't expire.",
  },
  {
    q: 'How does GDrive Your Music compare to manually uploading to Google Drive?',
    a: 'GDrive Your Music saves hours of work. Manual Google Drive upload requires uploading files one by one, manually creating folder structure, and manually generating shareable links for each file. GDrive Your Music automates ALL of this in under 5 minutes.',
  },
  {
    q: 'Is GDrive Your Music better than SoundCloud for storing music backups?',
    a: 'For backups, yes! SoundCloud Pro ($8/month) is designed for streaming and sharing publicly, not private backups. GDrive Your Music stores files in YOUR Google Drive, maintains original file quality (FLAC, WAV), and costs $0/month.',
  },
];

const whyUs = [
  { emoji: '💰', color: 'text-green-400', title: 'Cost Savings', body: 'Save $72–$144/year compared to Dropbox or OneDrive. Use your existing free Google Drive storage instead.' },
  { emoji: '⚡', color: 'text-blue-400', title: 'Time Savings', body: 'Upload 1000+ songs in minutes instead of hours. Automatic folder structure and link generation.' },
  { emoji: '🎮', color: 'text-purple-400', title: 'Gaming Integration', body: 'Direct download URLs work perfectly with rhythm games (osu!, Clone Hero) and media players.' },
  { emoji: '🔓', color: 'text-yellow-400', title: 'Open Source', body: 'Free forever, self-hostable, fully transparent code. No vendor lock-in or surprise pricing changes.' },
];

export default function Comparisons() {
  return (
    <PageLayout maxWidth="max-w-6xl">
      <h1 className="text-4xl font-bold text-white mb-3">
        GDrive Your Music vs Manual Google Drive Upload
      </h1>
      <p className="text-gray-400 mb-10">Why automate your music uploads with GDrive Your Music</p>

      {/* Feature Comparison */}
      <section className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-5">Feature Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-3 text-gray-300 font-semibold text-sm">Feature</th>
                <th className="p-3 text-gray-300 font-semibold text-sm text-center">GDrive Your Music</th>
                <th className="p-3 text-gray-300 font-semibold text-sm text-center">Manual Google Drive</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.feature} className="border-b border-white/5">
                  <td className="p-3 text-gray-400 text-sm">{row.feature}</td>
                  <td className="p-3 text-center text-sm text-green-400">{row.ours}</td>
                  <td className={`p-3 text-center text-sm ${row.theirsColor}`}>{row.theirs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Specific Questions */}
      <section className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-5">Specific Questions Answered</h2>
        <div className="space-y-6">
          {specificQuestions.map((item) => (
            <div key={item.q}>
              <h3 className="text-base font-semibold text-blue-400 mb-2">{item.q}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose */}
      <section className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-5">Why Choose GDrive Your Music?</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {whyUs.map((item) => (
            <div key={item.title} className="bg-white/[0.03] rounded-lg p-4 border border-white/5">
              <h3 className={`font-semibold mb-1 text-sm ${item.color}`}>
                {item.emoji} {item.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="text-center text-xs text-gray-600">
        Last updated: February 21, 2026 · Pricing and features verified as of February 2026
      </p>
    </PageLayout>
  );
}