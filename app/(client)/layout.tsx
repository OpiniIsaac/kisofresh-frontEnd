import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import StoreProvider from "../StoreProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


const inter = Outfit({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KisoIndex",
  description: "Data for informed agricultural decisions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </StoreProvider>
  );
}
