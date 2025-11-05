import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import WeatherIcon from './components/WeatherIcon';
import { getCurrentWeather, getForecast, getWeatherByCoords } from './services/weatherApi';
import { formatTime, getWeatherBackground, isDayTime } from './utils/weatherUtils';
import { Calendar } from 'lucide-react';

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
  dt: number;
}

interface ForecastData {
  list: Array<{
    dt: number;
    weather: Array<{
      main: string;
      description: string;
    }>;
    main: {
      temp_max: number;
      temp_min: number;
      humidity: number;
    };
    wind: {
      speed: number;
    };
  }>;
}

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [background, setBackground] = useState<string>('linear-gradient(135deg, #667eea 0%, #764ba2 100%)');

  useEffect(() => {
    // Load default city on initial load
    fetchWeatherData('London');
  }, []);

  const fetchWeatherData = async (city: string) => {
    setLoading(true);
    setError('');
    try {
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(city),
        getForecast(city)
      ]);
      
      setWeather(weatherData);
      setForecast(forecastData);
      
      // Update background based on weather condition
      const isDay = isDayTime(
        weatherData.sys.sunrise,
        weatherData.sys.sunset,
        weatherData.dt
      );
      const newBg = getWeatherBackground(weatherData.weather[0].main, isDay);
      setBackground(newBg);
    } catch (err) {
      setError('City not found. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (city: string) => {
    fetchWeatherData(city);
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      setError('');
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const weatherData = await getWeatherByCoords(latitude, longitude);
            
            setWeather(weatherData);
            
            // Get forecast by city name
            const cityForecast = await getForecast(weatherData.name);
            setForecast(cityForecast);
            
            const isDay = isDayTime(
              weatherData.sys.sunrise,
              weatherData.sys.sunset,
              weatherData.dt
            );
            const newBg = getWeatherBackground(weatherData.weather[0].main, isDay);
            setBackground(newBg);
          } catch (err) {
            setError('Unable to fetch weather for your location.');
            console.error(err);
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          setError('Unable to access your location. Please enable location services.');
          setLoading(false);
          console.error(err);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isDay = weather ? isDayTime(
    weather.sys.sunrise,
    weather.sys.sunset,
    weather.dt
  ) : true;

  return (
    <div className="App" style={{ background }}>
      <div className="container">
        <header className="app-header">
          <h1>⛅ Weather Dashboard</h1>
          <p>Your personal weather companion</p>
        </header>

        <SearchBar onSearch={handleSearch} onGetLocation={handleGetLocation} />

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

        {weather && !loading && (
          <>
            <div className="current-weather">
              <div className="current-main">
                <div className="location-header">
                  <div className="location">
                    <h1>{weather.name}, {weather.sys.country}</h1>
                    <p className="weather-desc">{weather.weather[0].description}</p>
                  </div>
                  <div className="current-date">
                    <Calendar size={20} />
                    <p>{getCurrentDate()}</p>
                  </div>
                </div>

                <div className="temp-display">
                  <WeatherIcon 
                    condition={weather.weather[0].main}
                    isDay={isDay}
                    size={80}
                  />
                  <div className="temp-info">
                    <h2>{Math.round(weather.main.temp)}°C</h2>
                    <p className="feels-like">Feels like {Math.round(weather.main.feels_like)}°C</p>
                    <p className="day-night-indicator">
                      {isDay ? '☀️ Daytime' : '🌙 Nighttime'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="weather-details">
                <div className="detail-card">
                  <span>💧</span>
                  <div>
                    <p className="detail-label">Humidity</p>
                    <p className="detail-value">{weather.main.humidity}%</p>
                  </div>
                </div>
                <div className="detail-card">
                  <span>💨</span>
                  <div>
                    <p className="detail-label">Wind Speed</p>
                    <p className="detail-value">{weather.wind.speed} m/s</p>
                  </div>
                </div>
                <div className="detail-card">
                  <span>🌡️</span>
                  <div>
                    <p className="detail-label">Pressure</p>
                    <p className="detail-value">{weather.main.pressure} hPa</p>
                  </div>
                </div>
                <div className="detail-card">
                  <span>👁️</span>
                  <div>
                    <p className="detail-label">Visibility</p>
                    <p className="detail-value">{(weather.visibility / 1000).toFixed(1)} km</p>
                  </div>
                </div>
              </div>

              <div className="sun-times">
                <div className="sun-time">
                  <span>🌅</span>
                  <p>Sunrise</p>
                  <p><strong>{formatTime(weather.sys.sunrise)}</strong></p>
                </div>
                <div className="sun-time">
                  <span>🌇</span>
                  <p>Sunset</p>
                  <p><strong>{formatTime(weather.sys.sunset)}</strong></p>
                </div>
              </div>
            </div>

            {forecast && (
              <div className="forecast-section">
                <h2>5-Day Forecast</h2>
                <p className="forecast-subtitle" style={{ color: 'white' }}>
                  Weather predictions for the next 5 days
                </p>
                <div className="forecast-grid">
                  {forecast.list.slice(0, 8).map((item, index) => (
                    <WeatherCard key={index} data={item} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
