import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { StatsCounter } from './components/StatsCounter';
import { AboutSection } from './components/AboutSection';
import { FeaturedResources } from './components/FeaturedResources';
import { SemesterSection } from './components/SemesterSection';
import { ResearchMasonry } from './components/ResearchMasonry';
import { Footer } from './components/Footer';
import { ShelfDrawer } from './components/ShelfDrawer';
import { ContributionModal } from './components/ContributionModal';
import { AdminModal } from './components/AdminModal';
import { HtmlExportModal } from './components/HtmlExportModal';
import { SemesterNumber, ShelfItem } from './types';
import { getMyShelf, getSupabaseConfig, fetchContributionsFromSupabase } from './services/supabaseService';

export default function App() {
  const [selectedSemester, setSelectedSemester] = useState<SemesterNumber>(1);
  const [shelfOpen, setShelfOpen] = useState(false);
  const [contributeOpen, setContributeOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  const [shelfItems, setShelfItems] = useState<ShelfItem[]>(() => getMyShelf());
  const [supabaseConnected, setSupabaseConnected] = useState<boolean>(() => {
    return getSupabaseConfig().isConnected;
  });

  useEffect(() => {
    // Automatically synchronize contributions with Supabase on app load
    fetchContributionsFromSupabase().catch((err) => {
      console.warn('Initial Supabase sync:', err);
    });
  }, []);

  const refreshShelf = () => {
    setShelfItems(getMyShelf());
  };

  const handleSelectSemester = (sem: SemesterNumber) => {
    setSelectedSemester(sem);
    const element = document.getElementById('semester-explorer');
    if (element) {
      const offset = 70;
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

  const handleNavigateToPaper = (paperCode: string, sem: number) => {
    setSelectedSemester(sem as SemesterNumber);
    setTimeout(() => {
      const targetEl = document.getElementById(paperCode);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F1E7] text-[#223629] selection:bg-[#C67A3D]/25 selection:text-[#8F4E26]">
      {/* Top Fixed Navigation */}
      <Navbar
        onOpenShelf={() => setShelfOpen(true)}
        onOpenContribute={() => setContributeOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenExport={() => setExportOpen(true)}
        shelfCount={shelfItems.length}
        supabaseConnected={supabaseConnected}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* Full-width Hero Banner with Parallax & Dark Gradient Overlay */}
        <HeroBanner
          onExploreSemesters={() => handleSelectSemester(1)}
          onBrowseMaterials={() => {
            const element = document.getElementById('semester-explorer');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />

        {/* Animated Visitor & Academic Stats Ribbon */}
        <StatsCounter />

        {/* About Department Two-Column Section */}
        <AboutSection />

        {/* Featured Resources (4 Clay Semester Cards) */}
        <FeaturedResources onSelectSemester={handleSelectSemester} />

        {/* Semesters I–IV Course Syllabus Accordion & Drive Links */}
        <SemesterSection
          selectedSemester={selectedSemester}
          onSelectSemester={setSelectedSemester}
          onShelfUpdated={refreshShelf}
        />

        {/* Research & Laboratory Facilities (Responsive Masonry Layout) */}
        <ResearchMasonry />
      </main>

      {/* Redesigned Footer */}
      <Footer
        onOpenContribute={() => setContributeOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenExport={() => setExportOpen(true)}
      />

      {/* Modals & Drawers */}
      <ShelfDrawer
        isOpen={shelfOpen}
        onClose={() => setShelfOpen(false)}
        shelfItems={shelfItems}
        onShelfUpdated={refreshShelf}
        onNavigateToPaper={handleNavigateToPaper}
      />

      <ContributionModal
        isOpen={contributeOpen}
        onClose={() => setContributeOpen(false)}
        onSubmitted={refreshShelf}
      />

      <AdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        onUpdated={() => {
          refreshShelf();
          setSupabaseConnected(getSupabaseConfig().isConnected);
        }}
      />

      <HtmlExportModal
        isOpen={exportOpen}
        onClose={() => setExportOpen(false)}
      />
    </div>
  );
}
