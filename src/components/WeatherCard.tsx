import WeatherIcon from './WeatherIcon';

interface WeatherData {
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
}

interface WeatherCardProps {
  data: WeatherData;
}

function WeatherCard({ data }: WeatherCardProps) {
  const forecastDate = new Date(data.dt * 1000);
  const forecastHour = forecastDate.getHours();
  
  const isDay = forecastHour >= 6 && forecastHour < 18;
  
  const getFormattedDate = () => {
    return forecastDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getFormattedTime = () => {
    return forecastDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };
  
  return (
    <div className="weather-card">
      <p className="forecast-date">{getFormattedDate()}</p>
      <p className="forecast-time">{getFormattedTime()}</p>
      
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
        <span>💨 {data.wind.speed.toFixed(2)} m/s</span>
      </div>
      
      <p className="day-night-badge">
        {isDay ? '☀️' : '🌙'}
      </p>
    </div>
  );
}

export default WeatherCard;