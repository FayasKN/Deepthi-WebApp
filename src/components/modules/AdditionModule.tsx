"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { additionData, AdditionItem } from "@/data/modules";
import ProgressBar from "@/components/ui/ProgressBar";
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

  const item = additionData[index];
  const isLast = index === additionData.length - 1;

  // Shuffle options fresh each time item changes
  const [shuffledOptions, setShuffledOptions] = useState<number[]>([]);
  useEffect(() => {
    setShuffledOptions([...item.options].sort(() => Math.random() - 0.5));
    setSelected(null);
    setResult(null);
    setLocked(false);
  }, [index]);

  const advanceToNext = useCallback(() => {
    if (isLast) {
      setShowModuleCelebration(true);
    } else {
      setIndex((i) => i + 1);
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

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col">
      {/* Header */}
      <div className="bg-module-addition text-white px-8 py-5 flex items-center justify-between shadow-md">
        <button onClick={onBack} className="text-white text-2xl font-bold opacity-80 hover:opacity-100 min-h-0 min-w-0 px-3 py-2">
          ← Back
        </button>
        <h1 className="font-display font-black text-3xl">➕ Addition / കൂട്ടൽ</h1>
        <div className="w-24" />
      </div>

      {/* Progress */}
      <div className="px-8 py-4">
        <ProgressBar current={index + 1} total={additionData.length} />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 gap-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            className="flex flex-col items-center gap-8 w-full max-w-2xl"
          >
            {/* Equation display */}
            <motion.div
              className="bg-white rounded-xl3 border-4 border-module-addition shadow-xl px-12 py-8 flex items-center gap-6"
              animate={locked ? { scale: [1, 1.04, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              {/* Dot grid visual for a */}
              <div className="flex flex-col items-center gap-2">
                <DotGrid count={item.a} color="bg-module-addition" />
                <span className="text-7xl font-display font-black text-module-addition">{item.a}</span>
              </div>

              <span className="text-7xl font-display font-black text-gray-400">+</span>

              {/* Dot grid visual for b */}
              <div className="flex flex-col items-center gap-2">
                <DotGrid count={item.b} color="bg-pink-400" />
                <span className="text-7xl font-display font-black text-pink-500">{item.b}</span>
              </div>

              <span className="text-7xl font-display font-black text-gray-400">=</span>

              {/* Answer slot */}
              <motion.div
                className={`
                  w-28 h-28 rounded-xl2 border-4 flex items-center justify-center text-6xl font-display font-black
                  ${locked ? "border-success bg-green-100 text-success" : "border-dashed border-gray-300 bg-gray-50 text-gray-300"}
                `}
                animate={locked ? { scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 0.4 }}
              >
                {locked ? item.answer : "?"}
              </motion.div>
            </motion.div>

            {/* Question */}
            <p className="text-2xl font-display font-bold text-gray-600">
              What is {item.a} + {item.b} = ?
            </p>

            {/* Option buttons */}
            <div className="grid grid-cols-4 gap-4 w-full">
              {shuffledOptions.map((opt) => {
                const isCorrect = selected === opt && result === "correct";
                const isWrong = selected === opt && result === "wrong";
                return (
                  <motion.button
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    disabled={locked && selected !== opt}
                    className={`
                      rounded-xl2 py-8 text-5xl font-display font-black shadow-md border-4
                      transition-all
                      ${isCorrect ? "border-success bg-green-100 text-success" : ""}
                      ${isWrong ? "border-red-400 bg-red-50 text-red-500" : ""}
                      ${!selected ? "border-gray-200 bg-white text-gray-800 hover:border-module-addition hover:bg-pink-50" : ""}
                      ${locked && selected !== opt ? "opacity-25 cursor-not-allowed" : ""}
                    `}
                    whileTap={{ scale: locked ? 1 : 0.92 }}
                    animate={isWrong ? { x: [-8, 8, -8, 8, 0] } : isCorrect ? { scale: [1, 1.1, 1] } : {}}
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

      {/* Nav — Prev only (Next unlocks via celebration) */}
      <div className="px-8 py-6 border-t border-gray-200 bg-white flex items-center justify-between gap-4">
        <motion.button
          onClick={() => { if (!locked && index > 0) setIndex((i) => i - 1); }}
          disabled={index === 0 || locked}
          whileTap={{ scale: 0.92 }}
          className="bg-gray-200 text-gray-700 font-display font-bold rounded-xl2 px-8 py-5 text-xl shadow disabled:opacity-30"
        >
          ◀ Previous
        </motion.button>

        <p className="text-gray-400 font-body text-lg">
          {index + 1} / {additionData.length}
        </p>

        {/* Next only active after correct answer (not locked by celebration) */}
        <motion.button
          onClick={() => { if (!locked) advanceToNext(); }}
          disabled={!result || result === "wrong" || locked}
          whileTap={{ scale: 0.92 }}
          className="bg-success text-white font-display font-bold rounded-xl2 px-8 py-5 text-xl shadow disabled:opacity-30"
        >
          {isLast ? "Finish ✅" : "Next ▶"}
        </motion.button>
      </div>

      {/* Quiz correct celebration */}
      <Celebration
        show={showCelebration}
        type="quiz"
        onDone={() => {
          setShowCelebration(false);
          setLocked(false);   // unlock Next button after celebration
        }}
      />

      {/* Module complete celebration */}
      <Celebration
        show={showModuleCelebration}
        type="module"
        onDone={() => { setShowModuleCelebration(false); onBack(); }}
      />
    </div>
  );
}

// Dot grid — visual representation of the number
function DotGrid({ count, color }: { count: number; color: string }) {
  const cols = count <= 5 ? count : Math.ceil(count / 2);
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={`w-6 h-6 rounded-full ${color} shadow-sm`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.04, type: "spring" }}
        />
      ))}
    </div>
  );
}