import { NextResponse } from 'next/server';
import { GoogleDriveService } from '@/lib/googleDrive';

export async function GET() {
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = `${process.env.NEXTAUTH_URL}/api/auth/callback`;

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { error: 'Missing Google OAuth credentials' },
        { status: 500 }
      );
    }

    const driveService = new GoogleDriveService({
      clientId,
      clientSecret,
      redirectUri
    });

    const authUrl = driveService.getAuthUrl();

    return NextResponse.json({ authUrl });
  } catch (error: any) {
    console.error('Error generating auth URL:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate auth URL' },
      { status: 500 }
    );
  }
}