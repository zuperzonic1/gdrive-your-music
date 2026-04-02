# GDrive Your Music

A Next.js 16 web application that lets you upload your local music directory to Google Drive and get shareable links for all your music files.


**🌐 Live Demo: [https://music.projectsmith.dev/](https://music.projectsmith.dev/)**

## Features

- 🎵 Select entire music directory from your computer
- ☁️ Upload all audio files to Google Drive
- 🔗 Get shareable Google Drive links for each file
- 📊 Real-time upload progress tracking
- 🎨 Modern, responsive UI with Tailwind CSS v4
- 🔐 Secure Google OAuth 2.0 authentication
- 📋 Export XML playlists compatible with music players

## Supported Audio Formats

- MP3 (.mp3)
- WebM (.webm)
- M4A (.m4a)
- WAV (.wav)
- FLAC (.flac)
- OGG (.ogg)
- AAC (.aac)
- WMA (.wma)
- Opus (.opus)

## Prerequisites

- Node.js 18+ installed
- A Google Cloud Console project with Drive API enabled
- OAuth 2.0 credentials (Client ID and Client Secret)

## Setup Instructions

### 1. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Drive API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Drive API"
   - Click "Enable"
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Web application"
   - Add authorized redirect URI: `http://localhost:3000/api/auth/callback`
   - Save the Client ID and Client Secret

### 2. Project Setup

1. Clone the repository:
```bash
git clone https://github.com/zuperzonic1/gdrive-your-music.git
cd gdrive-your-music
```

2. Install dependencies:
```bash
npm install
```

3. Create your environment file:
```bash
cp .env.local.example .env.local
```

> If `.env.local.example` is not present, create `.env.local` manually (see step 4).

4. Edit `.env.local` and add your credentials:
```env
GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret_here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_min_32_chars
``` 

To generate a secure `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

### 3. Run the Application

Development mode:
```bash
npm run dev
```

Production build:
```bash
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

1. **Authenticate with Google Drive**
   - Click "Connect to Google Drive"
   - Authorize the application
   - You'll be redirected back to the app

2. **Select Your Music Directory**
   - Click "Select Music Directory"
   - Choose the folder containing your music files
   - The app will filter for audio files only

3. **Upload Files**
   - Review the list of files to be uploaded
   - Click "Upload to Google Drive"
   - Monitor the upload progress

4. **Get Your Links**
   - Once complete, you'll see a list of all uploaded files
   - Each file has a shareable Google Drive link
   - Copy individual links or export all links as XML playlist

## Project Structure

```
gdrive-your-music/
├── app/
│   ├── api/
│   │   ├── auth/              # OAuth routes (login, callback, check, logout)
│   │   ├── upload/            # File upload route
│   │   ├── folder/            # Folder listing route
│   │   └── export-xml/        # XML playlist export route
│   ├── comparisons/           # Comparisons page
│   ├── faq/                   # FAQ page
│   ├── terms/                 # Terms of Service page
│   ├── privacy/               # Privacy Policy page
│   ├── layout.tsx
│   └── page.tsx               # Main upload page
├── components/                # Shared React components
├── lib/
│   ├── googleDrive.ts         # Google Drive service layer
│   └── auth.ts                # Authentication helpers
├── public/                    # Static assets & SEO files
├── .env.local                 # Environment variables (never commit this)
└── package.json
```

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/auth` | Generate OAuth URL |
| `GET` | `/api/auth/callback` | Handle OAuth callback |
| `GET` | `/api/auth/check` | Check authentication status |
| `POST` | `/api/auth/logout` | Clear authentication |
| `POST` | `/api/upload` | Upload file to Google Drive |
| `GET` | `/api/folder` | List Drive folder contents |
| `GET` | `/api/export-xml` | Export XML playlist |

## Security Notes

- Tokens are stored in secure HTTP-only cookies — never in `localStorage`
- Files are uploaded with "anyone with link can view" permissions
- Maximum upload size: 50 MB per file
- Only audio files are accepted (validated server-side)
- Never commit `.env.local` — it is listed in `.gitignore`

## Browser Compatibility

Works best with modern browsers that support:
- File System Access API (Chrome, Edge)
- `webkitdirectory` attribute for directory selection

## Troubleshooting

**"Not authenticated" error:**
- Clear cookies and re-authenticate
- Check that OAuth credentials are correct

**Upload fails:**
- Ensure file is a valid audio format
- Check file size (max 50 MB)
- Verify Google Drive API is enabled

**OAuth redirect error:**
- Confirm redirect URI matches in Google Cloud Console
- Must be exactly: `http://localhost:3000/api/auth/callback`

## Deploying to Production

- Update `NEXTAUTH_URL` in `.env.local` to your production domain
- Add your production domain as an authorized redirect URI in Google Cloud Console
- Regenerate `NEXTAUTH_SECRET` for production (use a strong random value)

## SEO & AI Search Optimization

This project includes comprehensive SEO and AI search optimization:

- **`/public/robots.txt`** — Crawler permissions
- **`/public/sitemap.xml`** — Site structure mapping
- **`/public/llms.txt`** — AI-optimized content summary
- **`/app/faq/page.tsx`** — Q&A format for better AI retrieval
- **`/app/comparisons/page.tsx`** — Competitive comparison content

## License

[MIT](./LICENSE) © 2026 [zuperzonic1](https://github.com/zuperzonic1)

## Support

For issues or questions, please [open an issue](https://github.com/zuperzonic1/gdrive-your-music/issues) on GitHub.
