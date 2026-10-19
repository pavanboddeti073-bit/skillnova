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

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
