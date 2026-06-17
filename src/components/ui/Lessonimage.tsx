"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface LessonImageProps {
  src: string;        // e.g. /images/alphabet/apple.png
  emoji: string;      // fallback if image missing
  alt: string;
  size?: "sm" | "md" | "lg";   // sm=200px md=280px lg=360px
  animate?: boolean;
}

const sizeMap = {
  sm: "w-48 h-48",
  md: "w-72 h-72",
  lg: "w-80 h-80",
};

const emojiFallbackSize = {
  sm: "text-[6rem]",
  md: "text-[8rem]",
  lg: "text-[9rem]",
};

export default function LessonImage({
  src,
  emoji,
  alt,
  size = "lg",
  animate = true,
}: LessonImageProps) {
  const [imgError, setImgError] = useState(false);

  const floatAnimation = animate
    ? { y: [0, -12, 0] }
    : {};
  const floatTransition = animate
    ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" as const }
    : {};

  return (
    <motion.div
      animate={floatAnimation}
      transition={floatTransition}
      className="flex items-center justify-center"
    >
      {!imgError ? (
        // Primary: real image
        <img
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
          className={`
            ${sizeMap[size]}
            object-contain
            drop-shadow-xl
            rounded-xl2
          `}
        />
      ) : (
        // Fallback: emoji when image is missing
        <span className={emojiFallbackSize[size]}>{emoji}</span>
      )}
    </motion.div>
  );
}