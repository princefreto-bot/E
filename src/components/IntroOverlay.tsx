import { motion } from "framer-motion";

interface IntroOverlayProps {
  progress: number;
  onComplete: () => void;
}

const IntroOverlay: React.FC<IntroOverlayProps> = ({ progress }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.1,
        transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } 
      }}
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #000000 100%)',
        }}
        animate={{
          background: [
            'radial-gradient(circle at 30% 30%, #1a1a1a 0%, #000000 100%)',
            'radial-gradient(circle at 70% 70%, #1a1a1a 0%, #000000 100%)',
            'radial-gradient(circle at 30% 70%, #1a1a1a 0%, #000000 100%)',
            'radial-gradient(circle at 70% 30%, #1a1a1a 0%, #000000 100%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo with Bounce */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
          className="relative"
        >
          {/* Glow behind logo */}
          <motion.div
            className="absolute inset-0 blur-3xl rounded-full"
            style={{ background: 'linear-gradient(135deg, #fbbf24, #ea580c)' }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Logo SVG */}
          <motion.svg 
            viewBox="0 0 80 80" 
            fill="none" 
            className="w-24 h-24 md:w-32 md:h-32 relative z-10"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Banana shape */}
            <path
              d="M16 56C12 48 12 36 20 24C28 12 44 8 56 12C60 13 62 16 60 20C56 28 48 36 40 44C32 52 24 60 16 56Z"
              fill="url(#bananaGradientIntro)"
              stroke="white"
              strokeWidth="2"
            />
            {/* Lightning bolt */}
            <path
              d="M44 16L32 36H44L36 60L56 32H40L44 16Z"
              fill="white"
              opacity="0.95"
            />
            <defs>
              <linearGradient id="bananaGradientIntro" x1="16" y1="56" x2="56" y2="12" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FCD34D" />
                <stop offset="1" stopColor="#FBBF24" />
              </linearGradient>
            </defs>
          </motion.svg>
        </motion.div>

        {/* Brand Name */}
        <motion.h1 
          className="text-4xl md:text-6xl font-black text-white tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            textShadow: '0 0 40px rgba(251, 191, 36, 0.5)',
          }}
        >
          NANO BANANA
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-white/50 text-sm md:text-base tracking-[0.3em] uppercase font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Premium Juice Experience
        </motion.p>
        
        {/* Progress Bar */}
        <motion.div 
          className="w-72 md:w-96 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {/* Bar Background */}
          <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #fbbf24, #ea580c)',
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 30, damping: 15 }}
            />
          </div>
          
          {/* Progress Text */}
          <motion.div 
            className="flex justify-between items-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="text-white/30 text-xs font-mono tracking-wider">
              CHARGEMENT
            </span>
            <span className="text-white/50 text-xs font-mono">
              {progress}%
            </span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default IntroOverlay;
