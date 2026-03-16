'use client';

import { useState } from 'react';
import FolderRow from './FolderRow';
import type { MusicStructure, Folder } from './types';

function countFiles(s: MusicStructure): number {
  return s.files.length + s.subfolders.reduce((acc, f) => acc + countInFolder(f), 0);
}
function countInFolder(f: Folder): number {
  return f.files.length + f.subfolders.reduce((acc, s) => acc + countInFolder(s), 0);
}
function dl(content: string, name: string, mime: string) {
  const b = new Blob([content], { type: mime });
  const u = URL.createObjectURL(b);
  const a = Object.assign(document.createElement('a'), { href: u, download: name });
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(u);
}
function folderXML(folder: Folder): string {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  let x = `<playlist pname="${esc(folder.name)}">\n`;
  folder.files.forEach((f) => {
    x += `<song name="${esc(f.name.replace(/\.[^/.]+$/, ''))}" url="https://drive.google.com/uc?id=${f.id}&amp;export=download"/>\n`;
  });
  x += '</playlist>\n';
  folder.subfolders.forEach((s) => { x += folderXML(s); });
  return x;
}

interface Props {
  structure: MusicStructure;
  isLoading: boolean;
  onCopy: (link: string) => void;
}

export default function MusicLibrary({ structure, isLoading, onCopy }: Props) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [showExport, setShowExport] = useState(false);
  const total = countFiles(structure);

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const n = new Set(prev);
      if (n.has(id)) {
        n.delete(id);
      } else {
        n.add(id);
      }
      return n;
    });
  };

  const exportXML = () => {
    let xml = '<playlists>\n';
    if (structure.files.length > 0) {
      xml += '<playlist pname="All Songs">\n';
      structure.files.forEach((f) => {
        const name = f.name.replace(/\.[^/.]+$/, '').replace(/&/g, '&amp;').replace(/"/g, '&quot;');
        xml += `<song name="${name}" url="https://drive.google.com/uc?id=${f.id}&amp;export=download"/>\n`;
      });
      xml += '</playlist>\n';
    }
    structure.subfolders.forEach((f) => { xml += folderXML(f); });
    xml += '</playlists>';
    dl(xml, 'playlists.xml', 'application/xml');
    setShowExport(false);
  };

  const exportCSV = () => {
    const esc = (s: string) => s.replace(/"/g, '""');
    let csv = 'Playlist,Song Name,Download URL\n';
    structure.files.forEach((f) => {
      csv += `"All Songs","${esc(f.name.replace(/\.[^/.]+$/, ''))}","https://drive.google.com/uc?id=${f.id}&export=download"\n`;
    });
    const proc = (folder: Folder) => {
      folder.files.forEach((f) => {
        csv += `"${esc(folder.name)}","${esc(f.name.replace(/\.[^/.]+$/, ''))}","https://drive.google.com/uc?id=${f.id}&export=download"\n`;
      });
      folder.subfolders.forEach(proc);
    };
    structure.subfolders.forEach(proc);
    dl(csv, 'playlists.csv', 'text/csv');
    setShowExport(false);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-white">
          Music Library <span className="text-gray-500 font-normal text-sm">({total} songs)</span>
        </h2>
        <div className="relative">
          <button
            onClick={() => setShowExport((p) => !p)}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-gray-200 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors border border-white/10"
          >
            Export
            <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.586l3.71-4.356a.75.75 0 011.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>
          {showExport && (
            <div className="absolute right-0 mt-1.5 w-36 bg-gray-900 border border-white/10 rounded-lg p-1 shadow-xl z-50">
              <button onClick={exportXML} className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-white/10 rounded">Export XML</button>
              <button onClick={exportCSV} className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-white/10 rounded">Export CSV</button>
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <p className="text-gray-500 text-sm text-center py-6">Loading library…</p>
      ) : (
        <div className="space-y-2 max-h-[600px] overflow-y-auto">
          {structure.files.length > 0 && (
            <div>
              <button
                onClick={() => toggle('__root__')}
                className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 transition-colors rounded-lg mb-2 border border-white/5"
              >
                <div className="flex items-center gap-2">
                  <span>{expanded.has('__root__') ? '📂' : '📁'}</span>
                  <span className="font-semibold text-gray-200 text-sm">All Songs</span>
                  <span className="text-xs text-gray-500">({structure.files.length} songs)</span>
                </div>
                <span className="text-gray-500 text-xs">{expanded.has('__root__') ? '▼' : '▶'}</span>
              </button>
              {expanded.has('__root__') && (
                <div className="ml-4 space-y-1.5 mb-2">
                  {structure.files.map((file) => (
                    <div key={file.id} className="flex items-center justify-between px-3 py-2 bg-white/[0.03] rounded-lg border border-white/5">
                      <p className="text-sm text-gray-300 truncate flex-1">{file.name}</p>
                      <div className="flex gap-2 ml-4 flex-shrink-0">
                        <a href={file.webContentLink} target="_blank" rel="noopener noreferrer" className="text-xs bg-white/10 hover:bg-white/20 text-gray-200 px-2.5 py-1 rounded transition-colors">Download</a>
                        <button onClick={() => onCopy(file.webContentLink)} className="text-xs bg-blue-600/80 hover:bg-blue-600 text-white px-2.5 py-1 rounded transition-colors">Copy Link</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {structure.subfolders.map((folder) => (
            <FolderRow key={folder.id} folder={folder} depth={0} expanded={expanded} onToggle={toggle} onCopy={onCopy} />
          ))}
        </div>
      )}
    </div>
  );
}