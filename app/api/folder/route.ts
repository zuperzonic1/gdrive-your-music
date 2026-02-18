import { NextResponse } from 'next/server';
import { GoogleDriveService } from '@/lib/googleDrive';
import { getTokens } from '@/lib/auth';

const FOLDER_NAME = 'GDrive-Your-Music';

export async function GET() {
  try {
    const tokens = await getTokens();
    if (!tokens) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = `${process.env.NEXTAUTH_URL}/api/auth/callback`;

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const driveService = new GoogleDriveService({
      clientId,
      clientSecret,
      redirectUri
    });

    driveService.setCredentials(tokens as any);

    // Get or create the folder
    const folderId = await driveService.createOrGetFolder(FOLDER_NAME);

    // List files recursively (includes subfolders)
    const structure = await driveService.listFilesRecursively(folderId);

    return NextResponse.json({
      success: true,
      folderId,
      folderName: FOLDER_NAME,
      structure
    });
  } catch (error) {
    console.error('Error getting folder:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to get folder' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';