export interface ExistingFile {
  id: string;
  name: string;
  webViewLink: string;
  webContentLink: string;
}

export interface Folder {
  id: string;
  name: string;
  files: ExistingFile[];
  subfolders: Folder[];
}

export interface MusicStructure {
  files: ExistingFile[];
  subfolders: Folder[];
}

export interface UploadedFile {
  fileName: string;
  webViewLink: string;
  webContentLink?: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}