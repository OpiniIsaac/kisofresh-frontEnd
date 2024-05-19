        import React from "react";
        import Container from "./Container";
        import { Input } from "./ui/input";
        import { Button } from "./ui/button";
import { hedvig } from "./Fonts";
        export default function NewsLetter() {
          return (
            <section className=" bg-blue-500/10">
              <Container>
                <div className="w-full py-14 md:py-40 flex flex-col md:flex-row md:items-center justify-center md:justify-between gap-10">
                  <div className="md:w-[700px] px-4 md:px-0 flex flex-col gap-4">
                    <h1
                      className={`text-4xl font-extrabold ${hedvig.className}`}
                    >
                      Subscribe to our news letter
                    </h1>
                    <div className="flex flex-col gap-2">
                      <span className="font-bold text-lg">
                        Dive deeper into the world of agriculture.
                      </span>
                      <p>
                        Go beyond the headlines with our exclusive newsletter.
                        We'll unveil hidden trends, groundbreaking research, and
                        practical tips to keep you informed and at the forefront
                        of agricultural innovation.
                      </p>
                    </div>
                  </div>
                  <div className="w-96 px-10 flex flex-col gap-4 mx-auto md:mx-0  bg-blue-500/10 rounded-sm py-20 hover:shadow-xl">
                    <Input
                      type="email"
                      name="email"
                      placeholder="E-mail"
                      className=""
                    ></Input>
                    <div className="w-full flex justify-end">
                      <Button className="bg-green-500 hover:bg-blue-500">
                        Subscribe
                      </Button>
                    </div>
                  </div>
                </div>
              </Container>
            </section>
          );
        }