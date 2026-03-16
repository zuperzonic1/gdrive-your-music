'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import UploadPanel from '@/components/UploadPanel';
import MusicLibrary from '@/components/MusicLibrary';
import type { MusicStructure, UploadedFile } from '@/components/types';

function HomeContent() {
  const searchParams = useSearchParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [musicStructure, setMusicStructure] = useState<MusicStructure | null>(null);
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
      const authed = data.authenticated || false;
      setIsAuthenticated(authed);
      if (authed) loadExistingFiles();
    } catch {
      // silent
    }
  };

  const loadExistingFiles = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/folder');
      const data = await res.json();
      if (data.success && data.structure) {
        setMusicStructure(data.structure);
      }
    } catch {
      // silent
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = async () => {
    try {
      const res = await fetch('/api/auth');
      const data = await res.json();
      if (data.authUrl) window.location.href = data.authUrl;
    } catch {
      setMessage('Connection failed. Please try again.');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setIsAuthenticated(false);
    setSelectedFiles([]);
    setUploadedFiles([]);
    setMusicStructure(null);
    setMessage('');
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, isPlaylist = false) => {
    const files = Array.from(e.target.files ?? []);
    const audio = files.filter((f) => /\.(mp3|webm|m4a|wav|flac|ogg|aac|wma|opus)$/i.test(f.name));
    setSelectedFiles((prev) => [...prev, ...audio]);
    if (isPlaylist && audio.length > 0) {
      const first = audio[0] as File & { webkitRelativePath?: string };
      const folder = first.webkitRelativePath?.split('/')[0] ?? 'folder';
      setMessage(`✓ Added "${folder}" — ${audio.length} songs`);
    } else {
      setMessage(`✓ Added ${audio.length} audio files`);
    }
    e.target.value = '';
  };

  const handleRemoveFile = (idx: number) =>
    setSelectedFiles((prev) => prev.filter((_, i) => i !== idx));

  const handleRemoveFolder = (folderPath: string) => {
    setSelectedFiles((prev) =>
      prev.filter((f) => {
        const tf = f as File & { webkitRelativePath?: string };
        return (tf.webkitRelativePath?.split('/').slice(0, -1).join('/') ?? '') !== folderPath;
      })
    );
  };

  const handleUpload = async () => {
    if (!selectedFiles.length) return;
    setIsUploading(true);
    const results: UploadedFile[] = selectedFiles.map((f) => ({
      fileName: f.name,
      webViewLink: '',
      status: 'pending',
    }));
    setUploadedFiles(results);

    for (let i = 0; i < selectedFiles.length; i++) {
      setCurrentFileIndex(i);
      setUploadedFiles((prev) =>
        prev.map((item, idx) => (idx === i ? { ...item, status: 'uploading' } : item))
      );
      try {
        const form = new FormData();
        form.append('file', selectedFiles[i]);
        const tf = selectedFiles[i] as File & { webkitRelativePath?: string };
        if (tf.webkitRelativePath) form.append('relativePath', tf.webkitRelativePath);
        const res = await fetch('/api/upload', { method: 'POST', body: form });
        const data = await res.json();
        if (res.ok && data.success) {
          setUploadedFiles((prev) =>
            prev.map((item, idx) =>
              idx === i
                ? { ...item, status: 'success', webViewLink: data.webViewLink, webContentLink: data.webContentLink }
                : item
            )
          );
        } else {
          throw new Error(data.error ?? 'Upload failed');
        }
      } catch (err) {
        setUploadedFiles((prev) =>
          prev.map((item, idx) =>
            idx === i ? { ...item, status: 'error', error: (err as Error).message } : item
          )
        );
      }
    }
    setIsUploading(false);
    setMessage('Upload complete!');
    setSelectedFiles([]);
    loadExistingFiles();
  };

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setMessage('✓ Link copied to clipboard!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Status message */}
      {message && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-gray-900 border border-white/10 text-gray-200 text-sm px-5 py-2.5 rounded-full shadow-xl">
          {message}
        </div>
      )}

      {!isAuthenticated ? (
        <>
          <Hero onConnect={handleConnect} />
          <Features />
        </>
      ) : (
        <main className="max-w-5xl mx-auto px-6 py-16 space-y-6">
          <div className="mb-2">
            <h1 className="text-3xl font-bold text-white">GDrive Your Music</h1>
            <p className="text-gray-500 text-sm mt-1">Upload music to Google Drive & manage your library</p>
          </div>

          <UploadPanel
            selectedFiles={selectedFiles}
            isUploading={isUploading}
            currentFileIndex={currentFileIndex}
            onFileSelect={handleFileSelect}
            onUpload={handleUpload}
            onClearSelection={() => setSelectedFiles([])}
            onRemoveFile={handleRemoveFile}
            onRemoveFolder={handleRemoveFolder}
            onLogout={handleLogout}
            uploadedFiles={uploadedFiles}
          />

          {musicStructure && (
            <MusicLibrary
              structure={musicStructure}
              isLoading={isLoading}
              onCopy={copyLink}
            />
          )}
        </main>
      )}

      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
          <div className="text-gray-500 text-sm">Loading…</div>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}