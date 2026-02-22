import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NAVBAR_CONFIG, SITE_CONFIG } from '../config/content';

/**
 * Barre de navigation fixe avec effet de blur au scroll
 */
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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/20 backdrop-blur-xl border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
        >
          {/* Custom Banana Lightning Icon */}
          <div className="relative w-10 h-10">
            <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
              {/* Banana shape */}
              <path
                d="M8 28C6 24 6 18 10 12C14 6 22 4 28 6C30 6.5 31 8 30 10C28 14 24 18 20 22C16 26 12 30 8 28Z"
                fill="url(#bananaGradient)"
                stroke="white"
                strokeWidth="1.5"
              />
              {/* Lightning bolt */}
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
          <span className="text-2xl font-bold text-white tracking-wide">
            {SITE_CONFIG.brandName}
          </span>
        </motion.div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAVBAR_CONFIG.links.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="text-white/80 hover:text-white font-medium transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        {/* Order Button */}
        <motion.a
          href={NAVBAR_CONFIG.ctaButtonUrl}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-6 py-2.5 rounded-full font-semibold text-black bg-white overflow-hidden group"
        >
          <span className="relative z-10">{NAVBAR_CONFIG.ctaButtonText}</span>
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute -inset-1 bg-white/50 blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
        </motion.a>
      </div>
    </motion.nav>
  );
}
