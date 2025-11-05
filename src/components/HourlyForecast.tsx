import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { formatHour } from '../utils/weatherUtils';

interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
  };
}

interface ForecastData {
  list: ForecastItem[];
}

interface HourlyForecastProps {
  forecast: ForecastData | null;
}

interface ChartData {
  time: string;
  temp: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
}

function HourlyForecast({ forecast }: HourlyForecastProps) {
  if (!forecast || !forecast.list) return null;

 
  const hourlyData: ChartData[] = forecast.list.slice(0, 8).map(item => ({
    time: formatHour(item.dt),
    temp: Math.round(item.main.temp),
    humidity: item.main.humidity,
    windSpeed: item.wind.speed,
    pressure: item.main.pressure
  }));

  return (
    <div className="hourly-forecast-section">
      <h2>📊 Hourly Temperature Forecast</h2>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={hourlyData}>
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="time" 
              stroke="rgba(255,255,255,0.8)"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.8)"
              style={{ fontSize: '12px' }}
              unit="°C"
            />
            <Tooltip 
              contentStyle={{ 
                background: 'rgba(0,0,0,0.8)', 
                border: 'none',
                borderRadius: '10px',
                color: 'white'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="temp" 
              stroke="#FF6B6B" 
              strokeWidth={3}
              fill="url(#tempGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h3>💧 Humidity & Wind Speed</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={hourlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="time" 
              stroke="rgba(255,255,255,0.8)"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.8)"
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{ 
                background: 'rgba(0,0,0,0.8)', 
                border: 'none',
                borderRadius: '10px',
                color: 'white'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="humidity" 
              stroke="#4ECDC4" 
              strokeWidth={2}
              dot={{ fill: '#4ECDC4', r: 4 }}
              name="Humidity (%)"
            />
            <Line 
              type="monotone" 
              dataKey="windSpeed" 
              stroke="#FFE66D" 
              strokeWidth={2}
              dot={{ fill: '#FFE66D', r: 4 }}
              name="Wind Speed (m/s)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default HourlyForecast;