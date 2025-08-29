import { Search } from "lucide-react";

const SearchBar = ({ searchTerm, onSearchChange, placeholder }) => {
  return (
    // The `mx-auto` class is removed here as the parent handles centering.
    <div className="w-full max-w-2xl px-4 mb-8">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          // The `w-full` class is added to ensure the input fills the container.
          className="w-full px-5 py-5 text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200 font-body text-center text-xl"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-6">
          <Search className="w-6 h-6 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;