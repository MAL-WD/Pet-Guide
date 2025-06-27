import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import NewsCarousel from '../components/NewsCarousel';
import VetProfile from '../components/VetProfile';
import Services from '../components/Services';
import Location from '../components/Location';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <NewsCarousel />
      <VetProfile />
      <Services />
      <Location />
    </motion.div>
  );
};

export default Home;