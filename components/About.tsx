import React from "react";
import Container from "./Container";
import Image from "next/image";

export default function About() {
  return (
    <section className="bg-blue-500/10">
      <Container>
        <div className="flex justify-between">
          <div className="w-[700px] flex flex-col justify-center h-[600px]">
            <h1 className="font-extrabold text-4xl">What is KisoIndex?</h1>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              accusantium ut ipsum est minus eum facere soluta. Iure quam
              placeat, perspiciatis nihil, culpa ipsam, deserunt illum dicta
              possimus consequuntur esse recusandae reprehenderit eaque fugiat
              labore illo non architecto! Itaque debitis deserunt excepturi
              nulla, officia quasi consectetur, voluptatibus a, ullam libero
              quod delectus assumenda obcaecati? In repellendus aliquid non rem,
              inventore delectus blanditiis accusamus. Laboriosam ipsam,
              reprehenderit nisi maxime aliquam adipisci voluptas nulla optio,
              ad doloremque, quibusdam dignissimos quas commodi autem! Quod qui
              voluptatibus quasi aspernatur quidem perspiciatis quis possimus
              nihil, architecto atque esse fugit deserunt, deleniti sint amet
              vel maxime?
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <Image
              src="/images/Logo.png"
              alt=""
              width={1000}
              height={1000}
              className="w-96"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
