
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Transition } from '@/components/animations/Transition';
import { Button } from '@/components/ui/button';
import LinkShortener from '@/components/LinkShortener';
import MyLinks from '@/components/MyLinks';
import WhatsAppQR from '@/components/WhatsAppQR';
import DashboardHome from '@/components/DashboardHome';
import { Link2, Link, QrCode, Smartphone, BarChart3, LogOut, Menu, X } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'home', label: 'Dashboard', icon: <BarChart3 size={18} /> },
    { id: 'shorten', label: 'Encurtar Link', icon: <Link2 size={18} /> },
    { id: 'links', label: 'Meus Links', icon: <Link size={18} /> },
    { id: 'whatsapp', label: 'WhatsApp QR', icon: <Smartphone size={18} /> },
    { id: 'bio', label: 'Minha Bio', icon: <QrCode size={18} /> }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <DashboardHome />;
      case 'shorten':
        return <LinkShortener />;
      case 'links':
        return <MyLinks />;
      case 'whatsapp':
        return <WhatsAppQR />;
      case 'bio':
        return <div>Bio Content - To be implemented</div>;
      default:
        return <DashboardHome />;
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-abrev-dark flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800 backdrop-blur-lg bg-abrev-dark-accent/70 fixed top-0 left-0 right-0 z-40">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">
              <span className="text-gradient-blue">Abrev</span>
              <span className="text-white">.io</span>
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 hidden md:flex"
              onClick={() => {
                // Sign out logic will be implemented here
              }}
            >
              <LogOut size={20} />
            </Button>
            
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar - Desktop */}
        <aside className="w-64 border-r border-gray-800 backdrop-blur-lg bg-abrev-dark-accent/70 fixed left-0 top-16 bottom-0 hidden md:block">
          <nav className="p-4">
            <ul className="space-y-2">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 text-left ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-abrev-blue/10 to-abrev-purple/10 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span 
                      className={`${
                        activeTab === tab.id 
                          ? 'text-abrev-blue'
                          : 'text-gray-400 group-hover:text-white'
                      }`}
                    >
                      {tab.icon}
                    </span>
                    <span>{tab.label}</span>
                    {activeTab === tab.id && (
                      <div className="absolute left-0 w-1 h-8 bg-gradient-to-b from-abrev-blue to-abrev-purple rounded-r-full" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 pt-8 border-t border-gray-800">
              <button
                onClick={() => {
                  // Sign out logic will be implemented
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 text-left text-gray-400 hover:text-white hover:bg-white/5"
              >
                <LogOut size={18} />
                <span>Sair</span>
              </button>
            </div>
          </nav>
        </aside>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <Transition
            type="slide-down"
            className="fixed top-16 left-0 right-0 bg-abrev-dark-accent/95 backdrop-blur-lg shadow-xl z-30 md:hidden"
          >
            <nav className="p-4">
              <ul className="space-y-2">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 text-left ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-abrev-blue/10 to-abrev-purple/10 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span 
                        className={`${
                          activeTab === tab.id 
                            ? 'text-abrev-blue'
                            : 'text-gray-400 group-hover:text-white'
                        }`}
                      >
                        {tab.icon}
                      </span>
                      <span>{tab.label}</span>
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => {
                      // Sign out logic will be implemented
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 text-left text-gray-400 hover:text-white hover:bg-white/5"
                  >
                    <LogOut size={18} />
                    <span>Sair</span>
                  </button>
                </li>
              </ul>
            </nav>
          </Transition>
        )}
        
        {/* Main content area */}
        <main className="flex-1 md:ml-64 p-4 md:p-8">
          <Transition key={activeTab} type="fade">
            {renderContent()}
          </Transition>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
