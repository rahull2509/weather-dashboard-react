import { Search, MapPin } from 'lucide-react';
import { useState } from 'react';

function SearchBar({ onSearch, onGetLocation }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity('');
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-bar">
        <Search size={20} className="search-icon" />
        <input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" className="search-btn">Search</button>
      </form>
      <button className="location-btn" onClick={onGetLocation}>
        <MapPin size={20} />
        Use My Location
      </button>
    </div>
  );
}

export default SearchBar;