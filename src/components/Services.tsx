import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Scissors, Shield, Heart, Pill, Activity } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Stethoscope,
      title: 'فحص صحي شامل',
      description: 'فحص دوري للحيوانات الأليفة لتشخيص الأمراض مبكراً والحفاظ على صحتها',
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: Scissors,
      title: 'جراحة الحيوانات',
      description: 'إجراء العمليات الجراحية للحيوانات بأحدث التقنيات والمعدات الطبية',
      color: 'from-secondary-500 to-secondary-600'
    },
    {
      icon: Shield,
      title: 'تطعيمات وقائية',
      description: 'توفير التطعيمات اللازمة لحماية الحيوانات من الأمراض المعدية',
      color: 'from-dark-500 to-dark-600'
    },
    {
      icon: Heart,
      title: 'رعاية طارئة',
      description: 'خدمات طوارئ على مدار الساعة للحالات الحرجة والطارئة',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Pill,
      title: 'علاج دوائي',
      description: 'وصف الأدوية المناسبة ومتابعة العلاج حتى الشفاء التام',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Activity,
      title: 'متابعة صحية',
      description: 'برامج متابعة دورية لضمان استمرار صحة الحيوان الأليف',
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <section id="services" className="py-20 bg-cream-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-dark-500 mb-4">خدمات العيادة</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            نقدم مجموعة شاملة من الخدمات البيطرية المتخصصة لضمان صحة وسعادة حيواناتكم الأليفة
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-gray-100">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:shadow-lg transition-all duration-300`}
                >
                  <service.icon className="h-8 w-8 text-white" />
                </motion.div>

                <h3 className="text-xl font-bold text-dark-500 mb-4 group-hover:text-primary-500 transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-primary-500 font-semibold hover:text-primary-600 transition-colors flex items-center gap-2 group"
                >
                  المزيد من التفاصيل
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: -5 }}
                    className="transition-transform"
                  >
                    ←
                  </motion.span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">هل تحتاج استشارة فورية؟</h3>
            <p className="text-lg mb-6 opacity-90">
              فريقنا متاح على مدار الساعة لتقديم المساعدة والاستشارات الطبية
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary-500 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300"
            >
              اتصل بنا الآن
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;