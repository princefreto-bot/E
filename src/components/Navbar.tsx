import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NAVBAR_CONFIG, SITE_CONFIG } from '../config/content';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'glass-dark py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
        >
          {/* Banana Lightning Icon */}
          <div className="relative w-10 h-10">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-lg opacity-50"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <svg viewBox="0 0 40 40" fill="none" className="w-full h-full relative z-10">
              <path
                d="M8 28C6 24 6 18 10 12C14 6 22 4 28 6C30 6.5 31 8 30 10C28 14 24 18 20 22C16 26 12 30 8 28Z"
                fill="url(#bananaGradient)"
                stroke="white"
                strokeWidth="1.5"
              />
              <path
                d="M22 8L16 18H22L18 30L28 16H20L22 8Z"
                fill="white"
                opacity="0.9"
              />
              <defs>
                <linearGradient id="bananaGradient" x1="8" y1="28" x2="28" y2="6" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FCD34D" />
                  <stop offset="1" stopColor="#FBBF24" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* Brand text */}
          <span 
            className="text-2xl font-black text-white tracking-wide"
            style={{
              textShadow: '0 2px 20px rgba(251, 191, 36, 0.3)',
            }}
          >
            {SITE_CONFIG.brandName}
          </span>
        </motion.div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAVBAR_CONFIG.links.map((item, idx) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + idx * 0.1 }}
              className="text-white/70 hover:text-white font-medium transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              {item.label}
              <motion.span 
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>

        {/* Order Button */}
        <motion.a
          href={NAVBAR_CONFIG.ctaButtonUrl}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-6 py-2.5 rounded-full font-bold text-black bg-white overflow-hidden group shadow-lg"
        >
          <span className="relative z-10">{NAVBAR_CONFIG.ctaButtonText}</span>
          
          {/* Hover gradient */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
        </motion.a>
      </div>
    </motion.nav>
  );
}
