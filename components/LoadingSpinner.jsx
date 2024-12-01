'use client';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ text = 'Loading' }) => {
  const bounceTransition = {
    y: {
      duration: 0.4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeOut"
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
      {/* Animated dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            animate={{ y: ["0%", "-50%"] }}
            transition={{
              ...bounceTransition.y,
              delay: index * 0.1
            }}
            className="w-3 h-3 bg-blue-600 rounded-full"
          />
        ))}
      </div>

      {/* Loading text */}
      <div className="flex items-center gap-2 text-gray-600">
        <span className="text-sm font-medium">{text}</span>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full"
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;