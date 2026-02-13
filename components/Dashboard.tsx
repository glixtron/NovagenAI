'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import {
  Home,
  Presentation,
  FileText,
  MessageSquare,
  RefreshCw,
  Sparkles,
  FileEdit,
  Settings,
  Search,
  Bell,
  Moon,
  Sun,
  Menu,
  X,
  User,
  LogOut
} from 'lucide-react';
import SlidesGenerator from './SlidesGenerator';
import CatalogueCreator from './CatalogueCreator';
import PromptEngineer from './PromptEngineer';
import SmartConverter from './SmartConverter';
import MagicStudio from './MagicStudio';
import PDFEditor from './PDFEditor';
import SettingsComponent from './Settings';

interface ToolCard {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');

  const tools: ToolCard[] = [
    {
      id: 'slides',
      name: 'Slides Generator',
      description: 'Create professional AI-powered presentations in minutes',
      icon: <Presentation className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      id: 'catalogue',
      name: 'Catalogue Creator',
      description: 'Generate product catalogues with AI assistance',
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
      id: 'prompt',
      name: 'Prompt Engineer',
      description: 'Craft perfect prompts for AI models',
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'bg-purple-500'
    },
    {
      id: 'converter',
      name: 'Smart Converter',
      description: 'Convert files between formats intelligently',
      icon: <RefreshCw className="w-6 h-6" />,
      color: 'bg-orange-500'
    },
    {
      id: 'studio',
      name: 'Magic Studio',
      description: 'Enhance images and media with AI',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'bg-pink-500'
    },
    {
      id: 'pdf',
      name: 'PDF Editor',
      description: 'Edit and optimize PDF documents',
      icon: <FileEdit className="w-6 h-6" />,
      color: 'bg-red-500'
    }
  ];

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <Home className="w-5 h-5" />, active: activeView === 'dashboard' },
    { id: 'slides', name: 'Slides Generator', icon: <Presentation className="w-5 h-5" />, active: activeView === 'slides' },
    { id: 'catalogue', name: 'Catalogue Creator', icon: <FileText className="w-5 h-5" />, active: activeView === 'catalogue' },
    { id: 'prompt', name: 'Prompt Engineer', icon: <MessageSquare className="w-5 h-5" />, active: activeView === 'prompt' },
    { id: 'converter', name: 'Smart Converter', icon: <RefreshCw className="w-5 h-5" />, active: activeView === 'converter' },
    { id: 'studio', name: 'Magic Studio', icon: <Sparkles className="w-5 h-5" />, active: activeView === 'studio' },
    { id: 'pdf', name: 'PDF Editor', icon: <FileEdit className="w-5 h-5" />, active: activeView === 'pdf' },
    { id: 'settings', name: 'Settings', icon: <Settings className="w-5 h-5" />, active: activeView === 'settings' },
  ];

  const renderActiveView = () => {
    switch (activeView) {
      case 'slides':
        return <SlidesGenerator />;
      case 'catalogue':
        return <CatalogueCreator />;
      case 'prompt':
        return <PromptEngineer />;
      case 'converter':
        return <SmartConverter />;
      case 'studio':
        return <MagicStudio />;
      case 'pdf':
        return <PDFEditor />;
      case 'settings':
        return <SettingsComponent />;
      default:
        return (
          <div>
            {/* Dashboard Header */}
            <div className="mb-8">
              <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                Welcome back, {session?.user?.name || 'User'}! 👋
              </h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Here's what's happening with your AI creative suite today.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Projects</p>
                    <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>24</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Presentation className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>AI Credits</p>
                    <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>1,250</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>This Month</p>
                    <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>89</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Saved</p>
                    <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>156</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <FileEdit className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => setActiveView(tool.id)}
                  className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-lg shadow-sm border hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer group`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center text-white`}>
                      {tool.icon}
                    </div>
                    <div className={`w-8 h-8 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center group-hover:bg-cyan-100 transition-colors`}>
                      <span className="text-cyan-500">→</span>
                    </div>
                  </div>
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                    {tool.name}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                    {tool.description}
                  </p>
                  <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 px-4 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 font-medium">
                    Launch Tool →
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Top Navigation Bar */}
      <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b fixed top-0 left-0 right-0 z-50`}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left: Logo and Menu Toggle */}
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`p-2 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} lg:hidden`}
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div className="ml-4 flex items-center">
                <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>NovagenAI</h1>
              </div>
            </div>

            {/* Right: Search, Notifications, Dark Mode, User */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="hidden md:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tools..."
                    className={`pl-10 pr-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  />
                </div>
              </div>

              {/* Notifications */}
              <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} relative`}>
                <Bell className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>

              {/* User Profile */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center space-x-2 p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className={`hidden md:block ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                    {session?.user?.name || 'User'}
                  </span>
                </button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
                    <div className="p-3 border-b border-gray-200">
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{session?.user?.name || 'Guest User'}</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{session?.user?.email || 'Local Session'}</p>
                    </div>
                    {!session && (
                      <button
                        onClick={() => {
                          if (confirm('Are you sure? This will clear all your local data.')) {
                            localStorage.clear();
                            sessionStorage.clear();
                            window.location.reload();
                          }
                        }}
                        className={`w-full text-left px-4 py-2 ${darkMode ? 'hover:bg-gray-700 text-red-400' : 'hover:bg-gray-100 text-red-600'} flex items-center space-x-2`}
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Clear Data</span>
                      </button>
                    )}
                    <button
                      onClick={() => session ? signOut() : window.location.href = '/auth/signin'}
                      className={`w-full text-left px-4 py-2 ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-700'} flex items-center space-x-2`}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{session ? 'Sign Out' : 'Sign In'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Left Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-transform duration-300 ease-in-out mt-16 lg:mt-0`}>
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${item.active
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className={`flex-1 ${sidebarOpen ? 'lg:ml-0' : 'lg:ml-0'} p-6`}>
          {renderActiveView()}
        </main>
      </div>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t mt-12`}>
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>NovagenAI Pro - Enterprise Edition</span>
              <span className="flex items-center text-green-500 text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                System Online
              </span>
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              © 2024 NovagenAI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
