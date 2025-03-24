
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { useIsMobile } from '@/hooks/use-mobile';

interface LinkItem {
  id: number;
  original: string;
  short: string;
  clicks: number;
  created: string;
}

interface RecentLinksTableProps {
  links: LinkItem[];
}

const RecentLinksTable = ({ links }: RecentLinksTableProps) => {
  const isMobile = useIsMobile();

  return (
    <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 w-full overflow-hidden">
      <CardHeader>
        <CardTitle className="text-white text-lg md:text-xl">Links Recentes</CardTitle>
        <CardDescription className="text-slate-400 text-xs md:text-sm">Links encurtados recentemente</CardDescription>
      </CardHeader>
      <CardContent className="p-0 md:p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-400 text-xs">Link Original</TableHead>
                <TableHead className="text-slate-400 text-xs">Link Encurtado</TableHead>
                <TableHead className="text-slate-400 text-xs">Cliques</TableHead>
                {!isMobile && (
                  <TableHead className="text-slate-400 text-xs">Criado</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {links.map((link) => (
                <TableRow key={link.id} className="border-slate-700">
                  <TableCell className="font-medium text-white text-xs p-2 md:p-4">
                    <div className="truncate max-w-[80px] sm:max-w-[120px] md:max-w-[180px]" title={link.original}>
                      {link.original}
                    </div>
                  </TableCell>
                  <TableCell className="text-abrev-blue text-xs p-2 md:p-4">{link.short}</TableCell>
                  <TableCell className="text-white text-xs p-2 md:p-4">{link.clicks}</TableCell>
                  {!isMobile && (
                    <TableCell className="text-slate-400 text-xs p-2 md:p-4">{link.created}</TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex justify-center p-4">
          <Button variant="outline" className="text-white text-xs border-slate-700 hover:bg-slate-700">
            Ver Todos os Links
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentLinksTable;
