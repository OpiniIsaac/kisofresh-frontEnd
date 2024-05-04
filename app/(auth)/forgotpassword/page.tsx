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
              htmlFor="new password"
            >
              New password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="new password"
              type="password"
              placeholder="********"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirm new password"
            >
             Confirm new password
            </label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirm new password"
              type="password"
              placeholder="********"
            />
          </div>
          <div className="flex justify-end w-full">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => dispatch(Login())}
            >
              Confirm
            </button>
            {/* <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="/forgotpassword"
            >
              Forgot Password?
            </Link> */}
          </div>
        </form>
      </div>
    </div>
  );
}
