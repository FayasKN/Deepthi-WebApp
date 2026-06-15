"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAudio } from "@/hooks/useAudio";

interface AudioButtonProps {
  src: string;
  label: string;
  lang: "en" | "ml";
}

export default function AudioButton({ src, label, lang }: AudioButtonProps) {
  const { play } = useAudio();
  const [playing, setPlaying] = useState(false);

  const bgColor = lang === "en" ? "bg-primary hover:bg-primary-dark" : "bg-secondary hover:bg-secondary-dark";

  const handlePlay = () => {
    if (playing) return;
    setPlaying(true);
    play(src, () => setPlaying(false));
  };

  return (
    <motion.button
      onClick={handlePlay}
      whileTap={{ scale: 0.93 }}
      whileHover={{ scale: 1.05 }}
      className={`
        ${bgColor} text-white font-display font-bold
        rounded-xl2 px-8 py-5 text-xl
        flex items-center gap-3 shadow-md
        transition-colors duration-150
        disabled:opacity-60
      `}
      disabled={playing}
      aria-label={`Play ${label} in ${lang === "en" ? "English" : "Malayalam"}`}
    >
      <motion.span
        animate={playing ? { scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] } : {}}
        transition={{ repeat: playing ? Infinity : 0, duration: 0.5 }}
        className="text-2xl"
      >
        🔊
      </motion.span>
      {label}
    </motion.button>
  );
}
