import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Heart, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import logo from '../assets/Logo-White.png'; // Adjust path to your logo asset

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('تم تسجيل الخروج بنجاح!', {
      duration: 5000,
      position: 'top-right',
    });
    navigate('/login');
    setIsOpen(false);
  };

  const navItems = [
    { name: 'الرئيسية', href: '/', id: 'home' },
    { name: 'الطبيب البيطري', href: '/#vet', id: 'vet' },
    { name: 'معرض الصور', href: '/gallery', id: 'gallery' },
    // { name: 'الخدمات', href: '/#services', id: 'services' },
    { name: 'المنتجات', href: '/grocery', id: 'grocery' },
    { name: 'الموقع', href: '/#location', id: 'location' },
    { name: 'الحجز', href: '/booking', id: 'booking' },
    { name: 'حجز رائع', href: '/groovy', id: 'groovy' },
   
  ];

  const handleNavClick = (href) => {
    if (href.startsWith('/#')) {
      const element = document.getElementById(href.substring(2));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-arabic ${
        scrolled ? 'bg-dark-500/95 backdrop-blur-md shadow-lg' : 'bg-dark-500'
      }`}
      style={{ direction: 'rtl' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 space-x-reverse">
            <img className="w-12 h-12" src={logo} alt="Pet Guide Logo" />
            <span className="text-xl font-bold text-white font-arabic">Pet GUIDE</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`text-white hover:text-primary-500 transition-colors duration-200 relative group font-arabic ${
                  location.pathname === item.href || (item.href.startsWith('/#') && location.pathname === '/' && location.hash === item.href.substring(1))
                    ? 'text-primary-500'
                    : ''
                }`}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}
            {token && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-white bg-green-500 hover:bg-green-600 rounded-full px-4 py-2 transition-colors font-arabic"
              >
                <LogOut className="h-5 w-5" />
                تسجيل الخروج
              </button>
            )}
            {!token && (
              <Link
                to="/signup"
                onClick={() => handleNavClick('/signup')}
                className="text-white bg-green-500 hover:bg-green-600 rounded-full px-4 py-2 transition-colors font-arabic"
              >
                إنشاء حساب
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-primary-500 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`block px-4 py-2 text-white hover:text-primary-500 hover:bg-dark-600 rounded transition-colors font-arabic ${
                  location.pathname === item.href || (item.href.startsWith('/#') && location.pathname === '/' && location.hash === item.href.substring(1))
                    ? 'text-primary-500 bg-dark-600'
                    : ''
                } ${item.id === 'signup' ? 'bg-green-500 text-white rounded-full px-4 py-2' : ''}`}
              >
                {item.name}
              </Link>
            ))}
            {token && (
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-full transition-colors font-arabic w-full text-right"
              >
                <span className="flex items-center gap-2">
                  <LogOut className="h-5 w-5" />
                  تسجيل الخروج
                </span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;