import React, { useState } from 'react';
import { Sidebar, NavItem } from './components/Sidebar';
import { Header } from './components/Header';
import { MarkdownView } from './components/MarkdownView';
import { roadmapData } from './data';
import { LayoutDashboard, GitMerge, Server, Terminal, Database, Lock, Cloud, ShieldCheck, BarChart, GraduationCap, CheckCircle } from 'lucide-react';

const navigation: NavItem[] = [
  { id: 'overview', label: 'Course Overview', icon: LayoutDashboard },
  { id: 'week-1', label: 'Week 1: Secure Git & Threat Model', icon: GitMerge },
  { id: 'week-2', label: 'Week 2: Enterprise Pipelines', icon: Server },
  { id: 'week-3', label: 'Week 3: SAST Pipeline', icon: Terminal },
  { id: 'week-4', label: 'Week 4: SCA & SBOM', icon: Database },
  { id: 'week-5', label: 'Week 5: Secrets & DAST', icon: Lock },
  { id: 'week-6', label: 'Week 6: IaC Hardening', icon: Cloud },
  { id: 'week-7', label: 'Week 7: Container Security', icon: ShieldCheck },
  { id: 'week-8', label: 'Week 8: Vulnerability Mgmt', icon: BarChart },
  { id: 'week-9', label: 'Week 9: Enterprise DevSecOps', icon: GitMerge },
  { id: 'week-10', label: 'Week 10: Capstone & Exams', icon: GraduationCap },
  { id: 'best-practices', label: 'Best Practices', icon: CheckCircle },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentNav = navigation.find(n => n.id === activeTab);
  const title = currentNav ? currentNav.label : 'DevSecOps Roadmap';
  const content = roadmapData[activeTab] || '# Content not found';

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header setSidebarOpen={setSidebarOpen} activeTitle={title} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-5xl bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-10">
            <MarkdownView content={content} key={activeTab} />
          </div>
        </main>
      </div>
    </div>
  );
}
