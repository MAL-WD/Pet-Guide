import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { ArrowRight } from 'lucide-react';

const Signup = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-r from-cream-50 to-primary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-lg">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-dark-500 font-arabic">إنشاء حساب</h2>
          <p className="mt-2 text-cream-200 font-arabic">أدخل بياناتك لإنشاء حساب جديد</p>
        </motion.div>
        <AuthForm isLogin={false} />
        <div className="text-center">
          <p className="text-sm text-dark-500 font-arabic">
            لديك حساب بالفعل؟{' '}
            <Link to="/login" className="text-primary-500 hover:text-primary-600 font-semibold">
              تسجيل الدخول
            </Link>
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 transition-colors font-arabic"
        >
          <ArrowRight className="h-5 w-5" />
          العودة للرئيسية
        </Link>
      </div>
    </motion.div>
  );
};

export default Signup;