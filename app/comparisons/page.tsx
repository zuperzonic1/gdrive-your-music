import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Compare GDrive Your Music - Alternatives & Pricing",
  description: "Compare GDrive Your Music with alternatives like Dropbox, OneDrive, and paid services. Free, open-source, with direct Google Drive integration.",
  other: {
    'article:modified_time': '2026-02-21T15:06:00Z',
  },
};

export default function Comparisons() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
            ← Back to Home
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-white mb-4">Compare Music Upload Solutions</h1>
        <p className="text-gray-300 mb-8">How GDrive Your Music stacks up against alternatives</p>

        {/* Pricing Comparison Table */}
        <section className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Pricing Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="p-3 text-gray-200 font-semibold">Solution</th>
                  <th className="p-3 text-gray-200 font-semibold">Price</th>
                  <th className="p-3 text-gray-200 font-semibold">Storage</th>
                  <th className="p-3 text-gray-200 font-semibold">Setup Time</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700 bg-blue-900/20">
                  <td className="p-3 text-white font-semibold">GDrive Your Music</td>
                  <td className="p-3 text-green-400">Free</td>
                  <td className="p-3 text-gray-300">15GB+ (your Google Drive)</td>
                  <td className="p-3 text-gray-300">&lt;5 minutes</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-3 text-gray-300">Dropbox</td>
                  <td className="p-3 text-gray-300">$11.99/month</td>
                  <td className="p-3 text-gray-300">2TB</td>
                  <td className="p-3 text-gray-300">Manual upload</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-3 text-gray-300">OneDrive</td>
                  <td className="p-3 text-gray-300">$6.99/month</td>
                  <td className="p-3 text-gray-300">1TB (with Office 365)</td>
                  <td className="p-3 text-gray-300">Manual upload</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-3 text-gray-300">SoundCloud Pro</td>
                  <td className="p-3 text-gray-300">$8/month</td>
                  <td className="p-3 text-gray-300">Unlimited uploads</td>
                  <td className="p-3 text-gray-300">N/A (streaming only)</td>
                </tr>
                <tr>
                  <td className="p-3 text-gray-300">Manual Google Drive</td>
                  <td className="p-3 text-green-400">Free</td>
                  <td className="p-3 text-gray-300">15GB</td>
                  <td className="p-3 text-gray-300">Hours (manual work)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="p-3 text-gray-200 font-semibold">Feature</th>
                  <th className="p-3 text-gray-200 font-semibold text-center">GDrive Your Music</th>
                  <th className="p-3 text-gray-200 font-semibold text-center">Dropbox</th>
                  <th className="p-3 text-gray-200 font-semibold text-center">Manual Upload</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="p-3 text-gray-300">Bulk folder upload</td>
                  <td className="p-3 text-center text-green-400">✓</td>
                  <td className="p-3 text-center text-green-400">✓</td>
                  <td className="p-3 text-center text-yellow-400">Partial</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-3 text-gray-300">Direct download links</td>
                  <td className="p-3 text-center text-green-400">✓</td>
                  <td className="p-3 text-center text-green-400">✓</td>
                  <td className="p-3 text-center text-yellow-400">Manual</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-3 text-gray-300">Playlist organization</td>
                  <td className="p-3 text-center text-green-400">✓</td>
                  <td className="p-3 text-center text-red-400">✗</td>
                  <td className="p-3 text-center text-yellow-400">Manual</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-3 text-gray-300">XML export</td>
                  <td className="p-3 text-center text-green-400">✓</td>
                  <td className="p-3 text-center text-red-400">✗</td>
                  <td className="p-3 text-center text-red-400">✗</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-3 text-gray-300">Open source</td>
                  <td className="p-3 text-center text-green-400">✓</td>
                  <td className="p-3 text-center text-red-400">✗</td>
                  <td className="p-3 text-center text-gray-400">N/A</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-3 text-gray-300">Self-hosted option</td>
                  <td className="p-3 text-center text-green-400">✓</td>
                  <td className="p-3 text-center text-red-400">✗</td>
                  <td className="p-3 text-center text-gray-400">N/A</td>
                </tr>
                <tr>
                  <td className="p-3 text-gray-300">Format support (9+)</td>
                  <td className="p-3 text-center text-green-400">✓</td>
                  <td className="p-3 text-center text-green-400">✓</td>
                  <td className="p-3 text-center text-green-400">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Specific Use Case Comparisons */}
        <section className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Use Case: Game Modding (osu!, Clone Hero)</h2>
          <div className="space-y-4">
            <div className="bg-gray-900/50 rounded-lg p-4 border-l-4 border-green-500">
              <h3 className="text-lg font-semibold text-white mb-2">✓ GDrive Your Music</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                <li>Direct download URLs work in rhythm games</li>
                <li>Bulk upload entire beatmap libraries</li>
                <li>Export playlists as XML for game import</li>
                <li>Free with no bandwidth limits</li>
              </ul>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4 border-l-4 border-yellow-500">
              <h3 className="text-lg font-semibold text-white mb-2">⚠ Dropbox</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                <li>Shared links work but require Dropbox accounts for some features</li>
                <li>$11.99/month cost</li>
                <li>No native playlist export</li>
                <li>Bandwidth limits on free tier</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Use Case: Music Sharing with Friends</h2>
          <div className="space-y-4">
            <div className="bg-gray-900/50 rounded-lg p-4 border-l-4 border-green-500">
              <h3 className="text-lg font-semibold text-white mb-2">✓ GDrive Your Music</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                <li>One-click copy shareable links</li>
                <li>Friends can download without Google account</li>
                <li>No file size limits for storage</li>
                <li>Organize by playlists automatically</li>
              </ul>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4 border-l-4 border-yellow-500">
              <h3 className="text-lg font-semibold text-white mb-2">⚠ WeTransfer</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                <li>Links expire after 7 days</li>
                <li>2GB limit on free tier</li>
                <li>No organization features</li>
                <li>$12/month for Pro features</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Long-tail specific questions */}
        <section className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Specific Questions Answered</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">
                Can GDrive Your Music bulk upload FLAC files to Google Drive for free?
              </h3>
              <p className="text-gray-300">
                Yes! GDrive Your Music supports bulk FLAC upload completely free. You can upload entire folders of FLAC files (up to 50MB per file) and they&apos;ll be stored in your Google Drive account. Unlike paid services, there&apos;s no monthly fee - you only use your existing free Google Drive storage (15GB free, expandable with Google One).
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">
                Does GDrive Your Music preserve folder structure when uploading music playlists?
              </h3>
              <p className="text-gray-300">
                Yes! When you upload a folder, GDrive Your Music automatically preserves your complete folder structure including nested subfolders. Each folder becomes a playlist, making it perfect for organizing music by genre, artist, or album. This works better than Dropbox or OneDrive which require manual organization.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">
                Can I use GDrive Your Music to get direct download links for osu! beatmaps?
              </h3>
              <p className="text-gray-300">
                Absolutely! GDrive Your Music generates direct download URLs that work perfectly with osu!, Clone Hero, and other rhythm games. Upload your audio files, copy the direct links, and use them in your beatmaps. The links are permanent and don&apos;t expire, unlike WeTransfer or temporary file hosts.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">
                How does GDrive Your Music compare to manually uploading to Google Drive?
              </h3>
              <p className="text-gray-300">
                GDrive Your Music saves hours of work. Manual Google Drive upload requires: 1) uploading each file individually or in small batches, 2) manually creating folder structure, 3) manually generating shareable links for each file, and 4) copying and organizing all links. GDrive Your Music automates ALL of this in under 5 minutes with bulk folder selection and automatic link generation.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">
                Is GDrive Your Music better than SoundCloud for storing music backups?
              </h3>
              <p className="text-gray-300">
                For backups, yes! SoundCloud Pro ($8/month) is designed for streaming and sharing publicly, not private backups. GDrive Your Music stores files in YOUR Google Drive with private shareable links, maintains original file quality (FLAC, WAV), preserves metadata, and costs $0/month. SoundCloud compresses audio and is better for public distribution, not personal backup storage.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">Why Choose GDrive Your Music?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-400 mb-2">💰 Cost Savings</h3>
              <p className="text-gray-300 text-sm">
                Save $72-$144/year compared to Dropbox or OneDrive subscriptions. Use your existing free Google Drive storage instead.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">⚡ Time Savings</h3>
              <p className="text-gray-300 text-sm">
                Upload 1000+ songs in minutes instead of hours. Automatic folder structure and link generation.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-purple-400 mb-2">🎮 Gaming Integration</h3>
              <p className="text-gray-300 text-sm">
                Direct download URLs work perfectly with rhythm games (osu!, Clone Hero) and media players.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">🔓 Open Source</h3>
              <p className="text-gray-300 text-sm">
                Free forever, self-hostable, fully transparent code. No vendor lock-in or surprise pricing changes.
              </p>
            </div>
          </div>
        </section>

        {/* Last Updated Notice */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Last updated: February 21, 2026</p>
          <p className="mt-2">Pricing and features verified as of February 2026</p>
        </div>

        {/* Footer navigation */}
        <footer className="mt-12 pt-8 border-t border-gray-700">
          <div className="text-center text-sm text-gray-400">
            <div className="flex justify-center items-center gap-6 mb-4">
              <Link href="/" className="hover:text-blue-400 transition-colors">
                Home
              </Link>
              <span>•</span>
              <Link href="/faq" className="hover:text-blue-400 transition-colors">
                FAQ
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <span>•</span>
              <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}