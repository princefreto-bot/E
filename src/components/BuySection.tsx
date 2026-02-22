import { motion } from 'framer-motion';
import { ProductConfig, PRODUCTS } from '@/config/content';

interface Props {
  product: ProductConfig;
  onNextFlavor: () => void;
}

export default function BuySection({ product, onNextFlavor }: Props) {
  // Find next product for the CTA
  const currentIndex = PRODUCTS.findIndex(p => p.id === product.id);
  const nextProduct = PRODUCTS[(currentIndex + 1) % PRODUCTS.length];

  return (
    <section className="relative min-h-screen py-32 px-6 overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial Gradient Center */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px] opacity-30"
          style={{
            background: `radial-gradient(circle, ${product.colors.from}, ${product.colors.to})`,
          }}
        />
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 rounded-full blur-3xl"
          style={{ background: product.colors.from }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-48 h-48 rounded-full blur-3xl"
          style={{ background: product.colors.to }}
          animate={{
            y: [0, 40, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Main Content */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Product Name - Giant Typography */}
          <h2 
            className="text-7xl md:text-9xl font-black text-white mb-4 leading-none tracking-tighter"
            style={{
              textShadow: `0 10px 60px ${product.colors.from}80`,
            }}
          >
            {product.name.split(' ')[0]}
          </h2>
          <p 
            className="text-3xl md:text-5xl font-bold text-white/70 mb-12"
            style={{
              textShadow: `0 5px 30px ${product.colors.to}60`,
            }}
          >
            {product.name.split(' ').slice(1).join(' ')}
          </p>

          {/* Price Badge */}
          <motion.div 
            className="inline-flex items-center gap-4 px-10 py-5 rounded-full glass mb-12"
            whileHover={{ scale: 1.05 }}
            style={{
              boxShadow: `0 20px 60px ${product.colors.from}30`,
            }}
          >
            <span className="text-4xl md:text-5xl font-black text-white">{product.price}</span>
            <span className="text-white/60 text-lg font-medium">par bouteille</span>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {product.features.map((feature, idx) => (
            <motion.div 
              key={idx}
              className="p-6 rounded-2xl glass text-center"
              whileHover={{ 
                scale: 1.05,
                background: `linear-gradient(135deg, ${product.colors.from}20, ${product.colors.to}10)`,
              }}
            >
              <p className="text-white/50 text-xs uppercase tracking-widest mb-2 font-bold">{feature.label}</p>
              <p className="text-white font-black text-2xl">{feature.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="flex justify-center mb-20"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="relative group overflow-hidden px-16 py-6 rounded-full font-black text-2xl tracking-wide shadow-2xl"
            style={{ 
              background: 'white',
              color: product.colors.to,
              boxShadow: `0 20px 60px ${product.colors.from}50`,
            }}
          >
            <span className="relative z-10">COMMANDER</span>
            
            {/* Shimmer Effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
            />
            
            {/* Hover Gradient */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(90deg, ${product.colors.from}20, ${product.colors.to}20)`,
              }}
            />
          </motion.button>
        </motion.div>

        {/* Description */}
        <motion.p 
          className="text-center text-white/70 max-w-2xl mx-auto text-lg leading-relaxed mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {product.description}
        </motion.p>

        {/* Next Flavor CTA */}
        <motion.div
          className="relative py-20 -mx-6 px-6 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Skewed Background */}
          <div 
            className="absolute inset-0 -skew-y-3 origin-left"
            style={{
              background: `linear-gradient(135deg, ${nextProduct.colors.from}, ${nextProduct.colors.to})`,
            }}
          />
          
          <div className="relative z-10 text-center py-16">
            <motion.p 
              className="text-white/70 text-lg mb-4 uppercase tracking-widest font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Découvrez aussi
            </motion.p>
            
            <motion.h3 
              className="text-5xl md:text-7xl font-black text-white mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                textShadow: `0 10px 40px ${nextProduct.colors.from}60`,
              }}
            >
              {nextProduct.name}
            </motion.h3>
            
            <motion.button
              onClick={onNextFlavor}
              whileHover={{ scale: 1.1, x: 10 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-4 px-10 py-5 rounded-full bg-white/20 backdrop-blur-md text-white font-bold text-xl border border-white/30 hover:bg-white/30 transition-all"
            >
              Explorer
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </motion.svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
