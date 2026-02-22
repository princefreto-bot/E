import { motion } from 'framer-motion';
import { ProductConfig } from '../config/content';

interface FlavorNavigationProps {
  products: ProductConfig[];
  currentIndex: number;
  onSelect: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
}

/**
 * Navigation entre les différentes saveurs
 * - Flèches gauche/droite fixes sur les côtés
 * - Menu de sélection directe en bas de l'écran
 */
export default function FlavorNavigation({
  products,
  currentIndex,
  onSelect,
  onPrevious,
  onNext,
}: FlavorNavigationProps) {
  return (
    <>
      {/* Flèche gauche */}
      <motion.button
        onClick={onPrevious}
        className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </motion.button>

      {/* Flèche droite */}
      <motion.button
        onClick={onNext}
        className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        whileHover={{ scale: 1.1, x: 5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </motion.button>

      {/* Menu de sélection en bas */}
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <div className="flex items-center gap-2 p-2 rounded-full bg-black/20 backdrop-blur-xl border border-white/10">
          {products.map((product, index) => (
            <motion.button
              key={product.id}
              onClick={() => onSelect(index)}
              className={`relative px-5 py-2.5 rounded-full font-medium text-sm transition-all ${
                index === currentIndex
                  ? 'text-white'
                  : 'text-white/60 hover:text-white/80'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Background actif */}
              {index === currentIndex && (
                <motion.div
                  layoutId="activeFlavorBg"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${product.colors.from}, ${product.colors.to})`,
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              
              <span className="relative z-10">{product.name}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </>
  );
}
