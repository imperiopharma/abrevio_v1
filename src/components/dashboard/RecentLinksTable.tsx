
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

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
  return (
    <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Links Recentes</CardTitle>
        <CardDescription className="text-slate-400">Links encurtados recentemente</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700">
              <TableHead className="text-slate-400">Link Original</TableHead>
              <TableHead className="text-slate-400">Link Encurtado</TableHead>
              <TableHead className="text-slate-400">Cliques</TableHead>
              <TableHead className="text-slate-400">Criado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {links.map((link) => (
              <TableRow key={link.id} className="border-slate-700">
                <TableCell className="font-medium text-white">
                  <div className="truncate max-w-[180px]" title={link.original}>
                    {link.original}
                  </div>
                </TableCell>
                <TableCell className="text-abrev-blue">{link.short}</TableCell>
                <TableCell className="text-white">{link.clicks}</TableCell>
                <TableCell className="text-slate-400">{link.created}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-center">
          <Button variant="outline" className="text-white border-slate-700 hover:bg-slate-700">
            Ver Todos os Links
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentLinksTable;
