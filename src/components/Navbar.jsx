import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext';
import '../styles/Navbar.css';

function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { favorites } = useFavorites();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        🌍 World Cuisine Explorer
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/favorites">
          ❤️ Favorites
          {favorites.length > 0 && (
            <span className="fav-badge">{favorites.length}</span>
          )}
        </Link>
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDark ? "☀️ Light" : "🌙 Dark"}    
        </button>
      </div>
    </nav>
  );
}

export default Navbar;