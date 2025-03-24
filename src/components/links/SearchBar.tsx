
import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  placeholder = "Pesquisar links..."
}) => {
  return (
    <div className="relative w-full md:w-auto">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-80 pl-10 pr-4 py-2 bg-white/5 border border-gray-700 rounded-lg text-white focus:border-abrev-blue focus:ring-0 focus:outline-none transition-all duration-300"
      />
    </div>
  );
};

export default SearchBar;
