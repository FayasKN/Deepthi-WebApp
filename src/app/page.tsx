"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MODULES, Module, ModuleId } from "@/data/modules";
import AlphabetModule from "@/components/modules/AlphabetModule";
import NumbersModule from "@/components/modules/NumbersModule";
import GenericModule from "@/components/modules/GenericModule";
import { animalsData, plantsData, routineData, mannersData } from "@/data/modules";

export default function Home() {
  const [activeModule, setActiveModule] = useState<ModuleId | null>(null);

  const handleBack = () => setActiveModule(null);

  // Render active module
  if (activeModule === "alphabet") return <AlphabetModule onBack={handleBack} />;
  if (activeModule === "numbers") return <NumbersModule onBack={handleBack} />;
  if (activeModule === "animals") return (
    <GenericModule
      title_en="Animals" title_ml="മൃഗങ്ങൾ" emoji="🐘"
      color="bg-module-animals" items={animalsData}
      onBack={handleBack} showAnimalSound
    />
  );
  if (activeModule === "plants") return (
    <GenericModule
      title_en="Plants" title_ml="സസ്യങ്ങൾ" emoji="🌿"
      color="bg-module-plants" items={plantsData}
      onBack={handleBack}
    />
  );
  if (activeModule === "routine") return (
    <GenericModule
      title_en="Daily Routine" title_ml="ദൈനദിന ദിനചര്യ" emoji="🚿"
      color="bg-module-routine" items={routineData}
      onBack={handleBack}
    />
  );
  if (activeModule === "manners") return (
    <GenericModule
      title_en="Good Manners" title_ml="നല്ല മര്യാദ" emoji="🙏"
      color="bg-module-manners" items={mannersData}
      onBack={handleBack}
    />
  );

  // Home screen
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm px-8 py-6 text-center">
        <motion.h1
          className="font-display font-black text-5xl text-gray-800 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🌟 Deepthi Learning Hub
        </motion.h1>
        <motion.p
          className="text-2xl text-gray-500 mt-2 malayalam"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          ദീപ്തി ലേണിങ് ഹബ്
        </motion.p>
        <p className="text-lg text-gray-400 mt-1 font-body">
          Teacher: Select Today&apos;s Activity
        </p>
      </header>

      {/* Module Grid */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {MODULES.map((mod, i) => (
            <ModuleCard
              key={mod.id}
              module={mod}
              index={i}
              onClick={() => setActiveModule(mod.id)}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-gray-400 text-sm font-body">
        Deepthi Society for Differently-Abled — Shared Classroom Screen
      </footer>
    </main>
  );
}

function ModuleCard({ module, index, onClick }: { module: Module; index: number; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.96 }}
      className={`
        ${module.color} ${module.textColor}
        rounded-xl3 p-8 flex flex-col items-center gap-4
        shadow-lg hover:shadow-xl transition-shadow
        min-h-[180px] w-full
      `}
    >
      <span className="text-7xl">{module.emoji}</span>
      <div className="text-center">
        <p className="font-display font-black text-2xl leading-tight">{module.title_en}</p>
        <p className="font-display font-bold text-xl opacity-85 malayalam mt-1">{module.title_ml}</p>
      </div>
    </motion.button>
  );
}
