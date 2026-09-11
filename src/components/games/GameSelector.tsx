"use client";

import React, { useState } from "react";
import { useGame } from "@/context/GameContext";
import FlashcardGame from "./FlashcardGame";
import WordScrambleGame from "./WordScrambleGame";
import MatchGame from "./MatchGame";
import MemoryGame from "./MemoryGame";
import RapidFireGame from "./RapidFireGame";
import BrainBattleQuiz from "./BrainBattleQuiz";
import { 
  Gamepad2, 
  Layers, 
  Puzzle, 
  Target, 
  BrainCircuit, 
  Zap, 
  Trophy 
} from "lucide-react";

export default function GameSelector() {
  const { playSound } = useGame();
  const [activeTab, setActiveTab] = useState<string>("flashcards");

  const gameOptions = [
    {
      id: "flashcards",
      title: "Flashcards",
      badge: "Vocabulary",
      desc: "Flip 3D cards and master words across Indian languages.",
      icon: Layers,
      accent: "text-orange-500",
      xp: "+10 XP"
    },
    {
      id: "scramble",
      title: "Scramble",
      badge: "Anagrams",
      desc: "Unscramble letter tiles and discover mystery words.",
      icon: Puzzle,
      accent: "text-emerald-500",
      xp: "+15 XP"
    },
    {
      id: "match",
      title: "Match",
      badge: "Meanings",
      desc: "Connect words with their definitions and native scripts.",
      icon: Target,
      accent: "text-blue-500",
      xp: "+15 XP"
    },
    {
      id: "memory",
      title: "Memory",
      badge: "Recall",
      desc: "Memorize word sequences and beat your high scores.",
      icon: BrainCircuit,
      accent: "text-purple-500",
      xp: "+25 XP"
    },
    {
      id: "rapid",
      title: "Rapid Fire",
      badge: "30s Rush",
      desc: "Answer rapid trivia questions before the clock runs out.",
      icon: Zap,
      accent: "text-red-500",
      xp: "+5 XP / Q"
    },
    {
      id: "quiz",
      title: "Quiz",
      badge: "Daily Challenge",
      desc: "Test your linguistic knowledge with curated challenges.",
      icon: Trophy,
      accent: "text-amber-500",
      xp: "+15 XP"
    }
  ];

  return (
    <section id="games" className="py-8 sm:py-16 bg-[#fff0d5]/40 border-y border-[#eadfca]/60">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-[#ffe0a6] text-[#8a4c00] border border-[#ffcf70] px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-bold text-xs uppercase tracking-wider">
            <Gamepad2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ff7043]" />
            <span>Learning Arcade</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#173f35] tracking-tight">
            Choose Your Learning Adventure
          </h2>
          <p className="text-xs sm:text-base text-[#5e7068] font-medium">
            Interactive, bite-sized language games designed to keep your mind sharp and your streak burning.
          </p>
        </div>

        {/* Game Navigation Grid */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {gameOptions.map((game) => {
            const Icon = game.icon;
            const isActive = activeTab === game.id;
            return (
              <button
                key={game.id}
                onClick={() => {
                  playSound("click");
                  setActiveTab(game.id);
                }}
                className={`p-2 sm:p-3.5 rounded-xl sm:rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  isActive
                    ? "bg-[#155c48] text-white border-[#155c48] shadow-md scale-102 -translate-y-0.5"
                    : "bg-white hover:bg-[#fff0d5]/60 text-[#173f35] border-[#eadfca] shadow-2xs hover:-translate-y-0.5"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1 sm:mb-2">
                  <div className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl ${isActive ? "bg-white/15 text-white" : "bg-[#fff0d5] " + game.accent}`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className={`text-[9px] sm:text-[10px] font-extrabold uppercase px-1.5 sm:px-2 py-0.5 rounded-md hidden xs:inline ${
                    isActive ? "bg-white/20 text-[#ffcf70]" : "bg-gray-100 text-[#5e7068]"
                  }`}>
                    {game.xp}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black tracking-tight line-clamp-1">
                    {game.title}
                  </h4>
                  <span className={`text-[9px] sm:text-[10px] font-semibold hidden sm:inline ${isActive ? "text-emerald-200" : "text-[#5e7068]"}`}>
                    {game.badge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Game Container */}
        <div className="pt-1 sm:pt-2">
          {activeTab === "flashcards" && <FlashcardGame />}
          {activeTab === "scramble" && <WordScrambleGame />}
          {activeTab === "match" && <MatchGame />}
          {activeTab === "memory" && <MemoryGame />}
          {activeTab === "rapid" && <RapidFireGame />}
          {activeTab === "quiz" && <BrainBattleQuiz />}
        </div>

      </div>
    </section>
  );
}
