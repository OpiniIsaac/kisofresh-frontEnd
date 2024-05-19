"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

export default function page() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [city, setCity] = useState("Kampala");

  async function fetchData(cityName: string) {
    try {
      const response = await fetch(
        "http://localhost:3000/api/weather?address=" + cityName
      );
      const jsonData = await response.json();
      setWeatherData(jsonData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchDataByCoordinates(latitude: number, longitude: number) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/weather?lat=${latitude}&lon=${longitude}`
      );
      const jsonData = await response.json();
      setWeatherData(jsonData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if("geolocation" in navigator){
      navigator.geolocation.getCurrentPosition((position) =>{
        const {latitude, longitude} = position.coords;
        fetchDataByCoordinates(latitude, longitude);
      }, (error) =>{
        console.log(error);
      })
    }
  }, []);

  function WeatherSelector(index: number) {
    var time: string = weatherData?.list?.[index]?.dt_txt;
    var weather: string = weatherData?.list?.[index]?.weather?.[0]?.description;
    var icon: string = weatherData?.list?.[index]?.weather?.[0]?.main;
    var selection: string = "❌";

    {
      /*Weather conditions that are returned by open weather
      Clear,Clouds,Rain,Snow,Mist,Smoke,Haze,Dust,Sand/Dust Whirls,Fog,Volcanic,Squalls,Tornado,Showers,Thunderstorm,Extreme Cold,Hot,Windy,Windy with Clear Sky,Additional   Mist, Squalls, etc. */
    }

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

  const weatherSections: any[] = [
    { index: 0 },
    { index: 2 },
    { index: 3 },
    { index: 4 },
    { index: 5 },
    { index: 6 },
    { index: 7 },
    { index: 8 },
    { index: 9 },
    { index: 10 },
    { index: 11 },
    { index: 12 },
    { index: 13 },
    { index: 14 },
    { index: 15 },
    { index: 16 },
    { index: 17 },
    { index: 18 },
    { index: 19 },
    { index: 20 },
    { index: 21 },
    { index: 22 },
    { index: 23 },
    { index: 24 },
    { index: 25 },
    { index: 26 },
    { index: 27 },
    { index: 28 },
    { index: 29 },
    { index: 30 },
    { index: 31 },
    { index: 32 },
    { index: 33 },
    { index: 34 },
    { index: 35 },
    { index: 36 },
    { index: 37 },
    { index: 38 },
    { index: 39 },
  ];

  return (
    <section className="h-[500px]">
      <div className="h-full flex flex-col justify-between">
        {" "}
        <div className="pt-4 flex justify-end me-4">
          <form onSubmit={(e) => {
            e.preventDefault();
            fetchData(city);
          }}><input
            className="border border-gray-300 rounded p-2 w-52 md:w-96 me-4"
            type="text"
            placeholder="Search products"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <Button type="submit">Search</Button></form>
          
        </div>
        <div className="text-4xl ps-4">{weatherData?.city?.name}</div>
        <div className="p-4 pb-40 flex overflow-auto">
          <div className="flex ">
            {weatherSections.map(({ index }) => (
              <div className="border border-t-0 border-b-0 border-e-0 w-36 ps-2">
                {WeatherSelector(index)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
