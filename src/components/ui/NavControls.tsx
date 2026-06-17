"use client";

import { motion } from "framer-motion";

interface NavControlsProps {
  onPrev: () => void;
  onNext: () => void;
  onRepeat: () => void;
  hasPrev: boolean;
  hasNext: boolean;
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
  onPrev, onNext, onRepeat, hasPrev, hasNext, nextLabel = "Next ▶",
}: NavControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4 w-full flex-wrap">
      <NavBtn
        onClick={onPrev}
        disabled={!hasPrev}
        className="bg-gray-200 text-gray-700 hover:bg-gray-300"
      >
        ◀ Previous
      </NavBtn>

     

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
