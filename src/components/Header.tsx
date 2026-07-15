import React from 'react';
import { Menu, Terminal } from 'lucide-react';

interface HeaderProps {
  setSidebarOpen: (isOpen: boolean) => void;
  activeTitle: string;
}

export function Header({ setSidebarOpen, activeTitle }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900 truncate">
          {activeTitle}
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
          <Terminal className="w-4 h-4" />
          <span>Senior Engineer Track</span>
        </div>
      </div>
    </header>
  );
}
