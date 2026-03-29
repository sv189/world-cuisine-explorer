import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import DishCard from '../components/DishCard';
import SkeletonCard from '../components/SkeletonCard';
import '../styles/CountryPage.css';
import SearchBar from '../components/SearchBar';
import { useState } from 'react';

const countryToArea = {
  "American Samoa": "American",
  "Australia": "Australian",
  "Canada": "Canadian",
  "China": "Chinese",
  "Croatia": "Croatian",
  "Denmark": "Danish",
  "Egypt": "Egyptian",
  "France": "French",
  "Greece": "Greek",
  "Hong Kong": "Chinese",
  "India": "Indian",
  "Indonesia": "Indonesian",
  "Ireland": "Irish",
  "Italy": "Italian",
  "Jamaica": "Jamaican",
  "Japan": "Japanese",
  "Kenya": "Kenyan",
  "Malaysia": "Malaysian",
  "Mexico": "Mexican",
  "Morocco": "Moroccan",
  "Netherlands": "Dutch",
  "Nigeria": "Nigerian",
  "Philippines": "Filipino",
  "Poland": "Polish",
  "Portugal": "Portuguese",
  "Russia": "Russian",
  "Spain": "Spanish",
  "Taiwan": "Taiwanese",
  "Thailand": "Thai",
  "Tunisia": "Tunisian",
  "Turkey": "Turkish",
  "Ukraine": "Ukrainian",
  "United Kingdom": "British",
  "United States": "American",
  "Uruguay": "Uruguayan",
  "Vietnam": "Vietnamese",
}

function CountryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const area = countryToArea[id];

  const [search, setSearch] = useState("");

  const { data, loading, error } = useFetch(
    area 
      ? `https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(area)}`
      : null
  );

  return (
    <div className="country-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="country-header">
        <h1>🍽️ {area || id} Cuisine</h1>
        <p>Explore traditional dishes from {id}</p>
      </div>

      <SearchBar onSearch={setSearch} placeholder="Search dishes..." />

      {loading && area && (
        <div className="dish-grid">
          {Array.from({ length:8 }).map((_, i) => (
          <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {!area && (
        <div className="empty-state">
          <span>🍽️</span>
          <p>No recipes available for {id} yet. Try exploring another country!</p>
        </div>
      )}

      {error && <p className="status error">No dishes found for {id}.</p>}

      {data && data.meals && (
        <div className="dish-grid">
          {data.meals
            .filter(dish =>
              dish.strMeal.toLowerCase().includes(search.toLowerCase())
            )
            .map(dish => (
              <DishCard key={dish.idMeal} dish={dish} />
            ))}
          {data.meals.filter(dish => 
            dish.strMeal.toLowerCase().includes(search.toLowerCase())
          ).length === 0 && (
            <div className="empty-state">
              <span>🍽️</span>
              <p>No dishes found for "{search}"</p>
            </div>
          )}    
        </div>
      )}

      {data && !data.meals && (
        <div className="empty-state">
          <span>🍽️</span>
          <p>No dishes found for {id}. Try another country!</p>
        </div>
      )}
    </div>
  );
}

export default CountryPage;