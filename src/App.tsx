import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { useApp } from './context/useApp';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { ToolDetailModal } from './components/ToolDetailModal';
import { DataPrivacyModal } from './components/DataPrivacyModal';

// Views
import { DashboardView } from './components/DashboardView';
import { BuildStudioView } from './components/BuildStudioView';
import { ToolsExplorerView } from './components/ToolsExplorerView';
import { GuidedSchoolView } from './components/GuidedSchoolView';
import { PromptLabView } from './components/PromptLabView';
import { ProjectWizardView } from './components/ProjectWizardView';
import { AcademyView } from './components/AcademyView';
import { AiTutorView } from './components/AiTutorView';
import { ResumeCareerHubView } from './components/ResumeCareerHubView';

const MainContent: React.FC = () => {
  const { activeTab, selectedTool, closeToolDetail } = useApp();
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Header Navigation */}
      <Navbar onOpenPrivacyModal={() => setPrivacyModalOpen(true)} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'studio' && <BuildStudioView />}
        {activeTab === 'tools' && <ToolsExplorerView />}
        {activeTab === 'tutorials' && <GuidedSchoolView />}
        {activeTab === 'prompt-lab' && <PromptLabView />}
        {activeTab === 'wizard' && <ProjectWizardView />}
        {activeTab === 'academy' && <AcademyView />}
        {activeTab === 'tutor' && <AiTutorView />}
        {activeTab === 'career' && <ResumeCareerHubView />}
      </main>

      {/* Global Modals & Notifications */}
      {selectedTool && (
        <ToolDetailModal tool={selectedTool} onClose={closeToolDetail} />
      )}

      <DataPrivacyModal 
        isOpen={privacyModalOpen} 
        onClose={() => setPrivacyModalOpen(false)} 
      />

      <Toast />

      {/* Accessible Footer */}
      <Footer onOpenPrivacyModal={() => setPrivacyModalOpen(true)} />
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
