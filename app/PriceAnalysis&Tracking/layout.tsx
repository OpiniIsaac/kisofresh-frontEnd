import Container from "@/components/Container";
import SideNav from "@/components/p&a/SideNav";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <div className="flex">
        <SideNav />
        <div className="w-full h-screen mt-20 rounded-t-lg ms-64 border">
          {children}
        </div>
      </div>
    </Container>
  );
}
