import Image from 'next/image'
import React from 'react'

export default function loading() {
  return (
    <div className='h-screen'>

<Image src="/images/logo.png"
          alt=""
          width={1000}
          height={1000}
          className="animate-bounce w-40 md:pb-40w-40 md:pb-40"
        />
    </div>
  )
}
