import { motion } from 'framer-motion';
import { ProductConfig } from '../config/content';

interface ProductDetailsProps {
  product: ProductConfig;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-20 right-10 w-[500px] h-[500px] rounded-full blur-[150px]"
          style={{ background: `${product.colors.from}40` }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-10 w-[400px] h-[400px] rounded-full blur-[120px]"
          style={{ background: `${product.colors.to}30` }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-8 glass"
              style={{ 
                borderColor: `${product.colors.from}50`,
              }}
            >
              <motion.span 
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: product.colors.from }}
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-semibold text-white/90 tracking-wide uppercase">
                {product.subtitle}
              </span>
            </motion.div>
            
            {/* Title */}
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[0.95] text-white"
              style={{
                textShadow: `0 4px 30px ${product.colors.from}60`
              }}
            >
              {product.name}
            </motion.h2>
            
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl text-white/80 leading-relaxed mb-8 font-light"
            >
              {product.description}
            </motion.p>
            
            {/* Decorative Line */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 120 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 rounded-full mb-8"
              style={{
                background: `linear-gradient(90deg, ${product.colors.from}, ${product.colors.to})`,
              }}
            />

            {/* Price Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-baseline gap-2"
            >
              <span className="text-5xl font-black text-white">{product.price}</span>
              <span className="text-white/60 text-lg">/ bouteille</span>
            </motion.div>
          </div>
          
          {/* Right Column - Features Grid */}
          <div className="grid grid-cols-2 gap-5">
            {product.features.map((feature, idx) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * idx }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                }}
                className="group relative p-6 rounded-3xl glass overflow-hidden cursor-pointer"
                style={{
                  boxShadow: `0 10px 40px ${product.colors.from}20`,
                }}
              >
                {/* Hover Gradient */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${product.colors.from}30, ${product.colors.to}20)`,
                  }}
                />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="text-sm font-bold mb-3 text-white/60 uppercase tracking-widest">
                    {feature.label}
                  </div>
                  <div 
                    className="text-3xl font-black text-white"
                    style={{
                      textShadow: `0 2px 10px ${product.colors.from}40`,
                    }}
                  >
                    {feature.value}
                  </div>
                </div>

                {/* Corner Accent */}
                <div 
                  className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full blur-2xl opacity-50"
                  style={{ background: product.colors.from }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
