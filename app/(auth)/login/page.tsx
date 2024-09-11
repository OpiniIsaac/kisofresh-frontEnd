"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { collection, doc, getDoc } from "firebase/firestore";
import { useAppDispatch } from "@/lib/hooks";
import { setUser } from "@/lib/features/accountHandle/authSlice";

interface UserData {
  uid: string;
  email: string;
  role: string;
  [key: string]: any; // For any additional properties
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const handleLogin = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(email, password);
      const user = userCredential?.user;
      if (!user) throw new Error("User is not authenticated");

      console.log("User logged in: ", { user });

      // Fetch user data from Firestore
      const userDocRef = doc(collection(db, "users"), user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data() as UserData;
        dispatch(setUser(userData)); // Update user state

        // Redirect based on user role
        if (userData.role === "seller") {
          router.push("/sellers");
        } else if (userData.role === "buyer") {
          router.push("/buyers");
        } else if (userData.role === "trader") {
          router.push("/traders/products");
        }
      } else {
        console.error("No such user document!");
      }

      setEmail("");
      setPassword("");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (email && !/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (password && password.length < 6) newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-xs">
        <div className="bg-blue-500/10 hover:shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              autoComplete="true"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: "" }));
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: "" }));
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <div className="flex items-center justify-end">
            <Button onClick={handleLogin} disabled={loading}>
              {loading ? "Logging In..." : "Login"}
            </Button>
          </div>
          <div className="flex justify-center pt-6 text-sm">
            Don't have an account?
            <Link href="/sign-up">
              <span className="hover:underline hover:cursor-pointer ps-2">Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
