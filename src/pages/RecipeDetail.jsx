import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { ClipboardList, BookOpen } from "lucide-react";
import Header from "../components/Header";
import { useFavorites } from "../hooks/useFavorites";
import recipesData from "../data/recipes.json";

const RecipeDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  // determine where user came from for contextual breadcrumb
  const cameFromFavorites = location.state?.from === "favorites" || (typeof document !== "undefined" && document.referrer.includes("/favorites"));

  const breadcrumbText = cameFromFavorites ? "Back to Favorites" : "Back to Recipes";
  const breadcrumbPath = cameFromFavorites ? "/favorites" : "/";

  useEffect(() => {
    try {
      const foundRecipe = recipesData.find((r) => r.id === parseInt(id));
      if (foundRecipe) {
        setRecipe(foundRecipe);
      } else {
        setError("Recipe not found");
      }
    } catch (err) {
      setError("Error loading recipe");
      console.error("Error loading recipe:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleFavoriteToggle = () => {
    if (!recipe) return;

    if (isFavorite(recipe.id)) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading recipe...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😞</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recipe Not Found</h2>
            <p className="text-gray-600 mb-6">{error || "The recipe you're looking for doesn't exist."}</p>
            <Link to="/" className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors duration-200">
              Back to Recipes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isRecipeFavorite = isFavorite(recipe.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6 mt-9">
            <Link to={breadcrumbPath} className="text-white transition-colors duration-200 font-body bg-yellow-400 hover:bg-yellow-600 px-3 py-2 rounded-md font-semibold">
              {breadcrumbText}
            </Link>
          </nav>
          {/* Hero Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative h-64 md:h-96">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-full object-cover"
                  onError={() => {
                    // e.target.src = "/assets/placeholder-recipe.svg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>

              {/* Content Section */}
              <div className="p-8 flex flex-col justify-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-heading">{recipe.name}</h1>
                <p className="text-lg text-gray-600 leading-relaxed mb-6 font-body">{recipe.description}</p>

                {/* Favorite Button */}
                <button
                  onClick={handleFavoriteToggle}
                  className={`inline-flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer w-fit font-body ${
                    isRecipeFavorite ? "bg-gray-100 text-gray-700 hover:bg-gray-300" : "bg-yellow-500 text-white hover:bg-yellow-600 shadow-lg"
                  }`}>
                  <span>{isRecipeFavorite ? "Remove from Favorites" : "Add to Favorites"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Recipe Content */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Ingredients Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="bg-yellow-100 p-3 rounded-xl mr-4">
                  <ClipboardList className="w-6 h-6 text-yellow-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 font-heading">Ingredients</h2>
              </div>
              <div className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="bg-yellow-500 w-2 h-2 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed font-body">{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-xl mr-4">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 font-heading">Instructions</h2>
              </div>
              <div className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">{index + 1}</div>
                    <span className="text-gray-700 leading-relaxed font-body">{instruction}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecipeDetail;
