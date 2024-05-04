'use client'

import About from "@/components/About";
import Hero from "@/components/Hero";
import NewsLetter from "@/components/NewsLetter";
import React from "react";

export default function page() {
  return (
    <>
      <Hero />
      <About />
      <NewsLetter />
    </>
  );
}
