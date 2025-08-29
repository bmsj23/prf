import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";

const Header = () => {
  const { favoritesCount } = useFavorites();

  return (
    <header className="bg-yellow-300 text-gray-700 shadow-lg fixed w-full z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold font-heading">Pinoy Recipe Finder</h1>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link to="/" className="hover:text-black-300 transition-colors duration-200 font-medium">
              Home
            </Link>
            <div className="bg-white rounded-lg px-4 pr-3 py-2 shadow-sm w-34">
                <Link to="/favorites" className="hover:text-yellow-700 text-yellow-500 transition-colors duration-200 font-medium flex items-center justify-between font-body">
                  <span>Favorites</span>
                <span className="bg-yellow-300 text-gray-700 rounded-full px-2 py-1 text-xs font-extrabold w-8 text-center">{favoritesCount}</span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
