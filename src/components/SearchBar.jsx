import { useState } from 'react';
import '../styles/SearchBar.css';

function SearchBar({ onSearch, placeholder = "Search countries..."}) {
  const [query, setQuery] = useState("");

  function handleChange(e) {
    const value = e.target.value;
    console.log("search value:", value);
    setQuery(value);
    onSearch(value);
  }

  function handleClear() {
    setQuery("");
    onSearch("");
  }

  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input 
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="search-input"  
      />
      {query && (
        <button className="clear-btn" onClick={handleClear}>X</button>
      )}
    </div>
  );
}

export default SearchBar;