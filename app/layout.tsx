"use client";
import { ReactNode } from "react";
import StoreProvider from "./StoreProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// const metadata = {
//   title: "KisoIndex",
//   description: "Data for informed agricultural decisions.",
// };

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={outfit.className}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </StoreProvider>
  );
}
