import { useNavigate } from 'react-router-dom';
import '../styles/CountryCard.css';

function CountryCard({ country }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/country/${country.name.common}`);
  }

  return (
    <div className="country-card" onClick={handleClick}>
      <img 
        src={country.flags.svg} 
        alt={country.flags.alt || `Flag of ${country.name.common}`}
        className="country-flag" 
      />
      <div className="country-info">
        <h3>{country.name.common}</h3>
        <p>{country.region}</p>
      </div>
    </div>
  );
}

export default CountryCard;