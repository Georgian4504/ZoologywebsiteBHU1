import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Contribution, ShelfItem, SupabaseConfig } from '../types';
import { INITIAL_CONTRIBUTIONS } from '../data/zoologyData';

export const DEFAULT_SUPABASE_PROJECT_ID = 'ckkljjpjmsfytihcgeyb';
export const DEFAULT_SUPABASE_URL = 'https://ckkljjpjmsfytihcgeyb.supabase.co';
export const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_yjbKYSF5m3JfaTiC2t0ynA_05Lx-nzq';

const STORAGE_KEYS = {
  VISITOR_COUNT: 'bhu_zoology_visitor_count',
  HAS_VISITED: 'bhu_zoology_has_visited_session',
  CONTRIBUTIONS: 'bhu_zoology_contributions',
  MY_SHELF: 'bhu_zoology_my_shelf',
  SUPABASE_CONFIG: 'bhu_zoology_supabase_config',
  HERO_IMAGE: 'bhu_zoology_custom_hero_image',
};

export const SUPABASE_SQL_SETUP_SCRIPT = `-- =========================================================
-- BHU Department of Zoology: Contributions Table Setup
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/ckkljjpjmsfytihcgeyb/sql
-- =========================================================

CREATE TABLE IF NOT EXISTS public.contributions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  semester INTEGER NOT NULL,
  paper_code TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  drive_url TEXT NOT NULL,
  contributor_name TEXT NOT NULL,
  student_roll_no TEXT,
  email TEXT,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  submitted_at TEXT NOT NULL DEFAULT CURRENT_DATE::text,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.contributions ENABLE ROW LEVEL SECURITY;

-- 1. Allow everyone to read contributions
DROP POLICY IF EXISTS "Allow public read contributions" ON public.contributions;
CREATE POLICY "Allow public read contributions"
  ON public.contributions FOR SELECT
  USING (true);

-- 2. Allow students to submit study materials
DROP POLICY IF EXISTS "Allow public insert contributions" ON public.contributions;
CREATE POLICY "Allow public insert contributions"
  ON public.contributions FOR INSERT
  WITH CHECK (true);

-- 3. Allow department faculty / admin to update status (approve / reject)
DROP POLICY IF EXISTS "Allow public update contributions" ON public.contributions;
CREATE POLICY "Allow public update contributions"
  ON public.contributions FOR UPDATE
  USING (true);

-- Optional: Initial Seed Data for Zoology Portal
INSERT INTO public.contributions (id, title, semester, paper_code, resource_type, drive_url, contributor_name, student_roll_no, description, status, submitted_at)
VALUES 
  ('contrib-101', 'ZOOL-101 Non-Chordates Comparative Hand-Drawn Diagrams', 1, 'ZOOL-101', 'Notes', 'https://drive.google.com/drive/folders/bhu_sample_1', 'Ananya Sharma', '22ZOOL04', 'Digitized anatomical pen-and-ink diagrams covering Invertebrate Bauplans.', 'approved', '2024-09-02'),
  ('contrib-102', 'ZOOL-201 Endocrine Signaling Cascades Comprehensive Flowcharts', 2, 'ZOOL-201', 'Summary', 'https://drive.google.com/drive/folders/bhu_sample_2', 'Rahul Verma', '22ZOOL19', 'Handcrafted pathways for hypothalamic-pituitary-gonadal axis.', 'approved', '2024-09-10')
ON CONFLICT (id) DO NOTHING;
`;

let supabaseClientInstance: SupabaseClient | null = null;

export const getSupabaseConfig = (): SupabaseConfig => {
  const stored = localStorage.getItem(STORAGE_KEYS.SUPABASE_CONFIG);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed && parsed.url && parsed.anonKey) {
        return {
          url: parsed.url,
          anonKey: parsed.anonKey,
          projectId: parsed.projectId || DEFAULT_SUPABASE_PROJECT_ID,
          isConnected: true,
        };
      }
    } catch {
      // Fall through
    }
  }

  const envUrl = (import.meta as any).env?.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const envKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

  return {
    url: envUrl,
    anonKey: envKey,
    projectId: DEFAULT_SUPABASE_PROJECT_ID,
    isConnected: true,
  };
};

