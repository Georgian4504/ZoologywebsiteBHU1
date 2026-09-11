import React from 'react';
import { X, BookMarked, ExternalLink, Trash2, FolderOpen, ArrowRight, Download } from 'lucide-react';
import { ShelfItem } from '../types';
import { removeFromShelf } from '../services/supabaseService';

interface ShelfDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  shelfItems: ShelfItem[];
  onShelfUpdated: () => void;
  onNavigateToPaper: (paperCode: string, semester: number) => void;
}

export const ShelfDrawer: React.FC<ShelfDrawerProps> = ({
  isOpen,
  onClose,
  shelfItems,
  onShelfUpdated,
  onNavigateToPaper,
}) => {
  if (!isOpen) return null;

  const handleRemove = (id: string) => {
    removeFromShelf(id);
    onShelfUpdated();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="w-full max-w-md bg-[#F8F5EE] h-full shadow-2xl flex flex-col border-l border-[#C67A3D]/30">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#F1EBE0] border-b border-[#C67A3D]/20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#8F4E26] text-white flex items-center justify-center shadow-md">
              <BookMarked className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial text-xl font-bold text-[#223629]">
                My Study Shelf
              </h3>
              <p className="text-xs text-[#8F4E26] font-semibold">
                {shelfItems.length} Bookmarked {shelfItems.length === 1 ? 'Resource' : 'Resources'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#223629]/60 hover:text-[#223629] hover:bg-[#E8DFC9] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {shelfItems.length === 0 ? (
            <div className="clay-card-inset p-8 text-center text-[#223629]/70 space-y-3 mt-8">
              <BookMarked className="w-12 h-12 mx-auto text-[#C67A3D] opacity-60" />
              <h4 className="font-editorial text-lg font-bold text-[#223629]">Your shelf is currently empty.</h4>
              <p className="text-xs max-w-xs mx-auto">
                Click the <strong>"Save"</strong> button next to any semester paper or lecture note to add it to your personal study shelf for quick access!
              </p>
            </div>
          ) : (
            shelfItems.map((item) => (
              <div
                key={item.id}
                className="clay-card p-4 border border-[#C67A3D]/20 hover:border-[#C67A3D]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#DCE5D3] text-[#223629]">
                      Semester {item.semester} • {item.paperCode}
                    </span>
                    <span className="text-[10px] text-[#223629]/50">{item.savedAt}</span>
                  </div>

                  <h5 className="font-editorial text-sm font-bold text-[#223629] leading-snug mt-1">
                    {item.resourceTitle}
                  </h5>
                  <p className="text-xs text-[#8F4E26] font-medium mt-0.5">
                    {item.paperTitle}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#223629]/10 flex items-center justify-between text-xs">
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateToPaper(item.paperCode, item.semester);
                    }}
                    className="text-[11px] font-semibold text-[#8F4E26] hover:underline flex items-center space-x-1"
                  >
                    <span>View Syllabus</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <div className="flex items-center space-x-2">
                    <a
                      href={item.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-md bg-[#8F4E26] text-white text-[11px] font-semibold hover:bg-[#6C3717] flex items-center space-x-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>Drive</span>
                    </a>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="p-1.5 rounded text-red-700 hover:bg-red-50 transition-colors"
                      title="Remove from Shelf"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {shelfItems.length > 0 && (
          <div className="p-4 bg-[#EDE5D5] border-t border-[#C67A3D]/20 flex items-center justify-between text-xs">
            <span className="text-[#223629]/70 font-medium">Synced with Local Storage</span>
            <button
              onClick={() => {
                if (confirm('Clear all items from your shelf?')) {
                  localStorage.removeItem('bhu_zoology_my_shelf');
                  onShelfUpdated();
                }
              }}
              className="text-red-700 hover:underline font-semibold"
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
