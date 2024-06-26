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
          imageSrc: '/images/crops.jpg', // Replace with a specific maize image
          title: 'Maize (Corn)',
          description: 'Prices up 15%  due to high global demand. Ideal for planting in most regions.',
        },
        {
          id: 2,
          imageSrc: '/images/crops.jpg', // Replace with a specific beans image
          title: 'Beans',
          description: 'Steady growth expected this season. Profitable for farmers and traders due to low supply.',
        },
        {
          id: 3,
          imageSrc: '/images/crops.jpg', // Replace with a specific sorghum image
          title: 'Sorghum',
          description: 'Drought-resistant and high yielding. Market value increasing due to alternative grain demand.',
        },
      ];
      
      const plantingSeasonCrops = [
        {
          id: 1,
          imageSrc: '/images/crops.jpg', // Replace with a specific rice image
          title: 'Rice',
          description: 'Planting window approaching in most regions. High demand ensures profitability.',
        },
        {
          id: 2,
          imageSrc: '/images/crops.jpg', // Replace with a specific wheat image
          title: 'Wheat',
          description: 'Favorable weather conditions expected for optimal growth this season.',
        },
        {
          id: 3,
          imageSrc: '/images/crops.jpg', // Replace with a specific barley image
          title: 'Barley',
          description: 'Short growing season makes it a good choice for double cropping.',
        },
      ];
      
      const bestCropsForFarmers = [
        {
          id: 1,
          imageSrc: '/images/crops.jpg', // Replace with a specific soybeans image
          title: 'Soybeans',
          description: 'High protein content and increasing demand from livestock industries.',
        },
        {
          id: 2,
          imageSrc: '/images/crops.jpg', // Replace with a specific tomatoes image
          title: 'Tomatoes',
          description: 'Relatively short growing cycle and high demand throughout the year.',
        },
        {
          id: 3,
          imageSrc: '/images/crops.jpg', // Replace with a specific potatoes image
          title: 'Potatoes',
          description: 'Disease-resistant varieties available, ensuring high yields and market value.',
        },
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


