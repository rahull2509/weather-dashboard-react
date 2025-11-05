import WeatherCard from './WeatherCard';

interface ForecastItem {
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

interface ForecastData {
  list: ForecastItem[];
}

interface ForecastProps {
  forecast: ForecastData | null;
}

function Forecast({ forecast }: ForecastProps) {
  if (!forecast || !forecast.list) return null;

  const getFiveDayForecast = (): ForecastItem[] => {
    const dailyData: { [key: string]: ForecastItem } = {};
    
    forecast.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toDateString();
      
      const hour = date.getHours();
   
      if (!dailyData[dayKey] || (hour >= 14 && hour <= 15)) {
        dailyData[dayKey] = item;
      }
    });
    
    return Object.values(dailyData).slice(0, 5);
  };

  const fiveDayData = getFiveDayForecast();

  return (
    <div className="forecast-section">
      <h2>5-Day Forecast</h2>
      <div className="forecast-grid">
        {fiveDayData.map((item, index) => (
          <WeatherCard 
            key={index} 
            data={item}
          />
        ))}
      </div>
    </div>
  );
}

export default Forecast;