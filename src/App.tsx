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
  
  // Re-enabled Preloader to ensure frames are ready
  const { progress, isLoaded } = usePreloadImages();

  const product = PRODUCTS[currentIndex];

  useEffect(() => {
    // Dismiss intro only when fully loaded
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
    window.scrollTo(0, 0);
  }, [currentIndex]);

  const pageVariants = {
    initial: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 100 : -100,
    }),
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction < 0 ? 100 : -100,
    }),
  };

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <IntroOverlay 
            progress={progress} 
            onComplete={() => {}} 
          />
        )}
      </AnimatePresence>

      <div
        className="relative min-h-screen transition-colors duration-1000 ease-in-out selection:bg-white/30 selection:text-white"
        style={{
          background: `linear-gradient(to bottom, ${product.colors.from}, ${product.colors.to})`,
        }}
      >
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
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              {/* Scrollytelling section managed by ProductBottleScroll (handles its own 500vh + sticky canvas) */}
              <ProductBottleScroll product={product} />

              <ProductDetails product={product} />
              
              <BuySection 
                product={product} 
                onNextFlavor={nextProduct}
              />

              <Footer />
            </motion.div>
          </AnimatePresence>
        </main>

        <div className="fixed bottom-8 left-0 right-0 z-50 flex items-center justify-center gap-8 pointer-events-none">
          <button
            onClick={prevProduct}
            className="pointer-events-auto p-4 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-white/20 transition-all active:scale-95 border border-white/10"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="pointer-events-auto flex items-center gap-2 px-6 py-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10">
            {PRODUCTS.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "bg-white w-8"
                    : "bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextProduct}
            className="pointer-events-auto p-4 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-white/20 transition-all active:scale-95 border border-white/10"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
