import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ - GDrive Your Music",
  description: "Frequently asked questions about uploading music to Google Drive, getting shareable links, and managing your music library.",
  other: {
    'article:modified_time': '2026-02-21T15:05:00Z',
  },
};

export default function FAQ() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
            ← Back to Home
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-white mb-8">Frequently Asked Questions</h1>

        <div className="space-y-6">
          {/* What is GDrive Your Music? */}
          <section className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-3">What is GDrive Your Music?</h2>
            <p className="text-gray-300 mb-3">
              GDrive Your Music is a web application that allows you to upload your local music collection to Google Drive and get shareable direct download links for all your audio files.
            </p>
            <p className="text-gray-300">
              It&apos;s perfect for accessing your music library from anywhere, sharing songs with friends, or using music links in games and media players.
            </p>
          </section>

          {/* How do I upload music? */}
          <section className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-3">How do I upload music to Google Drive?</h2>
            <ol className="list-decimal list-inside text-gray-300 space-y-2">
              <li>Click "Connect to Google Drive" and authorize the application</li>
              <li>Select either a playlist folder or individual audio files</li>
              <li>Review your selection in the summary</li>
              <li>Click "Upload to Google Drive"</li>
              <li>Wait for upload to complete and get your shareable links</li>
            </ol>
          </section>

          {/* What audio formats are supported? */}
          <section className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-3">What audio formats are supported?</h2>
            <p className="text-gray-300 mb-3">
              GDrive Your Music supports 9 popular audio formats:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>MP3 (.mp3)</li>
              <li>FLAC (.flac)</li>
              <li>WAV (.wav)</li>
              <li>M4A (.m4a)</li>
              <li>WebM (.webm)</li>
              <li>OGG (.ogg)</li>
              <li>AAC (.aac)</li>
              <li>WMA (.wma)</li>
              <li>Opus (.opus)</li>
            </ul>
          </section>

          {/* How do playlists work? */}
          <section className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-3">How do playlists and folders work?</h2>
            <p className="text-gray-300 mb-3">
              When you select a playlist folder, GDrive Your Music automatically organizes your music by preserving the folder structure.
            </p>
            <p className="text-gray-300 mb-3">
              Each folder becomes a playlist, and you can have unlimited nested subfolders. The app will create the same folder structure in your Google Drive.
            </p>
            <p className="text-gray-300">
              You can also export all your playlists as an XML file for backup or importing into other applications.
            </p>
          </section>

          {/* How do I get shareable links? */}
          <section className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-3">How do I get shareable direct download links?</h2>
            <p className="text-gray-300 mb-3">
              After uploading, each song will have a "Copy Link" button. This copies a direct download link that you can:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Share with friends</li>
              <li>Use in rhythm games (osu!, Clone Hero, etc.)</li>
              <li>Import into media players that support URL streaming</li>
              <li>Use in download managers</li>
              <li>Embed in websites or applications</li>
            </ul>
          </section>

          {/* Is my music private? */}
          <section className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-3">Is my music private and secure?</h2>
            <p className="text-gray-300 mb-3">
              Yes. Your music files are stored in YOUR Google Drive account. You maintain full control and ownership of all files.
            </p>
            <p className="text-gray-300 mb-3">
              Files are shared with "anyone with link" permissions, meaning only people with the direct link can access them. The links are not publicly listed or searchable.
            </p>
            <p className="text-gray-300">
              We do not collect, store, or track any of your music files or personal data.
            </p>
          </section>

          {/* What's the file size limit? */}
          <section className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-3">What's the maximum file size I can upload?</h2>
            <p className="text-gray-300 mb-3">
              The current maximum file size is 50MB per file. This is sufficient for most high-quality music files.
            </p>
            <p className="text-gray-300">
              For reference: A 5-minute song in 320kbps MP3 format is approximately 12MB, and in FLAC format is approximately 30-40MB.
            </p>
          </section>

          {/* Can I upload multiple folders? */}
          <section className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-3">Can I upload multiple folders at once?</h2>
            <p className="text-gray-300 mb-3">
              Yes! You can select multiple folders and individual files in a single session. The app will maintain the selection until you either upload or clear it.
            </p>
            <p className="text-gray-300">
              Each folder you add will be shown in the selection summary with song counts, and you can remove individual folders or files before uploading.
            </p>
          </section>

          {/* How do I export playlists? */}
          <section className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-3">How do I export my playlists as XML?</h2>
            <p className="text-gray-300 mb-3">
              Once you have music in your library, click the "Export XML" button in your Music Library section.
            </p>
            <p className="text-gray-300 mb-3">
              This creates an XML file containing all your playlists with direct download links. This format is compatible with many music applications and can be used for:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Backing up your playlist structure</li>
              <li>Importing into rhythm games</li>
              <li>Sharing complete playlists with others</li>
              <li>Migrating to other music management tools</li>
            </ul>
          </section>

          {/* What if upload fails? */}
          <section className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-3">What should I do if an upload fails?</h2>
            <p className="text-gray-300 mb-3">
              If an upload fails, check these common issues:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Verify the file is in a supported audio format</li>
              <li>Ensure the file size is under 50MB</li>
              <li>Check your internet connection</li>
              <li>Make sure you&apos;re still authenticated (try refreshing the page)</li>
              <li>Verify Google Drive API is enabled in your Google Cloud Console</li>
            </ul>
            <p className="text-gray-300 mt-3">
              Failed files will show an error message. You can retry uploading them individually after fixing the issue.
            </p>
          </section>

          {/* Do I need a Google account? */}
          <section className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-3">Do I need a Google account to use this?</h2>
            <p className="text-gray-300 mb-3">
              Yes, you need a Google account with Google Drive access. The application uses OAuth 2.0 to securely connect to your Google Drive.
            </p>
            <p className="text-gray-300">
              Your files are stored in your own Google Drive account, so you&apos;ll also need sufficient storage space available in your Drive.
            </p>
          </section>

          {/* Is this free? */}
          <section className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-3">Is GDrive Your Music free to use?</h2>
            <p className="text-gray-300 mb-3">
              Yes! GDrive Your Music is completely free and open source (MIT License).
            </p>
            <p className="text-gray-300">
              However, you&apos;re using your own Google Drive storage, which may have limits depending on your Google account type (15GB free, or more with Google One subscription).
            </p>
          </section>

          {/* Browser compatibility */}
          <section className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-3">Which browsers are supported?</h2>
            <p className="text-gray-300 mb-3">
              GDrive Your Music works best with modern browsers:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Google Chrome (recommended)</li>
              <li>Microsoft Edge</li>
              <li>Firefox (limited folder selection support)</li>
              <li>Safari (limited folder selection support)</li>
            </ul>
            <p className="text-gray-300 mt-3">
              Chrome and Edge offer the best experience with full folder selection capabilities.
            </p>
          </section>
        </div>

        {/* Footer navigation */}
        <footer className="mt-12 pt-8 border-t border-gray-700">
          <div className="text-center text-sm text-gray-400">
            <div className="flex justify-center items-center gap-6 mb-4">
              <Link href="/" className="hover:text-blue-400 transition-colors">
                Home
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