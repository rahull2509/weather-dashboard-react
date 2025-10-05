import { 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  Sun, 
  Moon,
  CloudDrizzle,
  CloudLightning,
  CloudFog,
  // eslint-disable-next-line no-unused-vars
  Wind
} from 'lucide-react';

function WeatherIcon({ condition, isDay, size = 64 }) {
  if (condition === 'Rain') {
    return <CloudRain size={size} className="weather-icon rain" />;
  }
  
  if (condition === 'Drizzle') {
    return <CloudDrizzle size={size} className="weather-icon drizzle" />;
  }
  
  if (condition === 'Thunderstorm') {
    return <CloudLightning size={size} className="weather-icon thunder" />;
  }
  
  if (condition === 'Snow') {
    return <CloudSnow size={size} className="weather-icon snow" />;
  }
  
  if (condition === 'Clouds') {
    return <Cloud size={size} className="weather-icon cloud" />;
  }
  
  if (condition === 'Mist' || condition === 'Fog' || condition === 'Haze' || condition === 'Smoke') {
    return <CloudFog size={size} className="weather-icon fog" />;
  }
  
  if (condition === 'Clear') {
    return isDay ? 
      <Sun size={size} className="weather-icon sun" /> : 
      <Moon size={size} className="weather-icon moon" />;
  }
  
  // Default - Sun or Moon
  return isDay ? 
    <Sun size={size} className="weather-icon sun" /> : 
    <Moon size={size} className="weather-icon moon" />;
}

export default WeatherIcon;