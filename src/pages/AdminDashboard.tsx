
import React, { useState } from 'react';
import { Transition } from '@/components/animations/Transition';
import { 
  Users, 
  LineChart, 
  Link as LinkIcon, 
  DollarSign, 
  Settings, 
  LayoutDashboard,
  LogOut,
  Menu 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import AdminPlans from '@/components/admin/AdminPlans';

type NavItem = {
  label: string;
  icon: React.ElementType;
  active?: boolean;
};

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState('plans');
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const navItems: NavItem[] = [
    { label: 'Dashboard', icon: LayoutDashboard, active: activeTab === 'dashboard' },
    { label: 'Usuários', icon: Users, active: activeTab === 'users' },
    { label: 'Links', icon: LinkIcon, active: activeTab === 'links' },
    { label: 'Planos', icon: DollarSign, active: activeTab === 'plans' },
    { label: 'Estatísticas', icon: LineChart, active: activeTab === 'stats' },
    { label: 'Configurações', icon: Settings, active: activeTab === 'settings' },
  ];

  const handleLogout = () => {
    // TODO: implementar logout real
    toast({
      title: "Logout efetuado",
      description: "Você foi desconectado com sucesso.",
    });
    navigate('/');
  };

  const NavItem = ({ item }: { item: NavItem }) => (
    <Button
      variant="ghost"
      size="sm"
      className={`w-full justify-start font-normal mb-1 ${
        item.active
          ? 'bg-abrev-blue/20 text-abrev-blue hover:bg-abrev-blue/30'
          : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
      }`}
      onClick={() => setActiveTab(item.label.toLowerCase())}
    >
      <item.icon className={`mr-2 h-4 w-4 ${item.active ? 'text-abrev-blue' : ''}`} />
      {item.label}
    </Button>
  );

  const Sidebar = () => (
    <aside className={`w-64 flex-shrink-0 ${isMobile ? '' : 'hidden md:block'}`}>
      <ScrollArea className="h-[calc(100vh-80px)]">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold text-white">
            Painel Admin
          </h2>
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavItem key={item.label} item={item} />
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-800">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-gray-400 font-normal hover:text-white hover:bg-gray-800/50"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'plans':
        return <AdminPlans />;
      default:
        return (
          <div className="flex items-center justify-center h-64 text-center">
            <div>
              <h3 className="text-xl font-medium text-white mb-2">Funcionalidade em Desenvolvimento</h3>
              <p className="text-gray-400">
                Esta seção estará disponível em breve.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-abrev-dark">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-abrev-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-abrev-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>
      
      <div className="flex h-screen overflow-hidden">
        {/* Mobile Sidebar */}
        {isMobile && (
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden fixed top-4 left-4 z-40"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-abrev-dark-accent border-r-gray-800 w-72">
              <Sidebar />
            </SheetContent>
          </Sheet>
        )}
        
        {/* Desktop Sidebar */}
        {!isMobile && <Sidebar />}
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Transition>
            {renderContent()}
          </Transition>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
