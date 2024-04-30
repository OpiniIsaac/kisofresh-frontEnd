import Container from "@/components/Container";
import SideNav from "@/components/p&a/SideNav";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    

      

        <div className="w-full h-screen ">
          {children}
        </div>
    
   
  );
}
