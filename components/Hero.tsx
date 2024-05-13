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
import { Key } from "lucide-react";

export default function Hero() {
  const content = [
    {
    
      image: "/images/grain.jpeg",
      title: " Source with Confidence",
      desc: " KisoIndex connects traders directly with farmers, eliminating middlemen and ensuring complete traceability. Source high-quality produce for import or export with confidence...",
      key: 1,
    },
    {
      image: "/images/crops.jpg",
      title: "Plan for Success",
      desc: "Weather Analysis: Make informed planting decisions with KisoIndex's advanced weather forecasting. Predict weather patterns and optimize planting seasons for maximum yield.",
      key: 2,
    },
    {
      image: "/images/Data.jpeg",
      title: "Smart Farming",
      desc: "Beat the elements using IoT data.",
      key: 3,
    },
    {
      image: "/images/cow.jpg",
      title: "Agriculture tips",
      desc: "Learn best practices for your farm.",
      key: 4,
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
