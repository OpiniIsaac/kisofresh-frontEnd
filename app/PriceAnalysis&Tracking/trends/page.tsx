"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';

interface TrendCardProps {
  imageSrc: string;
  title: string;
  description: string;
}

const TrendCard: React.FC<TrendCardProps> = ({ imageSrc, title, description }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300"
    >
      <Image src={imageSrc} alt={title} width={300} height={200} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

const Header: React.FC = () => {
    return (
      <header className="bg-blue-600 text-white py-6 shadow-md mb-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold">Crop Trends & Insights</h1>
        </div>
      </header>
    );
  };

  interface SectionProps {
    title: string;
    children: React.ReactNode;
  }
  
  const Section: React.FC<SectionProps> = ({ title, children }) => {
    return (
      <section className="my-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
        <div className="max-w-6xl mx-auto">{children}</div>
      </section>
    );
  };
  





  const Trends: React.FC = () => {
    const trends = [
      {
        id: 1,
        imageSrc: '/images/crops.jpg',
        title: 'Maize',
        description: 'High demand in the market and suitable for planting in the current season.',
      },
      {
        id: 2,
        imageSrc: '/images/crops.jpg',
        title: 'Beans',
        description: 'Steady growth and profitable for traders.',
      },
      {
        id: 3,
        imageSrc: '/images/crops.jpg',
        title: 'Sorghum',
        description: 'Resilient to drought and high market value.',
      },
      // Add more crop trends as needed
    ];
  
    const plantingSeasonCrops = [
      {
        id: 1,
        imageSrc: '/images/crops.jpg',
        title: 'Rice',
        description: 'Ideal for planting in the current season.',
      },
      {
        id: 2,
        imageSrc: '/images/crops.jpg',
        title: 'Wheat',
        description: 'Suitable soil and weather conditions for optimal growth.',
      },
      {
        id: 3,
        imageSrc: '/images/crops.jpg',
        title: 'Barley',
        description: 'Thrives in cooler climates and has a short growing season.',
      },
      // Add more crops for planting season as needed
    ];
  
    const bestCropsForFarmers = [
      {
        id: 1,
        imageSrc: '/images/crops.jpg',
        title: 'Soybeans',
        description: 'High yield and good market price.',
      },
      {
        id: 2,
        imageSrc: '/images/crops.jpg',
        title: 'Tomatoes',
        description: 'Quick growth cycle and high demand.',
      },
      {
        id: 3,
        imageSrc: '/images/crops.jpg',
        title: 'Potatoes',
        description: 'High yield and versatile usage in cooking.',
      },
      // Add more best crops for farmers and traders as needed
    ];
  
    return (
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <main className="py-8">
          <Section title="Trending Crops">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {trends.map((trend) => (
                <TrendCard key={trend.id} {...trend} />
              ))}
            </div>
          </Section>
          <Section title="Planting Season Trends">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {plantingSeasonCrops.map((crop) => (
                <TrendCard key={crop.id} {...crop} />
              ))}
            </div>
          </Section>
          <Section title="Best Crops for Farmers and Traders">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {bestCropsForFarmers.map((crop) => (
                <TrendCard key={crop.id} {...crop} />
              ))}
            </div>
          </Section>
        </main>
      </div>
    );
  };
  
  export default Trends;


