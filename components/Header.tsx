"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Container from "./Container";

export default function Header() {
  const [isScrolled, setisScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY >= 100;
      setisScrolled(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      if (window) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  return (
    <div>
        
      <header
        className={`"absolute z-50 w-full fixed py-4 top-0 left-0 text-white" ${
          isScrolled ? "bg-blue-500" : "bg-white"
        }`}
      >
        <Container>
            <div className="flex justify-between"><h1
          className={`"border h-10mb-0 text-blue-500 font-extrabold text-[70px]" ${
            isScrolled ? "text-white text-4xl" : "text-blue-500 text-4xl"
          }`}
        >
          KisoIndex
        </h1>
        <Button className={`"" ${isScrolled ? "bg-green-500":"bg-blue-500"}`}>Sign Up</Button></div>
        </Container>
        
        

        {/* <p className="text-lg text-gray-500">
          Data for informed agricultural decisions.
        </p> */}
      </header>
    </div>
  );
}
