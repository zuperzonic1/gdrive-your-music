'use client';

import { useState } from 'react';
import type { UploadedFile } from './types';

interface UploadPanelProps {
  selectedFiles: File[];
  isUploading: boolean;
  currentFileIndex: number;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>, isPlaylist?: boolean) => void;
  onUpload: () => void;
  onClearSelection: () => void;
  onRemoveFile: (idx: number) => void;
  onRemoveFolder: (folderPath: string) => void;
  onLogout: () => void;
  uploadedFiles: UploadedFile[];
}

// Reads all entries from a directory reader (handles the 100-entry batch limit)
async function readAllEntries(reader: FileSystemDirectoryReader): Promise<FileSystemEntry[]> {
  const all: FileSystemEntry[] = [];
  await new Promise<void>((resolve, reject) => {
    const readBatch = () => {
      reader.readEntries((batch) => {
        if (batch.length === 0) { resolve(); return; }
        all.push(...batch);
        readBatch();
      }, reject);
    };
    readBatch();
  });
  return all;
}

// Recursively collects File objects from a FileSystemEntry, setting webkitRelativePath
async function collectFilesFromEntry(entry: FileSystemEntry, folderPath: string): Promise<File[]> {
  if (entry.isFile) {
    return new Promise<File[]>((resolve, reject) => {
      (entry as FileSystemFileEntry).file((f) => {
        const relativePath = folderPath ? `${folderPath}/${f.name}` : '';
        if (relativePath) {
          try {
            Object.defineProperty(f, 'webkitRelativePath', {
              writable: true, configurable: true, value: relativePath,
            });
          } catch { /* read-only on this browser — skip */ }
        }
        resolve([f]);
      }, reject);
    });
  }
  if (entry.isDirectory) {
    const childPath = folderPath ? `${folderPath}/${entry.name}` : entry.name;
    const reader = (entry as FileSystemDirectoryEntry).createReader();
    const children = await readAllEntries(reader);
    const nested = await Promise.all(children.map((c) => collectFilesFromEntry(c, childPath)));
    return nested.flat();
  }
  return [];
}

