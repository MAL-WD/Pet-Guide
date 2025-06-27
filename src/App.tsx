import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Groovy from './pages/Groovy';
import Grocery from './pages/Grocery';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-cream-50 font-arabic">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/grocery" element={<Grocery />} />
            <Route path="/booking" element={<Booking />} />
                       <Route path="/groovy" element={<Groovy />} />

          </Routes>
        </AnimatePresence>
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerStyle={{
            margin: '16px',
          }}
          toastOptions={{
            duration: 5000,
            style: {
              fontFamily: "'Tajawal', Arial, sans-serif",
              padding: '16px',
              borderRadius: '8px',
              textAlign: 'right',
            },
            success: {
              style: {
                background: '#f0fdf9', // primary-50
                color: '#0f9973', // primary-700
                border: '1px solid #16C79A', // primary-500
              },
            },
            error: {
              style: {
                background: '#fef2f2', // red-50 equivalent
                color: '#991b1b', // red-800 equivalent
                border: '1px solid #f87171', // red-400 equivalent
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;