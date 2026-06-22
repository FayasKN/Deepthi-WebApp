"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ContentItem, RoutineItem } from "@/data/modules";
import AudioButton from "@/components/ui/AudioButton";
import NavControls from "@/components/ui/NavControls";
import ProgressBar from "@/components/ui/ProgressBar";
import Celebration from "@/components/animations/Celebration";
import LessonImage from "@/components/ui/Lessonimage";

type Item = ContentItem | RoutineItem;

interface GenericModuleProps {
  title_en: string;
  title_ml: string;
  emoji: string;
  color: string;       // bg color class
  items: Item[];
  onBack: () => void;
  showAnimalSound?: boolean;
}

function isRoutineItem(item: Item): item is RoutineItem {
  return "action_en" in item;
}

export default function GenericModule({
  title_en, title_ml, emoji, color, items, onBack, showAnimalSound = false,
}: GenericModuleProps) {
  const [index, setIndex] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const item = items[index];
  const isLast = index === items.length - 1;

  const name_en = isRoutineItem(item) ? item.action_en : item.name_en;
  const name_ml = isRoutineItem(item) ? item.action_ml : item.name_ml;
  const sound = !isRoutineItem(item) ? (item as ContentItem).sound : undefined;

  const goNext = () => {
    if (isLast) {
      setShowCelebration(true);
    } else {
      setIndex((i) => i + 1);
    }
  };

  return (
    <div className="min-h-screen bg-bg-soft flex flex-col">
      <div className="bg-module-addition text-white px-4 md:px-8 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
        <button onClick={onBack} className="text-white text-2xl font-bold opacity-80 hover:opacity-100 min-h-0 min-w-0 px-3 py-2">
          ← Back
        </button>
        <h1 className="font-display font-black text-3xl">
           {title_en} / {title_ml}
        </h1>
        <div className="w-24" />
      </div>

      <div className="px-8 py-4">
        <ProgressBar current={index + 1} total={items.length} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 gap-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            className="flex flex-col items-center gap-6 w-full max-w-xl text-center"
          >
            {/* Emoji / image */}
            {/* Image with emoji fallback */}
            <LessonImage
              src={item.image}
              emoji={item.emoji}
              alt={name_en}
              size="lg"
              animate={true}
            />

            <p className="text-5xl font-display font-black text-gray-800">{name_en}</p>
            <p className="text-4xl malayalam font-display font-bold text-gray-500">{name_ml}</p>

            <div className="flex gap-4 flex-wrap justify-center mt-2">
              {sound && showAnimalSound && (
                <AudioButton src={sound} label="🔊 Animal Sound" lang="en" />
              )}
              <AudioButton src={item.audio_en} label="🔊 English" lang="en" />
              <AudioButton src={item.audio_ml} label="🔊 മലയാളം" lang="ml" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-8 py-6 border-t border-gray-200 bg-white ">
        <NavControls
          onPrev={() => index > 0 && setIndex((i) => i - 1)}
          onNext={goNext}
          onRepeat={() => setIndex(index)}
          hasPrev={index > 0}
          hasNext={true}
          nextLabel={isLast ? "Finish ✅" : "Next ▶"}
        />
      </div>

      <Celebration
        show={showCelebration}
        type="module"
        onDone={() => { setShowCelebration(false); onBack(); }}
      />
    </div>
  );
}
