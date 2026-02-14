# Troubleshooting: OAuth Client Not Found (Error 401)

## Error: "The OAuth client was not found" / "Error 401: invalid_client"

This error means Google cannot find or validate your OAuth credentials. Here's how to fix it:

---

## ✅ Checklist - Fix in This Order

### 1. Verify Client ID and Secret Format

Your credentials should look like this:

**Client ID format:**
```
1234567890-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com
```
- Should end with `.apps.googleusercontent.com`
- Contains numbers and letters
- Has a hyphen after the first part

**Client Secret format:**
```
GOCSPX-AbCdEfGhIjKlMnOpQrStUvWx
```
- Usually starts with `GOCSPX-`
- About 24-36 characters
- Mix of letters, numbers, and symbols

### 2. Check Your .env.local File

Open `gdrive-your-music/.env.local` and verify:

```env
GOOGLE_CLIENT_ID=your_actual_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_actual_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=any_random_string_at_least_32_characters_long
```

**Common mistakes:**
- ❌ Extra spaces before/after the values
- ❌ Quotes around the values (don't use quotes)
- ❌ Missing the `.apps.googleusercontent.com` part
- ❌ Copied HTML/formatting instead of plain text

**Correct format:**
```env
GOOGLE_CLIENT_ID=123456789-abc123.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-AbCdEf123456
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=mysecretkey123456789012345678901234567890
```

### 3. Restart Your Development Server

After changing `.env.local`, you MUST restart:

1. Stop the server (Ctrl+C in the terminal)
2. Start it again:
   ```bash
   npm run dev
   ```

Environment variables are only loaded at startup!

### 4. Verify OAuth Client Status in Google Cloud

Go to [Google Cloud Console](https://console.cloud.google.com/):

1. Navigate to "APIs & Services" > "Credentials"
2. Find your OAuth 2.0 Client ID
3. Check that it shows:
   - Type: **Web application**
   - Status: **Active** (not deleted)
4. Click on it to view/edit

### 5. Common Google Cloud Console Issues

**Issue: OAuth client was deleted**
- Solution: Create a new one following GOOGLE_OAUTH_CONFIG.md

**Issue: Wrong project selected**
- Solution: Make sure you're in the correct Google Cloud project

**Issue: Client ID disabled**
- Solution: Re-enable it or create a new one

**Issue: Credentials from a different project**
- Solution: Make sure the Client ID is from the project where Google Drive API is enabled

### 6. Copy Credentials Correctly

When copying from Google Cloud Console:

1. Click on your OAuth 2.0 Client ID name
2. You'll see a modal with:
   - **Client ID** (long string ending in .apps.googleusercontent.com)
   - **Client secret** (shorter string, often starts with GOCSPX-)
3. Use the **copy icon** (📋) next to each field
4. Paste directly into `.env.local` without any modifications

---

## 🔍 Step-by-Step Debugging

### Test 1: Verify Environment Variables are Loaded

Add this temporary route to check:

Create file `gdrive-your-music/app/api/test-env/route.ts`:
```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasClientId: !!process.env.GOOGLE_CLIENT_ID,
    clientIdLength: process.env.GOOGLE_CLIENT_ID?.length || 0,
    clientIdEndsCorrectly: process.env.GOOGLE_CLIENT_ID?.endsWith('.apps.googleusercontent.com'),
    hasClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
  });
}
```

Visit: `http://localhost:3000/api/test-env`

Expected output:
```json
{
  "hasClientId": true,
  "clientIdLength": 72,
  "clientIdEndsCorrectly": true,
  "hasClientSecret": true,
  "hasNextAuthUrl": true
}
```

If any value is `false` or wrong, your `.env.local` has an issue!

### Test 2: Create Fresh OAuth Client

If nothing works, create a completely new OAuth client:

1. Go to Google Cloud Console
2. APIs & Services > Credentials
3. Click "Create Credentials" > "OAuth client ID"
4. Application type: **Web application**
5. Name: `GDrive-Your-Music-v2`
6. Authorized JavaScript origins: `http://localhost:3000`
7. Authorized redirect URIs: `http://localhost:3000/api/auth/callback`
8. Click Create
9. **Copy the NEW credentials**
10. Replace in `.env.local`
11. Restart server

---

## 💡 Quick Fixes

### Fix 1: Check for Typos
```bash
# In PowerShell, check your env file:
cat gdrive-your-music\.env.local
```

Look for:
- Typos in variable names
- Extra characters
- Copy/paste errors

### Fix 2: Use Fresh Credentials
1. Create new OAuth client in Google Cloud
2. Delete old `.env.local`
3. Copy from `.env.local.example`
4. Add NEW credentials
5. Restart server

### Fix 3: Verify Google Cloud Project
- Make sure Google Drive API is enabled in the SAME project as your OAuth client
- Check project selector in top-left corner

---

## ✨ Once It Works

You should see:
1. Click "Connect to Google Drive"
2. Redirected to Google's authorization page
3. After approving, redirected back to your app
4. Message: "✓ Connected to Google Drive!"

---

## Still Not Working?

Share these details:
1. Does `clientIdEndsCorrectly` show `true` in test-env?
2. Is Google Drive API enabled?
3. Are you in the correct Google Cloud project?
4. Did you restart the dev server after changing .env.local?

Delete the test route after debugging:
```bash
rm gdrive-your-music/app/api/test-env/route.ts