import React from "react";
import Container from "./Container";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { anonymous, hedvig, outfit } from "./Fonts";
import Link from "next/link";

export default function SignUpPrompt() {
  return (
    <section className="bg-blue-500/5">
      <Container>
        <div className="w-full py-14 md:py-40 flex flex-col md:flex-row md:items-center justify-center md:justify-between gap-10">
          <div className="md:w-[700px] px-4 md:flex flex-col gap-4">
            <h1 className={`text-[40px] font-extrabold ${hedvig.className}`}>
              Empower Your Farming Journey
            </h1>
            <div className="flex flex-col gap-2">
              <span className={`font-bold text-lg ${anonymous.className}`}>
                Unlock New Opportunities.
              </span>
              <p className={outfit.className}>
                As a farmer or cooperative, signing up gives you exclusive access to track prices, connect with a wider market, and discover new opportunities to grow your business. Stay informed, stay ahead.
              </p>
            </div>
          </div>
          <div className="w-96 px-10 flex flex-col gap-4 mx-auto border bg-blue-500/10 rounded-sm py-20 hover:shadow-xl">
            <div className="w-full flex justify-center">
            <Link href='onboarding'>
              <Button className="bg-green-500 hover:bg-blue-500">
                
                Sign Up
              
              
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
