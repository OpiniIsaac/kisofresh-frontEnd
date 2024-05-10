
import { fetchWeatherForecast } from '@/lib/actions/weather';
import React from 'react'

export default async function page() {

  const res = await fetchWeatherForecast('kampala')
  console.log(res.list)
  return (
    <div className="h-screen flex justify-center items-center">
      <h1>Weather</h1>
    </div>
  );
}
