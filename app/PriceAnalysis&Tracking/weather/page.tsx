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
              placeholder="Enter city name"
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
        <div className="flex justify-between items-center mb-4">
          <select
            className="border border-gray-300 rounded-md p-2 mr-4 w-full"
            value={cropType}
            onChange={(e) => setCropType(e.target.value as CropType)}
          >
            <option value="">Select crop type</option>
            <option value="maize">Maize</option>
            <option value="beans">Beans</option>
            {/* Add more crop options here */}
          </select>
          <select
            className="border border-gray-300 rounded-md p-2 w-full"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
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
              {/* Display weather data here */}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {/* Display weather forecast here */}
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
              <h2 className="text-2xl font-bold mb-4">Crop Seasons</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(cropSeasons).map(([crop, seasons]) => (
                  <div key={crop} className="bg-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">{crop.toUpperCase()}</h3>
                    <div className="flex flex-col">
                      <span className="font-semibold">Planting:</span>
                      <ul className="list-disc pl-4">
                        {seasons.planting.map((month) => (
                          <li key={month}>{month}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col mt-2">
                      <span className="font-semibold">Harvesting:</span>
                      <ul className="list-disc pl-4">
                        {seasons.harvesting.map((month) => (
                          <li key={month}>{month}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
