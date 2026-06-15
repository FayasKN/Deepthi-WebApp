"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Celebration from "@/components/animations/Celebration";
import { useAudio } from "@/hooks/useAudio";

interface QuizProps {
  question_en: string;
  question_ml: string;
  options: string[];
  answer: string;
  onComplete: () => void;
  onSkip: () => void;
}

export default function Quiz({ question_en, question_ml, options, answer, onComplete, onSkip }: QuizProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const { play } = useAudio();

  const handleSelect = (opt: string) => {
    if (selected) return; // already answered
    setSelected(opt);

    if (opt === answer) {
      setShowCelebration(true);
      // After celebration auto-advances
    } else {
      // Shake feedback — handled by animation below
      setTimeout(() => setSelected(null), 1200);
    }
  };

  const isCorrect = selected === answer;
  const isWrong = (opt: string) => selected === opt && opt !== answer;

  return (
    <>
      <Celebration
        show={showCelebration}
        type="quiz"
        onDone={() => {
          setShowCelebration(false);
          onComplete();
        }}
      />

      <div className="flex flex-col items-center gap-8 p-6 w-full max-w-3xl mx-auto">
        {/* Question */}
        <div className="text-center">
          <p className="text-3xl font-display font-bold text-gray-800">{question_en}</p>
          <p className="text-2xl malayalam text-gray-600 mt-1">{question_ml}</p>
        </div>

        {/* Options grid */}
        <div className="grid grid-cols-2 gap-5 w-full">
          {options.map((opt) => {
            const correct = selected && opt === answer;
            const wrong = isWrong(opt);

            return (
              <motion.button
                key={opt}
                onClick={() => handleSelect(opt)}
                className={`
                  rounded-xl3 p-6 text-7xl flex items-center justify-center
                  border-4 shadow-md transition-all
                  ${correct ? "border-success bg-green-100" : ""}
                  ${wrong ? "border-red-500 bg-red-50" : ""}
                  ${!selected ? "border-gray-200 bg-white hover:border-primary hover:bg-blue-50" : ""}
                `}
                animate={wrong ? { x: [-8, 8, -8, 8, 0] } : {}}
                transition={{ duration: 0.4 }}
                whileTap={!selected ? { scale: 0.93 } : {}}
                whileHover={!selected ? { scale: 1.04 } : {}}
              >
                {opt}
                {correct && (
                  <motion.span
                    className="ml-3 text-4xl"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                  >
                    ✅
                  </motion.span>
                )}
                {wrong && <span className="ml-3 text-4xl">❌</span>}
              </motion.button>
            );
          })}
        </div>

        <p className="text-xl text-gray-500 font-body">
          Touch the correct picture / ശരിയായ ചിത്രം തൊടുക
        </p>

        <button
          onClick={onSkip}
          className="text-gray-400 text-lg underline hover:text-gray-600"
        >
          Skip
        </button>
      </div>
    </>
  );
}
