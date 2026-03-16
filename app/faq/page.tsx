import type { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';

export const metadata: Metadata = {
  title: 'FAQ - GDrive Your Music',
  description:
    'Frequently asked questions about uploading music to Google Drive, getting shareable links, and managing your music library.',
  other: {
    'article:modified_time': '2026-02-21T15:05:00Z',
  },
};

const faqs = [
  {
    q: 'What is GDrive Your Music?',
    a: [
      'GDrive Your Music is a web application that allows you to upload your local music collection to Google Drive and get shareable direct download links for all your audio files.',
      "It's perfect for accessing your music library from anywhere, sharing songs with friends, or using music links in games and media players.",
    ],
  },
  {
    q: 'How do I upload music to Google Drive?',
    ol: [
      'Click "Connect to Google Drive" and authorize the application',
      'Select either a playlist folder or individual audio files',
      'Review your selection in the summary',
      'Click "Upload to Google Drive"',
      'Wait for upload to complete and get your shareable links',
    ],
  },
  {
    q: 'What audio formats are supported?',
    a: ['GDrive Your Music supports 9 popular audio formats:'],
    ul: ['MP3 (.mp3)', 'FLAC (.flac)', 'WAV (.wav)', 'M4A (.m4a)', 'WebM (.webm)', 'OGG (.ogg)', 'AAC (.aac)', 'WMA (.wma)', 'Opus (.opus)'],
  },
  {
    q: 'How do playlists and folders work?',
    a: [
      'When you select a playlist folder, GDrive Your Music automatically organizes your music by preserving the folder structure.',
      'Each folder becomes a playlist, and you can have unlimited nested subfolders. The app will create the same folder structure in your Google Drive.',
      'You can also export all your playlists as an XML file for backup or importing into other applications.',
    ],
  },
  {
    q: 'How do I get shareable direct download links?',
    a: ['After uploading, each song will have a "Copy Link" button. This copies a direct download link that you can:'],
    ul: [
      'Share with friends',
      'Use in rhythm games (osu!, Clone Hero, etc.)',
      'Import into media players that support URL streaming',
      'Use in download managers',
      'Embed in websites or applications',
    ],
  },
  {
    q: 'Is my music private and secure?',
    a: [
      'Yes. Your music files are stored in YOUR Google Drive account. You maintain full control and ownership of all files.',
      'Files are shared with "anyone with link" permissions, meaning only people with the direct link can access them. The links are not publicly listed or searchable.',
      'We do not collect, store, or track any of your music files or personal data.',
    ],
  },
  {
    q: 'What is the maximum file size I can upload?',
    a: [
      'The current maximum file size is 50MB per file. This is sufficient for most high-quality music files.',
      'For reference: A 5-minute song in 320kbps MP3 format is approximately 12MB, and in FLAC format is approximately 30–40MB.',
    ],
  },
  {
    q: 'Can I upload multiple folders at once?',
    a: [
      'Yes! You can select multiple folders and individual files in a single session. The app will maintain the selection until you either upload or clear it.',
      'Each folder you add will be shown in the selection summary with song counts, and you can remove individual folders or files before uploading.',
    ],
  },
  {
    q: 'How do I export my playlists as XML?',
    a: [
      'Once you have music in your library, click the "Export" button in your Music Library section and choose Export XML.',
      'This creates an XML file containing all your playlists with direct download links. Compatible with many music applications and useful for:',
    ],
    ul: [
      'Backing up your playlist structure',
      'Importing into rhythm games',
      'Sharing complete playlists with others',
      'Migrating to other music management tools',
    ],
  },
  {
    q: 'What should I do if an upload fails?',
    a: ['If an upload fails, check these common issues:'],
    ul: [
      'Verify the file is in a supported audio format',
      'Ensure the file size is under 50MB',
      'Check your internet connection',
      'Make sure you are still authenticated (try refreshing the page)',
      'Verify Google Drive API is enabled in your Google Cloud Console',
    ],
    footer: 'Failed files will show an error message. You can retry uploading them individually after fixing the issue.',
  },
  {
    q: 'Do I need a Google account to use this?',
    a: [
      'Yes, you need a Google account with Google Drive access. The application uses OAuth 2.0 to securely connect to your Google Drive.',
      "Your files are stored in your own Google Drive account, so you'll also need sufficient storage space available.",
    ],
  },
  {
    q: 'Is GDrive Your Music free to use?',
    a: [
      'Yes! GDrive Your Music is completely free and open source (MIT License).',
      "However, you're using your own Google Drive storage, which may have limits depending on your Google account type (15GB free, or more with Google One).",
    ],
  },
  {
    q: 'Which browsers are supported?',
    a: ['GDrive Your Music works best with modern browsers:'],
    ul: [
      'Google Chrome (recommended)',
      'Microsoft Edge',
      'Firefox (limited folder selection support)',
      'Safari (limited folder selection support)',
    ],
    footer: 'Chrome and Edge offer the best experience with full folder selection capabilities.',
  },
];

export default function FAQ() {
  return (
    <PageLayout>
      <h1 className="text-4xl font-bold text-white mb-10">Frequently Asked Questions</h1>

      <div className="space-y-4">
        {faqs.map((item) => (
          <section key={item.q} className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-3">{item.q}</h2>
            {item.a?.map((p, i) => (
              <p key={i} className="text-gray-400 text-sm leading-relaxed mb-2">
                {p}
              </p>
            ))}
            {item.ol && (
              <ol className="list-decimal list-inside text-gray-400 text-sm space-y-1 mb-2">
                {item.ol.map((li) => <li key={li}>{li}</li>)}
              </ol>
            )}
            {item.ul && (
              <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 mb-2">
                {item.ul.map((li) => <li key={li}>{li}</li>)}
              </ul>
            )}
            {item.footer && (
              <p className="text-gray-400 text-sm leading-relaxed mt-2">{item.footer}</p>
            )}
          </section>
        ))}
      </div>
    </PageLayout>
  );
}