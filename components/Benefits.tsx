import Link from 'next/link';
import React from 'react';

export default function Benefits() {
  return (
    <div className="flex flex-wrap justify-between items-center mt-4 ">
      <div className="w-full md:w-1/2 lg:w-1/3 p-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-2">Source with Confidence:</h2>
          <p>
            Direct Farm Sourcing: KisoIndex connects traders directly with farmers, eliminating middlemen and ensuring complete traceability. Source high-quality produce for import or export with confidence.
          </p>
          <Link href='SourceProduce'>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            
            
            Learn More
            
            </button>
            </Link>
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 p-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mt-4 mb-2">Plan for Success:</h2>
          <p>
            Weather Analysis: Make informed planting decisions with KisoIndex's advanced weather forecasting. Predict weather patterns and optimize planting seasons for maximum yield.
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Learn More</button>
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 p-4">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mt-4 mb-2">Navigate the Market:</h2>
          <p>
            Price Index: Gain valuable insights into domestic and international market trends with our comprehensive price index. KisoIndex empowers farmers to make strategic planting choices and informs traders of potential market opportunities.
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Learn More</button>
        </div>
      </div>
    </div>
  );
}
