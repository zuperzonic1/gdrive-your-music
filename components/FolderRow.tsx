'use client';

import type { Folder } from './types';

function countFilesInFolder(folder: Folder): number {
  return folder.files.length + folder.subfolders.reduce((acc, f) => acc + countFilesInFolder(f), 0);
}

interface FolderRowProps {
  folder: Folder;
  depth: number;
  expanded: Set<string>;
  onToggle: (id: string) => void;
  onCopy: (link: string) => void;
}

export default function FolderRow({ folder, depth, expanded, onToggle, onCopy }: FolderRowProps) {
  const isExpanded = expanded.has(folder.id);

  return (
    <div className={depth > 0 ? 'ml-4' : ''}>
      <button
        onClick={() => onToggle(folder.id)}
        className="w-full flex items-center justify-between p-3 bg-white/[0.06] hover:bg-white/[0.12] transition-colors rounded-xl mb-2 border border-white/10"
      >
        <div className="flex items-center gap-2">
          <span>{isExpanded ? '📂' : '📁'}</span>
          <span className="font-semibold text-gray-200 text-sm">{folder.name}</span>
          <span className="text-xs text-gray-500">({countFilesInFolder(folder)} songs)</span>
        </div>
        <span className="text-gray-500 text-xs">{isExpanded ? '▼' : '▶'}</span>
      </button>

      {isExpanded && (
        <div className="ml-4 space-y-1.5 mb-2">
          {folder.files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between px-3 py-2 bg-white/[0.03] rounded-xl border border-white/5"
            >
              <p className="text-sm text-gray-300 truncate flex-1">{file.name}</p>
              <div className="flex gap-2 ml-4 flex-shrink-0">
                <a
                  href={file.webContentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-white/10 hover:bg-white/20 text-gray-200 px-2.5 py-1 rounded-lg transition-colors"
                >
                  Download
                </a>
                <button
                  onClick={() => onCopy(file.webContentLink)}
                  className="text-xs bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white px-2.5 py-1 rounded-lg transition-all"
                >
                  Copy Link
                </button>
              </div>
            </div>
          ))}
          {folder.subfolders.map((sub) => (
            <FolderRow
              key={sub.id}
              folder={sub}
              depth={depth + 1}
              expanded={expanded}
              onToggle={onToggle}
              onCopy={onCopy}
            />
          ))}
        </div>
      )}
    </div>
  );
}