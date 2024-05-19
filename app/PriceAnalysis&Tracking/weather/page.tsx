"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface Weather {
  description: string;
  main: string;
}

interface WeatherData {
  city: {
    name: string;
  };
  list: {
    dt_txt: string;
    weather: Weather[];
  }[];
}

export default function Page() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState('Kampala');

  async function fetchData(cityName: string) {
    try {
      const response = await fetch(`http://localhost:3000/api/weather?address=${cityName}`);
       
      const jsonData: WeatherData = await response.json();
      setWeatherData(jsonData);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchDataByCoordinates(latitude: number, longitude: number) {
    try {
      const response = await fetch(`http://localhost:3000/api/weather?lat=${latitude}&lon=${longitude}`);
      console.log(`the waeather data being is ${response}`);
      const jsonData: WeatherData = await response.json();
      console.log(`the waeather data being is ${jsonData}`);
      setWeatherData(jsonData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetchDataByCoordinates(latitude, longitude);
      }, (error) => {
        console.error(error);
      });
    }
  }, []);

  function WeatherSelector(index: number) {
    const time = weatherData?.list[index]?.dt_txt;
    const weather = weatherData?.list[index]?.weather[0]?.description;
    const icon = weatherData?.list[index]?.weather[0]?.main;
    let selection = "❌";

    if (icon === "Rain") {
      selection = "🌧️";
    } else if (icon === "Clouds") {
      selection = "☁️";
    } else if (icon === "Hot") {
      selection = "🌞";
    } else if (icon === "Windy") {
      selection = "🍃";
    } else if (icon === "Thunderstorms") {
      selection = "⛈️";
    } else if (icon === "Clear") {
      selection = "☀️";
    }

    return (
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">{time}</div>
        <div className="text-lg">{selection}</div>
        <div className="text-sm text-gray-600">{weather}</div>
      </div>
    );
  }

  function groupForecastsByDay(data: WeatherData | null) {
    if (!data) return [];
    const grouped: { [key: string]: { dt_txt: string; weather: Weather[] }[] } = {};
    data.list.forEach((item) => {
      const date = item.dt_txt.split(' ')[0];
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push({
        ...item,
        dt_txt: item.dt_txt.split(' ')[1],
      });
    });
    return Object.values(grouped);
  }

  const groupedForecasts = groupForecastsByDay(weatherData);

  return (
    <section className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="max-w-4xl w-full mx-auto p-4">
        <div className="w-full flex justify-between items-center mb-4">
          <form onSubmit={(e) => {
            e.preventDefault();
            fetchData(city);
          }} className="flex">
            <input
              className="border border-gray-300 rounded-l p-2 w-52 md:w-96"
              type="text"
              placeholder="Search city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Button type="submit" className="rounded-r">Search</Button>
          </form>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
          <div className="text-2xl font-bold text-center mb-2">{weatherData?.city?.name}</div>
          <div className="text-center text-xl mb-4">{WeatherSelector(0)}</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {groupedForecasts.map((dayForecast, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-4">
              <h3 className="text-lg font-bold mb-2">{dayForecast[0].dt_txt.split(' ')[0]}</h3>
              {dayForecast.map((forecast, idx) => (
                <div key={idx} className="flex justify-between items-center mb-2">
                  <span className="text-sm">{forecast.dt_txt}</span>
                  <span className="text-sm">{forecast.weather[0].description}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
