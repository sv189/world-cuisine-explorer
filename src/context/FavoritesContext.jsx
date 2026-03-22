import { createContext, useContext, useReducer, useEffect } from 'react';

const FavoritesContext = createContext();

function favoritesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'REMOVE':
      return state.filter(item => item.idMeal !== action.payload);
    case 'LOAD':
      return action.payload;
    default:
      return state;
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, dispatch] = useReducer(favoritesReducer, []);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favorites') || '[]');
    dispatch({ type:'LOAD', payload: saved });
  }, []);
  
  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  function addFavorite(dish) {
    dispatch({ type: 'ADD', payload: dish });
  }

  function removeFavorite(id) {
    dispatch({ type: 'REMOVE', payload: id });
  }

  function isFavorited(id) {
    return favorites.some(item => item.idMeal === id);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorited }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}