"use client"
import { fetchWeatherForecast } from "@/lib/actions/weather";
import { useEffect, useState } from "react";

interface UserLocation {
  latitude: number;
  longitude: number;
}

interface WeatherData {
  // Define the structure of your weather data here
  // For example, if the data contains a list of weather info:
  list: { main: { temp: number } }[];
}

export default function TestGeolocation() {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (userLocation) {
        try {
          const res = await fetchWeatherForecast(userLocation.latitude, userLocation.longitude);
          if (res) {
            const data: WeatherData = await res.json();
            setWeatherData(data); // Update state with parsed data
          } else {
            console.error('Error fetching weather forecast data:');
          }
        } catch (error) {
          console.error('Error fetching weather forecast data:', error);
        }
      }
    };

    fetchData();
  }, [userLocation]); // Depend on userLocation to re-fetch data when it changes

  return (
    <>
      <h1>Geolocation App</h1>
      <button onClick={getUserLocation}>Get User Location</button>
      {userLocation && (
        <div>
          <h2>User Location</h2>
          <p>Latitude: {userLocation.latitude}</p>
          <p>Longitude: {userLocation.longitude}</p>
        </div>
      )}
      {weatherData && (
        <div>
          <h2>Weather Forecast</h2>
          {/* Example: Displaying temperature */}
          <p>Average Temperature: {weatherData.list[0].main.temp}°C</p>
        </div>
      )}
    </>
  );
}
