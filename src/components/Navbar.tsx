import React, { useState, useEffect } from 'react';
import { BookMarked, UploadCloud, ShieldCheck, Menu, X, Database, GraduationCap, Sparkles } from 'lucide-react';
import { getMyShelf } from '../services/supabaseService';

interface NavbarProps {
  onOpenShelf: () => void;
  onOpenContribute: () => void;
  onOpenAdmin: () => void;
  onOpenExport: () => void;
  shelfCount: number;
  supabaseConnected: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenShelf,
  onOpenContribute,
  onOpenAdmin,
  onOpenExport,
  shelfCount,
  supabaseConnected,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar at very top */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-50 bg-[#E8DFC9]/50">
        <div
          className="h-full bg-gradient-to-r from-[#C67A3D] via-[#8F4E26] to-[#223629] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F6F1E7]/95 backdrop-blur-md shadow-md border-b border-[#C67A3D]/20 py-2.5'
            : 'bg-[#F6F1E7]/80 backdrop-blur-sm border-b border-[#C67A3D]/10 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center space-x-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8F4E26] to-[#C67A3D] flex items-center justify-center text-[#F6F1E7] shadow-md group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-editorial text-lg sm:text-xl font-bold tracking-tight text-[#223629]">
                  Dept. of Zoology
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold rounded-md bg-[#DCE5D3] text-[#223629] border border-[#223629]/15">
                  BHU
                </span>
              </div>
              <p className="text-[11px] text-[#8F4E26] font-medium hidden md:block">
                Banaras Hindu University • Est. 1916
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-[#223629]">
            <button
              onClick={() => scrollToSection('about-department')}
              className="hover:text-[#C67A3D] transition-colors cursor-pointer py-1"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('featured-resources')}
              className="hover:text-[#C67A3D] transition-colors cursor-pointer py-1"
            >
              Curriculum
            </button>
            <button
              onClick={() => scrollToSection('semester-explorer')}
              className="hover:text-[#C67A3D] transition-colors cursor-pointer py-1 font-semibold text-[#8F4E26]"
            >
              Semesters I–IV
            </button>
            <button
              onClick={() => scrollToSection('research-laboratories')}
              className="hover:text-[#C67A3D] transition-colors cursor-pointer py-1"
            >
              Research & Labs
            </button>
            <button
              onClick={() => scrollToSection('contact-footer')}
              className="hover:text-[#C67A3D] transition-colors cursor-pointer py-1"
            >
              Contact
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Supabase Status Chip */}
            <div
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                supabaseConnected
                  ? 'bg-[#EBF1E6] text-[#223629] border-[#B9C9AD]'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}
              title={supabaseConnected ? 'Supabase Database Connected' : 'Local Offline Mode Active'}
            >
              <Database className="w-3 h-3 text-[#223629]" />
              <span className="hidden xl:inline">{supabaseConnected ? 'Supabase Synced' : 'Local DB'}</span>
            </div>

            {/* Custom Shelf Button */}
            <button
              onClick={onOpenShelf}
              className="relative flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-[#223629] bg-[#EBF1E6] hover:bg-[#DCE5D3] rounded-lg border border-[#223629]/15 transition-all cursor-pointer shadow-sm hover:shadow"
              title="View your saved papers and notes"
            >
              <BookMarked className="w-4 h-4 text-[#8F4E26]" />
              <span className="font-semibold">My Shelf</span>
              {shelfCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-[#8F4E26] text-white text-[10px] font-bold rounded-full">
                  {shelfCount}
                </span>
              )}
            </button>

            {/* Contribute Button */}
            <button
              onClick={onOpenContribute}
              className="clay-btn-primary flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-semibold cursor-pointer"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Contribute</span>
            </button>

            {/* Admin Login Button */}
            <button
              onClick={onOpenAdmin}
              className="p-1.5 text-[#223629]/70 hover:text-[#223629] hover:bg-[#E8DFC9]/60 rounded-lg transition-colors cursor-pointer"
              title="Admin Portal"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>

            {/* Export Standalone HTML Modal Trigger */}
            <button
              onClick={onOpenExport}
              className="p-1.5 text-[#C67A3D] hover:text-[#8F4E26] hover:bg-[#E8DFC9]/60 rounded-lg transition-colors cursor-pointer"
              title="Export Standalone index.html"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              onClick={onOpenShelf}
              className="relative p-1.5 text-[#223629] bg-[#EBF1E6] rounded-lg border border-[#223629]/15"
            >
              <BookMarked className="w-5 h-5 text-[#8F4E26]" />
              {shelfCount > 0 && (
                <span className="absolute -top-1 -right-1 px-1 bg-[#8F4E26] text-white text-[9px] font-bold rounded-full">
                  {shelfCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#223629] hover:bg-[#E8DFC9]/60 rounded-lg"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden px-4 pt-3 pb-5 bg-[#F6F1E7] border-b border-[#C67A3D]/20 space-y-3">
            <div className="flex flex-col space-y-2 text-sm font-medium text-[#223629]">
              <button
                onClick={() => scrollToSection('about-department')}
                className="text-left py-1.5 px-2 hover:bg-[#DCE5D3] rounded-md"
              >
                About Department
              </button>
              <button
                onClick={() => scrollToSection('featured-resources')}
                className="text-left py-1.5 px-2 hover:bg-[#DCE5D3] rounded-md"
              >
                Curriculum Overview
              </button>
              <button
                onClick={() => scrollToSection('semester-explorer')}
                className="text-left py-1.5 px-2 font-semibold text-[#8F4E26] hover:bg-[#DCE5D3] rounded-md"
              >
                Semesters I–IV Repository
              </button>
              <button
                onClick={() => scrollToSection('research-laboratories')}
                className="text-left py-1.5 px-2 hover:bg-[#DCE5D3] rounded-md"
              >
                Research & Laboratories
              </button>
              <button
                onClick={() => scrollToSection('contact-footer')}
                className="text-left py-1.5 px-2 hover:bg-[#DCE5D3] rounded-md"
              >
                Contact & Administration
              </button>
            </div>

            <div className="pt-2 border-t border-[#C67A3D]/20 flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContribute();
                }}
                className="clay-btn-primary flex-1 py-2 text-xs font-semibold flex items-center justify-center space-x-1.5"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Contribute Notes</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="clay-btn-secondary px-3 py-2 text-xs font-medium flex items-center justify-center space-x-1"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenExport();
                }}
                className="clay-btn-secondary px-3 py-2 text-xs font-medium flex items-center justify-center space-x-1 text-[#8F4E26]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Get HTML</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
