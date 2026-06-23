"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface NavControlsProps {
  onPrev: () => void;
  onNext: () => void;
  onRepeat: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  prevLocked?: boolean;   // show red ❌ shake instead of greyed-out disabled
  nextLabel?: string;
}

const NavBtn = ({
  onClick,
  disabled,
  children,
  className = "",
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.button
    onClick={onClick}
    disabled={disabled}
    whileTap={{ scale: disabled ? 1 : 0.9 }}
    whileHover={{ scale: disabled ? 1 : 1.07 }}
    className={`
      ${className}
      rounded-xl2 font-display font-bold text-xl px-8 py-5
      shadow-md transition-all duration-150
      disabled:opacity-30 disabled:cursor-not-allowed
    `}
  >
    {children}
  </motion.button>
);

export default function NavControls({
  onPrev, onNext, onRepeat, hasPrev, hasNext, prevLocked = false, nextLabel = "Next",
}: NavControlsProps) {
  const [shaking, setShaking] = useState(false);

  const handlePrev = () => {
    if (prevLocked) {
      // Show red shake feedback instead of doing nothing
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
      return;
    }
    onPrev();
  };

  return (
    <div className="flex items-center justify-center gap-4 w-full flex-wrap">
      <motion.button
        onClick={handlePrev}
        disabled={!hasPrev && !prevLocked}
        whileTap={{ scale: 0.9 }}
        animate={shaking ? { x: [-8, 8, -8, 8, -4, 4, 0] } : {}}
        transition={{ duration: 0.4 }}
        className={`
          rounded-xl2 font-display font-bold text-xl px-8 py-5
           transition-all duration-150
          ${prevLocked
            ? " border-2  cursor-not-allowed"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-30 disabled:cursor-not-allowed"
          }
        `}
      >
        {prevLocked && shaking ? "Previous" : prevLocked ? " Previous" : "Previous"}
      </motion.button>

      <NavBtn
        onClick={onNext}
        disabled={!hasNext}
        className="bg-success text-white hover:bg-green-600"
      >
        {nextLabel}
      </NavBtn>
    </div>
  );
}