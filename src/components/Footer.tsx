import React from 'react';
import { GraduationCap, MapPin, Mail, Phone, ExternalLink, Heart, Shield, BookOpen, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenContribute: () => void;
  onOpenAdmin: () => void;
  onOpenExport: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenContribute,
  onOpenAdmin,
  onOpenExport,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact-footer" className="bg-[#EDE5D5] border-t-2 border-[#C67A3D]/25 pt-16 pb-12 text-[#223629]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Department & Logo Placeholder */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-[#8F4E26] text-[#FCF9F3] flex items-center justify-center shadow-md">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-editorial text-xl font-bold text-[#223629] leading-tight">
                  Department of Zoology
                </h4>
                <p className="text-xs text-[#8F4E26] font-semibold">
                  Banaras Hindu University
                </p>
              </div>
            </div>

            <p className="text-xs text-[#223629]/80 leading-relaxed">
              Centre of Advanced Study (UGC-CAS) in Zoology. Fostering research innovation, biodiversity conservation, and academic excellence in the holy city of Kashi.
            </p>

            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-[#DCE5D3] text-[11px] font-bold text-[#223629]">
              <Shield className="w-3.5 h-3.5 text-[#8F4E26]" />
              <span>Institute of Science • Est. 1916</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h5 className="font-editorial text-base font-bold text-[#8F4E26] uppercase tracking-wider">
              Quick Academic Links
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="#semester-explorer"
                  className="hover:text-[#8F4E26] hover:underline transition-colors flex items-center space-x-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#C67A3D]" />
                  <span>MSc Syllabus & Unit Papers</span>
                </a>
              </li>
              <li>
                <a
                  href="#featured-resources"
                  className="hover:text-[#8F4E26] hover:underline transition-colors flex items-center space-x-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C67A3D]" />
                  <span>2018 Revised CBCS Scheme</span>
                </a>
              </li>
              <li>
                <a
                  href="#research-laboratories"
                  className="hover:text-[#8F4E26] hover:underline transition-colors flex items-center space-x-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C67A3D]" />
                  <span>Research & Laboratories</span>
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenContribute}
                  className="hover:text-[#8F4E26] hover:underline transition-colors text-left flex items-center space-x-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C67A3D]" />
                  <span>Upload & Contribute Notes</span>
                </button>
              </li>
              <li>
                <a
                  href="https://www.bhu.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#8F4E26] hover:underline transition-colors flex items-center space-x-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#C67A3D]" />
                  <span>Official BHU Portal (bhu.ac.in)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Research Specializations */}
          <div className="space-y-3">
            <h5 className="font-editorial text-base font-bold text-[#8F4E26] uppercase tracking-wider">
              Specializations
            </h5>
            <ul className="space-y-1.5 text-xs text-[#223629]/80">
              <li>• Molecular Biology & Biochemistry</li>
              <li>• Fish Biology & Aquaculture</li>
              <li>• Entomology & Vector Biology</li>
              <li>• Histology & Histochemistry</li>
              <li>• Cytogenetics & Human Genomics</li>
              <li>• Wildlife Studies & Animal Ethology</li>
            </ul>
          </div>

          {/* Col 4: Contact Section */}
          <div className="space-y-3">
            <h5 className="font-editorial text-base font-bold text-[#8F4E26] uppercase tracking-wider">
              Contact Department
            </h5>
            <div className="space-y-2.5 text-xs text-[#223629]/85">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#8F4E26] shrink-0 mt-0.5" />
                <span>
                  Department of Zoology, Institute of Science, Banaras Hindu University, Varanasi – 221005, Uttar Pradesh, India
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#8F4E26] shrink-0" />
                <a href="mailto:zoology@bhu.ac.in" className="hover:underline">
                  zoology@bhu.ac.in
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#8F4E26] shrink-0" />
                <span>+91 542 2368140 / 2307323</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenExport}
                className="clay-btn-secondary py-1.5 px-3 text-[11px] font-semibold text-[#8F4E26] flex items-center space-x-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Download Standalone index.html</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Developed by Vikramaditya & Copyright BHU */}
        <div className="pt-8 border-t border-[#223629]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-col sm:flex-row items-center sm:space-x-4 text-center sm:text-left text-[#223629]/80">
            <span>
              Developed by <strong className="text-[#8F4E26]">Vikramaditya</strong> (Department of Zoology, BHU)
            </span>
            <span className="hidden sm:inline text-gray-400">•</span>
            <span>All rights reserved. Copyright © Banaras Hindu University</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onOpenAdmin}
              className="text-[#223629]/70 hover:text-[#8F4E26] transition-colors"
            >
              Faculty Login
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="text-[#8F4E26] font-semibold hover:underline"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
