import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import CountryCard from '../components/CountryCard';
import '../styles/Home.css';
import SkeletonCard from '../components/SkeletonCard';

const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

function Home() {
  const [region, setRegion] = useState("");

  const url = region
    ? `https://restcountries.com/v3.1/region/${region}?fields=name,flags,region,cca2`
    : `https://restcountries.com/v3.1/all?fields=name,flags,region,cca2`;

  const { data, loading, error } = useFetch(url);

  return (
    <div className="home">
      <div className="hero">
        <h1>🌍 Explore World Cuisines</h1>
        <p>Click a country to discover its traditional dishes and recipes</p>
      </div>

      <div className="region-filters">
        <button 
          className={`region-btn ${region === "" ? "active" : ""}`}
          onClick={() => setRegion("")}
        >
          All
        </button>
        {regions.map(r => (
          <button
            key={r}
            className={`region-btn ${region === r ? "active" : ""}`}
            onClick={() => setRegion(r)} 
          >
            {r}
          </button>
        ))}
      </div>
      
      {loading && (
        <div className="country-grid">
          {Array.from({ length:12 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}
      

      {error && <p className="status error">Error loading countries.</p>}

      {data && (
        <div className="country-grid">
          {data
            .sort((a, b) => a.name.common.localeCompare(b.name.common))
            .map(country => (
              <CountryCard key={country.cca2} country={country} />
            ))}
        </div>
      )}
    </div>
  );
}

export default Home;