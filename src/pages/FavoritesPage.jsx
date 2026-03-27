import { useNavigate } from "react-router-dom";
import { useFavorites } from '../context/FavoritesContext';
import DishCard from "../components/DishCard";
import '../styles/FavoritesPage.css';

function FavoritesPage() {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1>❤️ Saved Recipes</h1>
        <p>{favorites.length} saved {favorites.length === 1 ? "recipe" : "recipes"}</p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <span>🍽️</span>
          <p>No saved recipes yet.</p>
          <button className="back-btn" onClick={() => navigate("/")}>
            Explore Cuisines
          </button>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map(dish => (
            <DishCard key={dish.idMeal} dish={dish}/>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;