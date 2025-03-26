
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Pencil, 
  Trash2, 
  Shield, 
  UserX, 
  UserCheck, 
  Search, 
  Download, 
  Filter
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Transition } from '@/components/animations/Transition';
import { useToast } from '@/hooks/use-toast';

// Tipos
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'suspended' | 'pending';
  links: number;
  joined: string;
  lastActive: string;
}

// Dados mockados
const mockUsers: User[] = [
  {
    id: "1",
    name: "Ana Silva",
    email: "ana.silva@exemplo.com",
    role: "admin",
    status: "active",
    links: 128,
    joined: "2023-01-15",
    lastActive: "2023-09-28"
  },
  {
    id: "2",
    name: "Roberto Pereira",
    email: "roberto.p@exemplo.com",
    role: "user",
    status: "active",
    links: 56,
    joined: "2023-03-22",
    lastActive: "2023-09-25"
  },
  {
    id: "3",
    name: "Carla Mendes",
    email: "c.mendes@exemplo.com",
    role: "moderator",
    status: "active",
    links: 84,
    joined: "2023-02-10",
    lastActive: "2023-09-27"
  },
  {
    id: "4",
    name: "João Costa",
    email: "joao.costa@exemplo.com",
    role: "user",
    status: "suspended",
    links: 23,
    joined: "2023-05-05",
    lastActive: "2023-08-15"
  },
  {
    id: "5",
    name: "Marina Santos",
    email: "marina.s@exemplo.com",
    role: "user",
    status: "pending",
    links: 7,
    joined: "2023-09-18",
    lastActive: "2023-09-18"
  },
  {
    id: "6",
    name: "Paulo Oliveira",
    email: "paulo.o@exemplo.com",
    role: "user",
    status: "active",
    links: 42,
    joined: "2023-04-10",
    lastActive: "2023-09-26"
  },
  {
    id: "7",
    name: "Fernanda Lima",
    email: "f.lima@exemplo.com",
    role: "moderator",
    status: "active",
    links: 65,
    joined: "2023-02-28",
    lastActive: "2023-09-28"
  }
];

const AdminUsers = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [userToUpdateStatus, setUserToUpdateStatus] = useState<{id: string, status: 'active' | 'suspended'} | null>(null);

  const filteredUsers = users.filter(
    user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = () => {
    if (userToDelete) {
      setUsers(users.filter(user => user.id !== userToDelete));
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
      
      toast({
        title: "Usuário excluído",
        description: "O usuário foi removido com sucesso."
      });
    }
  };

  const handleUpdateUserStatus = () => {
    if (userToUpdateStatus) {
      setUsers(users.map(user => 
        user.id === userToUpdateStatus.id 
          ? { ...user, status: userToUpdateStatus.status } 
          : user
      ));
      setIsStatusModalOpen(false);
      setUserToUpdateStatus(null);
      
      toast({
        title: "Status atualizado",
        description: `O usuário foi ${userToUpdateStatus.status === 'active' ? 'ativado' : 'suspenso'} com sucesso.`
      });
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge variant="outline" className="bg-abrev-blue/20 text-abrev-blue border-abrev-blue/30">Admin</Badge>;
      case 'moderator':
        return <Badge variant="outline" className="bg-amber-500/20 text-amber-500 border-amber-500/30">Moderador</Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-500/20 text-gray-300 border-gray-500/30">Usuário</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-emerald-500/20 text-emerald-500 border-emerald-500/30">Ativo</Badge>;
      case 'suspended':
        return <Badge variant="outline" className="bg-red-500/20 text-red-500 border-red-500/30">Suspenso</Badge>;
      default:
        return <Badge variant="outline" className="bg-amber-500/20 text-amber-500 border-amber-500/30">Pendente</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Transition type="fade">
        <div>
          <h2 className="text-2xl font-bold text-white">Usuários</h2>
          <p className="text-gray-400">Gerencie usuários e permissões da plataforma</p>
        </div>
      </Transition>

      <Transition type="slide-up" delay={0.1}>
        <Card className="bg-abrev-dark-accent/40 border-gray-800">
          <CardHeader className="flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Todos os Usuários</CardTitle>
              <CardDescription>Gerencie todos os usuários da plataforma</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-60">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input 
                  placeholder="Buscar usuários..." 
                  className="pl-10 bg-abrev-dark/50 border-gray-700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="border-gray-700 hover:bg-gray-800">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="border-gray-700 hover:bg-gray-800">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-gray-800">
                  <TableHead>Usuário</TableHead>
                  <TableHead>Função</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Links</TableHead>
                  <TableHead>Cadastro</TableHead>
                  <TableHead>Ativ. Recente</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow className="hover:bg-abrev-dark-accent/60 border-gray-800">
                    <TableCell colSpan={7} className="text-center py-10 text-gray-400">
                      Nenhum usuário encontrado com o termo "{searchTerm}"
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-abrev-dark-accent/60 border-gray-800">
                      <TableCell>
                        <div>
                          <div className="font-medium text-white">{user.name}</div>
                          <div className="text-gray-400 text-xs">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{user.links}</TableCell>
                      <TableCell>
                        <div className="text-gray-300">{new Date(user.joined).toLocaleDateString('pt-BR')}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-gray-300">{new Date(user.lastActive).toLocaleDateString('pt-BR')}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {user.status === 'active' ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setUserToUpdateStatus({id: user.id, status: 'suspended'});
                                setIsStatusModalOpen(true);
                              }}
                              className="h-8 border-gray-700 hover:bg-amber-950 text-amber-500 hover:text-amber-400"
                            >
                              <UserX className="h-3.5 w-3.5" />
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setUserToUpdateStatus({id: user.id, status: 'active'});
                                setIsStatusModalOpen(true);
                              }}
                              className="h-8 border-gray-700 hover:bg-emerald-950 text-emerald-500 hover:text-emerald-400"
                            >
                              <UserCheck className="h-3.5 w-3.5" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 border-gray-700 hover:bg-gray-800"
                          >
                            <Shield className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 border-gray-700 hover:bg-gray-800"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setUserToDelete(user.id);
                              setIsDeleteModalOpen(true);
                            }}
                            className="h-8 border-gray-700 hover:bg-red-950 text-red-500 hover:text-red-400"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Transition>

      {/* Modal de confirmar exclusão */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-abrev-dark-accent border-gray-800">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteModalOpen(false)}
              className="border-gray-700 hover:bg-gray-800"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleDeleteUser} 
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de alterar status */}
      <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-abrev-dark-accent border-gray-800">
          <DialogHeader>
            <DialogTitle>
              {userToUpdateStatus?.status === 'active' ? 'Ativar' : 'Suspender'} Usuário
            </DialogTitle>
            <DialogDescription>
              {userToUpdateStatus?.status === 'active' 
                ? 'Confirme a ativação deste usuário na plataforma.' 
                : 'Tem certeza que deseja suspender este usuário? Ele perderá acesso temporário à plataforma.'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button 
              variant="outline" 
              onClick={() => setIsStatusModalOpen(false)}
              className="border-gray-700 hover:bg-gray-800"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleUpdateUserStatus} 
              className={userToUpdateStatus?.status === 'active' 
                ? "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-600"
                : "bg-amber-600 hover:bg-amber-700 focus:ring-amber-600"
              }
            >
              {userToUpdateStatus?.status === 'active' ? 'Ativar' : 'Suspender'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsers;
