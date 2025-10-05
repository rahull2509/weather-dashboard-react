import WeatherIcon from './WeatherIcon';
import { formatDate, formatTime } from '../utils/weatherUtils';

function WeatherCard({ data, sunrise, sunset }) {

  const isDay = data.dt >= sunrise && data.dt < sunset;
  
  return (
    <div className="weather-card">
      <p className="forecast-date">{formatDate(data.dt)}</p>
      <p className="forecast-time">{formatTime(data.dt)}</p>
      
      <WeatherIcon 
        condition={data.weather[0].main} 
        isDay={isDay}
        size={48} 
      />
      
      <div className="forecast-temp">
        <span className="temp-max">{Math.round(data.main.temp_max)}°</span>
        <span className="temp-min">{Math.round(data.main.temp_min)}°</span>
      </div>
      
      <p className="forecast-desc">{data.weather[0].description}</p>
      
      <div className="forecast-detail">
        <span>💧 {data.main.humidity}%</span>
        <span>💨 {data.wind.speed} m/s</span>
      </div>
      
      <p className="day-night-badge">
        {isDay ? '☀️' : '🌙'}
      </p>
    </div>
  );
}

export default WeatherCard;