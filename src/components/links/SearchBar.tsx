
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  placeholder = "Pesquisar...",
  className = ""
}) => {
  return (
    <div className={`relative ${className}`}>
      <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="bg-white/5 border border-gray-700 pl-10 pr-10 text-white focus:border-abrev-blue transition-all duration-300"
      />
      {searchTerm && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSearchTerm('')}
          className="h-7 w-7 absolute right-2 top-1/2 -translate-y-1/2 p-0 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X size={14} />
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
