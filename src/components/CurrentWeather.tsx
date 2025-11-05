import { Droplets, Wind, Eye, Gauge, Calendar } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import { formatTime } from '../utils/weatherUtils';

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

interface CurrentWeatherProps {
  weather: WeatherData | null;
}

function CurrentWeather({ weather }: CurrentWeatherProps) {
  if (!weather) return null;

  const currentTime = Math.floor(Date.now() / 1000);
  const isDay = currentTime >= weather.sys.sunrise && currentTime < weather.sys.sunset;

  const getCurrentDate = (): string => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return now.toLocaleDateString('en-US', options);
  };

  return (
    <div className="current-weather">
      <div className="current-main">
        <div className="location-header">
          <div className="location">
            <h1>{weather.name}</h1>
            <p>{weather.sys.country}</p>
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
            size={120} 
          />
          <div className="temp-info">
            <h2>{Math.round(weather.main.temp)}°C</h2>
            <p className="weather-desc">{weather.weather[0].description}</p>
            <p className="feels-like">Feels like {Math.round(weather.main.feels_like)}°C</p>
            <p className="day-night-indicator">
              {isDay ? '☀️ Day Time' : '🌙 Night Time'}
            </p>
          </div>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-card">
          <Droplets size={24} />
          <div>
            <p className="detail-label">Humidity</p>
            <p className="detail-value">{weather.main.humidity}%</p>
          </div>
        </div>

        <div className="detail-card">
          <Wind size={24} />
          <div>
            <p className="detail-label">Wind Speed</p>
            <p className="detail-value">{weather.wind.speed} m/s</p>
          </div>
        </div>

        <div className="detail-card">
          <Gauge size={24} />
          <div>
            <p className="detail-label">Pressure</p>
            <p className="detail-value">{weather.main.pressure} hPa</p>
          </div>
        </div>

        <div className="detail-card">
          <Eye size={24} />
          <div>
            <p className="detail-label">Visibility</p>
            <p className="detail-value">{(weather.visibility / 1000).toFixed(1)} km</p>
          </div>
        </div>
      </div>

      <div className="sun-times">
        <div className="sun-time">
          <span>🌅 Sunrise</span>
          <span>{formatTime(weather.sys.sunrise)}</span>
        </div>
        <div className="sun-time">
          <span>🌇 Sunset</span>
          <span>{formatTime(weather.sys.sunset)}</span>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;