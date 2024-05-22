"use client";
import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Weather {
  description: string;
  main: string;
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
  const [weatherData, setWeatherData] = useState<any>(null);
  const [city, setCity] = useState("Kampala");
  const [loading, setLoading] = useState(false);

  const fetchData = async (cityName: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://kisofresh-index.vercel.app/api/weather?address=" + cityName
      );
      const jsonData = (await response.json()).data;
      setWeatherData(jsonData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getDefaultWeather = async () => {
      setLoading(true);
      fetchData("kampala");
      setLoading(false);
    };
    getDefaultWeather();
  }, []);

  const getWeatherIcon = (main: string) => {
    switch (main) {
      case "Rain":
        return "🌧️";
      case "Clouds":
        return "☁️";
      case "Clear":
        return "☀️";
      case "Hot":
        return "🌞";
      case "Windy":
        return "🍃";
      case "Thunderstorm":
        return "⛈️";
      default:
        return "❓";
    }
  };

  function WeatherSelector(index: number) {
    const forecast = weatherData?.list[index];
    const time = forecast?.dt_txt;
    const formattedTime = time ? format(parseISO(time), "PPP p") : "";
    const weather = forecast?.weather[0]?.description;
    const mainWeather = forecast?.weather[0]?.main;
    const icon = getWeatherIcon(mainWeather || "");
    const temp = forecast?.main.temp.toFixed(1);

    return (
      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg shadow-md">
        <div className="text-lg font-semibold text-gray-800">
          {formattedTime}
        </div>
        <div className="flex items-center">
          <span className="text-2xl mr-2">{icon}</span>
          <div className="text-lg font-semibold text-gray-800">{weather}</div>
        </div>
        <div className="text-lg font-semibold text-gray-800">{temp}°C</div>
      </div>
    );
  }

  function groupForecastsByDay(data: WeatherData | null) {
    if (!data) return [];
    const grouped: {
      [key: string]: { dt_txt: string; weather: Weather[]; main: Main }[];
    } = {};
    data.list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(item);
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
              className="border border-gray-300 rounded-md p-2 me-4 w-full"
              type="text"
              placeholder="Search city?"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Button
              type="submit"
              className="rounded-r bg-blue-500 text-white px-4 py-2"
            >
              Search
            </Button>
          </form>
        </div>
        {loading ? (
          <div className="h-screen flex justify-center items-center">
            <Image
              src="/images/logo.png"
              alt=""
              width={1000}
              height={1000}
              className="animate-bounce w-40 md:pb-40w-40 md:pb-40"
            />
          </div>
        ) : (
          weatherData && (
            <>
              <div className="bg-white shadow-lg rounded-lg p-6 mb-4 text-center">
                <div className="text-3xl font-bold mb-4">
                  {weatherData?.city.name}
                </div>
                {WeatherSelector(0)}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {groupedForecasts.map((dayForecast, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-lg rounded-lg p-4"
                  >
                    <h3 className="text-xl font-bold mb-2">
                      {format(
                        parseISO(dayForecast[0].dt_txt.split(" ")[0]),
                        "PPP"
                      )}
                    </h3>
                    {dayForecast.map((forecast, idx) => {
                      const time = format(parseISO(forecast.dt_txt), "p");
                      const description = forecast.weather[0].description;
                      const temp = forecast.main.temp.toFixed(1);
                      const icon = getWeatherIcon(forecast.weather[0].main);

                      return (
                        <div
                          key={idx}
                          className="flex justify-between items-center mb-2"
                        >
                          <span className="text-sm">{time}</span>
                          <span className="text-2xl mr-2">{icon}</span>
                          <span className="text-sm">{description}</span>
                          <span className="text-sm">{temp}°C</span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </>
          )
        )}
      </div>
    </section>
  );
}
