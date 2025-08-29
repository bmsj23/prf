import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import { useFavorites } from "../hooks/useFavorites";

const Favorites = () => {
  const { favorites } = useFavorites();
  const [searchTerm, setSearchTerm] = useState("");

  // filter favorites based on search term
  const filteredFavorites = favorites.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="text-center mb-8 mt-7">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 font-heading">Your Favorite Recipes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-body">
            {favorites.length > 0
              ? `You have ${favorites.length} favorite recipe${favorites.length !== 1 ? "s" : ""} saved. Cook them anytime!`
              : "Start building your collection of favorite Filipino recipes."}
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💔</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2 font-heading">No favorites yet</h3>
            <p className="text-gray-500 mb-6 font-body">Browse our recipes and add your favorites to see them here.</p>
            <Link to="/" className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 inline-block font-body">
              Explore Recipes
            </Link>
          </div>
        ) : (
          <>
            {favorites.length > 3 && <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} placeholder="Search your favorite recipes..." />}

            {filteredFavorites.length === 0 && searchTerm ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2 font-heading">No favorites found</h3>
                <p className="text-gray-500 font-body">No favorite recipes match "{searchTerm}". Try a different search term.</p>
              </div>
            ) : (
              <>
                {searchTerm && (
                  <div className="mb-6">
                    <p className="text-gray-600 font-body">
                      Found {filteredFavorites.length} favorite recipe
                      {filteredFavorites.length !== 1 ? "s" : ""} for "{searchTerm}"
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredFavorites.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} from="favorites" />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Favorites;
