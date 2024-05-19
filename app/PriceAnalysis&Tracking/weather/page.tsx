"use client";
import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";

interface Weather {
  description: string;
  main: string;
  icon: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface WeatherData {
  city: {
    name: string;
  };
  list: {
    dt_txt: string;
    main: Main;
    weather: Weather[];
  }[];
}

export default function Page() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState("Kampala");

  async function fetchData(cityName: string) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/weather?address=${cityName}`
      );
      const jsonData: WeatherData = await response.json();
      setWeatherData(jsonData);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchDataByCoordinates(latitude: number, longitude: number) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/weather?lat=${latitude}&lon=${longitude}`
      );
      const jsonData: WeatherData = await response.json();
      setWeatherData(jsonData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchDataByCoordinates(latitude, longitude);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, []);

  function WeatherSelector(index: number) {
    const time = weatherData?.list[index]?.dt_txt;
    const formattedTime = time ? format(parseISO(time), "PPP pp") : "";
    const weather = weatherData?.list[index]?.weather[0]?.description;
    const icon = weatherData?.list[index]?.weather[0]?.main;
    const temp = weatherData?.list[index]?.main.temp;

    let selection = "❌";
    if (icon === "Rain") {
      selection = "🌧️";
    } else if (icon === "Clouds") {
      selection = "☁️";
    } else if (icon === "Clear") {
      selection = "☀️";
    }

    return (
      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg shadow-md">
        <div className="text-lg font-semibold text-gray-800">{formattedTime}</div>
        <div className="text-2xl">{selection}</div>
        <div className="text-lg font-semibold text-gray-800">{weather}</div>
        <div className="text-lg font-semibold text-gray-800">{temp}°C</div>
      </div>
    );
  }

  function groupForecastsByDay(data: WeatherData | null) {
    if (!data) return [];
    const grouped: { [key: string]: { dt_txt: string; weather: Weather[]; main: Main }[] } = {};
    data.list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push({
        ...item,
        dt_txt: item.dt_txt,
      });
    });
    return Object.values(grouped);
  }

  const groupedForecasts = groupForecastsByDay(weatherData);

  return (
    <section className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="max-w-4xl w-full mx-auto p-4">
        <div className="w-full flex justify-between items-center mb-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchData(city);
            }}
            className="flex w-full"
          >
            <input
              className="border border-gray-300 rounded-l p-2 w-full"
              type="text"
              placeholder="Search city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Button type="submit" className="rounded-r">
              Search
            </Button>
          </form>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
          <div className="text-3xl font-bold text-center mb-4">
            {weatherData?.city?.name}
          </div>
          <div className="text-center text-2xl mb-4">{WeatherSelector(0)}</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {groupedForecasts.map((dayForecast, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-4">
              <h3 className="text-xl font-bold mb-2">
                {format(parseISO(dayForecast[0].dt_txt.split(" ")[0]), "PPP")}
              </h3>
              {dayForecast.map((forecast, idx) => (
                <div key={idx} className="flex justify-between items-center mb-2">
                  <span className="text-sm">
                    {format(parseISO(forecast.dt_txt), "p")}
                  </span>
                  <span className="text-sm">{forecast.weather[0].description}</span>
                  <span className="text-sm">{forecast.main.temp}°C</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
