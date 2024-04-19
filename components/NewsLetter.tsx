import React from "react";
import Container from "./Container";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function NewsLetter() {
  return (
    <section className="h-[600px]">
      <Container>
        <div className="w-full h-screen flex items-center justify-between">
          <div className="w-[700px] flex flex-col gap-8">
            <h1 className="text-[40px] font-extrabold">
              Subscribe to our news letter
            </h1>
            <p className="ps-5">
              <span className="font-bold text-lg">
                Dive deeper into the world of agriculture.
              </span>{" "}
              <br />
              <br />
              Go beyond the headlines with our exclusive newsletter. We'll
              unveil hidden trends, groundbreaking research, and practical tips
              to keep you informed and at the forefront of agricultural
              innovation.
            </p>
          </div>
          <div className="w-96 px-10 flex flex-col gap-4 mx-auto border py-20 hover:shadow-lg">
            <Input type="email" name="email" placeholder="E-mail"></Input>

            <Button className="bg-green-500 hover:bg-blue-500 mx-auto">
              Subscribe
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
