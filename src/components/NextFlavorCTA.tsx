import { motion } from 'framer-motion';
import { ProductConfig } from '../config/content';

interface NextFlavorCTAProps {
  nextProduct: ProductConfig;
  onNavigate: () => void;
}

/**
 * Grand CTA pour découvrir la prochaine saveur
 * Affiché en fin de page avec un design incliné
 */
export default function NextFlavorCTA({ nextProduct, onNavigate }: NextFlavorCTAProps) {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background incliné */}
      <div 
        className="absolute inset-0 -skew-y-3 origin-left"
        style={{
          background: `linear-gradient(135deg, ${nextProduct.colors.from}, ${nextProduct.colors.to})`,
        }}
      />
      
      {/* Contenu */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          {/* Label */}
          <motion.p
            className="text-white/80 text-xl mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Continuez l'aventure
          </motion.p>
          
          {/* Titre */}
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight">
            Découvrez
            <br />
            <span className="text-white/90">{nextProduct.name}</span>
          </h2>
          
          {/* Description */}
          <p className="text-white/80 text-xl max-w-2xl mx-auto mb-12">
            {nextProduct.subtitle} — {nextProduct.description.slice(0, 100)}...
          </p>
          
          {/* Bouton */}
          <motion.button
            onClick={onNavigate}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-12 py-5 bg-white rounded-full font-bold text-xl overflow-hidden"
            style={{ color: nextProduct.colors.from }}
          >
            <span className="relative z-10 flex items-center gap-3">
              Explorer maintenant
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </motion.svg>
            </span>
            
            {/* Hover effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
              style={{ backgroundColor: nextProduct.colors.from }}
            />
          </motion.button>
        </motion.div>
      </div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
    </section>
  );
}
