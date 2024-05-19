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
      const jsonData: WeatherData = await response.json();
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
      <div>
        <div>{time}</div>
        <div>{weather}</div>
        <div>{selection}</div>
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
    <section className="h-[500px]">
      <div className="h-full flex flex-col justify-between">
        <div className="pt-4 flex justify-end me-4">
          <form onSubmit={(e) => {
            e.preventDefault();
            fetchData(city);
          }}>
            <input
              className="border border-gray-300 rounded p-2 w-52 md:w-96 me-4"
              type="text"
              placeholder="Search city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Button type="submit">Search</Button>
          </form>
        </div>
        <div className="text-4xl ps-4">{weatherData?.city?.name}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          <div className="col-span-1 border border-t-0 border-b-0 border-e-0 w-full p-2 m-2 bg-white shadow-sm rounded-lg">
            {WeatherSelector(0)}
          </div>
          {groupedForecasts.map((dayForecast, index) =>
            <div key={index} className="border border-t-0 border-b-0 border-e-0 w-full p-2 m-2 bg-white shadow-sm rounded-lg">
              <h3 className="text-xl mb-2">{dayForecast[0].dt_txt.split(' ')[0]}</h3>
              {dayForecast.map((forecast, idx) => (
                <div key={idx}>
                  <p>{forecast.dt_txt}: {forecast.weather[0].description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
