import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, User, Mail, Phone, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

interface BookingData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  petType: string;
  service: string;
  notes: string;
}

interface Booking extends BookingData {
  _id: string;
  status: 'pending' | 'confirmed' | 'completed';
  createdAt: string;
}

const Booking = () => {
  const [formData, setFormData] = useState<BookingData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    petType: '',
    service: '',
    notes: '',
  });
  const [bookings, setBookings] = useState<Booking[]>([]);

  const petTypes = ['كلب', 'قطة', 'طائر', 'أرنب', 'سلحفاة', 'أخرى'];
  const services = ['فحص شامل', 'تطعيم', 'جراحة', 'علاج طارئ', 'استشارة', 'متابعة'];

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('يرجى تسجيل الدخول لعرض الحجوزات.', {
            duration: 5000,
            position: 'top-right',
          });
          return;
        }
        const res = await axios.get(`http://localhost:5000/api/bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
        console.log("jomla: " + res.data.err)
      } catch (err) {
        console.log(err)
        toast.error('حدث خطأ أثناء جلب الحجوزات.', {
          duration: 5000,
          position: 'top-right',
        });
      }
    };
    fetchBookings();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log('Booking Form Data:', formData);
  const token = localStorage.getItem('token');
  if (!token) {
    toast.error('يرجى تسجيل الدخول لحجز موعد.', {
      duration: 5000,
      position: 'top-right',
    });
    return;
  }
  console.log('Request Token:', token);
  console.log('Request URL:', 'http://localhost:5000/api/bookings');
  console.log('Request Payload:', formData);
  try {
    const res = await axios.post(`http://localhost:5000/api/bookings`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBookings([res.data, ...bookings]);
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      petType: '',
      service: '',
      notes: '',
    });
    toast.success('تم إرسال طلب الحجز بنجاح! سنتواصل معك قريباً.', {
      duration: 5000,
      position: 'top-right',
    });
  } catch (err) {
    console.error('Booking Error (Full):', err); // Log full error object
    console.error('Booking Error Details:', {
      status: err.response?.status,
      data: err.response?.data,
      message: err.message,
      config: err.config, // Includes request details
      code: err.code, // e.g., 'ECONNREFUSED'
    });
    toast.error(err.response?.data?.message || 'حدث خطأ أثناء الحجز، حاول مرة أخرى.', {
      duration: 5000,
      position: 'top-right',
    });
  }
};

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'completed':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'مؤكد';
      case 'pending':
        return 'في الانتظار';
      case 'completed':
        return 'مكتمل';
      default:
        return 'غير محدد';
    }
  };

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-arabic">نظام الحجز</h1>
            <p className="text-xl text-gray-200 mb-8 font-arabic">احجز موعدك بسهولة وتابع حجوزاتك</p>
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

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Booking Form */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-dark-500 mb-6 flex items-center gap-3 font-arabic">
                <Calendar className="h-6 w-6 text-primary-500" />
                نموذج الحجز
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 font-arabic">الاسم الكامل *</label>
                    <div className="relative">
                      <User className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all font-arabic"
                        placeholder="أدخل اسمك الكامل"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 font-arabic">البريد الإلكتروني *</label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all font-arabic"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2 font-arabic">رقم الهاتف *</label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all font-arabic"
                      placeholder="+966 5XX XXX XXX"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 font-arabic">تاريخ الموعد *</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all font-arabic"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 font-arabic">وقت الموعد *</label>
                    <div className="relative">
                      <Clock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                        className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all font-arabic"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 font-arabic">نوع الحيوان *</label>
                    <select
                      name="petType"
                      value={formData.petType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all font-arabic"
                    >
                      <option value="">اختر نوع الحيوان</option>
                      {petTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 font-arabic">نوع الخدمة *</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all font-arabic"
                    >
                      <option value="">اختر نوع الخدمة</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2 font-arabic">ملاحظات إضافية</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none font-arabic"
                    placeholder="أي ملاحظات أو تفاصيل إضافية..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl font-arabic"
                >
                  حجز الموعد
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Bookings List */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-dark-500 mb-6 font-arabic">الحجوزات الحالية</h2>

              {bookings.length === 0 ? (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 font-arabic">لا توجد حجوزات حالياً</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking, index) => (
                    <motion.div
                      key={booking._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-dark-500 font-arabic">{booking.name}</h3>
                          <p className="text-gray-600 text-sm font-arabic">{booking.email}</p>
                        </div>
                       
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 font-arabic">
                        <div>
                          <span className="font-medium">التاريخ:</span> {booking.date}
                        </div>
                        <div>
                          <span className="font-medium">الوقت:</span> {booking.time}
                        </div>
                        <div>
                          <span className="font-medium">الحيوان:</span> {booking.petType}
                        </div>
                        <div>
                          <span className="font-medium">الخدمة:</span> {booking.service}
                        </div>
                      </div>

                      {booking.notes && (
                        <div className="mt-3 text-sm text-gray-600 font-arabic">
                          <span className="font-medium">ملاحظات:</span> {booking.notes}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

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

export default Booking;