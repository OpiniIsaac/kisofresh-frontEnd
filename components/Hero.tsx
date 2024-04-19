"use client";
import React from "react";
import HeroCard from "@/components/HeroCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Container from "./Container";
import Autoplay from "embla-carousel-autoplay";

export default function Hero() {
  const content = [
    {
      image: "/images/crops.jpg",
      title: "Track & Analyze Prices",
      desc: "Gain insights into crop prices. Make informed decisions..",
    },
    {
      image: "/images/grain.jpeg",
      title: "Source Produce",
      desc: "Traceability simplified. Tap into our vast database of farmers.",
    },
    {
      image: "/images/Data.jpeg",
      title: "Smart Farming",
      desc: "Beat the elements using IoT data.",
    },
      {
        image: "/images/cow.jpg",
        title: "Agriculture tips",
        desc: "Learn best practices for your farm.",
      },
  ];

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <section className="pt-10 h-[650px]">
      <Container>
        <div className="flex justify-between items-center h-[600px]">
          <div>
            <Carousel className="w-full" plugins={[plugin.current]}>
              <CarouselContent>
                {content.map((item) => (
                  <CarouselItem>
                    <HeroCard details={item} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* <CarouselPrevious />
              <CarouselNext /> */}
            </Carousel>
          </div>
        </div>
      </Container>
    </section>
  );
}