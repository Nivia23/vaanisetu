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
  Sparkles, 
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
      color: "from-amber-400 to-orange-500",
      accent: "text-orange-500",
      xp: "+10 XP"
    },
    {
      id: "scramble",
      title: "Word Scramble",
      badge: "Anagrams",
      desc: "Unscramble letter tiles and discover mystery words.",
      icon: Puzzle,
      color: "from-emerald-400 to-teal-600",
      accent: "text-emerald-500",
      xp: "+15 XP"
    },
    {
      id: "match",
      title: "Match Game",
      badge: "Meanings",
      desc: "Connect words with their definitions and native scripts.",
      icon: Target,
      color: "from-blue-400 to-indigo-600",
      accent: "text-blue-500",
      xp: "+15 XP"
    },
    {
      id: "memory",
      title: "Memory Matrix",
      badge: "Recall",
      desc: "Memorize word sequences and beat your high scores.",
      icon: BrainCircuit,
      color: "from-purple-400 to-pink-600",
      accent: "text-purple-500",
      xp: "+25 XP"
    },
    {
      id: "rapid",
      title: "Rapid Fire",
      badge: "30s Rush",
      desc: "Answer rapid trivia questions before the clock runs out.",
      icon: Zap,
      color: "from-orange-500 to-red-600",
      accent: "text-red-500",
      xp: "+5 XP / Q"
    },
    {
      id: "quiz",
      title: "Brain Battle",
      badge: "Daily Quiz",
      desc: "Test your linguistic knowledge with curated challenges.",
      icon: Trophy,
      color: "from-yellow-400 to-amber-600",
      accent: "text-amber-500",
      xp: "+15 XP"
    }
  ];

  return (
    <section id="games" className="py-16 bg-[#fff0d5]/40 border-y border-[#eadfca]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-[#ffe0a6] text-[#8a4c00] border border-[#ffcf70] px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider">
            <Gamepad2 className="w-4 h-4 text-[#ff7043]" />
            <span>Learning Arcade</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#173f35] tracking-tight">
            Choose Your Learning Adventure
          </h2>
          <p className="text-sm sm:text-base text-[#5e7068] font-medium">
            Interactive, bite-sized language games designed to keep your mind sharp and your streak burning.
          </p>
        </div>

        {/* Game Navigation Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
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
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  isActive
                    ? "bg-[#155c48] text-white border-[#155c48] shadow-lg scale-102 -translate-y-1"
                    : "bg-white hover:bg-[#fff0d5]/60 text-[#173f35] border-[#eadfca] shadow-2xs hover:-translate-y-0.5"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div className={`p-2 rounded-xl ${isActive ? "bg-white/15 text-white" : "bg-[#fff0d5] " + game.accent}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                    isActive ? "bg-white/20 text-[#ffcf70]" : "bg-gray-100 text-[#5e7068]"
                  }`}>
                    {game.xp}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black tracking-tight line-clamp-1">
                    {game.title}
                  </h4>
                  <span className={`text-[10px] font-semibold ${isActive ? "text-emerald-200" : "text-[#5e7068]"}`}>
                    {game.badge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Game Container */}
        <div className="pt-2">
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
