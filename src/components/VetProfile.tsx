import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle, Calendar, Users } from 'lucide-react';

const VetProfile = () => {
  const [animatedNumbers, setAnimatedNumbers] = useState({
    patients: 0,
    successRate: 0,
  });

  useEffect(() => {
    const animateNumbers = () => {
      const duration = 2000;
      const steps = 60;
      const patientsTarget = 500;
      const successRateTarget = 98;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setAnimatedNumbers({
          patients: Math.floor(patientsTarget * progress),
          successRate: Math.floor(successRateTarget * progress),
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setAnimatedNumbers({
            patients: patientsTarget,
            successRate: successRateTarget,
          });
        }
      }, duration / steps);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateNumbers();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('vet-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="vet" className="py-20 bg-white">
      <div className="container mx-auto px-4" id="vet-section">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-dark-500 mb-4">فريقنا البيطري</h2>
          <p className="text-gray-600 text-lg">خبراء في رعاية الحيوانات الأليفة</p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Vet Image */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/6235086/pexels-photo-6235086.jpeg"
                  alt="الطبيب البيطري"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  viewport={{ once: true }}
                  className="absolute -top-4 -right-4 bg-primary-500 text-white p-4 rounded-full shadow-lg"
                >
                  <Award className="h-8 w-8" />
                </motion.div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg border-2 border-primary-500">
                  <span className="text-primary-500 font-bold">خبير معتمد</span>
                </div>
              </div>
            </motion.div>

            {/* Vet Details */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-3xl font-bold text-dark-500 mb-2">د. أحمد محمد</h3>
                <p className="text-xl text-secondary-500 font-semibold">جراح بيطري متخصص</p>
              </div>

              <div className="space-y-4">
                {[
                  'خبرة 10+ سنوات في رعاية الحيوانات',
                  'متخصص في جراحة الحيوانات الأليفة',
                  'علاج الأمراض المزمنة والمستعصية',
                  'شهادات دولية في الطب البيطري'
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: 30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="h-6 w-6 text-primary-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-cream-50 rounded-xl"
                >
                  <Users className="h-8 w-8 text-primary-500 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-dark-500 mb-1">
                    {animatedNumbers.patients}+
                  </div>
                  <div className="text-gray-600">حيوان تم علاجه</div>
                </motion.div>

                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.7, type: "spring" }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-cream-50 rounded-xl"
                >
                  <Award className="h-8 w-8 text-primary-500 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-dark-500 mb-1">
                    {animatedNumbers.successRate}%
                  </div>
                  <div className="text-gray-600">معدل الشفاء</div>
                </motion.div>
              </div>

              <motion.button
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <Calendar className="h-5 w-5" />
                حجز موعد مع الطبيب
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VetProfile;