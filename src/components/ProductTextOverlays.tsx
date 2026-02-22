import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ProductConfig } from "../config/content";

interface ProductTextOverlaysProps {
  product: ProductConfig;
}

const ProductTextOverlays: React.FC<ProductTextOverlaysProps> = ({ product }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {product.scrollTexts.map((text, index) => {
        const start = index * 0.25;
        const end = start + 0.25;
        
        // Smooth fade with easing
        const opacity = useTransform(
          scrollYProgress,
          [start, start + 0.08, end - 0.08, end],
          [0, 1, 1, 0]
        );
        
        const y = useTransform(
          scrollYProgress,
          [start, end],
          [60, -60]
        );

        const scale = useTransform(
          scrollYProgress,
          [start, start + 0.1, end - 0.1, end],
          [0.95, 1, 1, 0.95]
        );

        // Alternating layout: Left / Right to keep center clear for bottle
        const isLeft = index % 2 === 0;

        return (
          <motion.div
            key={index}
            style={{ opacity, y, scale }}
            className={`absolute top-0 left-0 w-full h-screen flex items-center ${
              isLeft ? "justify-start pl-[5vw] md:pl-[10vw]" : "justify-end pr-[5vw] md:pr-[10vw]"
            }`}
          >
            <div className={`max-w-lg ${isLeft ? 'text-left' : 'text-right'}`}>
              {/* Headline - Premium Typography */}
              <motion.h2 
                className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] mb-6"
                style={{
                  textShadow: `0 4px 40px ${product.colors.from}60, 0 0 80px ${product.colors.from}30`,
                }}
              >
                {text.headline}
              </motion.h2>
              
              {/* Decorative Line */}
              <motion.div 
                className={`w-20 h-1 rounded-full mb-6 ${isLeft ? 'mr-auto' : 'ml-auto'}`}
                style={{
                  background: `linear-gradient(90deg, ${product.colors.from}, ${product.colors.to})`,
                  boxShadow: `0 0 20px ${product.colors.from}80`,
                }}
              />
              
              {/* Subheadline */}
              <p 
                className="text-xl md:text-2xl text-white/80 font-light leading-relaxed"
                style={{
                  textShadow: '0 2px 20px rgba(0,0,0,0.3)',
                }}
              >
                {text.subheadline}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ProductTextOverlays;
