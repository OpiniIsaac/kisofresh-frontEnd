"use client";

import { Login } from "@/lib/features/accountHandle/loginSlice";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

export default function page() {
  const dispatch = useDispatch();
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-xs ">
        <form className="bg-blue-500/10 hover:shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
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
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => dispatch(Login())}
            >
              Sign In
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="/forgotpassword"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="flex justify-center pt-6 text-sm">
            Don't have an account? 
            <span className="hover:underline hover:cursor-pointer">
              {" "}
              SignUp
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
