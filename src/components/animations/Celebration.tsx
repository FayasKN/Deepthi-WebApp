"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CelebrationProps {
  show: boolean;
  type?: "quiz" | "lesson" | "module";
  onDone?: () => void;
}

export default function Celebration({ show, type = "quiz", onDone }: CelebrationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!show) return;

    // Dynamically import canvas-confetti to avoid SSR issues
    import("canvas-confetti").then((confettiModule) => {
      const confetti = confettiModule.default;

      if (type === "module") {
        // Grand celebration for finishing a module
        const duration = 3000;
        const end = Date.now() + duration;
        const colors = ["#4A90D9", "#F5A623", "#5CB85C", "#7C6FE0", "#E85D75"];

        const frame = () => {
          confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors });
          confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors });
          if (Date.now() < end) requestAnimationFrame(frame);
        };
        frame();
      } else {
        // Simple burst for quiz correct answer
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#5CB85C", "#F5A623", "#4A90D9", "#FFD700"],
        });
      }
    });

    if (onDone) {
      const t = setTimeout(onDone, type === "module" ? 3200 : 1800);
      return () => clearTimeout(t);
    }
  }, [show, type, onDone]);

  const messages =
    type === "module"
      ? ["Excellent!", "Well Done!", "You're a Star!"]
      : ["Correct!", "Great Job!", "Amazing! ", "Super!"];

  const message = messages[Math.floor(Math.random() * messages.length)];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl3 shadow-2xl px-16 py-10 flex flex-col items-center gap-4 border-4 border-success"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <motion.div
              className="text-8xl"
              animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: type === "module" ? 3 : 1 }}
            >
              {type === "module" ? "🏆" : "⭐"}
            </motion.div>

            <motion.p
              className="text-4xl font-display font-black text-success text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {message}
            </motion.p>

            {/* Stars row */}
            <div className="flex gap-3">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="text-5xl"
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 300 }}
                >
                  ⭐
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
