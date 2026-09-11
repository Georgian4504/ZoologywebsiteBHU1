import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  Database,
  Check,
  AlertTriangle,
  KeyRound,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Copy,
  ExternalLink,
  Terminal,
} from 'lucide-react';
import { Contribution, SupabaseConfig } from '../types';
import {
  getContributions,
  updateContributionStatus,
  getSupabaseConfig,
  saveSupabaseConfig,
  getVisitorCount,
  testSupabaseConnection,
  SupabaseTestResult,
  SUPABASE_SQL_SETUP_SCRIPT,
  fetchContributionsFromSupabase,
  DEFAULT_SUPABASE_PROJECT_ID,
  DEFAULT_SUPABASE_URL,
  DEFAULT_SUPABASE_ANON_KEY,
} from '../services/supabaseService';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdated: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, onUpdated }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'contributions' | 'supabase' | 'visitor'>('contributions');

  const [contributions, setContributions] = useState<Contribution[]>(() => getContributions());
  const [supabaseConfig, setSupabaseState] = useState<SupabaseConfig>(() => getSupabaseConfig());
  const [visitorInput, setVisitorInput] = useState<number>(() => getVisitorCount());
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Supabase test and sync states
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<SupabaseTestResult | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      setContributions(getContributions());
    }
  }, [isOpen, isAuthenticated]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Academic admin demo password or 'zoology2018' or 'admin'
    if (password === 'zoology2018' || password === 'admin' || password === 'bhu1916') {
      setIsAuthenticated(true);
      setErrorMsg('');
      // Run quick test on login
      testSupabaseConnection().then(setTestResult);
    } else {
      setErrorMsg('Invalid faculty/admin credentials. (Demo: zoology2018 or admin)');
    }
  };

  const handleStatusChange = async (id: string, status: 'approved' | 'rejected') => {
    const updated = await updateContributionStatus(id, status);
    setContributions(updated);
    onUpdated();
  };

  const handleSyncWithSupabase = async () => {
    setIsSyncing(true);
    try {
      const refreshed = await fetchContributionsFromSupabase();
      setContributions(refreshed);
      onUpdated();
    } finally {
      setIsSyncing(false);
    }
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await testSupabaseConnection();
      setTestResult(res);
    } finally {
      setIsTesting(false);
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SETUP_SCRIPT);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleResetToDefaults = () => {
    const defaults: SupabaseConfig = {
      url: DEFAULT_SUPABASE_URL,
      anonKey: DEFAULT_SUPABASE_ANON_KEY,
      projectId: DEFAULT_SUPABASE_PROJECT_ID,
      isConnected: true,
    };
    setSupabaseState(defaults);
    saveSupabaseConfig(defaults);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleSaveSupabase = (e: React.FormEvent) => {
    e.preventDefault();
    saveSupabaseConfig(supabaseConfig);
    setSavedSuccess(true);
    onUpdated();
    setTimeout(() => setSavedSuccess(false), 2000);
    // Re-run test with updated settings
    testSupabaseConnection().then(setTestResult);
  };

  const handleSaveVisitor = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('bhu_zoology_visitor_count', visitorInput.toString());
    setSavedSuccess(true);
    onUpdated();
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="clay-card max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 bg-[#F8F5EE] border border-[#C67A3D]/30 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-[#223629]/60 hover:text-[#223629] hover:bg-[#E8DFC9] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isAuthenticated ? (
          /* Login Form */
          <div className="max-w-md mx-auto py-6">
            <div className="text-center space-y-2 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#8F4E26] text-white flex items-center justify-center mx-auto shadow-md">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="font-editorial text-2xl font-bold text-[#223629]">
                Department Faculty & Admin Access
              </h3>
              <p className="text-xs text-[#223629]/70">
                Sign in to approve student lecture notes, configure Supabase database, and manage repository records.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#223629] block mb-1">
                  Faculty Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-[#8F4E26] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password (demo: zoology2018)"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#C67A3D]/30 bg-white focus:outline-none focus:ring-1 focus:ring-[#C67A3D]"
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="clay-btn-secondary py-2 px-4 text-xs font-semibold flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="clay-btn-primary py-2 px-4 text-xs font-semibold flex-1"
                >
                  Sign In
                </button>
              </div>

              <p className="text-[11px] text-center text-[#223629]/60 pt-2">
                Demo access: <code>zoology2018</code> or <code>admin</code>
              </p>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#223629]/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#8F4E26] text-white flex items-center justify-center shadow-md">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-editorial text-xl font-bold text-[#223629]">
                    Admin & Moderation Console
                  </h3>
                  <p className="text-xs text-emerald-700 font-semibold flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span>
                    <span>Session Active</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-xs text-[#8F4E26] hover:underline font-semibold"
              >
                Log Out
              </button>
            </div>

            {/* Tabs */}
            <div className="flex space-x-2 mb-6 border-b border-[#C67A3D]/20 pb-2">
              <button
                onClick={() => setActiveTab('contributions')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  activeTab === 'contributions'
                    ? 'bg-[#8F4E26] text-white'
                    : 'bg-[#EBF1E6] text-[#223629] hover:bg-[#DCE5D3]'
                }`}
              >
                Contributions ({contributions.length})
              </button>
              <button
                onClick={() => setActiveTab('supabase')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  activeTab === 'supabase'
                    ? 'bg-[#8F4E26] text-white'
                    : 'bg-[#EBF1E6] text-[#223629] hover:bg-[#DCE5D3]'
                }`}
              >
                Supabase Settings
              </button>
              <button
                onClick={() => setActiveTab('visitor')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  activeTab === 'visitor'
                    ? 'bg-[#8F4E26] text-white'
                    : 'bg-[#EBF1E6] text-[#223629] hover:bg-[#DCE5D3]'
                }`}
              >
                Visitor Counter
              </button>
            </div>

            {savedSuccess && (
              <div className="mb-4 p-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Settings saved successfully!</span>
              </div>
            )}

            {/* Tab 1: Contributions List */}
            {activeTab === 'contributions' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <p className="text-xs text-[#223629]/70">
                    Review student uploaded notes and materials. Approved items become accessible under semester papers.
                  </p>
                  <button
                    onClick={handleSyncWithSupabase}
                    disabled={isSyncing}
                    className="clay-btn-secondary px-3 py-1 text-[11px] font-semibold flex items-center space-x-1.5 shrink-0 cursor-pointer"
                    title="Fetch latest student contributions from Supabase cloud database"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-[#8F4E26] ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? 'Syncing...' : 'Sync Supabase'}</span>
                  </button>
                </div>

                {contributions.length === 0 ? (
                  <p className="text-xs text-center py-6 text-gray-500">No contributions yet.</p>
                ) : (
                  contributions.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl bg-white border border-[#C67A3D]/20 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#DCE5D3] text-[#223629]">
                            Sem {item.semester} • {item.paperCode}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              item.status === 'approved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : item.status === 'rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {item.status.toUpperCase()}
                          </span>
                        </div>
                        <h5 className="font-bold text-[#223629]">{item.title}</h5>
                        <p className="text-[#223629]/60 text-[11px]">
                          By {item.contributorName} ({item.studentRollNo || 'Student'}) • {item.submittedAt}
                        </p>
                        <a
                          href={item.driveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-[#8F4E26] hover:underline inline-block mt-1"
                        >
                          Check Drive Link →
                        </a>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        {item.status !== 'approved' && (
                          <button
                            onClick={() => handleStatusChange(item.id, 'approved')}
                            className="px-2.5 py-1 rounded-md bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 flex items-center space-x-1 cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                        )}
                        {item.status !== 'rejected' && (
                          <button
                            onClick={() => handleStatusChange(item.id, 'rejected')}
                            className="px-2.5 py-1 rounded-md bg-red-100 text-red-800 text-xs font-semibold hover:bg-red-200 flex items-center space-x-1 cursor-pointer"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab 2: Supabase Settings */}
            {activeTab === 'supabase' && (
              <form onSubmit={handleSaveSupabase} className="space-y-4 text-xs">
                <div className="p-3 rounded-xl bg-[#EBF1E6] border border-[#B9C9AD] text-[#223629] flex items-start space-x-2">
                  <Database className="w-4 h-4 shrink-0 mt-0.5 text-[#8F4E26]" />
                  <div>
                    <p className="font-bold">Supabase Cloud Database Configuration</p>
                    <p className="text-[11px] text-[#223629]/75 mt-0.5">
                      Configured for project <strong>{supabaseConfig.projectId || DEFAULT_SUPABASE_PROJECT_ID}</strong>. Allows real-time student study material contributions and moderation.
                    </p>
                  </div>
                </div>

                {/* Live Diagnostic Status Box */}
                {testResult && (
                  <div
                    className={`p-3.5 rounded-xl border text-xs ${
                      testResult.connected && testResult.tableReady
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : testResult.connected && !testResult.tableReady
                        ? 'bg-amber-50 border-amber-300 text-amber-900'
                        : 'bg-red-50 border-red-300 text-red-900'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1.5 font-bold">
                          {testResult.connected && testResult.tableReady ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Supabase Connected & Database Table Active!</span>
                            </>
                          ) : testResult.connected ? (
                            <>
                              <AlertTriangle className="w-4 h-4 text-amber-600" />
                              <span>Connected to Supabase — Table Setup Required</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-red-600" />
                              <span>Supabase Connection Unreachable</span>
                            </>
                          )}
                        </div>
                        <p className="text-[11px] leading-relaxed opacity-90">{testResult.message}</p>
                      </div>

                      <button
                        type="button"
                        onClick={handleTestConnection}
                        disabled={isTesting}
                        className="px-2 py-1 rounded bg-white/80 border text-[10px] font-bold text-[#223629] hover:bg-white shrink-0 cursor-pointer"
                      >
                        {isTesting ? 'Testing...' : 'Ping Test'}
                      </button>
                    </div>

                    {/* If table is not created yet, provide one-click copy and dashboard link */}
                    {testResult.connected && !testResult.tableReady && (
                      <div className="mt-3 pt-2.5 border-t border-amber-200">
                        <p className="text-[11px] font-semibold text-amber-950 mb-1.5">
                          Follow these 2 quick steps to activate cloud storage in your Supabase project:
                        </p>
                        <ol className="list-decimal list-inside space-y-1 text-[11px] text-amber-900 mb-2">
                          <li>Click "Copy SQL Table Schema" below.</li>
                          <li>Open your Supabase SQL Editor, paste the code, and click <strong>Run</strong>.</li>
                        </ol>

                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={handleCopySql}
                            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-[#8F4E26] text-white text-[11px] font-bold hover:bg-[#6C3717] transition-colors cursor-pointer"
                          >
                            {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy SQL Table Schema'}</span>
                          </button>

                          <a
                            href={`https://supabase.com/dashboard/project/${supabaseConfig.projectId || DEFAULT_SUPABASE_PROJECT_ID}/sql`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-900 text-[11px] font-bold hover:bg-amber-100 transition-colors"
                          >
                            <span>Open Supabase SQL Editor</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-[#223629] block mb-1">Project ID</label>
                    <input
                      type="text"
                      value={supabaseConfig.projectId || DEFAULT_SUPABASE_PROJECT_ID}
                      onChange={(e) =>
                        setSupabaseState({
                          ...supabaseConfig,
                          projectId: e.target.value,
                          url: `https://${e.target.value.trim()}.supabase.co`,
                        })
                      }
                      placeholder="e.g. ckkljjpjmsfytihcgeyb"
                      className="w-full p-2.5 rounded-xl border border-[#C67A3D]/30 bg-white font-mono text-[11px] focus:outline-none focus:ring-1 focus:ring-[#C67A3D]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#223629] block mb-1">Supabase Project URL</label>
                    <input
                      type="url"
                      value={supabaseConfig.url}
                      onChange={(e) =>
                        setSupabaseState({ ...supabaseConfig, url: e.target.value })
                      }
                      placeholder="https://ckkljjpjmsfytihcgeyb.supabase.co"
                      className="w-full p-2.5 rounded-xl border border-[#C67A3D]/30 bg-white font-mono text-[11px] focus:outline-none focus:ring-1 focus:ring-[#C67A3D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#223629] block mb-1">Supabase Public / Publishable API Key</label>
                  <input
                    type="text"
                    value={supabaseConfig.anonKey}
                    onChange={(e) =>
                      setSupabaseState({ ...supabaseConfig, anonKey: e.target.value })
                    }
                    placeholder="sb_publishable_..."
                    className="w-full p-2.5 rounded-xl border border-[#C67A3D]/30 bg-white font-mono text-[11px] focus:outline-none focus:ring-1 focus:ring-[#C67A3D]"
                  />
                  <p className="text-[10px] text-[#223629]/50 mt-1">
                    Active key: <code className="bg-[#EFE9DC] px-1 py-0.5 rounded">{supabaseConfig.anonKey ? supabaseConfig.anonKey.substring(0, 18) + '...' : 'None'}</code>
                  </p>
                </div>

                {/* SQL Code Preview */}
                <div className="rounded-xl border border-[#C67A3D]/25 bg-[#F6F1E7] p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#8F4E26] flex items-center space-x-1.5 text-[11px]">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>PostgreSQL Schema for Contributions</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleCopySql}
                      className="text-[10px] font-bold text-[#8F4E26] hover:underline flex items-center space-x-1 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedSql ? 'Copied!' : 'Copy SQL'}</span>
                    </button>
                  </div>
                  <pre className="text-[10px] font-mono p-2 bg-[#223629] text-[#E8DFC9] rounded-lg overflow-x-auto max-h-28">
                    {SUPABASE_SQL_SETUP_SCRIPT}
                  </pre>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex items-center space-x-2">
                    <button
                      type="submit"
                      className="clay-btn-primary py-2 px-4 text-xs font-semibold cursor-pointer"
                    >
                      Save Configuration
                    </button>

                    <button
                      type="button"
                      onClick={handleTestConnection}
                      disabled={isTesting}
                      className="clay-btn-secondary py-2 px-4 text-xs font-semibold flex items-center space-x-1.5 cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
                      <span>{isTesting ? 'Testing...' : 'Test Connection'}</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetToDefaults}
                    className="text-[11px] text-[#8F4E26] hover:underline font-semibold cursor-pointer"
                  >
                    Reset to Default Project (ckkljjpjmsfytihcgeyb)
                  </button>
                </div>
              </form>
            )}

            {/* Tab 3: Visitor Counter Adjustments */}
            {activeTab === 'visitor' && (
              <form onSubmit={handleSaveVisitor} className="space-y-4 text-xs">
                <p className="text-[#223629]/75">
                  Update the starting or verified visitor counter metric displayed on the homepage stats ribbon.
                </p>

                <div>
                  <label className="font-bold text-[#223629] block mb-1">Current Visitor Count</label>
                  <input
                    type="number"
                    value={visitorInput}
                    onChange={(e) => setVisitorInput(parseInt(e.target.value, 10) || 0)}
                    className="w-full p-2.5 rounded-xl border border-[#C67A3D]/30 bg-white focus:outline-none focus:ring-1 focus:ring-[#C67A3D]"
                  />
                </div>

                <button
                  type="submit"
                  className="clay-btn-primary py-2 px-4 text-xs font-semibold"
                >
                  Update Visitor Count
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
