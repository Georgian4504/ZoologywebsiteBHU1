import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  FileText,
  ExternalLink,
  BookMarked,
  Check,
  Search,
  BookOpen,
  Filter,
  Layers,
  Sparkles,
  Download,
  ShieldCheck,
  FolderOpen
} from 'lucide-react';
import { SEMESTER_DATA } from '../data/zoologyData';
import { SemesterNumber, Paper, AcademicResource } from '../types';
import { addToShelf, isItemInShelf } from '../services/supabaseService';

interface SemesterSectionProps {
  selectedSemester: SemesterNumber;
  onSelectSemester: (sem: SemesterNumber) => void;
  onShelfUpdated: () => void;
}

export const SemesterSection: React.FC<SemesterSectionProps> = ({
  selectedSemester,
  onSelectSemester,
  onShelfUpdated,
}) => {
  const [expandedPapers, setExpandedPapers] = useState<Record<string, boolean>>({
    'sem1-p101': true,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('All');
  const [savedNotification, setSavedNotification] = useState<string | null>(null);

  const currentSemesterData = SEMESTER_DATA.find((s) => s.semester === selectedSemester) || SEMESTER_DATA[0];

  const togglePaper = (paperId: string) => {
    setExpandedPapers((prev) => ({
      ...prev,
      [paperId]: !prev[paperId],
    }));
  };

  const handleSaveToShelf = (paper: Paper, resource?: AcademicResource) => {
    const success = addToShelf({
      paperId: paper.id,
      paperCode: paper.code,
      paperTitle: paper.title,
      resourceTitle: resource ? resource.title : `${paper.code} Complete Syllabus & Modules`,
      resourceType: resource ? resource.type : 'Syllabus & Course Pack',
      driveUrl: resource ? resource.driveUrl : `https://drive.google.com/drive/folders/1bhu_zoology_${paper.code.toLowerCase()}`,
      semester: paper.semester,
    });

    if (success) {
      setSavedNotification(`Saved to My Shelf!`);
      onShelfUpdated();
      setTimeout(() => setSavedNotification(null), 2500);
    } else {
      setSavedNotification(`Already in your Shelf`);
      setTimeout(() => setSavedNotification(null), 2000);
    }
  };

  // Filter papers based on search query and type filter
  const filteredPapers = currentSemesterData.papers.filter((paper) => {
    const matchesSearch =
      paper.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.units.some(
        (u) =>
          u.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );

    const matchesType =
      selectedTypeFilter === 'All' ||
      (selectedTypeFilter === 'Theory' && paper.type.includes('Theory')) ||
      (selectedTypeFilter === 'Practical' && paper.type.includes('Practical')) ||
      (selectedTypeFilter === 'Elective' && paper.type.includes('Elective')) ||
      (selectedTypeFilter === 'Dissertation' && paper.type.includes('Dissertation'));

    return matchesSearch && matchesType;
  });

  return (
    <section id="semester-explorer" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {savedNotification && (
        <div className="fixed bottom-6 right-6 z-50 clay-card bg-[#223629] text-[#FCF9F3] px-4 py-2.5 flex items-center space-x-2 text-xs font-semibold shadow-2xl animate-fade-in border border-[#C67A3D]">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{savedNotification}</span>
        </div>
      )}

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#8F4E26] bg-[#DCE5D3] rounded-full inline-block mb-3 border border-[#223629]/10">
          Course Materials & Syllabus
        </span>
        <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-[#223629] tracking-tight">
          Semester Course Repository
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#223629]/80 font-light">
          Browse full syllabi with Unit I–IV breakdowns, solved PYQ question papers, and Google Drive links for BHU MSc Zoology.
        </p>
      </div>

      {/* Sticky Semester Pills */}
      <div className="sticky top-16 z-30 py-3 bg-[#F6F1E7]/90 backdrop-blur-md -mx-4 px-4 sm:mx-0 sm:px-0 mb-8 border-b border-[#C67A3D]/20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
          {/* Pills */}
          <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {[1, 2, 3, 4].map((semNum) => {
              const sem = semNum as SemesterNumber;
              const isActive = selectedSemester === sem;
              return (
                <button
                  key={sem}
                  onClick={() => onSelectSemester(sem)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center space-x-2 ${
                    isActive
                      ? 'clay-btn-primary shadow-md scale-105'
                      : 'clay-btn-secondary text-[#223629] hover:bg-[#DCE5D3]'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Semester {sem === 1 ? 'I' : sem === 2 ? 'II' : sem === 3 ? 'III' : 'IV'}</span>
                </button>
              );
            })}
          </div>

          {/* Search & Filter Controls */}
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-[#8F4E26] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search code, unit, topic..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-[#C67A3D]/25 bg-white text-[#223629] placeholder-[#223629]/50 focus:outline-none focus:ring-1 focus:ring-[#C67A3D]"
              />
            </div>

            <select
              value={selectedTypeFilter}
              onChange={(e) => setSelectedTypeFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded-xl border border-[#C67A3D]/25 bg-white text-[#223629] focus:outline-none cursor-pointer"
            >
              <option value="All">All Types</option>
              <option value="Theory">Theory</option>
              <option value="Practical">Practical</option>
              <option value="Elective">Elective</option>
              <option value="Dissertation">Dissertation</option>
            </select>
          </div>
        </div>
      </div>

      {/* Current Semester Summary Banner */}
      <div className="clay-card-inset p-4 sm:p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#223629]">
              {currentSemesterData.name}
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DCE5D3] text-[#223629]">
              {currentSemesterData.totalCredits} Credits
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#223629]/80 mt-1 max-w-3xl">
            {currentSemesterData.description}
          </p>
        </div>

        <div className="shrink-0 text-xs text-[#8F4E26] font-semibold bg-[#F6F1E7] px-3.5 py-2 rounded-xl border border-[#C67A3D]/20 shadow-sm flex items-center space-x-1.5">
          <BookOpen className="w-4 h-4 text-[#8F4E26]" />
          <span>{filteredPapers.length} Papers Displayed</span>
        </div>
      </div>

      {/* Papers Accordion List */}
      <div className="space-y-6">
        {filteredPapers.length === 0 ? (
          <div className="clay-card p-12 text-center text-[#223629]/70">
            <BookOpen className="w-12 h-12 mx-auto text-[#C67A3D] mb-3 opacity-60" />
            <p className="font-editorial text-lg font-bold text-[#223629]">No papers match your search criteria.</p>
            <p className="text-xs mt-1">Try clearing the search or switching semester tabs.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTypeFilter('All');
              }}
              className="clay-btn-secondary px-4 py-1.5 text-xs font-semibold mt-4"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredPapers.map((paper) => {
            const isExpanded = !!expandedPapers[paper.id];
            const inShelf = isItemInShelf(paper.id);

            return (
              <div
                key={paper.id}
                id={paper.code}
                className="clay-card overflow-hidden border border-[#C67A3D]/20 transition-all"
              >
                {/* Accordion Header */}
                <div
                  onClick={() => togglePaper(paper.id)}
                  className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-[#F3ECE0]/50 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-[#8F4E26] text-[#FCF9F3] flex items-center justify-center shrink-0 shadow-md font-bold font-editorial text-sm">
                      {paper.code.replace('ZOOL-', '')}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-bold text-xs text-[#8F4E26] bg-[#C67A3D]/15 px-2 py-0.5 rounded-md">
                          {paper.code}
                        </span>
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                            paper.type.includes('Practical')
                              ? 'bg-emerald-100 text-emerald-800'
                              : paper.type.includes('Elective')
                              ? 'bg-amber-100 text-amber-900'
                              : paper.type.includes('Dissertation')
                              ? 'bg-purple-100 text-purple-900'
                              : 'bg-[#DCE5D3] text-[#223629]'
                          }`}
                        >
                          {paper.type}
                        </span>
                        <span className="text-xs text-[#223629]/60 font-medium">
                          {paper.credits} Credits
                        </span>
                      </div>

                      <h4 className="font-editorial text-lg sm:text-xl font-bold text-[#223629] group-hover:text-[#8F4E26] transition-colors">
                        {paper.title}
                      </h4>
                      <p className="text-xs text-[#223629]/75 mt-0.5 line-clamp-1 sm:line-clamp-none">
                        {paper.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Header Controls */}
                  <div className="flex items-center space-x-2 shrink-0 self-end md:self-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSaveToShelf(paper);
                      }}
                      className={`p-2 rounded-lg border transition-all text-xs flex items-center space-x-1 ${
                        inShelf
                          ? 'bg-[#8F4E26] text-white border-[#8F4E26]'
                          : 'bg-white hover:bg-[#DCE5D3] text-[#223629] border-[#223629]/15'
                      }`}
                      title={inShelf ? 'In your shelf' : 'Bookmark to My Shelf'}
                    >
                      <BookMarked className="w-4 h-4" />
                      <span className="hidden sm:inline text-xs font-semibold">
                        {inShelf ? 'Saved' : 'Save'}
                      </span>
                    </button>

                    <div className="w-8 h-8 rounded-lg bg-[#EBF1E6] flex items-center justify-center text-[#223629]">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Accordion Body */}
                {isExpanded && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-8 pt-2 border-t border-[#223629]/10 bg-[#FAF7F0]/60 space-y-6">
                    {/* Unit Syllabus Breakdown */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-editorial text-sm font-bold text-[#8F4E26] uppercase tracking-wider flex items-center space-x-2">
                          <span>Syllabus Breakdown (Units & Modules)</span>
                        </h5>
                        <span className="text-[11px] text-[#223629]/60">BHU Board of Studies Approved</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {paper.units.map((unit) => (
                          <div
                            key={unit.unitNumber}
                            className="p-4 rounded-xl bg-white border border-[#C67A3D]/15 shadow-sm space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <span className="w-6 h-6 rounded-md bg-[#DCE5D3] text-[#223629] text-xs font-bold flex items-center justify-center">
                                U{unit.unitNumber}
                              </span>
                              <h6 className="text-xs sm:text-sm font-bold text-[#223629] leading-snug">
                                {unit.title}
                              </h6>
                            </div>

                            <ul className="space-y-1 pl-2">
                              {unit.topics.map((topic, idx) => (
                                <li
                                  key={idx}
                                  className="text-[11px] sm:text-xs text-[#223629]/80 flex items-start space-x-1.5"
                                >
                                  <span className="text-[#C67A3D] font-bold">•</span>
                                  <span>{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Verified Study Resources & Drive Integration */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-editorial text-sm font-bold text-[#8F4E26] uppercase tracking-wider flex items-center space-x-2">
                          <FolderOpen className="w-4 h-4 text-[#C67A3D]" />
                          <span>Verified Study Materials & Google Drive Links</span>
                        </h5>
                        <a
                          href={`https://drive.google.com/drive/folders/1bhu_zoology_${paper.code.toLowerCase()}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-[#8F4E26] hover:underline flex items-center space-x-1"
                        >
                          <span>Open Semester Drive Folder</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {paper.resources.map((res) => (
                          <div
                            key={res.id}
                            className="p-3.5 rounded-xl bg-[#F6F1E7] border border-[#C67A3D]/20 hover:border-[#C67A3D]/50 flex flex-col justify-between transition-all group"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#DCE5D3] text-[#223629]">
                                  {res.type}
                                </span>
                                {res.verified && (
                                  <span className="flex items-center space-x-0.5 text-[10px] text-emerald-700 font-semibold">
                                    <ShieldCheck className="w-3 h-3" />
                                    <span>Verified</span>
                                  </span>
                                )}
                              </div>

                              <h6 className="text-xs font-bold text-[#223629] group-hover:text-[#8F4E26] line-clamp-2 leading-snug">
                                {res.title}
                              </h6>
                              <p className="text-[10px] text-[#223629]/60 mt-1">By {res.author}</p>
                            </div>

                            <div className="mt-3 pt-2.5 border-t border-[#223629]/10 flex items-center justify-between">
                              <span className="text-[10px] text-[#223629]/50 font-medium">
                                {res.size || 'Google Drive'}
                              </span>

                              <div className="flex items-center space-x-1.5">
                                <button
                                  onClick={() => handleSaveToShelf(paper, res)}
                                  className="p-1 rounded text-[#8F4E26] hover:bg-[#DCE5D3]"
                                  title="Add resource to My Shelf"
                                >
                                  <BookMarked className="w-3.5 h-3.5" />
                                </button>

                                <a
                                  href={res.driveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-[#8F4E26] text-[#FCF9F3] text-[11px] font-semibold hover:bg-[#6C3717] transition-colors"
                                >
                                  <Download className="w-3 h-3" />
                                  <span>Drive</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
