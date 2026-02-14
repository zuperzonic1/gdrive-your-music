import { NextRequest, NextResponse } from 'next/server';
import { GoogleDriveService } from '@/lib/googleDrive';
import { getTokens } from '@/lib/auth';

const FOLDER_NAME = 'GDrive-Your-Music';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const tokens = await getTokens();
    if (!tokens) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const relativePath = formData.get('relativePath') as string | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type (audio files only)
    const allowedTypes = [
      'audio/mpeg',
      'audio/mp3',
      'audio/webm',
      'audio/mp4',
      'audio/m4a',
      'audio/wav',
      'audio/flac',
      'audio/ogg',
      'audio/aac',
      'audio/x-m4a',
      'audio/opus',
      'audio/x-ms-wma'
    ];

    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(mp3|webm|m4a|wav|flac|ogg|aac|wma|opus)$/i)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only audio files are allowed.' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Initialize Google Drive service
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

    driveService.setCredentials(tokens);

    // Get or create the dedicated folder
    let targetFolderId = await driveService.createOrGetFolder(FOLDER_NAME);

    // If file has a relative path (from subfolder), create/get subfolders
    if (relativePath && relativePath.includes('/')) {
      const pathParts = relativePath.split('/');
      pathParts.pop(); // Remove filename
      
      // Create nested folders
      for (const folderName of pathParts) {
        if (folderName) {
          targetFolderId = await driveService.createOrGetFolder(folderName, targetFolderId);
        }
      }
    }

    // Upload to Google Drive in the appropriate folder
    const result = await driveService.uploadFile(
      buffer,
      file.name,
      file.type || 'audio/mpeg',
      targetFolderId
    );

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Upload failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      fileName: result.fileName,
      fileId: result.fileId,
      webViewLink: result.webViewLink,
      webContentLink: result.webContentLink
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}

// Configure route segment for larger file uploads (50MB)
export const maxDuration = 60; // Maximum function execution time in seconds
export const dynamic = 'force-dynamic'; // Disable caching for this route
