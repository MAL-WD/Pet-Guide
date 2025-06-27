import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, ZoomIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const Grocery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const groceryItems = [
    {
      id: 1,
      title: 'طعام كلاب بريميوم - دجاج',
      description: 'غذاء غني بالبروتين للكلاب البالغة، يحتوي على دجاج طبيعي.',
     image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',

      category: 'طعام كلاب'
    },
    // {
    //   id: 2,
    //   title: 'طعام خاص - جمل',
    //   description: 'غذاء عالي الطاقة للحيوانات الكبيرة مثل الجمل.',
    //   image: 'https://images.unsplash.com/photo-1600585154526-990d4371c4b0?auto=format&fit=crop&w=500&q=80',
    //   category: 'طعام خاص'
    // },
    // {
    //   id: 3,
    //   title: 'طعام كلاب صغيرة - لحم',
    //   description: 'طعام خاص للجراء مع احتواء على لحم طازج.',
    //   image: 'https://images.unsplash.com/photo-rNXD3SPMHaI?auto=format&fit=crop&w=500&q=80',
    //   category: 'طعام كلاب'
    // },
    {
      id: 4,
      title: 'طعام قطط عضوي - سمك السلمون',
      description: 'طعام صحي مصمم للقطط مع دهون أوميغا 3.',
      image: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg',

      category: 'طعام قطط'
    },
    // {
    //   id: 5,
    //   title: 'مكمل غذائي للطيور',
    //   description: 'مزيج من البذور والفيتامينات للطيور الصغيرة.',
    //   image: 'https://images.unsplash.com/photo-WQ9KQmFHgHw?auto=format&fit=crop&w=500&q=80',
    //   category: 'طعام طيور'
    // },
    // {
    //   id: 6,
    //   title: 'طعام أرانب - هيلثي',
    //   description: 'يحتوي على ألياف عالية لصحة الجهاز الهضمي.',
    //   image: 'https://images.unsplash.com/photo-1594051126766-0c73e9f4e3d9?auto=format&fit=crop&w=500&q=80',
    //   category: 'طعام أرانب'
    // },
    // {
    //   id: 7,
    //   title: 'طعام قطط كبيرة - دجاج',
    //   description: 'مصمم للقطط الكبيرة مع بروتين عالي.',
    //   image: 'https://images.unsplash.com/photo-p-JX5Xk7Zoc?auto=format&fit=crop&w=500&q=80',
    //   category: 'طعام قطط'
    // },
    // {
    //   id: 8,
    //   title: 'طعام سلحفاة - متوازن',
    //   description: 'غذاء يحتوي على الكالسيوم للسلاحف المائية.',
    //   image: 'https://images.unsplash.com/photo-1600585154526-990d4371c4b0?auto=format&fit=crop&w=500&q=80',
    //   category: 'طعام سلحفاة'
    // },
    // {
    //   id: 9,
    //   title: 'طعام طيور - فواكه',
    //   description: 'مزيج من الفواكه الطازجة للطيور الملونة.',
    //   image: 'https://images.unsplash.com/photo-WQ9KQmFHgHw?auto=format&fit=crop&w=500&q=80',
    //   category: 'طعام طيور'
    // }
  ];

  const categories = ['الكل', 'طعام كلاب', 'طعام قطط', 'طعام طيور', 'طعام أرانب', 'طعام سلحفاة', 'طعام خاص'];
  const [activeCategory, setActiveCategory] = useState('الكل');

  const filteredItems = activeCategory === 'الكل' 
    ? groceryItems 
    : groceryItems.filter(item => item.category === activeCategory);

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-arabic">أكلات الحيوانات الأليفة</h1>
            <p className="text-xl text-gray-200 mb-8 font-arabic">
              اكتشف مجموعتنا المتنوعة من الأطعمة الصحية لرفاهية حيواناتك الأليفة
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-400 transition-colors font-arabic"
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
                } font-arabic`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Grocery Grid */}
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
                        <h3 className="text-xl font-bold mb-2 font-arabic">{item.title}</h3>
                        <p className="text-gray-200 mb-3 font-arabic">{item.description}</p>
                        <span className="inline-block bg-primary-500 px-3 py-1 rounded-full text-sm font-arabic">
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
                const item = groceryItems.find(item => item.id === selectedImage);
                return item ? (
                  <>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain rounded-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white rounded-b-lg">
                      <h3 className="text-2xl font-bold mb-2 font-arabic">{item.title}</h3>
                      <p className="text-gray-200 font-arabic">{item.description}</p>
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

export default Grocery;