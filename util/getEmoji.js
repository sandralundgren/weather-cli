const getEmoji = (data, beforeSunset = true) => {

  // 2XX Thunderstorm
  if (/^2[0-3][0-2]$/.test(data)) { 
    return '🌩 ⚡️';
  }
  // 3XX Drizzle
  if (/^3[0-2][0-4]$/.test(data)) { 
    return '💧'; 
  }
  // 5XX Rain
  if (/^5[0-3][0-4]$/.test(data)) { 
    return '🌧 ☂️';
  }
  // 6XX Snow
  if (/^6[0-2][0-6]$/.test(data)) { 
    return '❄️ ⛄️'; 
  }
  // 800: Clear
  if (/^800$/.test(data)) { 
    if (!beforeSunset) {
      return '🌜';
    }
    return '☀️'; 
  }
  // 80X: Clouds
  if (/^801$/.test(data)) { 
    return '🌤'; 
  }
  if (/^80[2-3]$/.test(data)) { 
    return '⛅️'; 
  }
  if (/^804$/.test(data)) { 
    return '☁️'; 
  }

  return '🌈';

};

module.exports = getEmoji;
