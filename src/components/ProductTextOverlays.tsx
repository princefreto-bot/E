import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Product } from "../config/content";

interface ProductTextOverlaysProps {
  product: Product;
}

const ProductTextOverlays: React.FC<ProductTextOverlaysProps> = ({ product }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {product.scrollTexts.map((text: { headline: string; subheadline: string }, index: number) => {
        // Calculate phases for each text section
        const start = index * 0.25;
        const end = start + 0.25;
        
        // Text fades in cleanly, without obstructing the bottle
        // Delayed start so the bottle animation has priority
        const opacity = useTransform(
          scrollYProgress,
          [start, start + 0.1, end - 0.1, end],
          [0, 1, 1, 0]
        );
        
        const y = useTransform(
          scrollYProgress,
          [start, end],
          [30, -30]
        );

        // Layout: Alternating Left / Right to keep center clear for the bottle
        const isLeft = index % 2 === 0;

        return (
          <motion.div
            key={index}
            style={{ opacity, y }}
            className={`absolute top-0 left-0 w-full h-screen flex items-center ${
              isLeft ? "justify-start pl-[5vw] md:pl-[10vw]" : "justify-end pr-[5vw] md:pr-[10vw]"
            }`}
          >
            <div className="max-w-md text-left z-20">
              {/* New Romance Style: Serif, Clean, No Background Box */}
              <h2 className="text-5xl md:text-7xl font-serif text-white leading-[0.9] drop-shadow-lg mb-6">
                {text.headline}
              </h2>
              <div className={`w-16 h-[2px] bg-white mb-6 opacity-60 ${isLeft ? "mr-auto" : "ml-auto md:ml-0"}`} />
              <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed drop-shadow-md">
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
