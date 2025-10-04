export const formatTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

export const getWeatherBackground = (condition) => {
  const backgrounds = {
    Clear: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    Clouds: 'linear-gradient(135deg, #757F9A 0%, #D7DDE8 100%)',
    Rain: 'linear-gradient(135deg, #4B79A1 0%, #283E51 100%)',
    Drizzle: 'linear-gradient(135deg, #89ABE3 0%, #FCE38A 100%)',
    Thunderstorm: 'linear-gradient(135deg, #373B44 0%, #4286f4 100%)',
    Snow: 'linear-gradient(135deg, #E6DADA 0%, #274046 100%)',
    Mist: 'linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)',
    Fog: 'linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)',
    Haze: 'linear-gradient(135deg, #f2709c 0%, #ff9472 100%)',
  };
  return backgrounds[condition] || backgrounds.Clear;
};