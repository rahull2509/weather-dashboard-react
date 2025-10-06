import { Star, X, Settings } from 'lucide-react';
import { useState } from 'react';

function FavoriteCities({ favorites, onSelectCity, onRemoveFavorite, onSetDefault, defaultCity }) {
  const [showSettings, setShowSettings] = useState(false);

  if (favorites.length === 0) return null;

  return (
    <div className="favorites-section">
      <div className="favorites-header">
        <h2>⭐ Favorite Cities</h2>
        <button 
          className="settings-btn"
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings size={20} />
          {showSettings ? 'Hide' : 'Settings'}
        </button>
      </div>

      <div className="favorites-grid">
        {favorites.map((city, index) => (
          <div 
            key={index} 
            className={`favorite-card ${defaultCity === city ? 'default-city' : ''}`}
          >
            <div 
              className="favorite-content"
              onClick={() => onSelectCity(city)}
            >
              <Star 
                size={20} 
                fill={defaultCity === city ? "#FFD700" : "transparent"}
                color={defaultCity === city ? "#FFD700" : "white"}
              />
              <span>{city}</span>
              {defaultCity === city && (
                <span className="default-badge">Default</span>
              )}
            </div>
            
            {showSettings && (
              <div className="favorite-actions">
                {defaultCity !== city && (
                  <button 
                    className="action-btn set-default"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSetDefault(city);
                    }}
                    title="Set as default"
                  >
                    Set Default
                  </button>
                )}
                <button 
                  className="action-btn remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFavorite(city);
                  }}
                  title="Remove"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteCities;