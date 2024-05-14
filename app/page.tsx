'use client'
import { RootState } from "@/lib/store";
import About from "@/components/About";
import Hero from "@/components/Hero";
import NewsLetter from "@/components/NewsLetter";
import React from "react";
import { Logout } from "@/lib/features/accountHandle/loginSlice";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "./firebase/config";
import SignUpPrompt from "@/components/Register";
import Benefits from "@/components/Benefits";

export default function page() {
  const islogged = useSelector((state: RootState) => state.LoginState.value);
  if(! islogged){
    signOut(auth);
  }
  
  return (
    <>
      <Hero />
      <About />
      <Benefits/>
      <NewsLetter />
    </>
  );
}
