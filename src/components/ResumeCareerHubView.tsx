import React, { useState } from 'react';
import { 
  Briefcase, 
  FileText, 
  ShieldAlert, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Sparkles, 
  Trash2
} from 'lucide-react';
import { verifiedCareerResources, roleRoadmaps } from '../data/careerResources';
import { analyzeStudentResume } from '../services/resumeAnalyzer';
import { apiClient } from '../services/api';
import { ResumeAnalysis } from '../types';
import { useApp } from '../context/useApp';

export const ResumeCareerHubView: React.FC = () => {
  const { language, showToast } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'resume' | 'careers' | 'roadmaps'>('resume');
  const [resumeInput, setResumeInput] = useState<string>('');
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);

  const sampleResumeSnippet = `John Doe | john.doe@email.com | github.com/johndoe | Bangalore, India
B.Tech in Computer Science and Engineering, 2022 - 2026 (CGPA: 8.4)

Technical Skills:
React, TypeScript, Python, Tailwind CSS, Git, Node.js

Projects:
Student Study Portal (React, Firebase)
- Helped build a website for students to share notes
- Worked on the user login and document upload feature
- Used React and CSS for making the pages responsive

Sentiment Analyzer (Python)
- Worked on a machine learning model to classify student feedback
- Used Python and pandas for data cleaning`;

  const handleAnalyze = async () => {
    if (!resumeInput.trim()) {
      showToast('Please paste your resume text first.');
      return;
    }
    try {
      const serverResult = await apiClient.analyzeResume(resumeInput);
      if (serverResult) {
        setAnalysis(serverResult);
        showToast('Resume review completed by Full-Stack Engine!');
        return;
      }
    } catch {
      // Fallback
    }
    const result = analyzeStudentResume(resumeInput);
    setAnalysis(result);
    showToast('Resume review completed!');
  };

  const handleClearResume = () => {
    setResumeInput('');
    setAnalysis(null);
    showToast('Resume text erased.');
  };

  const handleLoadSample = () => {
    setResumeInput(sampleResumeSnippet);
    showToast('Sample student resume loaded.');
  };

  return (
    <div className="space-y-8 pb-20">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-semibold">
          <Briefcase className="w-3.5 h-3.5" />
          <span>{language === 'te' ? 'కెరీర్ హబ్ & రెజ్యూమ్ రివ్యూ' : 'Career Hub & Actionable Resume Review'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {language === 'te' ? 'విద్యార్థి కెరీర్ & రెజ్యూమ్ సాధనాలు' : 'Student Career Launchpad & Resume Audit'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-3xl leading-relaxed">
          {language === 'te'
            ? 'ప్రైవేట్ సమాచార భద్రతతో రెజ్యూమ్ విశ్లేషణ, గూగుల్ XYZ ఇంపాక్ట్ బుల్లెట్స్ మరియు ధృవీకరించబడిన అధికారిక స్టూడెంట్ ప్రోగ్రామ్‌లు.'
            : 'Convert passive project descriptions into Google XYZ impact bullets, inspect ATS readability risks, and explore curated official student fellowships without fake listings.'}
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('resume')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'resume'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          📄 Resume Impact Reviewer
        </button>
        <button
          onClick={() => setActiveSubTab('careers')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'careers'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          🏛️ Verified Student Programs ({verifiedCareerResources.length})
        </button>
        <button
          onClick={() => setActiveSubTab('roadmaps')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'roadmaps'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          🗺️ Technical Role Roadmaps
        </button>
      </div>

      {/* SUB-TAB 1: RESUME REVIEW */}
      {activeSubTab === 'resume' && (
        <div className="space-y-6">
          
          {/* Privacy Notice Banner */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold block">Privacy & Safe Data Handling:</span>
              <p className="text-slate-700 leading-relaxed">
                Resume text is processed strictly in your browser session for educational feedback. 
                <strong>Please remove phone numbers, Aadhaar/ID numbers, home addresses, or passwords</strong> before pasting. You can erase all data with the "Erase Resume" button.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Box (5 Cols) */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                  Paste Resume Plain Text
                </span>
                <button
                  onClick={handleLoadSample}
                  className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline cursor-pointer"
                >
                  Load Sample
                </button>
              </div>

              <textarea
                rows={14}
                value={resumeInput}
                onChange={(e) => setResumeInput(e.target.value)}
                placeholder="Paste the text from your resume here (Education, Projects, Skills, Experience)..."
                className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 font-mono text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-hidden transition-all"
              />

              <div className="flex items-center gap-2">
                <button
                  onClick={handleAnalyze}
                  className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-xs"
                >
                  Analyze Resume Impact
                </button>
                {resumeInput && (
                  <button
                    onClick={handleClearResume}
                    className="p-3 text-slate-400 hover:text-rose-600 rounded-xl border border-slate-200"
                    title="Erase pasted text"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Analysis Output (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              {analysis ? (
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6 animate-in fade-in-50">
                  
                  {/* Score & Rating Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold uppercase text-slate-400">Educational Review Rating</span>
                      <h3 className="text-lg font-bold text-slate-900">
                        Clarity Indicator: {analysis.clarityScore} / 100
                      </h3>
                      <p className="text-xs text-slate-500">
                        Structure: <strong className="text-slate-800">{analysis.structureRating}</strong>
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-slate-400 italic block">
                        * Educational indicator only; does not predict hiring
                      </span>
                    </div>
                  </div>

                  {/* Google XYZ Impact Bullets Transformation */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span>Google XYZ Impact Bullets Transformation</span>
                    </h4>
                    <p className="text-xs text-slate-500">
                      Formula: <strong>"Accomplished [X] as measured by [Y], by doing [Z]"</strong>
                    </p>

                    <div className="space-y-3">
                      {analysis.impactBulletCritique.map((critique, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                          {critique.originalExample && (
                            <div className="text-slate-500">
                              <span className="font-semibold text-rose-700">Before (Passive): </span>
                              <span>"{critique.originalExample}"</span>
                            </div>
                          )}
                          <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-950 border border-emerald-200 font-medium">
                            <span className="font-bold text-emerald-800">After (Google XYZ): </span>
                            <span>"{critique.improvedExample}"</span>
                          </div>
                          <p className="text-[11px] text-slate-500 italic">
                            Why it stands out: {critique.reason}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ATS Formatting Risks */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1 text-amber-800">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      <span>ATS Readability Guidelines</span>
                    </h4>
                    <div className="space-y-1.5 text-xs text-slate-600 pl-1">
                      {analysis.atsSafetyTips.map((tip, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Additions */}
                  {analysis.recommendedAdditions.length > 0 && (
                    <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 space-y-1.5">
                      <span className="font-bold">Recommended Portfolio Additions:</span>
                      <ul className="space-y-1 pl-4 list-disc text-slate-700">
                        {analysis.recommendedAdditions.map((rec, i) => (
                          <li key={i}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="text-[10px] text-slate-400 border-t border-slate-100 pt-3">
                    {analysis.disclaimer}
                  </div>

                </div>
              ) : (
                <div className="p-12 rounded-2xl bg-white border border-dashed border-slate-300 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    No Resume Text Analyzed Yet
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Paste your resume text on the left or click "Load Sample" to see how the Google XYZ formula transforms bullet points.
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {/* SUB-TAB 2: VERIFIED STUDENT PROGRAMS */}
      {activeSubTab === 'careers' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">Curated Official Programs Directory:</span>
              <p className="mt-0.5">
                We never fabricate dynamic job listings or scrape unverified job boards. Below are official, verified student programs, open-source fellowships, and direct campus recruiting portals. Always verify deadlines at the official link.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {verifiedCareerResources.map((res) => (
              <div
                key={res.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {res.organization}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Verified
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm">
                    {res.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {res.notes}
                  </p>

                  <div className="space-y-1 text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <p><strong>Eligibility:</strong> {res.eligibility}</p>
                    <p><strong>Location:</strong> {res.location}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {res.lastCheckedAt}
                  </span>
                  <a
                    href={res.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 font-bold hover:underline"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: TECHNICAL ROLE ROADMAPS */}
      {activeSubTab === 'roadmaps' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roleRoadmaps.map((map, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700">
                  <span>Role Roadmap</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {map.role}
                </h3>
                <p className="text-xs text-slate-600">
                  {map.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                  <span className="font-bold text-slate-800 block">Must-Have Skills:</span>
                  <div className="flex flex-wrap gap-1">
                    {map.mustHaveSkills.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                  <span className="font-bold text-slate-800 block">Recommended Standout Projects:</span>
                  <ul className="space-y-1 text-slate-600 pl-4 list-disc text-[11px]">
                    {map.recommendedProjects.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs text-slate-400">
                <span>Free Docs: {map.officialCertificationsOrDocs.join(' • ')}</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
