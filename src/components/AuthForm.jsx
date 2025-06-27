import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthForm = ({ isLogin }) => {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(formData)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {

    if (!isLogin && !formData.name.trim()) {
      toast.error('يرجى إدخال الاسم الكامل.', {
        duration: 5000,
        position: 'top-right',
      });
      return false;
    }
    if (!formData.email.trim()) {
      toast.error('يرجى إدخال البريد الإلكتروني.', {
        duration: 5000,
        position: 'top-right',
      });
      return false;
    }
    if (!formData.password.trim()) {
      toast.error('يرجى إدخال كلمة المرور.', {
        duration: 5000,
        position: 'top-right',
      });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('يرجى إدخال بريد إلكتروني صالح.', {
        duration: 5000,
        position: 'top-right',
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    if (!validateForm()) return;

    try {
      const url = isLogin ? `http://localhost:5000/api/auth/login` : `http://localhost:5000/api/auth/signup`;
      const response = await axios.post(url, formData);
      console.log("nasro : " + response)
      if (isLogin) {
        localStorage.setItem('token', response.data.token);
        toast.success('تم تسجيل الدخول بنجاح!', {
          duration: 5000,
          position: 'top-right',
        });
        setTimeout(() => navigate('/booking'), 2000);
      } else {
        toast.success('تم إنشاء الحساب بنجاح! سيتم توجيهك لتسجيل الدخول.', {
          duration: 5000,
          position: 'top-right',
        });
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err) {
      console.log(err.response?.data?.message)
      const errorMessage = err.response?.data?.message || 'حدث خطأ، حاول مرة أخرى.';
      toast.error(errorMessage, {
        duration: 5000,
        position: 'top-right',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {!isLogin && (
        <div>
          <label className="block text-dark-500 font-semibold mb-2 font-arabic">الاسم الكامل</label>
          <div className="relative">
            <User className="absolute right-3 top-3 h-5 w-5 text-cream-200" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pr-10 pl-4 py-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all font-arabic"
              placeholder="أدخل اسمك الكامل"
            />
          </div>
        </div>
      )}
      <div>
        <label className="block text-dark-500 font-semibold mb-2 font-arabic">البريد الإلكتروني</label>
        <div className="relative">
          <Mail className="absolute right-3 top-3 h-5 w-5 text-cream-200" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full pr-10 pl-4 py-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all font-arabic"
            placeholder="example@email.com"
          />
        </div>
      </div>
      <div>
        <label className="block text-dark-500 font-semibold mb-2 font-arabic">كلمة المرور</label>
        <div className="relative">
          <Lock className="absolute right-3 top-3 h-5 w-5 text-cream-200" />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full pr-10 pl-4 py-3 border border-cream-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all font-arabic"
            placeholder="أدخل كلمة المرور"
          />
        </div>
      </div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-primary-500 hover:bg-primary-600 text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl font-arabic"
      >
        {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}
      </motion.button>
    </form>
  );
};

export default AuthForm;