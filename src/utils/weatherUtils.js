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

export const getWeatherBackground = (condition, isDay) => {
  // Rain/Storm backgrounds
  if (condition === 'Rain' || condition === 'Drizzle') {
    return 'linear-gradient(135deg, #4B79A1 0%, #283E51 100%)';
  }
  
  if (condition === 'Thunderstorm') {
    return 'linear-gradient(135deg, #373B44 0%, #4286f4 100%)';
  }
  
  // Snow background
  if (condition === 'Snow') {
    return 'linear-gradient(135deg, #E6DADA 0%, #274046 100%)';
  }
  
  // Cloudy - different for day/night
  if (condition === 'Clouds') {
    return isDay ? 
      'linear-gradient(135deg, #757F9A 0%, #D7DDE8 100%)' :
      'linear-gradient(135deg, #2C3E50 0%, #4CA1AF 100%)';
  }
  
  // Fog/Mist
  if (condition === 'Mist' || condition === 'Fog' || condition === 'Haze') {
    return 'linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)';
  }
  
  // Clear - different for day/night
  if (condition === 'Clear') {
    return isDay ? 
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : // Day - purple gradient
      'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)'; // Night - dark blue gradient
  }
  
  // Default
  return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
};

// New utility function
export const isDayTime = (sunrise, sunset, currentTime) => {
  return currentTime >= sunrise && currentTime < sunset;
};