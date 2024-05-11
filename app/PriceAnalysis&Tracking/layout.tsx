import Container from "@/components/Container";
import SideNav from "@/components/p&a/SideNav";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-white">
      <Container >
        <div className="flex">
          <SideNav />
          <div className=" w-[1023px] h-full mt-32 md:mt-20 mb-10 md:mb-20 rounded-lg mx-0 md:ms-64 border bg-blue-500/5">
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}
