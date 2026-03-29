import { useState, useEffect } from 'react';
import '../styles/SearchBar.css';

function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay); 
  };
}

function SearchBar({ onSearch, placeholder = "Search countries..."}) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const debouncedSearch = debounce(onSearch, 300);
    debouncedSearch(query);
  }, [query]);

  function handleChange(e) {
    setQuery(e.target.value);
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
        <button className="clear-btn" onClick={handleClear}>✕</button>
      )}
    </div>
  );
}

export default SearchBar;