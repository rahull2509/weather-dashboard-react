import WeatherCard from './WeatherCard';

function Forecast({ forecast, currentWeather }) {
  if (!forecast || !forecast.list || !currentWeather) return null;


  const forecastData = forecast.list.slice(0, 8);

  return (
    <div className="forecast-section">
      <h2>5-Day Forecast</h2>
      <div className="forecast-grid">
        {forecastData.map((item, index) => (
          <WeatherCard 
            key={index} 
            data={item}
            sunrise={currentWeather.sys.sunrise}
            sunset={currentWeather.sys.sunset}
          />
        ))}
      </div>
    </div>
  );
}

export default Forecast;