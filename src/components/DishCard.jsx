import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import '../styles/DishCard.css';

function DishCard({ dish }) {
  const navigate = useNavigate();
  const { isFavorited, addFavorite, removeFavorite } = useFavorites();

  const favorited = isFavorited(dish.idMeal);

  function handleClick() {
    navigate(`/dish/${dish.idMeal}`);
  }

  function handleFavorite(e) {
    e.stopPropagation();
    if (favorited) {
      removeFavorite(dish.idMeal);
    } else {
      addFavorite(dish);
    }
  }

  return (
    <div className="dish-card" onClick={handleClick}>
      <img 
        src={dish.strMealThumb} 
        alt={dish.strMeal}
        className="dish-img" 
      />
      <div className="dish-info">
        <h3>{dish.strMeal}</h3>
        <button
          className={`fav-btn ${favorited ? "favorited" : ""}`}
          onClick={handleFavorite}
        >
          {favorited ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}

export default DishCard;