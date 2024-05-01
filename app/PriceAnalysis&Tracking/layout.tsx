import Container from "@/components/Container";
import SideNav from "@/components/p&a/SideNav";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-white">
      <Container>
        <div className="flex">
          <SideNav />
          <div className="w-full mt-20 rounded-lg ms-64 border mb-10 bg-blue-500/5">
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}
