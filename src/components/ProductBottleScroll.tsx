import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useImageSequence } from '../hooks/useImageSequence';
import { ProductConfig } from '../config/content';
import ProductTextOverlays from './ProductTextOverlays';

interface ProductBottleScrollProps {
  product: ProductConfig;
}

export default function ProductBottleScroll({ product }: ProductBottleScrollProps) {
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);
  const stickyRef = useRef<HTMLDivElement>(null);
  
  const { 
    canvasRef, 
    isLoading, 
    loadingProgress, 
    setControlMode, 
    renderByProgress 
  } = useImageSequence({
    basePath: product.imagePath,
    frameDirection: product.frameDirection,
  });

  // Autoplay on section enter
  useEffect(() => {
    if (hasAutoPlayed || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            startAutoplay();
            observer.disconnect();
          }
        });
      },
      { threshold: [0.5] }
    );

    if (stickyRef.current) {
      observer.observe(stickyRef.current);
    }

    return () => observer.disconnect();
  }, [hasAutoPlayed, isLoading]);

  const startAutoplay = () => {
    if (hasAutoPlayed) return;
    setHasAutoPlayed(true);
    setControlMode('external');

    // Block scroll during autoplay
    const preventDefault = (e: Event) => e.preventDefault();
    document.addEventListener('wheel', preventDefault, { passive: false });
    document.addEventListener('touchmove', preventDefault, { passive: false });

    const durationMs = 1800; // ~2 seconds for smooth playback
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      
      // Eased progress for smoother animation
      const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease-out cubic
      
      renderByProgress(easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Autoplay complete - switch to scroll control
        document.removeEventListener('wheel', preventDefault);
        document.removeEventListener('touchmove', preventDefault);
        setControlMode('scroll');
      }
    };

    requestAnimationFrame(animate);
  };

  // Reset autoplay when product changes
  useEffect(() => {
    setHasAutoPlayed(false);
  }, [product.id]);

  return (
    <div 
      className="scroll-container relative"
      style={{ height: '500vh' }}
    >
      {/* Sticky Canvas Container */}
      <div 
        ref={stickyRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden"
      >
        {/* Loading Overlay */}
        {isLoading && (
          <motion.div 
            className="absolute inset-0 z-30 flex flex-col items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${product.colors.from}ee, ${product.colors.to}ee)`,
            }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-white text-3xl font-black mb-6"
              animate={{ 
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Chargement
            </motion.div>
            
            {/* Progress Bar */}
            <div className="w-72 h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            <div className="text-white/60 mt-4 font-mono text-sm">
              {loadingProgress}%
            </div>
          </motion.div>
        )}

        {/* Background Gradient */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${product.colors.from}20 0%, transparent 70%)`,
          }}
        />

        {/* Large Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <h1 
            className="text-[25vw] font-black text-white/5 leading-none tracking-tighter uppercase select-none"
            style={{
              textShadow: `0 0 100px ${product.colors.from}20`,
            }}
          >
            {product.name.split(' ')[0]}
          </h1>
        </div>

        {/* Canvas for Animation */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ 
            display: 'block',
          }}
        />

        {/* Bottom Gradient Overlay for Text Readability */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${product.colors.to}60, transparent)`,
          }}
        />

        {/* Scroll Indicator */}
        {!isLoading && (
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
          >
            <span className="text-white/50 text-sm font-medium tracking-widest uppercase">
              Scrollez
            </span>
            <motion.div
              className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
              animate={{ borderColor: ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0.3)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1.5 h-3 rounded-full bg-white/60"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Text Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <ProductTextOverlays product={product} />
      </div>
    </div>
  );
}
