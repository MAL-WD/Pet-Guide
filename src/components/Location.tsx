import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';

const Location = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'العنوان',
      details: 'rue van troy a cote de laboratoire des analyses dr absi,Bechar,Algeria,08000',
      color: 'text-primary-500'
    },
    {
      icon: MapPin,
      title: 'منطقة تقديم الخدمة',
      details: 'بشار, الجزائر',
      color: 'text-primary-500'
    },
    {
      icon: Phone,
      title: 'الهاتف',
      details: '+213666814266',
      color: 'text-secondary-500'
    },
    {
      icon: Clock,
      title: 'ساعات العمل',
      details: 'السبت - الخميس: 8:00 ص - 16:00 م',
      color: 'text-dark-500'
    },
    {
      icon: Mail,
      title: 'البريد الإلكتروني',
      details: 'guidepet99@gmail.com',
      color: 'text-green-500'
    }
  ];

  return (
    <section id="location" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-dark-500 mb-4">موقع العيادة</h2>
          <p className="text-gray-600 text-lg">تفضلوا بزيارتنا في أي وقت</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-dark-500 mb-6">معلومات التواصل</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 bg-cream-50 rounded-xl hover:shadow-md transition-shadow"
                  >
                    <div className={`p-3 rounded-lg bg-white ${info.color}`}>
                      <info.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark-500 mb-1">{info.title}</h4>
                      <p className="text-gray-600">{info.details}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Emergency Notice */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl"
            >
              <h4 className="font-bold text-lg mb-2">خدمة الطوارئ</h4>
              <p className="mb-3">متاحة على مدار الساعة للحالات الطارئة</p>
              <p className="font-semibold">هاتف الطوارئ: +966 11 999 8888</p>
            </motion.div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gray-200 rounded-2xl overflow-hidden shadow-lg h-96 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.4!2d46.6753!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzEuMSJF!5e0!3m2!1sen!2ssa!4v1234567890123!5m2!1sen!2ssa"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              />
              
              {/* Map Overlay */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary-500" />
                  <span className="font-semibold text-dark-500">عيادة Pet Guide</span>
                </div>
              </div>
            </div>

            {/* Directions Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute bottom-4 left-4 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300"
            >
              احصل على الاتجاهات
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Location;