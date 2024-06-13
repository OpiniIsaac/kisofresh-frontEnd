import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { hedvig, outfit } from "./Fonts";
interface Target {
  id: number;
  target: number;
  label: string;
}

const Counter = ({ target, label }: { target: number; label: string }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <div className="text-center" ref={ref}>
      <motion.span
        className="block text-4xl font-bold text-blue-500"
        initial={{ opacity: 0 }}
        animate={controls}
        onViewportEnter={() => controls.start({ opacity: 1, transition: { duration: 0.5 } })}
      >
        {inView && (
          <CountUp start={0} end={target} duration={2.75} />
        )}
      </motion.span>
      <span className="block text-xl font-medium text-gray-700">{label}</span>
    </div>
  );
};

const Benefits = () => {
  const targets: Target[] = [
    { id: 1, target: 7623, label: ' Registered Farmers' },
    { id: 2, target: 77, label: 'Registered Cooperatives' },
    { id: 3, target: 15000, label: 'Tonnes Sourced' },
  ];

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl font-bold text-center mb-10  ${hedvig.className}`}>Our Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {targets.map((target) => (
            <Counter key={target.id} target={target.target} label={target.label} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
