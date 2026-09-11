import React, { useState } from 'react';
import { X, UploadCloud, CheckCircle2, AlertCircle, FileText, Link, User, ShieldAlert, Database } from 'lucide-react';
import { SemesterNumber } from '../types';
import { addContribution, DEFAULT_SUPABASE_PROJECT_ID } from '../services/supabaseService';
import { SEMESTER_DATA } from '../data/zoologyData';

interface ContributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitted: () => void;
}

export const ContributionModal: React.FC<ContributionModalProps> = ({
  isOpen,
  onClose,
  onSubmitted,
}) => {
  const [semester, setSemester] = useState<SemesterNumber>(1);
  const [paperCode, setPaperCode] = useState('ZOOL-101');
  const [title, setTitle] = useState('');
  const [resourceType, setResourceType] = useState<'Notes' | 'PYQ' | 'Practical Manual' | 'Summary' | 'Other'>('Notes');
  const [driveUrl, setDriveUrl] = useState('');
  const [contributorName, setContributorName] = useState('');
  const [studentRollNo, setStudentRollNo] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successState, setSuccessState] = useState<{ show: boolean; syncedToDb: boolean }>({
    show: false,
    syncedToDb: false,
  });

  if (!isOpen) return null;

  const currentSemPapers = SEMESTER_DATA.find((s) => s.semester === semester)?.papers || [];

  const handleSemesterChange = (newSem: SemesterNumber) => {
    setSemester(newSem);
    const papers = SEMESTER_DATA.find((s) => s.semester === newSem)?.papers || [];
    if (papers.length > 0) {
      setPaperCode(papers[0].code);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !driveUrl.trim() || !contributorName.trim()) {
      alert('Please fill out the required fields (Title, Google Drive Link, Contributor Name).');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await addContribution({
        title: title.trim(),
        semester,
        paperCode,
        resourceType,
        driveUrl: driveUrl.trim(),
        contributorName: contributorName.trim(),
        studentRollNo: studentRollNo.trim() || undefined,
        description: description.trim() || 'Uploaded by student contributor',
      });

      setIsSubmitting(false);
      setSuccessState({
        show: true,
        syncedToDb: result.syncedToSupabase,
      });
      onSubmitted();

      setTimeout(() => {
        setSuccessState({ show: false, syncedToDb: false });
        onClose();
        // Reset form
        setTitle('');
        setDriveUrl('');
        setContributorName('');
        setStudentRollNo('');
        setDescription('');
      }, 2400);
    } catch (err: any) {
      setIsSubmitting(false);
      alert('Error submitting: ' + (err?.message || 'Unknown error'));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="clay-card max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 bg-[#F8F5EE] border border-[#C67A3D]/30 relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-[#223629]/60 hover:text-[#223629] hover:bg-[#E8DFC9] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#8F4E26] text-white flex items-center justify-center shadow-md">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-editorial text-2xl font-bold text-[#223629]">
              Contribute Study Material
            </h3>
            <p className="text-xs text-[#8F4E26] font-semibold">
              BHU Zoology Student Knowledge Sharing Network
            </p>
          </div>
        </div>

        {successState.show ? (
          <div className="clay-card-inset p-8 text-center space-y-3 bg-[#EBF1E6] border border-[#B9C9AD]">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="font-editorial text-xl font-bold text-[#223629]">Contribution Received!</h4>
            <p className="text-xs text-[#223629]/80 max-w-sm mx-auto">
              Thank you for contributing to the MSc Zoology student repository. Your notes have been recorded and will appear under the semester paper.
            </p>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/80 border border-emerald-300 text-emerald-800 text-[11px] font-medium">
              <Database className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {successState.syncedToDb
                  ? `Stored in Supabase Database (${DEFAULT_SUPABASE_PROJECT_ID})`
                  : 'Saved to local repository (Supabase table setup active)'}
              </span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Database Connection Pill */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#EFE9DC] border border-[#C67A3D]/20 text-[11px] text-[#223629]">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-semibold text-[#8F4E26]">Supabase Database Connected:</span>
                <code className="text-[10px] bg-white px-1.5 py-0.5 rounded font-mono text-[#223629]">
                  {DEFAULT_SUPABASE_PROJECT_ID}
                </code>
              </div>
              <span className="text-[10px] text-gray-500">Live Sync</span>
            </div>
            {/* Semester & Paper Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-[#223629] block mb-1">Select Semester *</label>
                <select
                  value={semester}
                  onChange={(e) => handleSemesterChange(parseInt(e.target.value, 10) as SemesterNumber)}
                  className="w-full p-2.5 rounded-xl border border-[#C67A3D]/30 bg-white font-medium focus:outline-none focus:ring-1 focus:ring-[#C67A3D]"
                >
                  <option value={1}>Semester I</option>
                  <option value={2}>Semester II</option>
                  <option value={3}>Semester III</option>
                  <option value={4}>Semester IV</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#223629] block mb-1">Paper Code *</label>
                <select
                  value={paperCode}
                  onChange={(e) => setPaperCode(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#C67A3D]/30 bg-white font-medium focus:outline-none focus:ring-1 focus:ring-[#C67A3D]"
                >
                  {currentSemPapers.map((paper) => (
                    <option key={paper.id} value={paper.code}>
                      {paper.code}: {paper.title.substring(0, 30)}...
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Resource Title */}
            <div>
              <label className="font-bold text-[#223629] block mb-1">Resource Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Comparative Aortic Arches Handwritten Notes & Hand-drawn Diagrams"
                className="w-full p-2.5 rounded-xl border border-[#C67A3D]/30 bg-white text-xs placeholder-[#223629]/40 focus:outline-none focus:ring-1 focus:ring-[#C67A3D]"
              />
            </div>

            {/* Resource Type */}
            <div>
              <label className="font-bold text-[#223629] block mb-1">Resource Type *</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(['Notes', 'PYQ', 'Practical Manual', 'Summary', 'Other'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setResourceType(type)}
                    className={`py-2 px-3 rounded-lg font-medium border text-center transition-all ${
                      resourceType === type
                        ? 'clay-btn-primary text-white border-[#8F4E26]'
                        : 'bg-white hover:bg-[#EBF1E6] text-[#223629] border-[#223629]/15'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Google Drive Link */}
            <div>
              <label className="font-bold text-[#223629] block mb-1">
                Google Drive / Cloud Storage Share Link *
              </label>
              <div className="relative">
                <Link className="w-4 h-4 text-[#8F4E26] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  required
                  value={driveUrl}
                  onChange={(e) => setDriveUrl(e.target.value)}
                  placeholder="https://drive.google.com/file/d/... or folder link"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#C67A3D]/30 bg-white placeholder-[#223629]/40 focus:outline-none focus:ring-1 focus:ring-[#C67A3D]"
                />
              </div>
              <p className="text-[10px] text-[#223629]/60 mt-1">
                Ensure access permission is set to <strong>"Anyone with the link can view"</strong>.
              </p>
            </div>

            {/* Contributor Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-[#223629] block mb-1">Contributor Name *</label>
                <input
                  type="text"
                  required
                  value={contributorName}
                  onChange={(e) => setContributorName(e.target.value)}
                  placeholder="e.g. Vikramaditya (MSc Batch 2022)"
                  className="w-full p-2.5 rounded-xl border border-[#C67A3D]/30 bg-white placeholder-[#223629]/40 focus:outline-none focus:ring-1 focus:ring-[#C67A3D]"
                />
              </div>

              <div>
                <label className="font-bold text-[#223629] block mb-1">Roll / Enrollment No (Optional)</label>
                <input
                  type="text"
                  value={studentRollNo}
                  onChange={(e) => setStudentRollNo(e.target.value)}
                  placeholder="e.g. 23ZOOL018"
                  className="w-full p-2.5 rounded-xl border border-[#C67A3D]/30 bg-white placeholder-[#223629]/40 focus:outline-none focus:ring-1 focus:ring-[#C67A3D]"
                />
              </div>
            </div>

            {/* Notes Description */}
            <div>
              <label className="font-bold text-[#223629] block mb-1">Description & Topic Tags</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Include brief topics covered, professor reference, or lecture date..."
                className="w-full p-2.5 rounded-xl border border-[#C67A3D]/30 bg-white placeholder-[#223629]/40 focus:outline-none focus:ring-1 focus:ring-[#C67A3D]"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="clay-btn-secondary py-2.5 px-4 font-semibold text-[#223629] flex-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="clay-btn-primary py-2.5 px-4 font-semibold flex-2 flex items-center justify-center space-x-2"
              >
                <UploadCloud className="w-4 h-4" />
                <span>{isSubmitting ? 'Uploading...' : 'Submit to Repository'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
