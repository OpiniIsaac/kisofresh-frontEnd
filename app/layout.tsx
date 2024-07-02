import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";



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
        
          {children}
        
        </body>
      </html>
      </StoreProvider>
  );
}