export const saveSupabaseConfig = (config: SupabaseConfig) => {
  localStorage.setItem(STORAGE_KEYS.SUPABASE_CONFIG, JSON.stringify(config));
  supabaseClientInstance = null; // Recreate on next call
};

export const getSupabaseClient = (): SupabaseClient => {
  if (!supabaseClientInstance) {
    const config = getSupabaseConfig();
    supabaseClientInstance = createClient(config.url, config.anonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }
  return supabaseClientInstance;
};

export interface SupabaseTestResult {
  connected: boolean;
  tableReady: boolean;
  message: string;
  statusCode?: number;
  errorDetails?: string;
  recordCount?: number;
}

export const testSupabaseConnection = async (): Promise<SupabaseTestResult> => {
  try {
    const client = getSupabaseClient();
    const config = getSupabaseConfig();

    const { data, error, status } = await client
      .from('contributions')
      .select('id, status', { count: 'exact' })
      .limit(5);

    if (error) {
      // Check if table is missing
      if (error.code === 'PGRST205' || error.message.toLowerCase().includes('could not find the table')) {
        return {
          connected: true,
          tableReady: false,
          statusCode: status,
          message: `Connected to Supabase project (${config.projectId || 'ckkljjpjmsfytihcgeyb'}), but table "public.contributions" has not been created yet in the database.`,
          errorDetails: error.message,
        };
      }

      return {
        connected: false,
        tableReady: false,
        statusCode: status,
        message: `Connection failed: ${error.message}`,
        errorDetails: error.message,
      };
    }

    return {
      connected: true,
      tableReady: true,
      statusCode: status,
      recordCount: data ? data.length : 0,
      message: `Successfully connected to Supabase (${config.url}). Table "public.contributions" is active and responding.`,
    };
  } catch (err: any) {
    return {
      connected: false,
      tableReady: false,
      message: `Network error reaching Supabase: ${err.message || 'Unknown error'}`,
      errorDetails: String(err),
    };
  }
};

export const getStoredHeroImage = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.HERO_IMAGE);
};

export const setStoredHeroImage = (url: string) => {
  localStorage.setItem(STORAGE_KEYS.HERO_IMAGE, url);
};

export const getVisitorCount = (): number => {
  const stored = localStorage.getItem(STORAGE_KEYS.VISITOR_COUNT);
  let count = stored ? parseInt(stored, 10) : 14820;
  if (isNaN(count)) count = 14820;

  // Increment once per browser session
  const hasVisited = sessionStorage.getItem(STORAGE_KEYS.HAS_VISITED);
  if (!hasVisited) {
    count += 1;
    localStorage.setItem(STORAGE_KEYS.VISITOR_COUNT, count.toString());
    sessionStorage.setItem(STORAGE_KEYS.HAS_VISITED, 'true');
  }

  return count;
};

export const getContributions = (): Contribution[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.CONTRIBUTIONS);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch {
      // Fall back
    }
  }
  localStorage.setItem(STORAGE_KEYS.CONTRIBUTIONS, JSON.stringify(INITIAL_CONTRIBUTIONS));
  return INITIAL_CONTRIBUTIONS;
};

export const fetchContributionsFromSupabase = async (): Promise<Contribution[]> => {
  const localList = getContributions();
  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from('contributions')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data) && data.length > 0) {
      const mappedRemote: Contribution[] = data.map((row: any) => ({
        id: row.id,
        title: row.title,
        semester: row.semester,
        paperCode: row.paper_code,
        resourceType: row.resource_type,
        driveUrl: row.drive_url,
        contributorName: row.contributor_name,
        studentRollNo: row.student_roll_no || undefined,
        email: row.email || undefined,
        description: row.description || '',
        status: row.status || 'pending',
        submittedAt: row.submitted_at || new Date().toISOString().split('T')[0],
      }));

      // Merge remote with any un-synced local contributions
      const remoteIds = new Set(mappedRemote.map((r) => r.id));
      const unSyncedLocal = localList.filter((local) => !remoteIds.has(local.id));
      const combined = [...mappedRemote, ...unSyncedLocal];

      localStorage.setItem(STORAGE_KEYS.CONTRIBUTIONS, JSON.stringify(combined));
      return combined;
    }
  } catch (e) {
    console.warn('Could not fetch remote contributions from Supabase:', e);
  }
  return localList;
};

