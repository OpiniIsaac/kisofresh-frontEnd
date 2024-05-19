// Function to fetch weather forecast data for a specific city for the next 4 days
//this happens on the server
 export async function fetchWeatherForecast(lat:any, lon:any) {
  const apiKey = 'your_api_key_here'; // Replace with your actual API key
  const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch weather forecast data');
    }
    console.log(response);
   return response
  } catch (error) {
    console.error('Error fetching weather forecast data:', error);
  }
}

