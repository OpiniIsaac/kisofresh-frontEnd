"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export const checkUser = async () => {
  const { getUser, isAuthenticated } = getKindeServerSession();

  const isLoggedIn = await isAuthenticated();
  const user = getUser();

  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  return {
    user,
  };
};
