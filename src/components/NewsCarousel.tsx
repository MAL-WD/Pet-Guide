import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const NewsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const newsData = [
    {
      title: 'معالجة الأبقار',
      image: 'https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg',
      description: 'خدمات طبية متخصصة للأبقار والماشية'
    },
    {
      title: 'تلقيحات الكلاب ومراقبة علاجها',
      image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
      description: 'برامج تطعيم شاملة ومتابعة صحية مستمرة'
    },
    {
      title: 'معالجة القطط',
      image: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg',
      description: 'رعاية طبية متخصصة للقطط الأليفة'
    },
    {
      title: 'معالجة الطيور',
      image: 'https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg',
      description: 'خدمات بيطرية متخصصة للطيور المنزلية'
    },
    {
      title: 'المنتجات الخاصة بالحيوانات',
      image: 'https://images.pexels.com/photos/6235663/pexels-photo-6235663.jpeg',
      description: 'أدوية ومكملات غذائية عالية الجودة'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % newsData.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [newsData.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? newsData.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % newsData.length);
  };

  return (
    <section className="py-20 bg-cream-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-dark-500 mb-4">خدماتنا المتميزة</h2>
          <p className="text-gray-600 text-lg">نقدم رعاية شاملة لجميع أنواع الحيوانات</p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <img
                  src={newsData[currentIndex].image}
                  alt={newsData[currentIndex].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <motion.h3
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-bold mb-4"
                  >
                    {newsData[currentIndex].title}
                  </motion.h3>
                  <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg text-gray-200"
                  >
                    {newsData[currentIndex].description}
                  </motion.p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2 space-x-reverse">
            {newsData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-primary-500 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsCarousel;