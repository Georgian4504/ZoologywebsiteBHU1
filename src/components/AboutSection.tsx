import React from 'react';
import { Landmark, Award, Microscope, BookOpenCheck, Users2, FileSpreadsheet, Share2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about-department" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#8F4E26] bg-[#DCE5D3] rounded-full inline-block mb-3 border border-[#223629]/10">
          Academic Heritage & Mission
        </span>
        <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-[#223629] tracking-tight">
          About the Department
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[#223629]/80 font-light leading-relaxed">
          Established at Banaras Hindu University, the Department of Zoology is one of the premier centers of biological learning and evolutionary research in Asia.
        </p>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
        {/* Left Column: History, Excellence, Environment */}
        <div className="clay-card p-6 sm:p-8 md:p-10 flex flex-col justify-between border border-[#C67A3D]/20 bg-gradient-to-br from-[#F8F5EE] to-[#F1EBE0]">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#8F4E26] text-[#FCF9F3] flex items-center justify-center shadow-md">
                <Landmark className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#223629]">
                  Legacy of Excellence
                </h3>
                <p className="text-xs text-[#8F4E26] font-semibold tracking-wide">
                  Department Heritage & Research Ethos
                </p>
              </div>
            </div>

            <div className="space-y-6 text-sm text-[#223629]/85 leading-relaxed">
              {/* Department History */}
              <div className="pb-5 border-b border-[#223629]/10">
                <h4 className="font-editorial text-lg font-bold text-[#8F4E26] mb-2 flex items-center space-x-2">
                  <span>Department History</span>
                </h4>
                <p>
                  Founded under the visionary patronage of Mahamana Pandit Madan Mohan Malaviya, the Department of Zoology has pioneered organismal, ecological, and cellular sciences for over a century. It stands as a cornerstone of the Institute of Science at BHU, nurturing generations of distinguished zoologists, academics, and civil servants.
                </p>
              </div>

              {/* Research Excellence */}
              <div className="pb-5 border-b border-[#223629]/10">
                <h4 className="font-editorial text-lg font-bold text-[#8F4E26] mb-2 flex items-center space-x-2">
                  <Award className="w-4 h-4 text-[#C67A3D]" />
                  <span>Research Excellence</span>
                </h4>
                <p>
                  Recognized by the University Grants Commission as a prestigious <strong>Centre of Advanced Study (UGC-CAS)</strong> and generously augmented by DST-FIST and DBT programs. Faculty and scholars contribute breakthrough publications in cytogenetics, endocrinology, fish physiology, and wildlife conservation across top international journals.
                </p>
              </div>

              {/* Academic Environment */}
              <div>
                <h4 className="font-editorial text-lg font-bold text-[#8F4E26] mb-2 flex items-center space-x-2">
                  <Microscope className="w-4 h-4 text-[#C67A3D]" />
                  <span>Academic Environment</span>
                </h4>
                <p>
                  Home to the historic Chitrangada laboratories, high-resolution confocal and microtomy units, state-of-the-art animal facilities, and an exhaustive zoological museum housing over 5,000 preserved vertebrate and invertebrate rare specimens.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-[#223629]/10 flex items-center justify-between text-xs text-[#8F4E26] font-medium">
            <span>UGC-CAS Phase III Accredited</span>
            <span>Est. Institute of Science, BHU</span>
          </div>
        </div>

        {/* Right Column: 2018 Revised Curriculum & Student Driven Hub */}
        <div className="space-y-5 flex flex-col justify-between">
          {/* Card 1: 2018 Revised Curriculum */}
          <div className="clay-card p-6 border border-[#C67A3D]/20 bg-[#FAF7F0] hover:bg-[#F6F1E7]">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-[#DCE5D3] text-[#223629] flex items-center justify-center shrink-0 shadow-sm">
                <BookOpenCheck className="w-5 h-5 text-[#8F4E26]" />
              </div>
              <div>
                <h4 className="font-editorial text-lg font-bold text-[#223629]">
                  2018 Revised Curriculum
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-[#223629]/80 leading-relaxed">
                  Adopted under the Choice Based Credit System (CBCS). It synchronizes classical zoology with modern genomics, bioinformatics, neurobiology, and specialized dissertation tracks across 96 credit points.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Student Driven Repository */}
          <div className="clay-card p-6 border border-[#C67A3D]/20 bg-[#FAF7F0] hover:bg-[#F6F1E7]">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-[#C67A3D]/15 text-[#8F4E26] flex items-center justify-center shrink-0 shadow-sm">
                <Users2 className="w-5 h-5 text-[#8F4E26]" />
              </div>
              <div>
                <h4 className="font-editorial text-lg font-bold text-[#223629]">
                  Student Driven Repository
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-[#223629]/80 leading-relaxed">
                  Initiated by postgraduate scholars to democratize access to high-yield lecture transcripts, solved question banks (2018–2024), and curated revision sheets verified by top rank holders.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Practical + Theory Resources */}
          <div className="clay-card p-6 border border-[#C67A3D]/20 bg-[#FAF7F0] hover:bg-[#F6F1E7]">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-[#DCE5D3] text-[#223629] flex items-center justify-center shrink-0 shadow-sm">
                <FileSpreadsheet className="w-5 h-5 text-[#223629]" />
              </div>
              <div>
                <h4 className="font-editorial text-lg font-bold text-[#223629]">
                  Practical + Theory Resources
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-[#223629]/80 leading-relaxed">
                  Laboratory protocols, staining standard operating procedures (SOPs), microtome sectioning guidelines, and field survey ecology sheets directly linked for instant PDF downloads.
                </p>
              </div>
            </div>
          </div>

          {/* Card 4: Open Contribution System */}
          <div className="clay-card p-6 border border-[#C67A3D]/20 bg-[#FAF7F0] hover:bg-[#F6F1E7]">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-[#C67A3D]/15 text-[#8F4E26] flex items-center justify-center shrink-0 shadow-sm">
                <Share2 className="w-5 h-5 text-[#8F4E26]" />
              </div>
              <div>
                <h4 className="font-editorial text-lg font-bold text-[#223629]">
                  Open Contribution System
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-[#223629]/80 leading-relaxed">
                  Transparent student submission pipeline. Any enrolled student or research scholar can upload study materials, dissertation guidelines, or PYQ solutions with automatic peer moderation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
