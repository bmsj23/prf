import { useState, useEffect } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import recipesData from "../data/recipes.json";

const Homepage = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // load recipes on component mount
  useEffect(() => {
    try {
      setRecipes(recipesData);
      setFilteredRecipes(recipesData);
      setLoading(false);
    } catch (error) {
      console.error("Error loading recipes:", error);
      setLoading(false);
    }
  }, []);

  // filter recipes based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
      setFilteredRecipes(filtered);
    }
  }, [searchTerm, recipes]);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading delicious recipes...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="w-full bg-yellow-200 py-12">
        <div className="text-center mb-8 mt-30 opacity-100 container mx-auto px-4 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 font-heading">
            Discover Filipino Cuisine
          </h2>
          <p className="text-gray-600 max-w-2xl pt-4 mx-auto text-justify font-body">
            Explore our collection of traditional Filipino dishes, from the
            classic adobo to hearty sinigang. Find your next meal in our various
            recipe selections and discover the ingredients and cooking
            instructions. Bring the flavors of the Philippines to your kitchen!
          </p>
        </div>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          placeholder="Search for recipes, ingredients, or dishes..."
        />
      </div>

      <main className="container mx-auto px-4 py-8 pt-4">

        {filteredRecipes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2 font-heading">
              No recipes found
            </h3>
            <p className="text-gray-500 font-body">
              {searchTerm
                ? `No recipes match "${searchTerm}". Try a different search term.`
                : "No recipes available at the moment."}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                {searchTerm
                  ? `Found ${filteredRecipes.length} recipe${
                      filteredRecipes.length !== 1 ? "s" : ""
                    } for "${searchTerm}"`
                  : `Showing all ${filteredRecipes.length} recipes`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Homepage;
