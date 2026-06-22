"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { vehiclesData } from "@/data/modules";
import AudioButton from "@/components/ui/AudioButton";
import NavControls from "@/components/ui/NavControls";
import ProgressBar from "@/components/ui/ProgressBar";
import LessonImage from "@/components/ui/Lessonimage";
import Celebration from "@/components/animations/Celebration";

interface VehiclesModuleProps {
  onBack: () => void;
}

export default function VehiclesModule({ onBack }: VehiclesModuleProps) {
  const [index, setIndex] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const item = vehiclesData[index];
  const isLast = index === vehiclesData.length - 1;

  const goNext = () => {
    if (isLast) {
      setShowCelebration(true);
    } else {
      setIndex((i) => i + 1);
    }
  };

  const goPrev = () => {
    if (index > 0) setIndex((i) => i - 1);
  };

  return (
    <div className="min-h-screen bg-teal-50 flex flex-col">
      {/* Header */}
      <div className="bg-module-vehicles text-white px-8 py-5 flex items-center justify-between shadow-md">
        <button onClick={onBack} className="text-white text-2xl font-bold opacity-80 hover:opacity-100 min-h-0 min-w-0 px-3 py-2">
          ← Back
        </button>
        <h1 className="font-display font-black text-3xl">🚗 Vehicles / വാഹനങ്ങൾ</h1>
        <div className="w-24" />
      </div>

      {/* Progress */}
      <div className="px-8 py-4">
        <ProgressBar current={index + 1} total={vehiclesData.length} />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 gap-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            className="flex flex-col items-center gap-6 w-full max-w-xl text-center"
          >
            {/* Vehicle image with emoji fallback */}
            <LessonImage
              src={item.image}
              emoji={item.emoji}
              alt={item.name_en}
              size="lg"
              animate={true}
            />

            {/* Name */}
            <p className="text-6xl font-display font-black text-gray-800">{item.name_en}</p>

            {/* English audio only */}
            <AudioButton src={item.audio_en} label="🔊 English" lang="en" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="px-8 py-6 border-t border-gray-200 bg-white">
        <NavControls
          onPrev={goPrev}
          onNext={goNext}
          onRepeat={() => setIndex(index)}
          hasPrev={index > 0}
          hasNext={true}
          nextLabel={isLast ? "Finish ✅" : "Next ▶"}
        />
      </div>

      {/* Module complete */}
      <Celebration
        show={showCelebration}
        type="module"
        onDone={() => { setShowCelebration(false); onBack(); }}
      />
    </div>
  );
}