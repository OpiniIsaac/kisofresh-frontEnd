//this happens on the coient
"use client"
import React from 'react'
import { data } from '@/lib/actions/weather';

export default async function page() {

  const res = await data
  console.log(res)
  return (
    <div className="h-screen flex justify-center items-center">
      <h1>{res?.city?.name}</h1>
    </div>
  );
}
