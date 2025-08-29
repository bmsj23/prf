import { Search } from "lucide-react";

const SearchBar = ({ searchTerm, onSearchChange, placeholder}) => {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-12 text-gray-700 bg-white border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200 font-body text-center" />
        <div className="absolute inset-y-0 left-0 flex items-center pl-4">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
