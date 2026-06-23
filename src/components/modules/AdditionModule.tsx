"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { additionData } from "@/data/modules";
import ProgressBar from "@/components/ui/ProgressBar";
import NavControls from "@/components/ui/NavControls";
import Celebration from "@/components/animations/Celebration";

interface AdditionModuleProps {
  onBack: () => void;
}

export default function AdditionModule({ onBack }: AdditionModuleProps) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [locked, setLocked] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showModuleCelebration, setShowModuleCelebration] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<number[]>([]);

  const item = additionData[index];
  const isLast = index === additionData.length - 1;

  // Shuffle options fresh each time item changes
  useEffect(() => {
    setShuffledOptions([...item.options].sort(() => Math.random() - 0.5));
    setSelected(null);
    setResult(null);
    setLocked(false);
  }, [index]);

  const advanceToNext = useCallback(() => {
    setSelected(null);
    setResult(null);
    if (isLast) {
      setShowModuleCelebration(true);
    } else {
      setIndex((i) => i + 1);
      setTimeout(() => setLocked(false), 400);
    }
  }, [isLast]);

  const handleSelect = (opt: number) => {
    if (selected !== null || locked) return;
    setSelected(opt);
    if (opt === item.answer) {
      setResult("correct");
      setLocked(true);
      setShowCelebration(true);
    } else {
      setResult("wrong");
      setTimeout(() => { setSelected(null); setResult(null); }, 1200);
    }
  };

  const goPrev = () => {
    if (locked) return;
    if (index > 0) setIndex((i) => i - 1);
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col">
      {/* Header */}
      <div className="bg-module-addition text-white px-4 md:px-8 py-5 flex items-center justify-between shadow-md">
        <button
          onClick={onBack}
          className="text-white text-2xl font-bold opacity-80 hover:opacity-100 min-h-0 min-w-0 px-3 py-2"
        >
          ← Back
        </button>
        <h1 className="font-display font-black text-2xl md:text-3xl">➕ Addition / കൂട്ടൽ</h1>
        <div className="w-20" />
      </div>

      {/* Progress */}
      <div className="px-8 py-4">
        <ProgressBar current={index + 1} total={additionData.length} />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 gap-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className="flex flex-col items-center gap-6 w-full max-w-2xl"
          >
            {/* Equation card */}
            <motion.div
              className="bg-white rounded-2xl border-4 border-module-addition shadow-xl px-6 py-6 flex flex-row items-center justify-center gap-4 w-full"
              animate={locked ? { scale: [1, 1.04, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              {/* Number A */}
              <div className="flex flex-col items-center gap-2">
                <DotGrid count={item.a} color="bg-module-addition" />
                <span
                  className="font-black text-module-addition leading-none"
                  style={{ fontSize: "5rem", fontFamily: "Nunito, sans-serif" }}
                >
                  {item.a}
                </span>
              </div>

              <span
                className="font-black text-gray-400 leading-none"
                style={{ fontSize: "4rem", fontFamily: "Nunito, sans-serif" }}
              >
                +
              </span>

              {/* Number B */}
              <div className="flex flex-col items-center gap-2">
                <DotGrid count={item.b} color="bg-pink-400" />
                <span
                  className="font-black text-pink-500 leading-none"
                  style={{ fontSize: "5rem", fontFamily: "Nunito, sans-serif" }}
                >
                  {item.b}
                </span>
              </div>

              <span
                className="font-black text-gray-400 leading-none"
                style={{ fontSize: "4rem", fontFamily: "Nunito, sans-serif" }}
              >
                =
              </span>

              {/* Answer slot */}
              <motion.div
                className={`
                  w-24 h-24 rounded-xl border-4 flex items-center justify-center font-black leading-none
                  ${locked
                    ? "border-success bg-green-100 text-success"
                    : "border-dashed border-gray-300 bg-gray-50 text-gray-300"
                  }
                `}
                style={{ fontSize: "3.5rem", fontFamily: "Nunito, sans-serif" }}
                animate={locked ? { scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 0.4 }}
              >
                {locked ? item.answer : "?"}
              </motion.div>
            </motion.div>

            {/* Question text */}
            <p className="text-2xl font-display font-bold text-gray-600">
              What is {item.a} + {item.b} = ?
            </p>

            {/* Option buttons — same style as Numbers module */}
            <div className="grid grid-cols-4 gap-3 w-full">
              {shuffledOptions.map((opt) => {
                const isCorrect = selected === opt && result === "correct";
                const isWrong = selected === opt && result === "wrong";
                return (
                  <motion.button
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    disabled={locked && selected !== opt}
                    className={`
                      rounded-xl2 py-6 font-black shadow border-4 transition-all leading-none
                      ${isCorrect ? "border-success bg-green-100 text-success" : ""}
                      ${isWrong   ? "border-red-400 bg-red-50 text-red-500" : ""}
                      ${!selected  ? "border-gray-200 bg-white text-gray-800 hover:border-module-addition hover:bg-pink-50" : ""}
                      ${locked && selected !== opt ? "opacity-25 cursor-not-allowed" : ""}
                    `}
                    style={{ fontSize: "3rem", fontFamily: "Nunito, sans-serif" }}
                    whileTap={{ scale: locked ? 1 : 0.92 }}
                    animate={isWrong   ? { x: [-8, 8, -8, 8, 0] } :
                             isCorrect ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    {opt}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav — same NavControls as other modules, no middle counter */}
      <div className="px-8 py-6 border-t border-gray-200 bg-white">
        <NavControls
          onPrev={goPrev}
          onNext={advanceToNext}
          onRepeat={() => { if (!locked) { setSelected(null); setResult(null); } }}
          hasPrev={index > 0}
          prevLocked={locked}
          hasNext={result === "correct" && !locked}
          nextLabel={isLast ? "Finish ✅" : "Next ▶"}
        />
      </div>

      {/* Quiz correct — auto-advances after celebration */}
      <Celebration
        show={showCelebration}
        type="quiz"
        onDone={() => {
          setShowCelebration(false);
          advanceToNext();
        }}
      />

      {/* Module complete */}
      <Celebration
        show={showModuleCelebration}
        type="module"
        onDone={() => { setShowModuleCelebration(false); onBack(); }}
      />
    </div>
  );
}

// Dot grid — visual dots above each number
function DotGrid({ count, color }: { count: number; color: string }) {
  const cols = count <= 5 ? count : Math.ceil(count / 2);
  return (
    <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={`w-5 h-5 rounded-full ${color} shadow-sm`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.04, type: "spring" }}
        />
      ))}
    </div>
  );
}