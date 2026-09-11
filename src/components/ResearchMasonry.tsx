import React, { useState } from 'react';
import { Microscope, ArrowUpRight, Tag, Users, Sparkles, Filter } from 'lucide-react';
import { RESEARCH_LABS } from '../data/zoologyData';
import { ResearchLab } from '../types';

export const ResearchMasonry: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Molecular Biology',
    'Fish Biology',
    'Entomology',
    'Histology',
    'Genetics',
    'Wildlife Studies',
  ];

  const filteredLabs =
    selectedCategory === 'All'
      ? RESEARCH_LABS
      : RESEARCH_LABS.filter((lab) => lab.category === selectedCategory);

  return (
    <section id="research-laboratories" className="py-16 sm:py-24 bg-[#FAF7F0] border-t border-[#C67A3D]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#8F4E26] bg-[#DCE5D3] rounded-full inline-block mb-3 border border-[#223629]/10">
            Advanced Life Sciences
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-[#223629] tracking-tight">
            Research & Laboratory Facilities
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#223629]/80 font-light leading-relaxed">
            World-class experimental facilities, specialized research groups, and doctoral dissertations driving frontier discoveries in zoological sciences.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'clay-btn-primary shadow-sm scale-105'
                  : 'clay-btn-secondary text-[#223629] hover:bg-[#DCE5D3]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Masonry Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {filteredLabs.map((lab: ResearchLab, index: number) => {
            return (
              <div
                key={lab.id}
                className="clay-card overflow-hidden group border border-[#C67A3D]/20 flex flex-col justify-between hover:shadow-xl transition-all"
              >
                {/* Laboratory Image */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#E8DFC9]">
                  <img
                    src={lab.imageUrl}
                    alt={lab.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  {/* Category Pill on image */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#F6F1E7]/90 text-[#223629] backdrop-blur-md shadow-sm border border-white/40">
                      {lab.category}
                    </span>
                  </div>

                  {/* Faculty Lead on bottom of image */}
                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium truncate flex items-center space-x-1.5">
                    <Users className="w-3.5 h-3.5 text-[#C67A3D]" />
                    <span className="truncate">{lab.leadFaculty}</span>
                  </div>
                </div>

                {/* Laboratory Details */}
                <div className="p-5 sm:p-6 space-y-4">
                  <h3 className="font-editorial text-lg sm:text-xl font-bold text-[#223629] group-hover:text-[#8F4E26] transition-colors leading-snug">
                    {lab.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#223629]/80 leading-relaxed">
                    {lab.description}
                  </p>

                  {/* Key Research Areas */}
                  <div className="pt-2 border-t border-[#223629]/10">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8F4E26] block mb-1.5">
                      Focus Areas:
                    </span>
                    <ul className="space-y-1">
                      {lab.keyResearchAreas.map((area, aIdx) => (
                        <li
                          key={aIdx}
                          className="text-xs text-[#223629]/85 flex items-start space-x-1.5"
                        >
                          <span className="text-[#C67A3D] font-bold">›</span>
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {lab.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EBF1E6] text-[#223629] border border-[#223629]/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-5 py-3 sm:px-6 bg-[#EDE5D5]/50 border-t border-[#C67A3D]/15 flex items-center justify-between text-xs text-[#8F4E26] font-semibold">
                  <span>DST-FIST Supported</span>
                  <span className="inline-flex items-center space-x-1 group-hover:underline">
                    <span>Lab Protocols</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
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
