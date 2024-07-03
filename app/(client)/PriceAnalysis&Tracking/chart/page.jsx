"use client"
import PriceChart from '@/components/Chart'
import React from 'react'

export default function Page() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <PriceChart />
      </div>
    </div>
  )
}
