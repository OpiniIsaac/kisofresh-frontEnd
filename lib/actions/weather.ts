// Function to fetch weather forecast data for a specific city for the next 4 days
//this happens on the server
async function fetchWeatherForecast(cityName: string) {
  const apiKey = 'ac6be0e62d8605a0e90e06d1f44ae0af'; 
 
  const api = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
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

const data = fetchWeatherForecast("kampala");//change the user input from here

export {data};//passing the fetched data to the client

export { fetchWeatherForecast };
