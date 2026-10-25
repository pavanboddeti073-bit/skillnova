import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { useApp } from './context/useApp';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { AuthModal } from './components/AuthModal';
import { CourseDetailModal } from './components/CourseDetailModal';
import { LessonDetailView } from './components/LessonDetailView';
import { ToolDetailModal } from './components/ToolDetailModal';
import { DataPrivacyModal } from './components/DataPrivacyModal';

// Brand New Core Views for SkillNova Mega14
import { WelcomeExperience } from './components/WelcomeExperience';
import { DashboardView } from './components/DashboardView';
import { CodingPracticeView } from './components/CodingPracticeView';
import { CodePlaygroundView } from './components/CodePlaygroundView';
import { DevToolsAcademyView } from './components/DevToolsAcademyView';
import { ProjectStudioView } from './components/ProjectStudioView';
import { HowAiWorksView } from './components/HowAiWorksView';
import { LearningPathsView } from './components/LearningPathsView';
import { ModelSettingsView } from './components/ModelSettingsView';
import { CoursesView } from './components/CoursesView';
import { MyLearningView } from './components/MyLearningView';
import { AiTutorView } from './components/AiTutorView';
import { QuizzesView } from './components/QuizzesView';
import { NotesBookmarksView } from './components/NotesBookmarksView';
import { LearningProgressView } from './components/LearningProgressView';
import { AchievementsView } from './components/AchievementsView';
import { SettingsView } from './components/SettingsView';
import { HelpSupportView } from './components/HelpSupportView';

// Preserved Ecosystem Creation Tools
import { BuildStudioView } from './components/BuildStudioView';
import { ToolsExplorerView } from './components/ToolsExplorerView';
import { GuidedSchoolView } from './components/GuidedSchoolView';
import { PromptLabView } from './components/PromptLabView';
import { ProjectWizardView } from './components/ProjectWizardView';
import { AcademyView } from './components/AcademyView';
import { ResumeCareerHubView } from './components/ResumeCareerHubView';

const MainContent: React.FC = () => {
  const { activeTab, selectedTool, closeToolDetail } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 antialiased selection:bg-indigo-600 selection:text-white transition-colors duration-200">
      
      {/* Top Header Navigation */}
      <Navbar
        onToggleSidebar={() => setSidebarOpen(prev => !prev)}
        onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
      />

      {/* 10-Item Sidebar Navigation Drawer */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Container - Shifted for desktop sidebar */}
      <div className="flex-1 flex flex-col lg:pl-64 transition-all duration-200">
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
          {activeTab === 'welcome' && <WelcomeExperience />}
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'coding-practice' && <CodingPracticeView />}
          {activeTab === 'playground' && <CodePlaygroundView />}
          {activeTab === 'tools-academy' && <DevToolsAcademyView />}
          {activeTab === 'projects' && <ProjectStudioView />}
          {activeTab === 'how-it-works' && <HowAiWorksView />}
          {activeTab === 'learning-paths' && <LearningPathsView />}
          {activeTab === 'model-settings' && <ModelSettingsView />}
          {activeTab === 'courses' && <CoursesView />}
          {activeTab === 'my-learning' && <MyLearningView />}
          {activeTab === 'tutor' && <AiTutorView />}
          {activeTab === 'quizzes' && <QuizzesView />}
          {activeTab === 'notes' && <NotesBookmarksView />}
          {activeTab === 'progress' && <LearningProgressView />}
          {activeTab === 'achievements' && <AchievementsView />}
          {activeTab === 'settings' && <SettingsView />}
          {activeTab === 'help' && <HelpSupportView />}

          {/* Preserved Ecosystem Tools */}
          {activeTab === 'studio' && <BuildStudioView />}
          {activeTab === 'tools' && <ToolsExplorerView />}
          {activeTab === 'tutorials' && <GuidedSchoolView />}
          {activeTab === 'prompt-lab' && <PromptLabView />}
          {activeTab === 'wizard' && <ProjectWizardView />}
          {activeTab === 'academy' && <AcademyView />}
          {activeTab === 'career' && <ResumeCareerHubView />}
        </main>

        {/* Accessible Footer */}
        <Footer onOpenPrivacyModal={() => setPrivacyModalOpen(true)} />
      </div>

      {/* Global Modals & Notifications */}
      <AuthModal />
      <CourseDetailModal />
      <LessonDetailView />

      {selectedTool && (
        <ToolDetailModal tool={selectedTool} onClose={closeToolDetail} />
      )}

      <DataPrivacyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />

      <Toast />
    </div>
  );
};

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('SkillNova Caught UI Error:', error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.removeItem('skillnova_active_tab');
      sessionStorage.clear();
    } catch {
      // ignore
    }
    this.setState({ hasError: false, error: null });
    window.location.href = '/#dashboard';
    window.location.reload();
  };

  handleHardReset = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {
      // ignore
    }
    window.location.href = '/';
    window.location.reload();
  };

  override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 p-6">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center font-bold text-2xl">
              ⚠️
            </div>
            <h1 className="text-xl font-bold text-white">Application Recovery</h1>
            <p className="text-sm text-slate-400">
              SkillNova encountered an unexpected rendering error. You can restore the application safely below.
            </p>
            {this.state.error?.message && (
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-rose-400 text-left overflow-auto max-h-32">
                {this.state.error.message}
              </div>
            )}
            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={this.handleReset}
                className="w-full py-2.5 px-4 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-medium transition cursor-pointer"
              >
                Restore to Dashboard
              </button>
              <button
                type="button"
                onClick={this.handleHardReset}
                className="w-full py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs transition cursor-pointer"
              >
                Reset All Local Cache & Reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <MainContent />
      </AppProvider>
    </ErrorBoundary>
  );
}
