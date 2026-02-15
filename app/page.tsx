'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface UploadedFile {
  fileName: string;
  webViewLink: string;
  webContentLink?: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

interface ExistingFile {
  id: string;
  name: string;
  webViewLink: string;
  webContentLink: string;
}

interface Folder {
  id: string;
  name: string;
  files: ExistingFile[];
  subfolders: Folder[];
}

interface MusicStructure {
  files: ExistingFile[];
  subfolders: Folder[];
}

function HomeContent() {
  const searchParams = useSearchParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [musicStructure, setMusicStructure] = useState<MusicStructure | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    checkAuth();
    const auth = searchParams?.get('auth');
    const error = searchParams?.get('error');
    if (auth === 'success') {
      setMessage('✓ Connected to Google Drive!');
      setIsAuthenticated(true);
    } else if (error) {
      setMessage(`Error: ${error}`);
    }
  }, [searchParams]);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/check');
      const data = await res.json();
      const isAuth = data.authenticated || false;
      setIsAuthenticated(isAuth);
      
      if (isAuth) {
        loadExistingFiles();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  };

  const loadExistingFiles = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/folder');
      const data = await res.json();
      
      if (data.success && data.structure) {
        setMusicStructure(data.structure);
        const totalFiles = countFiles(data.structure);
        if (totalFiles > 0) {
          setMessage(`Found ${totalFiles} songs across ${countFolders(data.structure)} playlists`);
        }
      }
    } catch (error) {
      console.error('Error loading existing files:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const countFiles = (structure: MusicStructure): number => {
    let count = structure.files.length;
    structure.subfolders.forEach(folder => {
      count += countFilesInFolder(folder);
    });
    return count;
  };

  const countFilesInFolder = (folder: Folder): number => {
    let count = folder.files.length;
    folder.subfolders.forEach(subfolder => {
      count += countFilesInFolder(subfolder);
    });
    return count;
  };

  const countFolders = (structure: MusicStructure): number => {
    let count = structure.subfolders.length;
    structure.subfolders.forEach(folder => {
      count += folder.subfolders.length;
    });
    return count;
  };

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(folderId)) {
        newSet.delete(folderId);
      } else {
        newSet.add(folderId);
      }
      return newSet;
    });
  };

  const handleConnect = async () => {
    try {
      const res = await fetch('/api/auth');
      const data = await res.json();
      if (data.authUrl) window.location.href = data.authUrl;
    } catch (error) {
      setMessage('Connection failed');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setIsAuthenticated(false);
    setSelectedFiles([]);
    setUploadedFiles([]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, isPlaylistFolder: boolean = false) => {
    const files = Array.from(e.target.files || []);
    const audioFiles = files.filter(f => /\.(mp3|webm|m4a|wav|flac|ogg|aac|wma|opus)$/i.test(f.name));
    
    // Add to existing selection instead of replacing
    setSelectedFiles(prev => [...prev, ...audioFiles]);
    
    if (isPlaylistFolder && audioFiles.length > 0) {
      const firstFile = audioFiles[0] as File & { webkitRelativePath?: string };
      const folderName = firstFile.webkitRelativePath?.split('/')[0] || 'folder';
      setMessage(`✓ Added folder (${folderName}) with ${audioFiles.length} songs`);
    } else {
      setMessage(`✓ Added ${audioFiles.length} audio files`);
    }
    
    // Reset the input so same folder can be selected again
    e.target.value = '';
  };

  const removeFile = (indexToRemove: number) => {
    setSelectedFiles(prev => prev.filter((_, idx) => idx !== indexToRemove));
    setMessage('✓ File removed');
  };

  const removeFolder = (folderPath: string) => {
    setSelectedFiles(prev => prev.filter(file => {
      const typedFile = file as File & { webkitRelativePath?: string };
      const fileFolderPath = typedFile.webkitRelativePath?.split('/').slice(0, -1).join('/') || '';
      return fileFolderPath !== folderPath;
    }));
    setMessage('✓ Folder removed');
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    setIsUploading(true);
    const results: UploadedFile[] = selectedFiles.map(f => ({
      fileName: f.name,
      webViewLink: '',
      status: 'pending'
    }));
    setUploadedFiles(results);

    for (let i = 0; i < selectedFiles.length; i++) {
      setCurrentFileIndex(i);
      setUploadedFiles(prev => prev.map((item, idx) => 
        idx === i ? { ...item, status: 'uploading' } : item
      ));

      try {
        const formData = new FormData();
        formData.append('file', selectedFiles[i]);
        
        // Add relative path if file has webkitRelativePath (from folder selection)
        const file = selectedFiles[i] as File & { webkitRelativePath?: string };
        if (file.webkitRelativePath) {
          formData.append('relativePath', file.webkitRelativePath);
        }
        
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();

        if (res.ok && data.success) {
          setUploadedFiles(prev => prev.map((item, idx) => 
            idx === i ? { 
              ...item, 
              status: 'success', 
              webViewLink: data.webViewLink,
              webContentLink: data.webContentLink
            } : item
          ));
        } else {
          throw new Error(data.error || 'Upload failed');
        }
      } catch (error) {
        setUploadedFiles(prev => prev.map((item, idx) => 
          idx === i ? { ...item, status: 'error', error: (error as Error).message } : item
        ));
      }
    }
    setIsUploading(false);
    setMessage('Upload complete!');
    setSelectedFiles([]); // Clear selection after upload
    loadExistingFiles(); // Reload the file list
  };

  const handleClearSelection = () => {
    setSelectedFiles([]);
    setMessage('Selection cleared');
  };

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setMessage('✓ Direct link copied! Paste in games, media players, or download managers');
    setTimeout(() => setMessage(''), 4000);
  };

  const openInNewTab = (link: string) => {
    window.open(link, '_blank');
  };

  const generateFolderXML = (folder: Folder): string => {
    let xml = `<playlist pname="${folder.name.replace(/&/g, '&amp;').replace(/"/g, '&quot;')}">\n`;
    folder.files.forEach(file => {
      const name = file.name.replace(/\.[^/.]+$/, '').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
      const url = `https://drive.google.com/uc?id=${file.id}&amp;export=download`;
      xml += `<song name="${name}" url="${url}"/>\n`;
    });
    xml += '</playlist>\n';
    folder.subfolders.forEach(sub => {
      xml += generateFolderXML(sub);
    });
    return xml;
  };

  const exportXML = () => {
    if (!musicStructure) return;
    let xml = '<playlists>\n';
    if (musicStructure.files.length > 0) {
      xml += '<playlist pname="All Songs">\n';
      musicStructure.files.forEach(file => {
        const name = file.name.replace(/\.[^/.]+$/, '').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
        const url = `https://drive.google.com/uc?id=${file.id}&amp;export=download`;
        xml += `<song name="${name}" url="${url}"/>\n`;
      });
      xml += '</playlist>\n';
    }
    musicStructure.subfolders.forEach(folder => {
      xml += generateFolderXML(folder);
    });
    xml += '</playlists>';
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'playlists.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setMessage('✓ Playlist XML exported!');
    setTimeout(() => setMessage(''), 3000);
  };

  // Recursive component to render folders with unlimited nesting
  const FolderView = ({ folder, depth = 0 }: { folder: Folder; depth?: number }) => {
    const isExpanded = expandedFolders.has(folder.id);
    const indentClass = depth > 0 ? `ml-${depth * 4}` : '';
    
    return (
      <div className={indentClass}>
        <button
          onClick={() => toggleFolder(folder.id)}
          className="w-full flex items-center justify-between p-3 bg-gray-900/70 hover:bg-gray-900 transition-colors rounded-lg mb-2"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">{isExpanded ? '📂' : '📁'}</span>
            <span className="font-semibold text-gray-200">{folder.name}</span>
            <span className="text-xs text-gray-500">({countFilesInFolder(folder)} songs)</span>
          </div>
          <span className="text-gray-400">{isExpanded ? '▼' : '▶'}</span>
        </button>
        
        {isExpanded && (
          <div className="ml-4 space-y-2 mb-2">
            {/* Files in this folder */}
            {folder.files.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-2 bg-gray-900/50 rounded border border-gray-700">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate text-gray-200">{file.name}</p>
                </div>
                <div className="flex gap-2 ml-4 flex-shrink-0">
                  <button
                    onClick={() => openInNewTab(file.webContentLink)}
                    className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-500 transition-colors"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => copyLink(file.webContentLink)}
                    className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500 transition-colors"
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            ))}
            
            {/* Nested subfolders - recursive call */}
            {folder.subfolders.map((subfolder) => (
              <FolderView key={subfolder.id} folder={subfolder} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">GDrive Your Music</h1>
          <p className="text-gray-300">Upload music to Google Drive & get shareable links</p>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-blue-900/50 border border-blue-700 rounded-lg text-blue-200">
            {message}
          </div>
        )}

        {!isAuthenticated ? (
          <div className="bg-gray-800 rounded-xl shadow-2xl p-8 text-center border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-white">Connect to Google Drive</h2>
            <p className="text-gray-400 mb-6">Authenticate to upload your music files</p>
            <button
              onClick={handleConnect}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-500 font-semibold transition-colors mb-6"
            >
              Connect to Google Drive
            </button>
            <div className="text-center text-sm text-gray-500">
              <p className="mb-2">By connecting, you agree to our:</p>
              <div className="flex justify-center items-center gap-4">
                <Link 
                  href="/terms" 
                  className="text-blue-400 hover:text-blue-300 transition-colors underline"
                >
                  Terms of Service
                </Link>
                <span>•</span>
                <Link 
                  href="/privacy" 
                  className="text-blue-400 hover:text-blue-300 transition-colors underline"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Upload Music</h2>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-400 hover:text-red-300 transition-colors"
                >
                  Disconnect
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Playlist Folder Selection */}
                  <div>
                    <input
                      type="file"
                      id="playlistFolder"
                      multiple
                      // @ts-expect-error - webkitdirectory is not in standard TypeScript types
                      webkitdirectory=""
                      onChange={(e) => handleFileSelect(e, true)}
                      disabled={isUploading}
                      className="hidden"
                      accept="audio/*,.mp3,.webm,.m4a,.wav,.flac,.ogg,.aac,.wma,.opus"
                    />
                    <label
                      htmlFor="playlistFolder"
                      className="block w-full p-6 border-2 border-dashed border-gray-600 rounded-lg text-center cursor-pointer hover:border-blue-500 transition-colors bg-gray-900/50"
                    >
                      <div className="text-gray-300">
                        <p className="font-semibold mb-2">📁 Select Playlist Folder</p>
                        <p className="text-xs">Choose your playlist</p>
                      </div>
                    </label>
                  </div>

                  {/* Individual Files Selection */}
                  <div>
                    <input
                      type="file"
                      id="individualFiles"
                      multiple
                      onChange={handleFileSelect}
                      disabled={isUploading}
                      className="hidden"
                      accept="audio/*,.mp3,.webm,.m4a,.wav,.flac,.ogg,.aac,.wma,.opus"
                    />
                    <label
                      htmlFor="individualFiles"
                      className="block w-full p-6 border-2 border-dashed border-gray-600 rounded-lg text-center cursor-pointer hover:border-blue-500 transition-colors bg-gray-900/50"
                    >
                      <div className="text-gray-300">
                        <p className="font-semibold mb-2">🎵 Select Files</p>
                        <p className="text-xs">Choose individual songs</p>
                      </div>
                    </label>
                  </div>
                </div>

                {selectedFiles.length > 0 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={handleUpload}
                        disabled={isUploading}
                        className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed font-semibold transition-colors"
                      >
                        {isUploading ? `Uploading ${currentFileIndex + 1}/${selectedFiles.length}...` : 'Upload to Google Drive'}
                      </button>
                      <button
                        onClick={handleClearSelection}
                        disabled={isUploading}
                        className="bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed font-semibold transition-colors"
                      >
                        Clear Selection
                      </button>
                    </div>
                    
                    {/* Selection Summary */}
                    <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                      {(() => {
                        const filesByFolder = new Map<string, File[]>();
                        selectedFiles.forEach(file => {
                          const typedFile = file as File & { webkitRelativePath?: string };
                          const folderPath = typedFile.webkitRelativePath?.split('/').slice(0, -1).join('/') || '';
                          if (!filesByFolder.has(folderPath)) {
                            filesByFolder.set(folderPath, []);
                          }
                          filesByFolder.get(folderPath)!.push(file);
                        });
                        
                        const totalPlaylists = filesByFolder.size;
                        const totalSongs = selectedFiles.length;
                        
                        return (
                          <>
                            <div className="mb-3 pb-3 border-b border-gray-700">
                              <p className="text-sm font-semibold text-gray-300">
                                Total Playlists: <span className="text-blue-400">{totalPlaylists}</span>
                                {' • '}
                                Total Songs: <span className="text-green-400">{totalSongs}</span>
                              </p>
                            </div>
                            
                            <div className="space-y-3 max-h-64 overflow-y-auto">
                              {Array.from(filesByFolder.entries()).map(([folderPath, files]) => {
                                const folderName = folderPath || 'Individual Songs';
                                const isIndividualFiles = folderPath === '';
                                return (
                                  <div key={folderPath} className="bg-gray-800/50 rounded p-3">
                                    <div className="flex items-center justify-between mb-2">
                                      <p className="text-sm font-semibold text-gray-200">
                                        📁 {folderName} <span className="text-gray-500">({files.length} songs)</span>
                                      </p>
                                      {!isIndividualFiles && (
                                        <button
                                          onClick={() => removeFolder(folderPath)}
                                          disabled={isUploading}
                                          className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500 transition-colors disabled:bg-gray-600"
                                        >
                                          Remove Folder
                                        </button>
                                      )}
                                    </div>
                                    <div className="ml-4 space-y-1">
                                      {files.map((file, idx) => {
                                        const fileIndex = selectedFiles.indexOf(file);
                                        return (
                                          <div key={idx} className="flex items-center justify-between group">
                                            <p className="text-xs text-gray-400 truncate flex-1">
                                              • {file.name}
                                            </p>
                                            <button
                                              onClick={() => removeFile(fileIndex)}
                                              disabled={isUploading}
                                              className="text-xs text-red-400 hover:text-red-300 ml-2 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
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
                          </>
                        );
                      })()}
                    </div>
                  </div>
                )}

                {selectedFiles.length === 0 && !isUploading && (
                  <button
                    disabled
                    className="w-full bg-gray-700 text-gray-500 py-3 rounded-lg cursor-not-allowed font-semibold"
                  >
                    Upload to Google Drive
                  </button>
                )}
              </div>
            </div>

            {musicStructure && (countFiles(musicStructure) > 0) && (
              <div className="bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">
                    Your Music Library ({countFiles(musicStructure)} songs)
                  </h3>
                  <button
                    onClick={exportXML}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500 transition-colors font-semibold text-sm flex items-center gap-2"
                  >
                    <span>📄</span>
                    Export XML
                  </button>
                </div>
                {isLoading ? (
                  <p className="text-gray-400 text-center py-4">Loading...</p>
                ) : (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {/* All Songs folder (root level files) */}
                    {musicStructure.files.length > 0 && (
                      <div>
                        <button
                          onClick={() => toggleFolder('all-songs')}
                          className="w-full flex items-center justify-between p-3 bg-gray-900/70 hover:bg-gray-900 transition-colors rounded-lg mb-2"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{expandedFolders.has('all-songs') ? '📂' : '📁'}</span>
                            <span className="font-semibold text-gray-200">All Songs</span>
                            <span className="text-xs text-gray-500">({musicStructure.files.length} songs)</span>
                          </div>
                          <span className="text-gray-400">{expandedFolders.has('all-songs') ? '▼' : '▶'}</span>
                        </button>
                        
                        {expandedFolders.has('all-songs') && (
                          <div className="ml-4 space-y-2 mb-2">
                            {musicStructure.files.map((file) => (
                              <div key={file.id} className="flex items-center justify-between p-2 bg-gray-900/50 rounded border border-gray-700">
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm truncate text-gray-200">{file.name}</p>
                                </div>
                                <div className="flex gap-2 ml-4 flex-shrink-0">
                                  <button
                                    onClick={() => openInNewTab(file.webContentLink)}
                                    className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-500 transition-colors"
                                  >
                                    Download
                                  </button>
                                  <button
                                    onClick={() => copyLink(file.webContentLink)}
                                    className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500 transition-colors"
                                  >
                                    Copy Link
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Playlists (folders) - supports unlimited nesting */}
                    {musicStructure.subfolders.map((folder) => (
                      <FolderView key={folder.id} folder={folder} depth={0} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {uploadedFiles.length > 0 && (
              <div className="bg-gray-800 rounded-xl shadow-2xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold mb-4 text-white">Upload Results</h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {uploadedFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-900/50 rounded border border-gray-700">
                      <div className="flex-1">
                        <p className="font-medium text-sm truncate text-gray-200">{file.fileName}</p>
                        {file.status === 'success' && (
                          <p className="text-xs text-green-400">✓ Uploaded</p>
                        )}
                        {file.status === 'uploading' && (
                          <p className="text-xs text-blue-400">⏳ Uploading...</p>
                        )}
                        {file.status === 'error' && (
                          <p className="text-xs text-red-400">✗ {file.error}</p>
                        )}
                      </div>
                      {file.status === 'success' && file.webViewLink && (
                        <button
                          onClick={() => copyLink(file.webContentLink || file.webViewLink)}
                          className="ml-4 text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition-colors"
                        >
                          Copy Link
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer with legal links */}
        <footer className="mt-12 pt-8 border-t border-gray-700">
          <div className="text-center text-sm text-gray-400">
            <div className="flex justify-center items-center gap-6 mb-4">
              <Link 
                href="/terms" 
                className="hover:text-blue-400 transition-colors"
              >
                Terms of Service
              </Link>
              <span>•</span>
              <Link 
                href="/privacy" 
                className="hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <span>•</span>
              <a 
                href="https://github.com/zuperzonic1/gdrive-your-music" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                GitHub
              </a>
            </div>
            <p>
              © 2026 GDrive Your Music. Your music, your Google Drive, your control.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
