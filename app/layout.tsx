 "use client"
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import StoreProvider from "./StoreProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Outfit } from "next/font/google";
import "./globals.css";

const metadata = {
  title: "KisoIndex",
  description: "Data for informed agricultural decisions.",
};


const inter = Outfit({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <>
     <html lang="en">
     <body className={inter.className}>
    {children}
    </body>
    </html>
    
    </>;
  }

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
