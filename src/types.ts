export type SemesterNumber = 1 | 2 | 3 | 4;

export interface SyllabusUnit {
  unitNumber: number;
  title: string;
  topics: string[];
}

export interface AcademicResource {
  id: string;
  title: string;
  type: 'Notes' | 'PYQ' | 'Reference Book' | 'Practical Manual' | 'Lecture Slides';
  format: 'PDF' | 'Doc' | 'Drive Folder' | 'Handwritten';
  author: string;
  driveUrl: string;
  size?: string;
  verified: boolean;
  downloads?: number;
}

export interface Paper {
  id: string;
  code: string;
  title: string;
  credits: number;
  type: 'Core Theory' | 'Core Practical' | 'Major Elective' | 'Dissertation';
  semester: SemesterNumber;
  description: string;
  units: SyllabusUnit[];
  resources: AcademicResource[];
}

export interface SemesterInfo {
  semester: SemesterNumber;
  name: string;
  description: string;
  totalCredits: number;
  paperCount: number;
  papers: Paper[];
}

export interface Contribution {
  id: string;
  title: string;
  semester: SemesterNumber;
  paperCode: string;
  resourceType: 'Notes' | 'PYQ' | 'Practical Manual' | 'Summary' | 'Other';
  driveUrl: string;
  contributorName: string;
  studentRollNo?: string;
  email?: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface ResearchLab {
  id: string;
  category: 'Molecular Biology' | 'Fish Biology' | 'Entomology' | 'Histology' | 'Genetics' | 'Wildlife Studies';
  title: string;
  description: string;
  leadFaculty: string;
  imageUrl: string;
  tags: string[];
  keyResearchAreas: string[];
}

export interface ShelfItem {
  id: string;
  paperId: string;
  paperCode: string;
  paperTitle: string;
  resourceTitle: string;
  resourceType: string;
  driveUrl: string;
  semester: SemesterNumber;
  savedAt: string;
}

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  projectId?: string;
  isConnected: boolean;
}
