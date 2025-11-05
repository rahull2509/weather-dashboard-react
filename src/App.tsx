import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import HourlyForecast from './components/HourlyForecast';
import FavoriteCities from './components/FavoriteCities';
import { getCurrentWeather, getForecast, getWeatherByCoords } from './services/weatherApi';
import { getWeatherBackground, isDayTime } from './utils/weatherUtils';
import { Star } from 'lucide-react';
import './App.css';

interface WeatherData {
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
  visibility: number;
}

interface ForecastData {
  list: Array<{
    dt: number;
    weather: Array<{
      main: string;
      description: string;
    }>;
    main: {
      temp: number;
      temp_max: number;
      temp_min: number;
      humidity: number;
      pressure: number;
    };
    wind: {
      speed: number;
    };
  }>;
}

function App() {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [favorites, setFavorites] = useState<string[]>([]);
  const [defaultCity, setDefaultCity] = useState<string>('London');

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteCities') || '[]') as string[];
    const savedDefault = localStorage.getItem('defaultCity') || 'London';

    setFavorites(savedFavorites);
    setDefaultCity(savedDefault);

    fetchWeather(savedDefault);
  }, []);

  const fetchWeather = async (city: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(city),
        getForecast(city),
      ]);

      setCurrentWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError('Failed to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  const handleGetLocation = (): void => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const weatherData = await getWeatherByCoords(latitude, longitude);
            const forecastData = await getForecast(weatherData.name);

            setCurrentWeather(weatherData);
            setForecast(forecastData);
            setError(null);
          } catch (err) {
            setError('Unable to get weather for your location.');
          } finally {
            setLoading(false);
          }
        },
        () => {
          setError('Unable to access your location.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  const handleAddFavorite = (): void => {
    if (!currentWeather) return;

    const cityName = currentWeather.name;

    if (favorites.includes(cityName)) {
      alert('City already in favorites!');
      return;
    }

    const updatedFavorites = [...favorites, cityName];
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
  };

  const handleRemoveFavorite = (city: string): void => {
    const updatedFavorites = favorites.filter((fav) => fav !== city);
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));

    if (city === defaultCity && updatedFavorites.length > 0) {
      const newDefault = updatedFavorites[0];
      setDefaultCity(newDefault);
      localStorage.setItem('defaultCity', newDefault);
      fetchWeather(newDefault);
    } else if (updatedFavorites.length === 0) {
      setDefaultCity('London');
      localStorage.setItem('defaultCity', 'London');
    }
  };

  const handleSetDefault = (city: string): void => {
    setDefaultCity(city);
    localStorage.setItem('defaultCity', city);
    fetchWeather(city);
  };

  const currentTime = Math.floor(Date.now() / 1000);
  const isDay = currentWeather
    ? isDayTime(currentWeather.sys.sunrise, currentWeather.sys.sunset, currentTime)
    : true;

  const backgroundStyle = currentWeather
    ? { background: getWeatherBackground(currentWeather.weather[0].main, isDay) }
    : {};

  return (
    <div className="App" style={backgroundStyle}>
      <div className="container">
        <header className="app-header">
          <h1>🌤️ Weather Dashboard</h1>
          <p>Real-time weather with hourly forecast</p>
        </header>

        <SearchBar onSearch={fetchWeather} onGetLocation={handleGetLocation} />

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && currentWeather && (
          <>
            <div className="favorite-action">
              <button
                className="add-favorite-btn"
                onClick={handleAddFavorite}
                disabled={favorites.includes(currentWeather.name)}
              >
                <Star
                  size={20}
                  fill={favorites.includes(currentWeather.name) ? '#FFD700' : 'transparent'}
                />
                {favorites.includes(currentWeather.name)
                  ? 'Added to Favorites'
                  : 'Add to Favorites'}
              </button>
            </div>

            <FavoriteCities
              favorites={favorites}
              defaultCity={defaultCity}
              onSelectCity={fetchWeather}
              onRemoveFavorite={handleRemoveFavorite}
              onSetDefault={handleSetDefault}
            />

            <CurrentWeather weather={currentWeather} />
            <HourlyForecast forecast={forecast} />
            <Forecast forecast={forecast} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
