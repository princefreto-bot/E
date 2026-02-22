import { motion } from 'framer-motion';
import { useImageSequence } from '../hooks/useImageSequence';
import { ProductConfig } from '../config/content';
import ProductTextOverlays from './ProductTextOverlays';

interface ProductBottleScrollProps {
  product: ProductConfig;
}

/**
 * Composant d'animation de bouteille avec scroll
 * 
 * Affiche une séquence d'images sur un canvas qui s'anime selon le scroll.
 * Le canvas est en plein écran avec les textes qui apparaissent par-dessus.
 */
export default function ProductBottleScroll({ product }: ProductBottleScrollProps) {
  const { canvasRef, isLoading, loadingProgress, setControlMode, renderByProgress } = useImageSequence({
    basePath: product.imagePath,
    frameDirection: product.frameDirection,
  });

  // Auto-play on section enter: lock scroll, play 0→1, then unlock
  // We'll use an IntersectionObserver to detect when the sticky canvas enters view
  // and a simple wheel/touch blocker while autoplay runs.
  
  // Autoplay effect
  // Note: keep TS import of useEffect, useRef to top; this file imports only motion now, let's inline hooks
  // but we can use global window listeners safely here.

  let autoplayDone = false;
  
  const startAutoplay = () => {
    if (autoplayDone) return;
    autoplayDone = true;
    
    setControlMode('external');

    // Lock scroll
    const prevent = (e: Event) => {
      e.preventDefault();
    };
    window.addEventListener('wheel', prevent, { passive: false });
    window.addEventListener('touchmove', prevent, { passive: false });
    window.addEventListener('keydown', prevent as any, { passive: false });

    // Animate progress over duration based on frames
    const durationMs = Math.max(1600, 191 * 6); // ~6ms per frame, at least 1.6s
    const t0 = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / durationMs);
      renderByProgress(t);
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        // Unlock and switch back to scroll control
        window.removeEventListener('wheel', prevent as any);
        window.removeEventListener('touchmove', prevent as any);
        window.removeEventListener('keydown', prevent as any);
        setControlMode('scroll');
      }
    };
    requestAnimationFrame(tick);
  };

  // Observe when sticky area is fully in view to start autoplay once per mount
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      const root = document.querySelector('.scroll-container .sticky');
      if (!root) return;
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            startAutoplay();
            io.disconnect();
          }
        });
      }, { threshold: [0.6] });
      io.observe(root);
    }, 0);
  }

  return (
    <div 
      className="scroll-container relative"
      style={{ height: '500vh' }}
    >
      {/* Canvas sticky en plein écran */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        {/* Indicateur de chargement */}
        {isLoading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="text-white text-2xl font-bold mb-4">
              Chargement...
            </div>
            <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(to right, ${product.colors.from}, ${product.colors.to})`,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="text-white/70 mt-2">{loadingProgress}%</div>
          </div>
        )}

        {/* Canvas pour l'animation */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ 
            display: 'block',
            background: `linear-gradient(135deg, ${product.colors.from}22, ${product.colors.to}22)`,
          }}
        />

        {/* Overlay gradient pour meilleure lisibilité du texte */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, transparent 40%, ${product.colors.from}33 100%)`,
          }}
        />
      </div>

      {/* Textes de scroll par-dessus le canvas */}
      <div className="absolute inset-0 pointer-events-none">
        <ProductTextOverlays product={product} />
      </div>
    </div>
  );
}
