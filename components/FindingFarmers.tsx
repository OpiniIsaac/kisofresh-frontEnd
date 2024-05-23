import Image from 'next/image'
import React from 'react'

export default function FindingFarmers() {
  return (
    <div className="h-96 md:h-screen flex flex-col justify-center items-center">
      <div>Finding Farmers...</div>
      <Image
        src="/images/Logo.png"
        alt=""
        width={1000}
        height={1000}
        className="animate-bounce pt-40 w-40 md:pb-40"
      />
    </div>
  );
}