import { NextResponse } from 'next/server';
import { getTokens } from '@/lib/auth';
import { GoogleDriveService, DriveStructure } from '@/lib/googleDrive';

const FOLDER_NAME = 'GDrive-Your-Music';

interface File {
  id: string;
  name: string;
  webViewLink: string;
  webContentLink: string;
}

export async function GET() {
  try {
    const tokens = await getTokens();
    if (!tokens) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = `${process.env.NEXTAUTH_URL}/api/auth/callback`;

    if (!clientId || !clientSecret) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const driveService = new GoogleDriveService({ clientId, clientSecret, redirectUri });
    driveService.setCredentials(tokens as any);
    const folderId = await driveService.createOrGetFolder(FOLDER_NAME);
    const structure = await driveService.listFilesRecursively(folderId);
    const xml = generatePlaylistXML(structure);

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=UTF-8',
        'Content-Disposition': 'attachment; filename="playlists.xml"'
      }
    });
  } catch (error) {
    console.error('Error generating XML:', error);
    return NextResponse.json({ error: 'Failed to generate XML' }, { status: 500 });
  }
}

function escXML(t: string | undefined): string {
  if (!t) return '';
  return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function generatePlaylistXML(structure: DriveStructure): string {
  let xml = '<playlists>\n';
  
  // Root files -> "All Songs" playlist
  if (structure.files.length > 0) {
    xml += '<playlist pname="All Songs">\n';
    structure.files.forEach((file: File) => {
      const name = file.name.replace(/\.[^/.]+$/, '');
      const url = getDirectDownloadUrl(file);
      xml += `<song name="${escXML(name)}" url="${escXML(url)}"/>\n`;
    });
    xml += '</playlist>\n';
  }
  
  // Each subfolder becomes a playlist
  structure.subfolders.forEach((folder: any) => {
    xml += processFolderXML(folder);
  });
  
  xml += '</playlists>';
  return xml;
}

function processFolderXML(folder: any): string {
  let xml = `<playlist pname="${escXML(folder.name)}">\n`;
  
  // Add files from this folder
  folder.files.forEach((file: File) => {
    const name = file.name.replace(/\.[^/.]+$/, '');
    const url = getDirectDownloadUrl(file);
    xml += `<song name="${escXML(name)}" url="${escXML(url)}"/>\n`;
  });
  
  xml += '</playlist>\n';
  
  // Recursively process subfolders as separate playlists
  folder.subfolders.forEach((sub: any) => {
    xml += processFolderXML(sub);
  });
  
  return xml;
}

function getDirectDownloadUrl(file: File): string {
  // Use the exact format from your example: https://drive.google.com/uc?id={FILE_ID}&export=download
  // This ensures each file has a unique, direct streaming URL
  return `https://drive.google.com/uc?id=${file.id}&export=download`;
}

function countFilesInFolder(folder: any): number {
  let count = folder.files.length;
  folder.subfolders.forEach((sub: any) => count += countFilesInFolder(sub));
  return count;
}
