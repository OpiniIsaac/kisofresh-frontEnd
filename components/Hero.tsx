"use client";
import React from "react";
import HeroCard from "@/components/HeroCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Container from "./Container";
import Autoplay from "embla-carousel-autoplay";

export default function Hero() {
  const content = [
    {
      image: "/images/grain.jpeg",
      title: "Track & Analyze Prices",
      desc: "Gain insights into crop prices. Make informed decisions.",
      key: 1,
      link: "/PriceAnalysis&Tracking/price", // Add the link here
    },
    {
      image: "/images/crops.jpg",
      title: "Source Produce",
      desc: "Traceability simplified. Tap into our vast database of farmers.",
      key: 2,
      link: "/SourceProduce", 
    },
    {
      image: "/images/Data.jpeg",
      title: "Smart Farming",
      desc: "Beat the elements using IoT data.",
      key: 3,
      link: "/PriceAnalysis&Tracking/weather",
    },
    {
      image: "/images/cow.jpg",
      title: "Agriculture tips",
      desc: "Learn best practices for your farm.",
      key: 4,
      link: "/PriceAnalysis&Tracking/price", 
    },
  ];

  const plugin = React.useRef(Autoplay({ delay: 4000 }));

  return (
    <section className="pt-10 h-[650px] bg-blue-500/5">
      <Container>
        <div className="flex justify-between items-center h-[600px]">
          <div>
            <Carousel
              className="w-screen md:w-full"
              plugins={[plugin.current]}
              onMouseLeave={plugin.current.play}
            >
              <CarouselContent>
                {content.map((item) => (
                  <CarouselItem key={item.key}>
                    <HeroCard details={item} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </Container>
    </section>
  );
}
