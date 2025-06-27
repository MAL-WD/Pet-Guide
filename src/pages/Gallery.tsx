import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, ZoomIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryItems = [
    {
      id: 1,
      title: 'خروف',
      description: 'خلال الفحص الدوري',
      image: 'https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg',
      category: 'فحص'
    },
//     {
//       id: 2,
//       title: 'جمل',
//       description: 'بعد التنقل إليه لمكان عيشه',
// image: 'https://images.unsplash.com/photo-1600585154526-990d4371c4b0?auto=format&fit=crop&w=500&q=80',  category: 'زيارة ميدانية'
//     },
    {
      id: 3,
      title: 'كلب',
      description: 'بعد جلسة تطعيم',
      image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
      category: 'تطعيم'
    },
    {
      id: 4,
      title: 'قطة',
      description: 'أثناء الفحص الطبي',
      image: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg',
      category: 'فحص'
    },
    {
      id: 5,
      title: 'طائر',
      description: 'جلسة علاج متخصصة',
      image: 'https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg',
      category: 'علاج'
    },
    {
      id: 6,
      title: 'أرنب',
      description: 'فحص صحي شامل',
      image: 'https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg',
      category: 'فحص'
    },
    {
      id: 7,
      title: 'حصان',
      description: 'جلسة علاج طبيعي',
      image: 'https://images.pexels.com/photos/635499/pexels-photo-635499.jpeg',
      category: 'علاج'
    },
    {
      id: 8,
      title: 'سلحفاة',
      description: 'فحص دوري متخصص',
      image: 'https://images.pexels.com/photos/1618606/pexels-photo-1618606.jpeg',
      category: 'فحص'
    },
    {
      id: 9,
      title: 'ببغاء',
      description: 'جلسة تطعيم وقائية',
      image: 'https://images.pexels.com/photos/56733/pexels-photo-56733.jpeg',
      category: 'تطعيم'
    }
  ];

  const categories = ['الكل', 'فحص', 'تطعيم', 'علاج', 'زيارة ميدانية'];
  const [activeCategory, setActiveCategory] = useState('الكل');

  const filteredItems = activeCategory === 'الكل' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20"
    >
      {/* Header */}
      <section className="bg-gradient-to-r from-dark-500 to-secondary-500 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">معرض صور العيادة</h1>
            <p className="text-xl text-gray-200 mb-8">
              شاهد لحظات الرعاية والعلاج لحيواناتنا الأليفة
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-400 transition-colors"
            >
              <ArrowRight className="h-5 w-5" />
              العودة للرئيسية
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-cream-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedImage(item.id)}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-80">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-gray-200 mb-3">{item.description}</p>
                        <span className="inline-block bg-primary-500 px-3 py-1 rounded-full text-sm">
                          {item.category}
                        </span>
                      </div>
                      
                      {/* Zoom Icon */}
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full">
                        <ZoomIn className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const item = galleryItems.find(item => item.id === selectedImage);
                return item ? (
                  <>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain rounded-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white rounded-b-lg">
                      <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-200">{item.description}</p>
                    </div>
                  </>
                ) : null;
              })()}
              
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="fixed bottom-6 left-6 bg-primary-500 hover:bg-primary-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40"
      >
        <ArrowRight className="h-6 w-6" />
      </Link>
    </motion.div>
  );
};

export default Gallery;