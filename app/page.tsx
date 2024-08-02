'use client'
import { RootState } from "@/lib/store";
import About from "@/components/About";
import Hero from "@/components/Hero";
import NewsLetter from "@/components/NewsLetter";
import React from "react";

import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "./firebase/config";
import SignUpPrompt from "@/components/Register";
import Benefits from "@/components/Benefits";
import { useAppSelector } from "@/lib/hooks";
import HighlightGraph from "@/components/HighLights";

export default function page() {
  const user = useAppSelector((state) => state.auth.user);
  if(!user){
    signOut(auth);
  }
  
  return (
    <>
      <Hero />
      <About />
      <Benefits/>
      <HighlightGraph/>
      <NewsLetter />
    </>
  );
}
