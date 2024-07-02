"use client";
import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";

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

type CropType = 'maize' | 'beans'; // Add more crop types as needed

const cropSeasons: Record<CropType, { planting: string[]; harvesting: string[] }> = {
  maize: { planting: ["Mar", "Apr", "May"], harvesting: ["Aug", "Sep", "Oct"] },
  beans: { planting: ["Feb", "Mar"], harvesting: ["Jun", "Jul"] },
  // Add more crops and their seasons as needed
};

const SeasonalInfo = ({ seasonData }: any) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4 text-center">
      <h2 className="text-3xl font-bold mb-4">{seasonData.title}</h2>
      <ul className="list-disc pl-5">
        {seasonData.items.map((item: any, index: any) => (
          <li key={index} className="mb-2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Page() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState("");
  const [cropType, setCropType] = useState<CropType | "">("");
  const [season, setSeason] = useState("");

  async function fetchData(cityName: string) {
    try {
      const response = await fetch(
        `http://kisofresh.vercel.app/api/weather?address=${cityName}`
      );
      const jsonData: WeatherData = (await response.json()).data;
      setWeatherData(jsonData);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchDataByCoordinates(latitude: number, longitude: number) {
    try {
      const response = await fetch(
        `http://kisofresh.vercel.app/api/weather?lat=${latitude}&lon=${longitude}`
      );
      const jsonData: WeatherData = (await response.json()).data;
      setWeatherData(jsonData);
    } catch (error) {
      console.log(error);
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
          console.log(error);
        }
      );
    }
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
      <div className="flex items-center justify-between p-4 bg-blue-100 rounded-lg shadow-md mb-4">
        <div className="text-lg font-semibold text-gray-800">{formattedTime}</div>
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
    const grouped: { [key: string]: { dt_txt: string; weather: Weather[]; main: Main }[] } = {};
    data.list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(item);
    });
    return Object.values(grouped);
  }

  const groupedForecasts = groupForecastsByDay(weatherData);

  const handleCropSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCropType(event.target.value as CropType);
    setSeason("");
  };

  const handleSeasonSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSeason(event.target.value);
  };

  const filteredForecasts = groupedForecasts.filter((dayForecast) => {
    const month = format(parseISO(dayForecast[0].dt_txt), "MMM");
    if (season === "planting" && cropType) {
      return cropSeasons[cropType].planting.includes(month);
    } else if (season === "harvesting" && cropType) {
      return cropSeasons[cropType].harvesting.includes(month);
    }
    return true;
  });

  const plantingDummyData = {
    title: 'Planting Season',
    items: [
      'Best months for planting maize: March, April, May.',
      'Ideal soil temperature for sowing: 15°C - 25°C.',
      'Moisture level in the soil should be moderate.',
    ],
  };

  const harvestingDummyData = {
    title: 'Harvesting Season',
    items: [
      'Best months for harvesting maize: August, September, October.',
      'Temperature during harvest should ideally be between 18°C - 28°C.',
      'Ensure the crop is fully matured before harvesting.',
    ],
  };

  return (
    <section className="min-h-screen bg-gray-100 flex flex-col items-center">
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      <header className="bg-blue-600 text-white w-full py-4 shadow-md mb-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold">Weather & Crop Season Info</h1>
        </div>
      </header>
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
              className="border border-gray-300 rounded-l-md p-2 w-full"
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Button
              type="submit"
              className="rounded-r bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition duration-300"
            >
              Search
            </Button>
          </form>
        </div>
        <div className="flex justify-between items-center mb-4">
          <select
            className="border border-gray-300 rounded-md p-2 mr-4 w-full"
            value={cropType}
            onChange={handleCropSelection}
          >
            <option value="">Select crop type</option>
            <option value="maize">Maize</option>
            <option value="beans">Beans</option>
            {/* Add more crop options here */}
          </select>
          <select
            className="border border-gray-300 rounded-md p-2 w-full"
            value={season}
            onChange={handleSeasonSelection}
            disabled={!cropType}
          >
            <option value="">Select season</option>
            <option value="planting">Planting</option>
            <option value="harvesting">Harvesting</option>
          </select>
        </div>
        {weatherData && (
          <>
            <div className="bg-white shadow-lg rounded-lg p-6 mb-4 text-center">
              <div className="text-3xl font-bold mb-4">{weatherData.city.name}</div>
              {WeatherSelector(0)}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {filteredForecasts.map((dayForecast, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg p-4">
                  <h3 className="text-xl font-bold mb-2">
                    {format(parseISO(dayForecast[0].dt_txt.split(" ")[0]), "PPP")}
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
        )}
        {cropType && season === "planting" && <SeasonalInfo seasonData={plantingDummyData} />}
        {cropType && season === "harvesting" && <SeasonalInfo seasonData={harvestingDummyData} />}
      </div>
    </section>
  );
}
