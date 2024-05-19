import Link from "next/link";
import React from "react";
import Container from "./Container";
import { hedvig } from "./Fonts";

export default function Benefits() {
  const benefits: { heading: string; paragraph: string; link: string }[] = [
    {
      heading: "Source with Confidence:",
      paragraph:
        "Direct Farm Sourcing: KisoIndex connects traders directly with farmers, eliminating middlemen and ensuring complete traceability. Source high-quality produce for import or export with confidence.",
      link: "SourceProduce",
    },
    {
      heading: "Plan for Success:",
      paragraph:
        "Weather Analysis: Make informed planting decisions with KisoIndex's advanced weather forecasting. Predict weather patterns and optimize planting seasons for maximum yield.",
      link: "PriceAnalysis&Tracking/weather",
    },
    {
      heading: "Navigate the Market:",
      paragraph:
        "Price Index: Gain valuable insights into domestic and international market trends with our comprehensive price index. KisoIndex empowers farmers to make strategic planting choices and informs traders of potential market opportunities.",
      link: "PriceAnalysis&Tracking/price",
    },
  ];
  return (
    <section className="bg-blue-500/5 md:h-96 flex flex-wrap items-center">
      <Container>
        <div className="">
          <div className="w-full md:flex pb-20 md:pb-0 pt-10 md:pt-0">
            {benefits.map(({ heading, paragraph, link }) => (
              <div className="flex flex-col items-center pt-5 md:p-4 ">
                <h2 className={`text-2xl font-bold mb-2 ${hedvig.className}`}>
                  {heading}
                </h2>
                <p className="text-center ">{paragraph}</p>
                <Link href={link}>
                  <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Learn More
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
