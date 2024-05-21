async function fetchWeatherForecast(cityName: string) {
  const apiKey = 'ac6be0e62d8605a0e90e06d1f44ae0af';
  const api = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error('Failed to fetch weather forecast data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather forecast data:', error);
    return null;
  }
}

export { fetchWeatherForecast };
