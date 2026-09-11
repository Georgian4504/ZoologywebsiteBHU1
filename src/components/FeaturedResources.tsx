import React from 'react';
import { BookOpen, ArrowUpRight, GraduationCap, Dna, Layers, Sparkles } from 'lucide-react';
import { SEMESTER_DATA } from '../data/zoologyData';
import { SemesterNumber } from '../types';

interface FeaturedResourcesProps {
  onSelectSemester: (sem: SemesterNumber) => void;
}

export const FeaturedResources: React.FC<FeaturedResourcesProps> = ({ onSelectSemester }) => {
  const semesterHighlights = [
    {
      sem: 1 as SemesterNumber,
      title: 'Semester I',
      subtitle: 'Foundational Core',
      icon: Layers,
      highlight: 'Biosystematics, Invertebrates, Cell Biology & General Physiology',
      credits: '24 Credits',
      papers: 6,
      badgeColor: 'bg-[#DCE5D3] text-[#223629]',
    },
    {
      sem: 2 as SemesterNumber,
      title: 'Semester II',
      subtitle: 'Organismal & Development',
      icon: Dna,
      highlight: 'Comparative Vertebrate Anatomy, Embryology, Wildlife Ecology & Biostatistics',
      credits: '24 Credits',
      papers: 6,
      badgeColor: 'bg-[#EBF1E6] text-[#223629]',
    },
    {
      sem: 3 as SemesterNumber,
      title: 'Semester III',
      subtitle: 'Specialization Streams',
      icon: GraduationCap,
      highlight: 'Biochemistry, Ethology, Fish Biology, Entomology & Endocrinology Electives',
      credits: '24 Credits',
      papers: 6,
      badgeColor: 'bg-[#C67A3D]/20 text-[#8F4E26]',
    },
    {
      sem: 4 as SemesterNumber,
      title: 'Semester IV',
      subtitle: 'Applied & Dissertation',
      icon: Sparkles,
      highlight: 'Applied Zoology, Biotechnology, Immunology, Master Thesis & Comprehensive Defense',
      credits: '24 Credits',
      papers: 6,
      badgeColor: 'bg-[#8F4E26]/15 text-[#8F4E26]',
    },
  ];

  return (
    <section id="featured-resources" className="py-16 bg-[#EDE5D5]/50 border-y border-[#C67A3D]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#8F4E26] bg-[#DCE5D3] rounded-full inline-block mb-3 border border-[#223629]/10">
              Curriculum Architecture
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#223629]">
              Featured Resources by Semester
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#223629]/75 font-light">
              Official course structures, detailed unit syllabi, and student-verified lecture notes.
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-xs text-[#8F4E26] font-semibold bg-[#F6F1E7] px-4 py-2 rounded-xl border border-[#C67A3D]/20 shadow-sm">
            Total 96 Credits • 2018 Revised CBCS Scheme
          </div>
        </div>

        {/* 4 Clay Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {semesterHighlights.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.sem}
                onClick={() => onSelectSemester(card.sem)}
                className="clay-card p-6 flex flex-col justify-between cursor-pointer group hover:border-[#C67A3D]/50 relative overflow-hidden"
              >
                {/* Top Row: Icon & Paper Count Badge */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#8F4E26]/10 text-[#8F4E26] flex items-center justify-center group-hover:bg-[#8F4E26] group-hover:text-white transition-colors shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${card.badgeColor}`}>
                      {card.papers} Papers
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl font-bold text-[#223629] group-hover:text-[#8F4E26] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#8F4E26] mb-3">
                    {card.subtitle}
                  </p>

                  <p className="text-xs text-[#223629]/75 leading-relaxed">
                    {card.highlight}
                  </p>
                </div>

                {/* Bottom Row: Credits & Jump Link */}
                <div className="mt-6 pt-4 border-t border-[#223629]/10 flex items-center justify-between">
                  <span className="text-xs font-medium text-[#223629]/70">
                    {card.credits}
                  </span>
                  <span className="inline-flex items-center space-x-1 text-xs font-bold text-[#8F4E26] group-hover:translate-x-1 transition-transform">
                    <span>Explore</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
