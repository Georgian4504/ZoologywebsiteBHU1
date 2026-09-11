import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, BookOpen, Camera, Sparkles, Award, Compass, RefreshCw, CheckCircle2 } from 'lucide-react';
import { DEPARTMENT_HERO_IMAGE, DEPARTMENT_HERO_IMAGE_BACKUP, DEPARTMENT_PHOTO_PRESETS } from '../data/zoologyData';
import { getStoredHeroImage, setStoredHeroImage } from '../services/supabaseService';

interface HeroBannerProps {
  onExploreSemesters: () => void;
  onBrowseMaterials: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreSemesters,
  onBrowseMaterials,
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [heroImgUrl, setHeroImgUrl] = useState<string>(() => {
    const stored = getStoredHeroImage();
    // Prioritize actual BHU photo over stale generic Unsplash links
    if (stored && !stored.includes('unsplash.com')) {
      return stored;
    }
    return DEPARTMENT_HERO_IMAGE;
  });
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Page load fade-in
    const timer = setTimeout(() => setIsLoaded(true), 80);

    // Parallax scroll listener
    const handleScroll = () => {
      // Gentle parallax factor 0.35
      if (window.scrollY < window.innerHeight * 1.2) {
        setScrollY(window.scrollY * 0.35);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setHeroImgUrl(result);
          setStoredHeroImage(result);
          setShowImageSelector(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCustomUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      setHeroImgUrl(inputUrl.trim());
      setStoredHeroImage(inputUrl.trim());
      setShowImageSelector(false);
      setInputUrl('');
    }
  };

  const handleSelectPreset = (url: string) => {
    setHeroImgUrl(url);
    setStoredHeroImage(url);
    setShowImageSelector(false);
  };

  const resetToDefaultImage = () => {
    setHeroImgUrl(DEPARTMENT_HERO_IMAGE);
    localStorage.removeItem('bhu_zoology_custom_hero_image');
    setShowImageSelector(false);
  };

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden select-none"
      style={{
        height: 'clamp(520px, 82vh, 880px)',
      }}
    >
      {/* Background Image Container with Parallax & Dark Gradient Overlay */}
      <div
        className="absolute inset-0 w-full h-[125%] -top-[12%] transition-transform duration-75 ease-out will-change-transform"
        style={{
          transform: `translateY(${scrollY}px)`,
        }}
      >
        <img
          src={heroImgUrl}
          alt="Department of Zoology building photograph, Banaras Hindu University"
          referrerPolicy="no-referrer"
          onError={() => {
            if (heroImgUrl !== DEPARTMENT_HERO_IMAGE_BACKUP) {
              setHeroImgUrl(DEPARTMENT_HERO_IMAGE_BACKUP);
            }
          }}
          className={`w-full h-full object-cover object-center transition-all duration-1000 ease-out ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        />

        {/* 40-55% Dark Gradient Overlay for Text Readability */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#17241C]/85 via-[#223629]/65 to-[#17241C]/40"
          style={{ mixBlendMode: 'multiply' }}
        />
        {/* Subtle bottom vignette to transition smoothly into Parchment */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#142018]/90 via-transparent to-[#142018]/30" />
      </div>

      {/* Main Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-between pt-24 pb-8 sm:pt-28 sm:pb-12">
        {/* Top bar with quick switch photo badge */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#F6F1E7]/15 backdrop-blur-md border border-white/20 text-[#DCE5D3] text-xs font-medium">
            <Compass className="w-3.5 h-3.5 text-[#C67A3D]" />
            <span>Institute of Science • BHU Main Campus</span>
          </div>

          <button
            onClick={() => setShowImageSelector(!showImageSelector)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-black/40 hover:bg-black/60 text-white/90 text-xs backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-sm"
            title="Upload or select actual department photo"
          >
            <Camera className="w-3.5 h-3.5 text-[#C67A3D]" />
            <span className="hidden sm:inline">Change Photo</span>
          </button>
        </div>

        {/* Hero Photo Switcher Popover */}
        {showImageSelector && (
          <div className="absolute top-24 right-4 sm:right-8 z-30 w-88 p-4 rounded-2xl bg-[#F6F1E7] shadow-2xl border border-[#C67A3D]/30 text-[#223629] animate-fadeIn max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-editorial text-sm font-bold text-[#8F4E26]">BHU Department Photo</h4>
              <button
                onClick={() => setShowImageSelector(false)}
                className="text-xs text-gray-500 hover:text-black p-1"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-gray-600 mb-3 leading-relaxed">
              Select an authentic BHU campus photo or upload your own department photograph:
            </p>

            {/* Presets Gallery */}
            <div className="space-y-2 mb-3">
              <div className="text-[11px] font-semibold text-[#8F4E26] uppercase tracking-wider">
                Actual BHU Photos
              </div>
              {DEPARTMENT_PHOTO_PRESETS.map((preset) => {
                const isCurrent = heroImgUrl === preset.url;
                return (
                  <div
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset.url)}
                    className={`flex items-center p-2 rounded-xl cursor-pointer transition-all border ${
                      isCurrent
                        ? 'bg-[#DCE5D3]/70 border-[#C67A3D] shadow-sm'
                        : 'bg-white/80 hover:bg-white border-black/5 hover:border-[#C67A3D]/40'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-10 object-cover rounded-lg mr-2.5 shrink-0 border border-black/10"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-[#223629] truncate flex items-center justify-between">
                        <span>{preset.name}</span>
                        {isCurrent && <CheckCircle2 className="w-3.5 h-3.5 text-[#C67A3D] ml-1 shrink-0" />}
                      </div>
                      <div className="text-[10px] text-gray-500 truncate">{preset.subtitle}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Upload or Custom URL */}
            <div className="pt-2 border-t border-[#C67A3D]/20">
              <div className="text-[11px] font-semibold text-[#8F4E26] uppercase tracking-wider mb-2">
                Custom Upload
              </div>
              <form onSubmit={handleCustomUrlSubmit} className="space-y-2">
                <input
                  type="url"
                  placeholder="Paste direct image URL..."
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[#C67A3D]/30 bg-white focus:outline-none focus:ring-1 focus:ring-[#C67A3D]"
                />
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="clay-btn-primary px-3 py-1.5 text-xs font-medium flex-1 cursor-pointer"
                  >
                    Apply URL
                  </button>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="clay-btn-secondary px-3 py-1.5 text-xs font-medium flex-1 cursor-pointer"
                  >
                    Upload Photo
                  </button>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={resetToDefaultImage}
                  className="w-full text-center text-[11px] text-[#8F4E26] hover:underline pt-1 flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset to default department photo</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Central Left Content & Bottom Right Floating Badge */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end my-auto">
          {/* Left Column: Hero Content */}
          <div
            className={`lg:col-span-8 transition-all duration-1000 ease-out transform ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Accreditation Ribbon */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#C67A3D]/80 backdrop-blur-md text-[#FCF9F3] text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Center of Advanced Study (UGC-CAS)</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#FCF9F3] tracking-tight leading-[1.08] drop-shadow-md">
              Department of Zoology
            </h1>

            {/* University Sub-heading */}
            <h3 className="font-editorial text-xl sm:text-2xl md:text-3xl text-[#DCE5D3] font-medium mt-3 drop-shadow">
              Banaras Hindu University
            </h3>

            {/* Tagline */}
            <p className="text-sm sm:text-base md:text-lg text-[#F6F1E7]/90 font-light tracking-wide mt-4 max-w-2xl leading-relaxed drop-shadow">
              Exploring Biodiversity • Advancing Life Sciences • Inspiring Research
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={onExploreSemesters}
                className="clay-btn-primary px-6 py-3.5 text-sm sm:text-base font-semibold flex items-center space-x-2 shadow-lg cursor-pointer"
              >
                <span>Explore Semesters</span>
                <ArrowRight className="w-4 h-4 text-amber-100" />
              </button>

              <button
                onClick={onBrowseMaterials}
                className="clay-btn-secondary px-6 py-3.5 text-sm sm:text-base font-semibold flex items-center space-x-2 shadow-lg cursor-pointer bg-[#F6F1E7]/90 text-[#223629] hover:bg-white"
              >
                <BookOpen className="w-4 h-4 text-[#8F4E26]" />
                <span>Browse Study Materials</span>
              </button>
            </div>
          </div>

          {/* Right Column: Floating Glass / Clay Badge on Bottom-Right */}
          <div
            className={`lg:col-span-4 flex justify-start lg:justify-end transition-all duration-1000 delay-200 ease-out transform ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="clay-badge p-5 sm:p-6 max-w-xs w-full text-[#223629] transform lg:hover:scale-105 transition-transform">
              <div className="flex items-center space-x-3 mb-3 pb-3 border-b border-[#223629]/10">
                <div className="w-10 h-10 rounded-xl bg-[#8F4E26] text-[#FCF9F3] flex items-center justify-center shadow-md">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-editorial text-lg font-bold text-[#8F4E26] leading-tight">
                    MSc Zoology
                  </h4>
                  <p className="text-xs text-[#223629]/75 font-medium">Postgraduate Portal</p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#223629]/90 font-medium">
                  <span>Architecture</span>
                  <span className="font-semibold text-[#8F4E26]">Student Resource Hub</span>
                </div>
                <div className="flex items-center justify-between text-[#223629]/90 font-medium">
                  <span>Syllabus Standards</span>
                  <span className="font-semibold text-[#223629]">Since 2018 Curriculum</span>
                </div>
                <div className="flex items-center justify-between text-[#223629]/90 font-medium">
                  <span>Evaluation Schema</span>
                  <span className="px-2 py-0.5 rounded-md bg-[#DCE5D3] text-[#223629] font-bold text-[10px]">
                    CBCS 96 Credits
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle bottom breadcrumb/scroll indicator */}
        <div className="hidden md:flex items-center justify-between text-xs text-[#DCE5D3]/70 pt-4 border-t border-white/10">
          <span>Banaras Hindu University • Varanasi 221005</span>
          <span>Scroll down to navigate academic units ↓</span>
        </div>
      </div>
    </section>
  );
};
