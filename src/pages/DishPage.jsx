import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useFavorites } from '../context/FavoritesContext';
import '../styles/DishPage.css';
import SkeletonCard from '../components/SkeletonCard';

function DishPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorited, addFavorite, removeFavorite } = useFavorites();

  const { data, loading, error } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  const meal = data?.meals?.[0];
  const favorited = meal ? isFavorited(meal.idMeal) : false;

  function handleFavorite() {
    if (favorited) {
      removeFavorite(meal.idMeal);
    } else {
      addFavorite({
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strMealThumb: meal.strMealThumb
      });
    }
  }

  function getIngredients(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure?.trim()} ${ingredient.trim()}`);
      }
    }
    return ingredients;
  }

  function getYoutubeId(url) {
    if (!url) return null;
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
  }

  if (loading) return (
    <div className="dish-page">
      <div className="dish-grid">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
  if (error) return <div className="dish-page
"><p className="status error">Error loading recipe...</p></div>;
  if (!meal) return <div className="dish-page
"><p className="status">Recipe not found.</p></div>;

  const ingredients = getIngredients(meal);
  const youtubeId = getYoutubeId(meal.strYoutube);

  return (
    <div className="dish-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="dish-hero">
        <img 
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="dish-hero-img" 
        />
        <div className="dish-hero-info">
          <h1>{meal.strMeal}</h1>
          <p className="dish-meta">🌍 {meal.strArea} · 🍽️ {meal.strCategory}</p>
          <button 
            className={`fav-btn-large ${favorited ? "favorited" : ""}`}
            onClick={handleFavorite}
          >
            {favorited ? "❤️ Saved" : "🤍 Save Recipe"}    
          </button>
        </div>
      </div>

      <div className="dish-content">
        <div className="ingredients-section">
          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            {ingredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
        </div>

        <div className="instructions-section">
          <h2>Instructions</h2>
          <p className="instructions">{meal.strInstructions}</p>
        </div>
      </div>

      {youtubeId && (
        <div className="video-section">
          <h2>Video Tutorial</h2>
          <iframe 
            src={`https://www.youtube.com/embed/${youtubeId}`} 
            title={`${meal.strMeal} recipe video`}
            allowFullScreen
            className="recipe-video"
          />
        </div>
      )}
    </div>
  );
}

export default DishPage;