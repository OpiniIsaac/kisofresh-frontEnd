"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { Login } from "@/lib/features/accountHandle/loginSlice";
import { useDispatch } from "react-redux";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();


 const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const handleSignIn = async () => {
      setLoading(true);
      try {
        const res = await signInWithEmailAndPassword(email, password);
        console.log("Signed in User ", { res });
        setEmail("");
        setPassword("");
        router.push("/SourceProduce");
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-xs">
        <div className="bg-blue-500/10 hover:shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              autoComplete="true"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
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
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-end">
            <Button onClick={handleSignIn} disabled={loading}>
              {loading ? "logging In..." : "Log in"}
            </Button>
          </div>
          <div className="flex justify-center pt-6 text-sm">
            Don't have an account?
            <Link href="/sign-up">
              <span className="hover:underline hover:cursor-pointer ps-2">
                Sign Up
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
