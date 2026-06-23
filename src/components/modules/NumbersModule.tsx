"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { numbersData } from "@/data/modules";
import AudioButton from "@/components/ui/AudioButton";
import NavControls from "@/components/ui/NavControls";
import ProgressBar from "@/components/ui/ProgressBar";
import Celebration from "@/components/animations/Celebration";

interface NumbersModuleProps {
  onBack: () => void;
}

export default function NumbersModule({ onBack }: NumbersModuleProps) {
  const [index, setIndex] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizResult, setQuizResult] = useState<"correct" | "wrong" | null>(null);
  // FIX: lock all interaction while celebration is playing
  const [locked, setLocked] = useState(false);

  const item = numbersData[index];
  const isLast = index === numbersData.length - 1;

  // FIX: always reset quiz state BEFORE changing index so new number never
  //      inherits the previous answer
  const advanceToNext = useCallback(() => {
    setQuizAnswer(null);
    setQuizResult(null);
    if (isLast) {
      setLocked(false);
      onBack();
    } else {
      setIndex((i) => i + 1);
      // Keep locked=true until new item is mounted, then release
      setTimeout(() => setLocked(false), 400);
    }
  }, [isLast, onBack]);

  const handleQuizAnswer = (num: number) => {
    // FIX: block clicks while locked (celebration playing) or already answered
    if (quizAnswer !== null || locked) return;
    setQuizAnswer(num);
    if (num === item.quiz.answer) {
      setQuizResult("correct");
      setLocked(true);          // FIX: lock Next button immediately
      setShowCelebration(true);
    } else {
      setQuizResult("wrong");
      setTimeout(() => { setQuizAnswer(null); setQuizResult(null); }, 1200);
    }
  };

  // FIX: goNext only allowed when not locked (i.e. no celebration playing)
  const goNext = useCallback(() => {
    if (locked) return;
    advanceToNext();
  }, [locked, advanceToNext]);

  const goPrev = () => {
    if (locked) return;
    if (index > 0) {
      setQuizAnswer(null);
      setQuizResult(null);
      setIndex((i) => i - 1);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <div className="bg-module-numbers text-white px-4 md:px-8 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
        <button onClick={onBack} className="text-white text-2xl font-bold opacity-80 hover:opacity-100 min-h-0 min-w-0 px-3 py-2">
          ← Back
        </button>
        <h1 className="font-display font-black text-3xl"> Number / അക്കങ്ങൾ</h1>
        <div className="w-24" />
      </div>

      <div className="px-8 py-4">
        <ProgressBar current={index + 1} total={numbersData.length} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 gap-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center gap-6 w-full max-w-xl"
          >
            {/* Big numeral */}
            <motion.div
              className="text-[12rem] font-display font-black text-module-numbers leading-none"
              animate={{ scale: [0.9, 1.05, 1] }}
              transition={{ duration: 0.5 }}
            >
              {item.numeral}
            </motion.div>

            {/* Counting dots */}
            <div className="flex gap-4 flex-wrap justify-center">
              {Array.from({ length: item.dots }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-12 h-12 rounded-full bg-module-numbers shadow"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                />
              ))}
            </div>

            <p className="text-4xl font-display font-black text-gray-800">{item.word_en}</p>
            <p className="text-3xl malayalam font-display font-bold text-gray-500">{item.word_ml}</p>

            <div className="flex gap-4 flex-wrap justify-center">
              <AudioButton src={item.audio_en} label="🔊 English" lang="en" />
              <AudioButton src={item.audio_ml} label="🔊 മലയാളം" lang="ml" />
            </div>

            <p className="text-2xl font-display font-bold text-gray-600">Count Together! / ഒരുമിച്ച് എണ്ണൂ!</p>

            {/* Mini quiz */}
            <div className="w-full mt-2">
              <p className="text-center text-xl font-body text-gray-500 mb-4">
                {item.quiz.question_en} / {item.quiz.question_ml}
              </p>
              <div className="grid grid-cols-4 gap-3">
                {item.quiz.options.map((opt) => (
                  <motion.button
                    key={opt}
                    onClick={() => handleQuizAnswer(opt)}
                    // FIX: visually disable all buttons once locked
                    disabled={locked && quizAnswer !== opt}
                    className={`
                      rounded-xl2 py-6 text-5xl font-display font-black shadow
                      border-4 transition-all
                      ${quizAnswer === opt && quizResult === "correct" ? "border-success bg-green-100" : ""}
                      ${quizAnswer === opt && quizResult === "wrong" ? "border-red-500 bg-red-50" : ""}
                      ${quizAnswer === null ? "border-gray-200 bg-white hover:border-primary" : ""}
                      ${locked && quizAnswer !== opt ? "opacity-30 cursor-not-allowed" : ""}
                    `}
                    whileTap={{ scale: locked ? 1 : 0.92 }}
                    animate={quizAnswer === opt && quizResult === "wrong" ? { x: [-6, 6, -6, 6, 0] } : {}}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-8 py-6 border-t border-gray-200 bg-white">
        <NavControls
          onPrev={goPrev}
          onNext={goNext}
          onRepeat={() => {
            if (locked) return;
            setQuizAnswer(null);
            setQuizResult(null);
          }}
          hasPrev={index > 0}
          prevLocked={locked}
          hasNext={!locked}
        />
      </div>

      <Celebration
        show={showCelebration}
        type="quiz"
        // FIX: celebration is the ONLY thing that calls advanceToNext after correct answer
        //      goNext is blocked (locked=true) so there's no double-advance
        onDone={() => {
          setShowCelebration(false);
          advanceToNext();
        }}
      />
    </div>
  );
}