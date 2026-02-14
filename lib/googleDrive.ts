import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

export interface GoogleDriveConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

export interface UploadResult {
  success: boolean;
  fileId?: string;
  fileName?: string;
  webViewLink?: string;
  webContentLink?: string;
  error?: string;
}

export class GoogleDriveService {
  private oauth2Client: OAuth2Client;
  private drive: any;

  constructor(config: GoogleDriveConfig) {
    this.oauth2Client = new google.auth.OAuth2(
      config.clientId,
      config.clientSecret,
      config.redirectUri
    );
  }

  /**
   * Generate the OAuth authorization URL
   */
  getAuthUrl(): string {
    const scopes = [
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/drive.metadata.readonly'
    ];

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent'
    });
  }

  /**
   * Exchange authorization code for tokens
   */
  async getTokensFromCode(code: string): Promise<any> {
    const { tokens } = await this.oauth2Client.getToken(code);
    return tokens;
  }

  /**
   * Set credentials from tokens
   */
  setCredentials(tokens: any) {
    this.oauth2Client.setCredentials(tokens);
    this.drive = google.drive({ version: 'v3', auth: this.oauth2Client });
  }

  /**
   * Check if currently authenticated
   */
  isAuthenticated(): boolean {
    return this.drive !== null && this.drive !== undefined;
  }

  /**
   * Upload a file to Google Drive
   */
  async createOrGetFolder(folderName: string, parentId?: string): Promise<string> {
    try {
      // Build query to search for existing folder
      let query = `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`;
      if (parentId) {
        query += ` and '${parentId}' in parents`;
      }

      // Search for existing folder
      const response = await this.drive.files.list({
        q: query,
        fields: 'files(id, name)',
        spaces: 'drive'
      });

      if (response.data.files && response.data.files.length > 0) {
        return response.data.files[0].id!;
      }

      // Create folder if it doesn't exist
      const folderMetadata: any = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder'
      };

      if (parentId) {
        folderMetadata.parents = [parentId];
      }

      const folder = await this.drive.files.create({
        requestBody: folderMetadata,
        fields: 'id'
      });

      return folder.data.id!;
    } catch (error) {
      console.error('Error creating/getting folder:', error);
      throw error;
    }
  }

  async listFilesInFolder(folderId: string): Promise<Array<{ id: string; name: string; webViewLink: string; webContentLink: string }>> {
    try {
      const response = await this.drive.files.list({
        q: `'${folderId}' in parents and trashed=false and mimeType != 'application/vnd.google-apps.folder'`,
        fields: 'files(id, name, webViewLink, webContentLink, mimeType)',
        orderBy: 'name',
        pageSize: 1000
      });

      return (response.data.files || []).map((file: any) => ({
        id: file.id!,
        name: file.name!,
        webViewLink: file.webViewLink!,
        webContentLink: file.webContentLink || `https://drive.google.com/uc?export=download&id=${file.id}`
      }));
    } catch (error) {
      console.error('Error listing files:', error);
      throw error;
    }
  }

  async listFoldersInFolder(folderId: string): Promise<Array<{ id: string; name: string }>> {
    try {
      const response = await this.drive.files.list({
        q: `'${folderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
        fields: 'files(id, name)',
        orderBy: 'name',
        pageSize: 1000
      });

      return (response.data.files || []).map((file: any) => ({
        id: file.id!,
        name: file.name!
      }));
    } catch (error) {
      console.error('Error listing folders:', error);
      throw error;
    }
  }

  async listFilesRecursively(folderId: string): Promise<any> {
    try {
      // Get files in current folder
      const files = await this.listFilesInFolder(folderId);
      
      // Get subfolders
      const subfolders = await this.listFoldersInFolder(folderId);
      
      // Recursively get files from subfolders
      const foldersWithFiles = await Promise.all(
        subfolders.map(async (folder) => {
          const result = await this.listFilesRecursively(folder.id);
          return {
            id: folder.id,
            name: folder.name,
            files: result.files,
            subfolders: result.subfolders
          };
        })
      );

      return {
        files,
        subfolders: foldersWithFiles
      };
    } catch (error) {
      console.error('Error listing files recursively:', error);
      throw error;
    }
  }

  async uploadFile(
    fileBuffer: Buffer,
    fileName: string,
    mimeType: string,
    folderId?: string
  ): Promise<UploadResult> {
    if (!this.drive) {
      return {
        success: false,
        error: 'Not authenticated with Google Drive'
      };
    }

    try {
      const fileMetadata: any = {
        name: fileName
      };

      if (folderId) {
        fileMetadata.parents = [folderId];
      }

      const media = {
        mimeType: mimeType,
        body: require('stream').Readable.from(fileBuffer)
      };

      const response = await this.drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id, name, webViewLink, webContentLink'
      });

      const fileId = response.data.id;

      // Make the file accessible to anyone with the link
      await this.drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone'
        }
      });

      // Get the direct download link
      const file = await this.drive.files.get({
        fileId: fileId,
        fields: 'webViewLink, webContentLink'
      });

      return {
        success: true,
        fileId: fileId,
        fileName: fileName,
        webViewLink: file.data.webViewLink,
        webContentLink: file.data.webContentLink
      };
    } catch (error: any) {
      console.error('Error uploading file to Google Drive:', error);
      return {
        success: false,
        fileName: fileName,
        error: error.message || 'Failed to upload file'
      };
    }
  }

  /**
   * Create a folder in Google Drive
   */
  async createFolder(folderName: string, parentId?: string): Promise<string | null> {
    if (!this.drive) {
      throw new Error('Not authenticated with Google Drive');
    }

    try {
      const fileMetadata: any = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder'
      };

      if (parentId) {
        fileMetadata.parents = [parentId];
      }

      const response = await this.drive.files.create({
        requestBody: fileMetadata,
        fields: 'id'
      });

      return response.data.id;
    } catch (error) {
      console.error('Error creating folder:', error);
      return null;
    }
  }

  /**
   * List folders in Google Drive
   */
  async listFolders(): Promise<Array<{ id: string; name: string }>> {
    if (!this.drive) {
      return [];
    }

    try {
      const response = await this.drive.files.list({
        q: "mimeType='application/vnd.google-apps.folder' and trashed=false",
        fields: 'files(id, name)',
        orderBy: 'name'
      });

      return response.data.files || [];
    } catch (error) {
      console.error('Error listing folders:', error);
      return [];
    }
  }
}

export default GoogleDriveService;