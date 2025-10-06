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

export const formatHour = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    hour12: true
  });
};

export const getWeatherBackground = (condition, isDay) => {
  if (condition === 'Rain' || condition === 'Drizzle') {
    return 'linear-gradient(135deg, #4B79A1 0%, #283E51 100%)';
  }
  
  if (condition === 'Thunderstorm') {
    return 'linear-gradient(135deg, #373B44 0%, #4286f4 100%)';
  }
  
  if (condition === 'Snow') {
    return 'linear-gradient(135deg, #E6DADA 0%, #274046 100%)';
  }
  
  if (condition === 'Clouds') {
    return isDay ? 
      'linear-gradient(135deg, #757F9A 0%, #D7DDE8 100%)' :
      'linear-gradient(135deg, #2C3E50 0%, #4CA1AF 100%)';
  }
  
  if (condition === 'Mist' || condition === 'Fog' || condition === 'Haze') {
    return 'linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)';
  }
  
  if (condition === 'Clear') {
    return isDay ? 
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' :
      'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)';
  }
  
  return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
};

export const isDayTime = (sunrise, sunset, currentTime) => {
  return currentTime >= sunrise && currentTime < sunset;
};

// NEW: AQI utilities
export const getAQILevel = (aqi) => {
  const levels = {
    1: { label: 'Good', color: '#00E400', emoji: '😊' },
    2: { label: 'Fair', color: '#FFFF00', emoji: '🙂' },
    3: { label: 'Moderate', color: '#FF7E00', emoji: '😐' },
    4: { label: 'Poor', color: '#FF0000', emoji: '😷' },
    5: { label: 'Very Poor', color: '#8F3F97', emoji: '😨' }
  };
  return levels[aqi] || levels[1];
};

export const getAQIDescription = (aqi) => {
  const descriptions = {
    1: 'Air quality is good. Ideal for outdoor activities.',
    2: 'Air quality is acceptable.',
    3: 'Sensitive people should reduce outdoor activities.',
    4: 'Everyone should limit outdoor activities.',
    5: 'Health alert! Avoid outdoor activities.'
  };
  return descriptions[aqi] || 'No data available';
};