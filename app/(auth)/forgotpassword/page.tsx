"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import swal from "sweetalert";
import { auth } from "@/app/firebase/config";
import Link from "next/link";


export default function ForgotPassword() {
  const [email, setEmail] = useState("");


  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      swal({
        title: "Email Sent",
        text: "Please check your email for password reset instructions.",
        icon: "success",
      });
      
    } catch (error) {
      swal({
        title: "Error",
        text: "Error Occcured",
        icon: "error",
      });
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-xs">
        <form className="bg-blue-500/10 hover:shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex justify-end w-full">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleForgotPassword}
            >
              Reset Password
            </button>
          </div>
          <div className="flex justify-end w-full mt-4">
            <Link href="/login" className="text-blue-500 hover:text-blue-700 text-sm">
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
