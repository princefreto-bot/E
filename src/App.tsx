import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import ProductBottleScroll from "./components/ProductBottleScroll";
import ProductDetails from "./components/ProductDetails";
import BuySection from "./components/BuySection";
import Footer from "./components/Footer";
import IntroOverlay from "./components/IntroOverlay";
import { usePreloadImages } from "./hooks/usePreloadImages";
import { PRODUCTS } from "./config/content";
import { ChevronLeft, ChevronRight } from "lucide-react";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  
  const { progress, isLoaded } = usePreloadImages();

  const product = PRODUCTS[currentIndex];

  useEffect(() => {
    if (isLoaded && progress === 100) {
      const timer = setTimeout(() => {
        setShowIntro(false);
      }, 800); 
      return () => clearTimeout(timer);
    }
  }, [isLoaded, progress]);

  const nextProduct = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % PRODUCTS.length);
  };

  const prevProduct = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentIndex]);

  const pageVariants = {
    initial: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 100 : -100,
      scale: 0.98,
    }),
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir < 0 ? 100 : -100,
      scale: 0.98,
    }),
  };

  return (
    <>
      {/* Intro Overlay */}
      <AnimatePresence>
        {showIntro && (
          <IntroOverlay 
            progress={progress} 
            onComplete={() => {}} 
          />
        )}
      </AnimatePresence>

      {/* Main App */}
      <div
        className="relative min-h-screen transition-all duration-1000 ease-out grain"
        style={{
          background: `linear-gradient(135deg, ${product.colors.from} 0%, ${product.colors.to} 50%, ${product.colors.from}88 100%)`,
        }}
      >
        {/* Animated Background Orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-30"
            style={{ background: product.colors.from }}
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -100, 50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute right-0 bottom-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
            style={{ background: product.colors.to }}
            animate={{
              x: [0, -80, 40, 0],
              y: [0, 80, -40, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <Navbar />

        <main className="relative z-10">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={product.id}
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ 
                duration: 0.8, 
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full"
            >
              {/* Hero Scroll Animation */}
              <ProductBottleScroll product={product} />

              {/* Product Details */}
              <ProductDetails product={product} />
              
              {/* Buy Section */}
              <BuySection 
                product={product} 
                onNextFlavor={nextProduct}
              />

              {/* Footer */}
              <Footer />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Navigation Controls */}
        <motion.div 
          className="fixed bottom-8 left-0 right-0 z-50 flex items-center justify-center gap-6 pointer-events-none"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {/* Previous Button */}
          <motion.button
            onClick={prevProduct}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="pointer-events-auto p-4 rounded-full glass-dark text-white hover:bg-white/20 transition-all border border-white/20 shadow-xl"
          >
            <ChevronLeft size={24} />
          </motion.button>

          {/* Flavor Pills */}
          <div className="pointer-events-auto flex items-center gap-2 px-6 py-3 rounded-full glass-dark border border-white/20 shadow-xl">
            {PRODUCTS.map((p, idx) => (
              <motion.button
                key={p.id}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="relative group"
              >
                <motion.div
                  className={`rounded-full transition-all duration-500 ${
                    idx === currentIndex
                      ? "w-10 h-3"
                      : "w-3 h-3 hover:scale-125"
                  }`}
                  style={{
                    background: idx === currentIndex 
                      ? `linear-gradient(90deg, ${p.colors.from}, ${p.colors.to})`
                      : 'rgba(255,255,255,0.3)',
                  }}
                  layoutId={idx === currentIndex ? "activePill" : undefined}
                />
                
                {/* Tooltip */}
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/80 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {p.name}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Next Button */}
          <motion.button
            onClick={nextProduct}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="pointer-events-auto p-4 rounded-full glass-dark text-white hover:bg-white/20 transition-all border border-white/20 shadow-xl"
          >
            <ChevronRight size={24} />
          </motion.button>
        </motion.div>
      </div>
    </>
  );
}

export default App;
