# GDrive-Your-Music

A Next.js web application that allows you to upload your local music directory to Google Drive and get shareable links for all your music files.

## Features

- 🎵 Select entire music directory from your computer
- ☁️ Upload all audio files to Google Drive
- 🔗 Get shareable Google Drive links for each file
- 📊 Real-time upload progress tracking
- 🎨 Modern, responsive UI with Tailwind CSS
- 🔐 Secure Google OAuth 2.0 authentication

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

1. Clone or navigate to the project directory:
```bash
cd gdrive-your-music
```

2. Install dependencies:
```bash
npm

 install
```

3. Create environment file:
```bash
cp .env.local.example .env.local
```

4. Edit `.env.local` and add your credentials:
```env
GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret_here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_min_32_chars
```

To generate a secure NEXTAUTH_SECRET:
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
   - Copy individual links or export all links as CSV/TXT

## Project Structure

```
gdrive-your-music/
├── app/
│   ├── api/
│   │   ├── auth/          # OAuth routes
│   │   └── upload/        # File upload route
│   ├── library/           # View uploaded files
│   ├── layout.tsx
│   └── page.tsx           # Main upload page
├── components/            # React components
├── lib/
│   ├── googleDrive.ts     # Google Drive service
│   └── auth.ts            # Authentication helpers
├── .env.local.example     # Environment variables template
└── package.json
```

## API Routes

- `GET /api/auth` - Generate OAuth URL
- `GET /api/auth/callback` - Handle OAuth callback
- `POST /api/auth/logout` - Clear authentication
- `POST /api/upload` - Upload file to Google Drive

## Security Notes

- Tokens are stored in secure HTTP-only cookies
- Files are uploaded with "anyone with link can view" permissions
- Maximum upload size: 50MB per file
- Only audio files are accepted

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
- Check file size (max 50MB)
- Verify Google Drive API is enabled

**OAuth redirect error:**
- Confirm redirect URI matches in Google Cloud Console
- Must be exactly: `http://localhost:3000/api/auth/callback`

## Additional Production Notes

- Update the redirectUri in .env to your production domain if deploying
- Remember to authorize your production domain in Google Cloud
- Put all code via gitignore to prevent committing your .env.local with credentials

## License

MIT

## Support

For issues or questions, please check the documentation or create an issue in the repository.