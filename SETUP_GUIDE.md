# Quick Setup Guide for GDrive-Your-Music

## 🚀 Quick Start (5 minutes)

### Step 1: Get Google OAuth Credentials

1. Go to https://console.cloud.google.com/
2. Create a new project (or select existing)
3. Enable **Google Drive API**:
   - Click "Enable APIs and Services"
   - Search "Google Drive API"
   - Click Enable
4. Create credentials:
   - Go to "Credentials" tab
   - Click "Create Credentials" → "OAuth client ID"
   - Application type: **Web application**
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback`
   - Click Create
   - **Save the Client ID and Client Secret**

### Step 2: Configure the Application

1. Open the project folder: `cd gdrive-your-music`

2. Copy the environment template:
   ```bash
   cp .env.local.example .env.local
   ```

3. Edit `.env.local` with your credentials:
   ```env
   GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your_client_secret
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=any_random_string_min_32_characters_long
   ```

   Generate a random secret:
   ```bash
   # On Windows PowerShell:
   -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
   
   # On Mac/Linux:
   openssl rand -base64 32
   ```

### Step 3: Install and Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:3000 in your browser!

## 📝 How to Use

1. **Connect**: Click "Connect to Google Drive" and authorize
2. **Select**: Click "Select Music Directory" and choose your music folder
3. **Upload**: Click "Upload to Google Drive"
4. **Copy Links**: Once uploaded, copy the shareable links for each file

## ⚠️ Important Notes

- **Browser Support**: Works best in Chrome/Edge (supports directory selection)
- **File Types**: All audio files (MP3, WebM, M4A, WAV, FLAC, OGG, AAC, WMA, Opus)
- **File Size**: Maximum 50MB per file
- **Links**: All uploaded files get "anyone with link" permissions

## 🔧 Troubleshooting

**"Missing OAuth credentials" error:**
- Make sure `.env.local` exists and has correct values
- Restart the dev server after changing `.env.local`

**"Not authenticated" error:**
- Clear browser cookies
- Try disconnecting and reconnecting

**OAuth redirect error:**
- Verify redirect URI in Google Console matches exactly: `http://localhost:3000/api/auth/callback`

**Files not uploading:**
- Check file format (must be audio)
- Check file size (max 50MB)
- Check Google Drive API is enabled

## 🎯 Next Steps

- For production deployment, update `NEXTAUTH_URL` to your domain
- Add your production domain to authorized redirect URIs in Google Console
- Never commit `.env.local` to version control

## 📦 Project Structure

```
gdrive-your-music/
├── app/
│   ├── page.tsx          # Main upload interface
│   └── api/              # Backend API routes
├── lib/
│   ├── googleDrive.ts    # Google Drive integration
│   └── auth.ts           # Authentication helpers
└── .env.local            # Your credentials (create this!)
```

## 💡 Tips

- Upload works even with large music collections
- Progress is shown in real-time
- Failed uploads are marked and can be retried
- Links can be copied individually or exported as a list

---

Need help? Check the full README.md for more details!