export default function UploadPanel({
  selectedFiles,
  isUploading,
  currentFileIndex,
  onFileSelect,
  onUpload,
  onClearSelection,
  onRemoveFile,
  onRemoveFolder,
  onLogout,
  uploadedFiles,
}: UploadPanelProps) {
  const [isDragging, setIsDragging] = useState(false);

  const filesByFolder = new Map<string, File[]>();
  selectedFiles.forEach((file) => {
    const tf = file as File & { webkitRelativePath?: string };
    const key = tf.webkitRelativePath?.split('/').slice(0, -1).join('/') ?? '';
    if (!filesByFolder.has(key)) filesByFolder.set(key, []);
    filesByFolder.get(key)!.push(file);
  });

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    // Collect FileSystemEntry objects synchronously — dataTransfer is cleared after the event
    const entries: FileSystemEntry[] = [];
    for (const item of Array.from(e.dataTransfer.items)) {
      if (item.kind === 'file') {
        const entry = item.webkitGetAsEntry();
        if (entry) entries.push(entry);
      }
    }

    // Traverse entries asynchronously (handles folders recursively)
    const allFiles = (await Promise.all(entries.map((entry) => collectFilesFromEntry(entry, '')))).flat();
    const audioFiles = allFiles.filter((f) =>
      /\.(mp3|webm|m4a|wav|flac|ogg|aac|wma|opus)$/i.test(f.name)
    );
    if (audioFiles.length === 0) return;

    // Pass isPlaylist=true if any file came from inside a folder
    const hasFolder = audioFiles.some(
      (f) => !!(f as File & { webkitRelativePath?: string }).webkitRelativePath
    );
    onFileSelect(
      { target: { files: audioFiles, value: '' } } as unknown as React.ChangeEvent<HTMLInputElement>,
      hasFolder
    );
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isDragging) setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // Only exit drag state if the cursor actually leaves the panel (not just moves to a child element)
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setIsDragging(false);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`bg-white/[0.04] backdrop-blur-xl border rounded-2xl p-6 space-y-5 transition-all ${isDragging ? 'border-violet-500 bg-violet-500/10' : 'border-white/10'}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Upload Music</h2>
          {!isDragging && <p className="text-xs text-slate-500 mt-0.5">Drag files anywhere on this panel to add them</p>}
          {isDragging && <p className="text-xs text-violet-400 mt-0.5 font-medium">Drop audio files to add them ✦</p>}
        </div>
        <button onClick={onLogout} className="text-xs text-gray-500 hover:text-red-400 transition-colors">
          Disconnect
        </button>
      </div>

      {/* Drop zones */}
      <div className="grid grid-cols-2 gap-4">
        <label
          htmlFor="playlistFolder"
          className="block p-6 border-2 border-dashed border-white/15 rounded-2xl text-center cursor-pointer hover:border-violet-500/60 hover:bg-violet-500/5 transition-all group"
        >
          <input
            id="playlistFolder"
            type="file"
            multiple
            // @ts-expect-error - webkitdirectory not in standard types
            webkitdirectory=""
            onChange={(e) => onFileSelect(e, true)}
            disabled={isUploading}
            className="hidden"
            accept="audio/*,.mp3,.webm,.m4a,.wav,.flac,.ogg,.aac,.wma,.opus"
          />
          <p className="text-3xl mb-2 group-hover:scale-110 transition-transform">📁</p>
          <p className="text-sm font-semibold text-gray-200 group-hover:text-violet-300 transition-colors">Playlist Folder</p>
          <p className="text-xs text-slate-500 mt-1">Upload an entire folder</p>
        </label>

        <label
          htmlFor="individualFiles"
          className="block p-6 border-2 border-dashed border-white/15 rounded-2xl text-center cursor-pointer hover:border-cyan-500/60 hover:bg-cyan-500/5 transition-all group"
        >
          <input
            id="individualFiles"
            type="file"
            multiple
            onChange={(e) => onFileSelect(e)}
            disabled={isUploading}
            className="hidden"
            accept="audio/*,.mp3,.webm,.m4a,.wav,.flac,.ogg,.aac,.wma,.opus"
          />
          <p className="text-3xl mb-2 group-hover:scale-110 transition-transform">🎵</p>
          <p className="text-sm font-semibold text-gray-200 group-hover:text-cyan-300 transition-colors">Individual Files</p>
          <p className="text-xs text-slate-500 mt-1">Pick specific songs</p>
        </label>
      </div>

      {/* Selected files summary */}
      {selectedFiles.length > 0 && (
        <div className="space-y-3">
          {/* Upload Progress Bar */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Uploading {currentFileIndex + 1} of {selectedFiles.length}</span>
                <span>{Math.round(((currentFileIndex + 1) / selectedFiles.length) * 100)}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-violet-600 to-cyan-500 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${((currentFileIndex + 1) / selectedFiles.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={onUpload}
              disabled={isUploading}
              className="flex-1 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 disabled:from-white/10 disabled:to-white/10 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl transition-all text-sm shadow-lg shadow-violet-900/30"
            >
              {isUploading
                ? `Uploading…`
                : `Upload ${selectedFiles.length} file${selectedFiles.length !== 1 ? 's' : ''}`}
            </button>
            <button
              onClick={onClearSelection}
              disabled={isUploading}
              className="px-4 bg-white/5 hover:bg-white/10 disabled:cursor-not-allowed text-gray-300 font-semibold rounded-xl transition-colors text-sm border border-white/10"
            >
              Clear
            </button>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-4 border border-white/5 max-h-60 overflow-y-auto space-y-3">
            {Array.from(filesByFolder.entries()).map(([folderPath, files]) => {
              const folderName = folderPath || 'Individual Songs';
              return (
                <div key={folderPath}>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-xs font-semibold text-gray-300">
                      📁 {folderName}{' '}
                      <span className="text-gray-500 font-normal">({files.length} songs)</span>
                    </p>
                    {folderPath !== '' && (
                      <button
                        onClick={() => onRemoveFolder(folderPath)}
                        disabled={isUploading}
                        className="text-xs text-red-400 hover:text-red-300 transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="space-y-0.5 ml-3">
                    {files.map((file, i) => {
                      const fileIndex = selectedFiles.indexOf(file);
                      return (
                        <div key={i} className="flex items-center justify-between group">
                          <p className="text-xs text-gray-500 truncate flex-1">• {file.name}</p>
                          <button
                            onClick={() => onRemoveFile(fileIndex)}
                            disabled={isUploading}
                            className="text-xs text-gray-600 hover:text-red-400 ml-2 opacity-0 group-hover:opacity-100 transition-all"
                          >
                            ✕
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Upload results */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2 max-h-56 overflow-y-auto">
          <h3 className="text-sm font-semibold text-gray-400">Upload results</h3>
          {uploadedFiles.map((file, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between px-3 py-2 bg-black/20 rounded-lg border border-white/5"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-200 truncate">{file.fileName}</p>
                {file.status === 'success' && <p className="text-xs text-green-400">✓ Uploaded</p>}
                {file.status === 'uploading' && <p className="text-xs text-blue-400">⏳ Uploading…</p>}
                {file.status === 'pending' && <p className="text-xs text-gray-500">Pending…</p>}
                {file.status === 'error' && <p className="text-xs text-red-400">✗ {file.error}</p>}
              </div>
              {file.status === 'success' && (file.webContentLink ?? file.webViewLink) && (
                <button
                  onClick={() => navigator.clipboard.writeText(file.webContentLink ?? file.webViewLink)}
                  className="ml-3 text-xs bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white px-2.5 py-1 rounded-lg transition-all flex-shrink-0"
                >
                  Copy Link
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}