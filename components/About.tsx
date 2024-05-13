import React from "react";
import Container from "./Container";
import Image from "next/image";
import { hedvig, outfit } from "./Fonts";

export default function About() {
  return (
    <section className="bg-blue-500/10">
      <Container>
        <div className="flex justify-between w-full px-4 md:">
          <div className="w-[700px] flex flex-col justify-center h-[600px]">
            <h1 className={`font-extrabold text-4xl ${hedvig.className}`}>What is KisoIndex?</h1>
            <br />
            <div className="">
              <Image
                src="/images/Logo.png"
                alt=""
                width={1000}
                height={1000}
                className="w-48 md:w-96 mx-auto md:me-10 block md:hidden"
              />
            </div>
            <br />
            <p className={outfit.className}>
            Our innovative KisoIndex platform is transforming the agricultural landscape in Africa by empowering both farmers and traders with the tools they need to thrive
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <Image
              src="/images/Logo.png"
              alt=""
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
