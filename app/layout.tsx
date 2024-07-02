import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";



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

      <html lang="en">
        <body className={inter.className}>
        
          {children}
        
        </body>
      </html>
 
  );
}
