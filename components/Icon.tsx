import Image from "next/image";
import React from "react";

export default function Icon() {
  return (
    <div className="h-96 md:h-screen flex justify-center items-center">
      <Image
        src="/images/Logo.png"
        alt=""
        width={1000}
        height={1000}
        className="w-40 md:pb-40"
      />
    </div>
  );
}
