import { motion } from 'framer-motion';
import { Product } from '@/data/products';

interface PlaceholderBottleProps {
  product: Product;
  progress: number;
}

export function PlaceholderBottle({ product, progress }: PlaceholderBottleProps) {
  // Calculate rotation based on scroll progress
  const rotation = progress * 360;
  const scale = 0.8 + (Math.sin(progress * Math.PI) * 0.2);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        style={{
          rotate: rotation,
          scale: scale,
        }}
        className="relative"
      >
        {/* Bottle SVG */}
        <svg
          viewBox="0 0 200 400"
          className="w-48 h-96 md:w-64 md:h-[500px]"
          fill="none"
        >
          {/* Bottle cap */}
          <rect
            x="70"
            y="10"
            width="60"
            height="30"
            rx="5"
            fill="url(#capGradient)"
          />
          
          {/* Bottle neck */}
          <path
            d="M75 40 L75 70 Q50 80 50 100 L50 370 Q50 390 70 390 L130 390 Q150 390 150 370 L150 100 Q150 80 125 70 L125 40"
            fill="url(#bottleGradient)"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="2"
          />
          
          {/* Liquid level */}
          <path
            d="M55 120 L55 360 Q55 380 75 380 L125 380 Q145 380 145 360 L145 120 Q100 130 55 120"
            fill="url(#liquidGradient)"
            opacity="0.8"
          />
          
          {/* Reflection */}
          <path
            d="M60 100 L60 350 Q60 370 70 370"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          
          {/* Label area */}
          <rect
            x="60"
            y="180"
            width="80"
            height="120"
            rx="5"
            fill="rgba(255,255,255,0.9)"
          />
          
          {/* Brand text on label */}
          <text
            x="100"
            y="220"
            textAnchor="middle"
            fill="#333"
            fontSize="10"
            fontWeight="bold"
          >
            NANO
          </text>
          <text
            x="100"
            y="235"
            textAnchor="middle"
            fill="#333"
            fontSize="10"
            fontWeight="bold"
          >
            BANANA
          </text>
          <text
            x="100"
            y="270"
            textAnchor="middle"
            fill={product.gradientStart}
            fontSize="8"
            fontWeight="600"
          >
            {product.name.toUpperCase()}
          </text>
          
          <defs>
            <linearGradient id="capGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4a4a4a" />
              <stop offset="100%" stopColor="#2a2a2a" />
            </linearGradient>
            
            <linearGradient id="bottleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
            </linearGradient>
            
            <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={product.gradientStart} />
              <stop offset="100%" stopColor={product.gradientEnd} />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white/30"
            style={{
              left: `${30 + i * 10}%`,
              top: `${40 + (i % 3) * 15}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              repeat: Infinity,
              duration: 2 + i * 0.5,
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
