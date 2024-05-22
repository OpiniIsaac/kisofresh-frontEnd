import Image from 'next/image'
import React from 'react'

export default function Loading() {
  return (
    <div className='h-screen flex justify-center items-center'>

<Image src="/images/Logo.png"
          alt=""
          width={1000}
          height={1000}
          className="animate-bounce w-40 md:pb-40w-40 md:pb-40"
        />
    </div>
  )
}
