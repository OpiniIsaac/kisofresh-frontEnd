import React from "react";
import Container from "./Container";
import Image from "next/image";
import { hedvig, outfit } from "./Fonts";

export default function About() {
  return (
    <section className="bg-blue-500/10">
      <Container>
        <div className="flex flex-col md:flex-row justify-between w-full px-4 md:px-0">
          <div className="w-full md:w-1/2 flex flex-col justify-center h-[550px]">
            <h1 className={`font-extrabold text-4xl ${hedvig.className}`}>What is KisoIndex?</h1>
            <br />
            <div className="">
              <Image
                src="/images/Logo.png"
                alt="KisoIndex Logo"
                width={1000}
                height={1000}
                className="w-48 md:w-96 mx-auto md:me-10 block md:hidden"
              />
            </div>
            <br />
            <p className={outfit.className}>
               KisoIndex is a modern data-driven platform for transforming the agricultural landscape in Africa by empowering both farmers and traders with knowledge and opportunity to thrive in a world driven by technology.
            </p>
           
          </div>
          <div className="flex flex-col justify-center">
            <Image
              src="/images/Logo.png"
              alt="KisoIndex Logo"
              width={1000}
              height={1000}
              className="w-96 me-10 hidden md:block"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
