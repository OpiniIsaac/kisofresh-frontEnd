import React from "react";
import Container from "./Container";
import Image from "next/image";

export default function About() {
  return (
    <section className="bg-blue-500/10">
      <Container>
        <div className="flex justify-between w-full px-4 md:">
          <div className="w-[700px] flex flex-col justify-center h-[600px]">
            <h1 className="font-extrabold text-4xl">What is KisoIndex?</h1>
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
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              accusantium ut ipsum est minus eum facere soluta. Iure quam
              placeat, perspiciatis nihil, culpa ipsam, deserunt illum dicta
              possimus consequuntur esse recusandae reprehenderit eaque fugiat
              labore illo non architecto! Itaque debitis deserunt excepturi
              nulla, officia quasi consectetur, voluptatibus a, ullam libero
              quod delectus assumenda obcaecati? In repellendus aliquid non rem,
              inventore delectus 
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
