import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Clock, User, Mail, Phone, AlertCircle, Star, Heart, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Groovy = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    petType: '',
    service: '',
    notes: '',
  });
  const [bookings, setBookings] = useState([]);
  const [counters, setCounters] = useState({ clients: 0, appointments: 0, satisfaction: 0 });

  const petTypes = ['كلب', 'قطة', 'طائر', 'أرنب', 'سلحفاة', 'أخرى'];
  const services = ['فحص شامل', 'تطعيم', 'جراحة', 'علاج طارئ', 'استشارة', 'متابعة'];

  // Scroll-triggered animation for counters
  const countersRef = useRef(null);
  const isInView = useInView(countersRef, { once: true, amount: 0.3 });

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
      console.log('Fetched Bookings:', res.data);
    } catch (err) {
      console.error('Fetch Bookings Error:', err);
      toast.error('حدث خطأ أثناء جلب الحجوزات.', {
        duration: 5000,
        position: 'top-right',
      });
    }
  };
  fetchBookings();
}, []);
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Groovy Booking Form Data:', formData);
  const token = localStorage.getItem('token');
  if (!token) {
    toast.error('يرجى تسجيل الدخول لحجز موعد.', {
      duration: 5000,
      position: 'top-right',
    });
    return;
  }
  console.log('Request Token:', token);
  console.log('Request URL:', `http://localhost:5000/api/bookings`);
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
    console.error('Groovy Booking Error (Full):', err); // Log full error object
    console.error('Groovy Booking Error Details:', {
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'مؤكد';
      case 'pending': return 'في الانتظار';
      case 'completed': return 'مكتمل';
      default: return 'غير محدد';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 bg-cream-50 font-arabic overflow-hidden"
      style={{ direction: 'rtl' }}
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#FF6F61] to-[#F7A8B8] text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 font-arabic animate-pulse">
              مرحباً بك في عالم الحجز الرائع!
            </h1>
            <p className="text-xl text-cream-50 mb-8 font-arabic">
              احجز موعدك بأسلوب عصري واستمتع برعاية حيواناتك الأليفة
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-dark-500 bg-cream-50 px-6 py-3 rounded-full hover:bg-cream-200 transition-colors font-arabic"
            >
              <Star className="h-5 w-5" />
              العودة للرئيسية
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 border-4 border-[#A8D5BA]">
              <h2 className="text-3xl font-bold text-dark-500 mb-6 flex items-center gap-3 font-arabic">
                <Calendar className="h-8 w-8 text-[#FF6F61]" />
                 الحجز الراقي
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-dark-500 font-semibold mb-2 font-arabic">الاسم الكامل</label>
                    <div className="relative">
                      <User className="absolute right-3 top-3 h-5 w-5 text-[#F7A8B8]" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pr-10 pl-4 py-3 border border-[#A8D5BA] rounded-lg focus:ring-2 focus:ring-[#FF6F61] focus:border-transparent transition-all font-arabic"
                        placeholder="أدخل اسمك الكامل"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-dark-500 font-semibold mb-2 font-arabic">البريد الإلكتروني</label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-3 h-5 w-5 text-[#F7A8B8]" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pr-10 pl-4 py-3 border border-[#A8D5BA] rounded-lg focus:ring-2 focus:ring-[#FF6F61] focus:border-transparent transition-all font-arabic"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-dark-500 font-semibold mb-2 font-arabic">رقم الهاتف</label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-3 h-5 w-5 text-[#F7A8B8]" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pr-10 pl-4 py-3 border border-[#A8D5BA] rounded-lg focus:ring-2 focus:ring-[#FF6F61] focus:border-transparent transition-all font-arabic"
                      placeholder="+966 5XX XXX XXX"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-dark-500 font-semibold mb-2 font-arabic">تاريخ الموعد</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-[#A8D5BA] rounded-lg focus:ring-2 focus:ring-[#FF6F61] focus:border-transparent transition-all font-arabic"
                    />
                  </div>
                  <div>
                    <label className="block text-dark-500 font-semibold mb-2 font-arabic">وقت الموعد</label>
                    <div className="relative">
                      <Clock className="absolute right-3 top-3 h-5 w-5 text-[#F7A8B8]" />
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="w-full pr-10 pl-4 py-3 border border-[#A8D5BA] rounded-lg focus:ring-2 focus:ring-[#FF6F61] focus:border-transparent transition-all font-arabic"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-dark-500 font-semibold mb-2 font-arabic">نوع الحيوان</label>
                    <select
                      name="petType"
                      value={formData.petType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#A8D5BA] rounded-lg focus:ring-2 focus:ring-[#FF6F61] focus:border-transparent transition-all font-arabic"
                    >
                      <option value="">اختر نوع الحيوان</option>
                      {petTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-dark-500 font-semibold mb-2 font-arabic">نوع الخدمة</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#A8D5BA] rounded-lg focus:ring-2 focus:ring-[#FF6F61] focus:border-transparent transition-all font-arabic"
                    >
                      <option value="">اختر نوع الخدمة</option>
                      {services.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-dark-500 font-semibold mb-2 font-arabic">ملاحظات إضافية</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-[#A8D5BA] rounded-lg focus:ring-2 focus:ring-[#FF6F61] focus:border-transparent transition-all resize-none font-arabic"
                    placeholder="أي ملاحظات أو تفاصيل إضافية..."
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95, boxShadow: '0 0 15px rgba(255, 111, 97, 0.5)' }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="w-full bg-[#FF6F61] hover:bg-[#F7A8B8] text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl font-arabic"
                >
                  احجز الآن!
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Appointments List */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 border-4 border-[#F7A8B8]">
              <h2 className="text-3xl font-bold text-dark-500 mb-6 font-arabic">مواعيدك الرائعة</h2>
              {bookings.length === 0 ? (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-[#FF6F61] mx-auto mb-4" />
                  <p className="text-dark-500 font-arabic">لا توجد مواعيد حالياً، احجز الآن!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking, index) => (
                    <motion.div
                      key={booking._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
                      className="border border-[#A8D5BA] rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-dark-500 font-arabic">{booking.name}</h3>
                          <p className="text-gray-700 text-sm font-arabic">{booking.email}</p>
                        </div>
                        {/* <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)} font-arabic`}>
                          {getStatusText(booking.status)}
                        </span> */}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 font-arabic">
                        <div><span className="font-medium">التاريخ:</span> {booking.date}</div>
                        <div><span className="font-medium">الوقت:</span> {booking.time}</div>
                        <div><span className="font-medium">الحيوان:</span> {booking.petType}</div>
                        <div><span className="font-medium">الخدمة:</span> {booking.service}</div>
                      </div>
                      {booking.notes && (
                        <div className="mt-3 text-sm text-cream-200 font-arabic">
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
      </section>

      {/* Achievements Section with Counters */}
      <section ref={countersRef} className="bg-gradient-to-r from-[#A8D5BA] to-[#FF6F61] py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-4xl font-bold text-white text-center mb-12 font-arabic"
          >
            إنجازاتنا الرائعة
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="bg-white rounded-lg p-6 text-center shadow-lg"
            >
              <Heart className="h-12 w-12 text-[#FF6F61] mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-dark-500 mb-2 font-arabic">{counters.clients}+</h3>
              <p className="text-cream-200 font-arabic">عملاء سعداء</p>
            </motion.div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              className="bg-white rounded-lg p-6 text-center shadow-lg"
            >
              <CheckCircle className="h-12 w-12 text-[#F7A8B8] mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-dark-500 mb-2 font-arabic">{counters.appointments}+</h3>
              <p className="text-cream-200 font-arabic">موعد مكتمل</p>
            </motion.div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
              className="bg-white rounded-lg p-6 text-center shadow-lg"
            >
              <Star className="h-12 w-12 text-[#A8D5BA] mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-dark-500 mb-2 font-arabic">{counters.satisfaction}%</h3>
              <p className="text-cream-200 font-arabic">رضا العملاء</p>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Groovy;