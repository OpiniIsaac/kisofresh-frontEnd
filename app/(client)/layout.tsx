import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import StoreProvider from "../StoreProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";






export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <StoreProvider>
      <html lang="en">
        {/* <body className={inter.className}> */}
          <Header />
          {children}
          <Footer />
        {/* </body> */}
      </html>
    // </StoreProvider>
  );
}
