import WeatherCard from './WeatherCard';

function Forecast({ forecast }) {
  if (!forecast || !forecast.list) return null;

  const getFiveDayForecast = () => {
    const dailyData = {};
    
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