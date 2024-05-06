"use client";

import { Button } from "@/components/ui/button";
import { Login, Logout } from "@/lib/features/accountHandle/loginSlice";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

export default function page() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log("Signed in User ", { res });
      setEmail("");
      setPassword("");
      router.push("/SourceProduce");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-xs ">
        <div className="bg-blue-500/10 hover:shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="true"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Button onClick={handleSignIn}> Sign In</Button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="/forgotpassword"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="flex justify-center pt-6 text-sm">
            Don't have an account?
            <Link href="/sign-up">
              <span className="hover:underline hover:cursor-pointer ps-2">
                SignUp
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
