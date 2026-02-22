import React from "react";
import { motion } from "framer-motion";

interface IntroOverlayProps {
  progress: number;
  onComplete: () => void;
}

const IntroOverlay: React.FC<IntroOverlayProps> = ({ progress, onComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      onAnimationComplete={onComplete}
    >
      <div className="relative z-10 flex flex-col items-center gap-4">
        <h1 className="text-4xl md:text-6xl font-serif tracking-tighter">
          NANO BANANA
        </h1>
        
        <div className="w-64 h-[1px] bg-white/20 mt-4 overflow-hidden">
          <motion.div 
            className="h-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 50 }}
          />
        </div>
        
        <span className="text-xs font-mono opacity-50">
          LOADING EXPERIENCE {progress}%
        </span>
      </div>
    </motion.div>
  );
};

export default IntroOverlay;
