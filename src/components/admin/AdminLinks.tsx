
import React, { useState } from 'react';
import {
  Table,
  TableBody,
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
  ExternalLink,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  QrCode
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Transition } from '@/components/animations/Transition';
import { useToast } from '@/hooks/use-toast';

// Tipos
interface Link {
  id: string;
  shortUrl: string;
  originalUrl: string;
  createdBy: string;
  createdAt: string;
  clicks: number;
  status: 'active' | 'disabled' | 'flagged';
}

// Dados mockados
const mockLinks: Link[] = [
  {
    id: "1",
    shortUrl: "abrev.io/promo",
    originalUrl: "https://example.com/summer-promotion-2023-special-discount-page",
    createdBy: "Ana Silva",
    createdAt: "2023-09-10",
    clicks: 4582,
    status: "active"
  },
  {
    id: "2",
    shortUrl: "abrev.io/launch",
    originalUrl: "https://example.com/new-product-launch-exclusive-preview",
    createdBy: "Roberto Pereira",
    createdAt: "2023-09-12",
    clicks: 3826,
    status: "active"
  },
  {
    id: "3",
    shortUrl: "abrev.io/sale",
    originalUrl: "https://example.com/clearance-sale-up-to-70-percent-off",
    createdBy: "Carla Mendes",
    createdAt: "2023-09-15",
    clicks: 3012,
    status: "active"
  },
  {
    id: "4",
    shortUrl: "abrev.io/webinar",
    originalUrl: "https://example.com/expert-webinar-registration-page",
    createdBy: "João Costa",
    createdAt: "2023-09-18",
    clicks: 1256,
    status: "disabled"
  },
  {
    id: "5",
    shortUrl: "abrev.io/download",
    originalUrl: "https://example.com/free-ebook-download-landing-page",
    createdBy: "Marina Santos",
    createdAt: "2023-09-20",
    clicks: 945,
    status: "flagged"
  },
  {
    id: "6",
    shortUrl: "abrev.io/blackfriday",
    originalUrl: "https://example.com/black-friday-deals-preview-exclusive",
    createdBy: "Paulo Oliveira",
    createdAt: "2023-09-22",
    clicks: 578,
    status: "active"
  },
  {
    id: "7",
    shortUrl: "abrev.io/event",
    originalUrl: "https://example.com/annual-conference-registration-early-bird",
    createdBy: "Fernanda Lima",
    createdAt: "2023-09-25",
    clicks: 312,
    status: "active"
  }
];

const AdminLinks = () => {
  const { toast } = useToast();
  const [links, setLinks] = useState<Link[]>(mockLinks);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState<string | null>(null);
  
  const filteredLinks = links.filter(
    link => 
      link.shortUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteLink = () => {
    if (linkToDelete) {
      setLinks(links.filter(link => link.id !== linkToDelete));
      setIsDeleteModalOpen(false);
      setLinkToDelete(null);
      
      toast({
        title: "Link excluído",
        description: "O link foi removido com sucesso."
      });
    }
  };

  const handleToggleLinkStatus = (id: string) => {
    setLinks(links.map(link => 
      link.id === id 
        ? { 
            ...link, 
            status: link.status === 'active' ? 'disabled' : 'active' 
          } 
        : link
    ));
    
    const link = links.find(l => l.id === id);
    const newStatus = link?.status === 'active' ? 'disabled' : 'active';
    
    toast({
      title: `Link ${newStatus === 'active' ? 'ativado' : 'desativado'}`,
      description: `O link foi ${newStatus === 'active' ? 'ativado' : 'desativado'} com sucesso.`
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-emerald-500/20 text-emerald-500 border-emerald-500/30">Ativo</Badge>;
      case 'disabled':
        return <Badge variant="outline" className="bg-gray-500/20 text-gray-400 border-gray-500/30">Desativado</Badge>;
      case 'flagged':
        return <Badge variant="outline" className="bg-amber-500/20 text-amber-500 border-amber-500/30">Marcado</Badge>;
      default:
        return null;
    }
  };

  const truncateUrl = (url: string, maxLength: number = 50) => {
    return url.length > maxLength ? url.substring(0, maxLength) + '...' : url;
  };

  return (
    <div className="space-y-6">
      <Transition type="fade">
        <div>
          <h2 className="text-2xl font-bold text-white">Links</h2>
          <p className="text-gray-400">Gerencie todos os links encurtados da plataforma</p>
        </div>
      </Transition>

      <Transition type="slide-up" delay={0.1}>
        <Card className="bg-abrev-dark-accent/40 border-gray-800">
          <CardHeader className="flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Todos os Links</CardTitle>
              <CardDescription>Gerenciar, editar ou desativar links</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-60">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input 
                  placeholder="Buscar links..." 
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
                  <TableHead>URL</TableHead>
                  <TableHead>Destino</TableHead>
                  <TableHead>Criado por</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Cliques</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLinks.length === 0 ? (
                  <TableRow className="hover:bg-abrev-dark-accent/60 border-gray-800">
                    <TableCell colSpan={7} className="text-center py-10 text-gray-400">
                      Nenhum link encontrado com o termo "{searchTerm}"
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLinks.map((link) => (
                    <TableRow key={link.id} className="hover:bg-abrev-dark-accent/60 border-gray-800">
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <ExternalLink className="h-4 w-4 text-abrev-blue" />
                          <span className="font-medium text-white">{link.shortUrl}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-gray-400 text-xs max-w-[200px] truncate" title={link.originalUrl}>
                          {truncateUrl(link.originalUrl)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-gray-300">{link.createdBy}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-gray-300">{new Date(link.createdAt).toLocaleDateString('pt-BR')}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{link.clicks.toLocaleString()}</div>
                      </TableCell>
                      <TableCell>{getStatusBadge(link.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 border-gray-700 hover:bg-gray-800"
                          >
                            <QrCode className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 border-gray-700 hover:bg-gray-800"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 border-gray-700 hover:bg-gray-800"
                              >
                                {link.status === 'active' ? (
                                  <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                                ) : link.status === 'disabled' ? (
                                  <XCircle className="h-3.5 w-3.5 text-gray-400" />
                                ) : (
                                  <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                                )}
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-abrev-dark-accent border-gray-700">
                              <DropdownMenuItem 
                                onClick={() => handleToggleLinkStatus(link.id)}
                                className="focus:bg-abrev-dark/50"
                              >
                                {link.status === 'active' ? (
                                  <>
                                    <XCircle className="h-4 w-4 mr-2 text-gray-400" />
                                    <span>Desativar</span>
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle className="h-4 w-4 mr-2 text-emerald-500" />
                                    <span>Ativar</span>
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="focus:bg-abrev-dark/50">
                                <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                                <span>Marcar</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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
                              setLinkToDelete(link.id);
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
              Tem certeza que deseja excluir este link? Esta ação não pode ser desfeita e todos os redirecionamentos para este link deixarão de funcionar.
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
              onClick={handleDeleteLink} 
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminLinks;
