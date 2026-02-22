import { motion } from 'framer-motion';
import { ProductConfig } from '@/config/content';

interface Props {
  product: ProductConfig;
  onNextFlavor: () => void;
}

export default function BuySection({ product, onNextFlavor }: Props) {
  return (
    <div className="relative z-30 min-h-screen flex flex-col items-center justify-center py-20 px-6 overflow-hidden">
      
      {/* Background Accent */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${product.colors.from}, transparent 70%)`
        }}
      />

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-10%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl w-full text-center relative z-10"
      >
        {/* Product Name */}
        <h2 className="text-6xl md:text-9xl font-black text-white mb-6 tracking-tighter drop-shadow-2xl">
          {product.name.split(' ')[0]}
          <span className="block text-4xl md:text-6xl text-white/80 mt-2 font-bold tracking-normal">
            {product.name.split(' ').slice(1).join(' ')}
          </span>
        </h2>

        {/* Price Tag */}
        <div className="inline-block bg-white/10 backdrop-blur-md rounded-full px-8 py-3 mb-12 border border-white/20 shadow-xl">
          <span className="text-3xl font-bold text-white">{product.price}</span>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {product.features.map((feature, idx) => (
            <div 
              key={idx}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <p className="text-white/60 text-sm uppercase tracking-wider mb-2">{feature.label}</p>
              <p className="text-white font-bold text-xl">{feature.value}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group overflow-hidden bg-white px-12 py-6 rounded-full font-black text-xl tracking-wide shadow-2xl hover:shadow-white/20 transition-all"
          style={{ color: product.colors.to }}
        >
          <span className="relative z-10">COMMANDER MAINTENANT</span>
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" 
          />
        </motion.button>

        {/* Description */}
        <p className="mt-12 text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
          {product.description}
        </p>

      </motion.div>

      {/* Next Flavor Tease */}
      <motion.div 
        className="absolute bottom-10 left-0 w-full flex justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button 
          onClick={onNextFlavor}
          className="text-white/50 hover:text-white flex flex-col items-center gap-2 transition-colors group"
        >
          <span className="text-sm uppercase tracking-widest font-bold">Saveur Suivante</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-6 h-6 animate-bounce group-hover:text-yellow-400 transition-colors"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </motion.div>

    </div>
  );
}
