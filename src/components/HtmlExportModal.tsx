import React, { useState } from 'react';
import { X, Copy, Check, Download, Sparkles, FileCode } from 'lucide-react';
import { generateStandaloneHtml } from '../utils/standaloneHtmlGenerator';

interface HtmlExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HtmlExportModal: React.FC<HtmlExportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const standaloneHtml = generateStandaloneHtml();

  const handleCopy = () => {
    navigator.clipboard.writeText(standaloneHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([standaloneHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'index.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="clay-card max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 bg-[#F8F5EE] border border-[#C67A3D]/30 relative shadow-2xl flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-[#223629]/60 hover:text-[#223629] hover:bg-[#E8DFC9] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#8F4E26] text-white flex items-center justify-center shadow-md">
            <FileCode className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-editorial text-2xl font-bold text-[#223629]">
              Complete Standalone index.html
            </h3>
            <p className="text-xs text-[#8F4E26] font-semibold">
              Ready to replace or deploy directly to any static web host
            </p>
          </div>
        </div>

        <p className="text-xs text-[#223629]/80 mb-4">
          This export bundles the complete upgraded Department of Zoology portal—including the Hero photograph, claymorphism design system, Fraunces/Work Sans fonts, 2018 Revised MSc Zoology syllabus, research masonry, and Supabase integration—into a single self-contained <code>index.html</code>.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-4">
          <button
            onClick={handleCopy}
            className="clay-btn-primary px-4 py-2 text-xs font-semibold flex items-center space-x-2"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Full HTML!' : 'Copy index.html Code'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="clay-btn-secondary px-4 py-2 text-xs font-semibold flex items-center space-x-2 text-[#223629]"
          >
            <Download className="w-4 h-4 text-[#8F4E26]" />
            <span>Download index.html File</span>
          </button>
        </div>

        {/* Code Preview Box */}
        <div className="flex-1 min-h-[260px] bg-[#1a251d] text-[#DCE5D3] p-4 rounded-xl font-mono text-[11px] overflow-auto border border-[#223629]/30">
          <pre>{standaloneHtml.substring(0, 1800)}...&#10;&#10;/* [Total file length: {standaloneHtml.length.toLocaleString()} characters] */</pre>
        </div>
      </div>
    </div>
  );
};
