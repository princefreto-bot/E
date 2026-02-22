import { motion } from 'framer-motion';
import { ProductConfig } from '../config/content';

interface ProductDetailsProps {
  product: ProductConfig;
}

/**
 * Section des détails du produit
 * Affiche le nom, la description et les caractéristiques
 */
export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background Blobs */}
      <div 
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-20 pointer-events-none"
        style={{ background: product.colors.from }}
      />
      <div 
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[80px] opacity-10 pointer-events-none"
        style={{ background: product.colors.to }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Texte principal */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ 
                backgroundColor: `${product.colors.from}20`,
                border: `1px solid ${product.colors.from}40`,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: product.colors.from }}
              />
              <span 
                className="text-sm font-medium"
                style={{ color: product.colors.from }}
              >
                {product.subtitle}
              </span>
            </motion.div>
            
            {/* Titre */}
            <h2 
              className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight drop-shadow-xl"
              style={{
                color: 'white',
                // On utilise une ombre portée colorée pour le contraste
                textShadow: `0 4px 20px ${product.colors.from}40`
              }}
            >
              {product.name}
            </h2>
            
            {/* Description */}
            <p className="text-xl text-white/90 leading-relaxed mb-8 drop-shadow-md font-medium">
              {product.description}
            </p>
            
            {/* Ligne décorative */}
            <motion.div
              className="h-1 rounded-full mb-8"
              style={{
                background: 'white',
                opacity: 0.8
              }}
              initial={{ width: 0 }}
              whileInView={{ width: 120 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>
          
          {/* Caractéristiques */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {product.features.map((feature, index) => (
              <motion.div
                key={feature.label}
                className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  boxShadow: `0 20px 40px ${product.colors.from}40`,
                }}
              >
                <div 
                  className="text-sm font-bold mb-2 text-white/70 uppercase tracking-wider"
                >
                  {feature.label}
                </div>
                <div className="text-3xl font-black text-white drop-shadow-md">
                  {feature.value}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
