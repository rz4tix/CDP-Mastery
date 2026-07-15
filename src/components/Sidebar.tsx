import React from 'react';
import { 
  BookOpen, 
  ShieldCheck, 
  Terminal, 
  Database, 
  GitMerge, 
  Cloud, 
  Lock, 
  BarChart, 
  Server, 
  GraduationCap, 
  LayoutDashboard,
  CheckCircle,
  Menu,
  X
} from 'lucide-react';
import { cn } from '../utils/cn';

export type NavItem = {
  id: string;
  label: string;
  icon: React.ElementType;
};

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

interface SidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-gray-900 text-gray-300 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between h-16 px-6 bg-gray-950">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-indigo-500" />
            <span className="text-lg font-bold text-white tracking-tight">CDP Mastery</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsOpen(false);
              }}
              className={cn(
                "flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                activeTab === item.id 
                  ? "bg-indigo-600 text-white" 
                  : "hover:bg-gray-800 hover:text-white"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5",
                activeTab === item.id ? "text-indigo-200" : "text-gray-400"
              )} />
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
