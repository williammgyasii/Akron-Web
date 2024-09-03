import React from "react";
import { motion } from "framer-motion";

const GradientAnimation = () => {
  return (
    <motion.div
      className="absolute inset-0 z-[-1] bg-gradient-to-r from-white via-gray-100 to-white"
      initial={{ backgroundPosition: "0% 0%" }}
      animate={{ backgroundPosition: "100% 100%" }}
      transition={{
        duration: 10,
        ease: "linear",
        repeat: Infinity,
      }}
      style={{
        backgroundSize: "200% 200%",
        backgroundImage:
          "linear-gradient(45deg, rgba(255,200,100,1) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%)",
      }}
    />
  );
};

export default GradientAnimation;