export const addContribution = async (
  contribution: Omit<Contribution, 'id' | 'status' | 'submittedAt'>
): Promise<{ entry: Contribution; syncedToSupabase: boolean; error?: string }> => {
  const existing = getContributions();
  const newEntry: Contribution = {
    ...contribution,
    id: `contrib-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    status: 'pending',
    submittedAt: new Date().toISOString().split('T')[0],
  };

  // Immediate local optimistic save
  const updated = [newEntry, ...existing];
  localStorage.setItem(STORAGE_KEYS.CONTRIBUTIONS, JSON.stringify(updated));

  // Sync to Supabase in background
  try {
    const client = getSupabaseClient();
    const { error } = await client.from('contributions').insert([
      {
        id: newEntry.id,
        title: newEntry.title,
        semester: newEntry.semester,
        paper_code: newEntry.paperCode,
        resource_type: newEntry.resourceType,
        drive_url: newEntry.driveUrl,
        contributor_name: newEntry.contributorName,
        student_roll_no: newEntry.studentRollNo || null,
        email: newEntry.email || null,
        description: newEntry.description || '',
        status: 'pending',
        submitted_at: newEntry.submittedAt,
      },
    ]);

    if (error) {
      console.warn('Supabase insert warning (saved locally):', error.message);
      return { entry: newEntry, syncedToSupabase: false, error: error.message };
    }

    return { entry: newEntry, syncedToSupabase: true };
  } catch (err: any) {
    console.warn('Supabase network error (saved locally):', err);
    return { entry: newEntry, syncedToSupabase: false, error: err.message };
  }
};

export const updateContributionStatus = async (
  id: string,
  status: 'approved' | 'rejected'
): Promise<Contribution[]> => {
  const existing = getContributions();
  const updated = existing.map((item) => (item.id === id ? { ...item, status } : item));
  localStorage.setItem(STORAGE_KEYS.CONTRIBUTIONS, JSON.stringify(updated));

  // Sync update to Supabase
  try {
    const client = getSupabaseClient();
    await client.from('contributions').update({ status }).eq('id', id);
  } catch (err) {
    console.warn('Supabase status update error:', err);
  }

  return updated;
};

export const getMyShelf = (): ShelfItem[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.MY_SHELF);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // Fall through
    }
  }
  return [];
};

export const addToShelf = (item: Omit<ShelfItem, 'id' | 'savedAt'>): boolean => {
  const current = getMyShelf();
  const exists = current.some((s) => s.paperId === item.paperId && s.resourceTitle === item.resourceTitle);
  if (exists) return false;

  const newItem: ShelfItem = {
    ...item,
    id: `shelf-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    savedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  };
  const updated = [newItem, ...current];
  localStorage.setItem(STORAGE_KEYS.MY_SHELF, JSON.stringify(updated));
  return true;
};

export const removeFromShelf = (id: string): ShelfItem[] => {
  const current = getMyShelf();
  const updated = current.filter((s) => s.id !== id);
  localStorage.setItem(STORAGE_KEYS.MY_SHELF, JSON.stringify(updated));
  return updated;
};

export const isItemInShelf = (paperId: string, resourceTitle?: string): boolean => {
  const current = getMyShelf();
  if (resourceTitle) {
    return current.some((s) => s.paperId === paperId && s.resourceTitle === resourceTitle);
  }
  return current.some((s) => s.paperId === paperId);
};

