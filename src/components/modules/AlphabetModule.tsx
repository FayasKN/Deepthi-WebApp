"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { alphabetData } from "@/data/alphabet";
import AudioButton from "@/components/ui/AudioButton";
import NavControls from "@/components/ui/NavControls";
import ProgressBar from "@/components/ui/ProgressBar";
import Quiz from "@/components/quiz/Quiz";
import Celebration from "@/components/animations/Celebration";
import LessonImage from "@/components/ui/Lessonimage";

interface AlphabetModuleProps {
  onBack: () => void;
}

type Phase = "learn" | "repeat" | "quiz";

export default function AlphabetModule({ onBack }: AlphabetModuleProps) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("learn");
  const [showModuleCelebration, setShowModuleCelebration] = useState(false);

  const item = alphabetData[index];
  const isLast = index === alphabetData.length - 1;

  const goNext = useCallback(() => {
    if (phase === "learn") {
      setPhase("repeat");
    } else if (phase === "repeat") {
      setPhase("quiz");
    } else {
      // After quiz
      if (isLast) {
        setShowModuleCelebration(true);
      } else {
        setIndex((i) => i + 1);
        setPhase("learn");
      }
    }
  }, [phase, isLast]);

  const goPrev = () => {
    if (phase === "repeat") {
      setPhase("learn");
    } else if (phase === "quiz") {
      setPhase("repeat");
    } else if (index > 0) {
      setIndex((i) => i - 1);
      setPhase("learn");
    }
  };

  const repeat = () => setPhase("learn");

  return (
    <div className="min-h-screen bg-bg-soft flex flex-col">
      {/* Header */}
      <div className="bg-module-alphabet text-white px-8 py-5 flex items-center justify-between shadow-md">
        <button onClick={onBack} className="text-white text-2xl font-bold opacity-80 hover:opacity-100 min-h-0 min-w-0 px-3 py-2">
          ← Back
        </button>
        <h1 className="font-display font-black text-3xl tracking-wide">
          🔤 Alphabet Learning / അക്ഷരമാല
        </h1>
        <div className="w-24" />
      </div>

      {/* Progress */}
      <div className="px-8 py-4">
        <ProgressBar current={index + 1} total={alphabetData.length} />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${item.id}-${phase}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.35 }}
            className="w-full max-w-2xl"
          >
            {phase === "learn" && (
              <div className="flex flex-col items-center gap-6">
                {/* Letter display */}
                <motion.div
                  className="text-[10rem] font-display font-black leading-none text-module-alphabet"
                  animate={{ scale: [0.8, 1.05, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  {item.letter_en}
                </motion.div>
                <div className="text-5xl font-display font-bold text-gray-500 malayalam">
                  {item.letter_ml}
                </div>

               {/* Image with emoji fallback */}
                <LessonImage
                  src={item.image}
                  emoji={item.emoji}
                  alt={item.word_en}
                  size="lg"
                  animate={true}
                />

                <p className="text-4xl font-display font-bold text-gray-800">{item.word_en}</p>
                <p className="text-3xl font-display font-semibold text-gray-500 malayalam">{item.word_ml}</p>

                {/* Audio buttons */}
                <div className="flex gap-4 flex-wrap justify-center mt-2">
                  <AudioButton src={item.audio_en} label="🔊 English" lang="en" />
                  <AudioButton src={item.audio_ml} label="🔊 മലയാളം" lang="ml" />
                </div>
              </div>
            )}

            {phase === "repeat" && (
              <div className="flex flex-col items-center gap-6 text-center">
                <h2 className="text-4xl font-display font-black text-gray-700">
                  Say It Together / ഒരുമിച്ച് പറയൂ
                </h2>
                <div className="text-9xl">{item.emoji}</div>
                <p className="text-5xl font-display font-black text-module-alphabet">
                  "{item.letter_en} for {item.word_en}"
                </p>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-5xl"
                >
                  🎤 Repeat After Me
                </motion.div>
                <AudioButton src={item.audio_en} label="🔊 Play Again" lang="en" />
              </div>
            )}

            {phase === "quiz" && (
              <Quiz
                question_en={item.quiz.question_en}
                question_ml={item.quiz.question_ml}
                options={item.quiz.options}
                answer={item.quiz.answer}
                onComplete={goNext}
                onSkip={goNext}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation — shown when not in quiz (quiz manages its own flow) */}
      {phase !== "quiz" && (
        <div className="px-8 py-6 border-t border-gray-200 bg-white">
          <NavControls
            onPrev={goPrev}
            onNext={goNext}
            onRepeat={repeat}
            hasPrev={index > 0 || phase !== "learn"}
            hasNext={true}
            nextLabel={phase === "learn" ? "Say Together ▶" : "Quiz Time ▶"}
          />
        </div>
      )}

      {/* Module complete celebration */}
      <Celebration
        show={showModuleCelebration}
        type="module"
        onDone={() => {
          setShowModuleCelebration(false);
          onBack();
        }}
      />
    </div>
  );
}
