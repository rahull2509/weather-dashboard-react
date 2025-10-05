import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import { getCurrentWeather, getForecast, getWeatherByCoords } from './services/weatherApi';
import { getWeatherBackground, isDayTime } from './utils/weatherUtils';
import './App.css';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load default city on mount
    fetchWeather('London');
  }, []);

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      setError(null);
      
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(city),
        getForecast(city)
      ]);
      
      setCurrentWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError('City not found. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetLocation = () => {
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

  const currentTime = Math.floor(Date.now() / 1000);
  const isDay = currentWeather ? 
    isDayTime(currentWeather.sys.sunrise, currentWeather.sys.sunset, currentTime) : 
    true;

  const backgroundStyle = currentWeather 
    ? { background: getWeatherBackground(currentWeather.weather[0].main, isDay) }
    : {};

  return (
    <div className="App" style={backgroundStyle}>
      <div className="container">
        <header className="app-header">
          <h1>🌤️ Weather Dashboard</h1>
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
            <CurrentWeather weather={currentWeather} />
            <Forecast forecast={forecast} currentWeather={currentWeather} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;