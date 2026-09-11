import React, { useEffect, useState } from 'react';
import { Users, FileText, FlaskConical, Award, TrendingUp } from 'lucide-react';
import { getVisitorCount } from '../services/supabaseService';

export const StatsCounter: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState<number>(14820);
  const [displayCount, setDisplayCount] = useState<number>(14000);

  useEffect(() => {
    const realCount = getVisitorCount();
    setVisitorCount(realCount);

    // Number counting animation
    let start = realCount - 150;
    const duration = 1500;
    const stepTime = 30;
    const increment = (realCount - start) / (duration / stepTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= realCount) {
        setDisplayCount(realCount);
        clearInterval(timer);
      } else {
        setDisplayCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      id: 'visitors',
      icon: Users,
      value: displayCount.toLocaleString(),
      label: 'Visitor Counter',
      subtitle: 'Active Scholars & Alumni',
      color: 'text-[#8F4E26]',
      bg: 'bg-[#C67A3D]/10',
    },
    {
      id: 'papers',
      icon: FileText,
      value: '24 Papers',
      label: 'Complete Curriculum',
      subtitle: 'Semesters I to IV Covered',
      color: 'text-[#223629]',
      bg: 'bg-[#DCE5D3]',
    },
    {
      id: 'laboratories',
      icon: FlaskConical,
      value: '6 Units',
      label: 'Research Laboratories',
      subtitle: 'Molecular to Field Wildlife',
      color: 'text-[#C67A3D]',
      bg: 'bg-[#C67A3D]/10',
    },
    {
      id: 'curriculum',
      icon: Award,
      value: '2018 CBCS',
      label: 'Revised Curriculum',
      subtitle: 'UGC-CAS Accredited Syllabus',
      color: 'text-[#8F4E26]',
      bg: 'bg-[#DCE5D3]',
    },
  ];

  return (
    <section className="relative -mt-8 sm:-mt-12 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="clay-card p-5 sm:p-6 flex items-center space-x-4 border border-[#C67A3D]/15"
            >
              <div
                className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center shrink-0 shadow-inner`}
              >
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-editorial text-2xl sm:text-3xl font-bold text-[#223629] tracking-tight">
                    {stat.value}
                  </span>
                  {stat.id === 'visitors' && (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-semibold text-[#8F4E26] uppercase tracking-wider mt-0.5 truncate">
                  {stat.label}
                </h4>
                <p className="text-[11px] text-[#223629]/70 truncate mt-0.5">{stat.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
