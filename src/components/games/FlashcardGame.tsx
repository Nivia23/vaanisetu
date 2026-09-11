"use client";

import React, { useState } from "react";
import { useGame } from "@/context/GameContext";
import { FLASHCARDS_DATA, FlashcardItem } from "@/lib/data";
import { 
  Volume2, 
  RotateCw, 
  CheckCircle2, 
  RefreshCcw, 
  Sparkles, 
  Layers,
  ChevronLeft,
  ChevronRight,
  Globe
} from "lucide-react";

export default function FlashcardGame() {
  const { addXP, recordAnswer, playSound, speak } = useGame();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedTargetLang, setSelectedTargetLang] = useState<keyof FlashcardItem["translations"]>("Hindi");

  const categories = ["All", "Basics", "School", "Nature", "Everyday", "Animals"];

  const filteredCards = selectedCategory === "All"
    ? FLASHCARDS_DATA
    : FLASHCARDS_DATA.filter(c => c.category === selectedCategory);

  const card = filteredCards[currentIndex % filteredCards.length] || FLASHCARDS_DATA[0];

  const handleFlip = () => {
    playSound("flip");
    setIsFlipped(!isFlipped);
  };

  const handleAnswer = (gotIt: boolean) => {
    if (gotIt) {
      playSound("success");
      addXP(10);
      recordAnswer(true);
    } else {
      playSound("click");
      recordAnswer(false);
    }

    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handleNext = () => {
    playSound("click");
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    playSound("click");
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4 sm:space-y-6">
      
      {/* Category Pills & Language Selector */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 bg-[#fffaf2] p-2.5 sm:p-3.5 rounded-2xl border border-[#eadfca]">
        <div className="flex flex-wrap items-center gap-1">
          <span className="text-[11px] sm:text-xs font-bold text-[#5e7068] mr-1 flex items-center gap-1">
            <Layers className="w-3 h-3 text-[#155c48]" />
            Topic:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playSound("click");
                setSelectedCategory(cat);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? "bg-[#155c48] text-white shadow-2xs"
                  : "bg-white text-[#173f35] border border-[#eadfca] hover:bg-[#fff0d5]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Target Translation Language Selector */}
        <div className="flex items-center gap-1.5 justify-between sm:justify-end pt-1 sm:pt-0 border-t sm:border-t-0 border-[#eadfca]/60">
          <span className="text-[11px] font-bold text-[#5e7068] sm:hidden flex items-center gap-1">
            <Globe className="w-3 h-3 text-[#ff7043]" /> Language:
          </span>
          <select
            value={selectedTargetLang}
            onChange={(e) => {
              playSound("click");
              setSelectedTargetLang(e.target.value as keyof FlashcardItem["translations"]);
            }}
            className="text-xs font-bold bg-white border border-[#eadfca] rounded-xl px-2.5 py-1.5 text-[#173f35] focus:outline-none focus:border-[#ff7043]"
          >
            <option value="Hindi">हिन्दी (Hindi)</option>
            <option value="Bengali">বাংলা (Bengali)</option>
            <option value="Odia">ଓଡ଼ିଆ (Odia)</option>
            <option value="Marathi">मराठी (Marathi)</option>
            <option value="Santali">ᱥᱟᱱᱛᱟᱲᱤ (Santali)</option>
            <option value="Tamil">தமிழ் (Tamil)</option>
            <option value="Telugu">తెలుగు (Telugu)</option>
          </select>
        </div>
      </div>

      {/* Card Counter & XP Badge */}
      <div className="flex items-center justify-between px-1 text-xs font-bold text-[#5e7068]">
        <span>Card {currentIndex + 1} of {filteredCards.length}</span>
        <span className="flex items-center gap-1 text-[#ff7043] bg-[#fff0d5] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-[#ffcf70] text-[11px] sm:text-xs">
          <Sparkles className="w-3 h-3" />
          +10 XP
        </span>
      </div>

      {/* 3D Flippable Flashcard Canvas */}
      <div 
        className="w-full min-h-[300px] sm:min-h-[360px] cursor-pointer perspective-1000 select-none"
        onClick={handleFlip}
      >
        <div 
          className={`relative w-full h-full min-h-[300px] sm:min-h-[360px] rounded-3xl transition-transform duration-500 transform-style-preserve-3d shadow-lg border-2 ${
            isFlipped ? "rotate-y-180 border-[#ff7043]/40" : "border-[#155c48]/20"
          }`}
        >
          {/* FRONT SIDE (English Word & Visuals) */}
          <div className="absolute inset-0 w-full h-full rounded-3xl p-5 sm:p-8 backface-hidden bg-gradient-to-br from-[#ffffff] via-[#fffdf9] to-[#fff4e3] flex flex-col justify-between items-center text-center border border-[#eadfca]">
            
            <div className="w-full flex items-center justify-between text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#8a4c00]">
              <span className="bg-[#ffe0a6] px-2.5 py-0.5 rounded-full">
                {card.category}
              </span>
              <span className="text-[#5e7068] flex items-center gap-1 font-semibold text-[10px] sm:text-xs">
                <RotateCw className="w-3 h-3" />
                Tap to flip
              </span>
            </div>

            <div className="my-auto space-y-2 sm:space-y-4 py-2">
              <div className="text-5xl sm:text-7xl filter drop-shadow-sm">
                {card.emoji}
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-[#155c48] tracking-tight">
                {card.word}
              </h2>
              <div className="inline-flex items-center gap-1.5 bg-[#155c48]/10 text-[#155c48] px-2.5 py-1 rounded-xl text-xs sm:text-sm font-semibold">
                <span>/{card.pronunciation}/</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playSound("click");
                    speak(card.word, "English");
                  }}
                  title="Pronounce word"
                  className="p-1 rounded-md hover:bg-[#155c48]/20 transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-[11px] sm:text-xs text-[#5e7068] font-medium italic line-clamp-1">
              &quot;{card.example}&quot;
            </p>
          </div>

          {/* BACK SIDE (Meaning & Multilingual Translation) */}
          <div className="absolute inset-0 w-full h-full rounded-3xl p-5 sm:p-8 backface-hidden rotate-y-180 bg-gradient-to-br from-[#155c48] via-[#1c785f] to-[#0f4234] text-white flex flex-col justify-between items-center text-center border border-white/20">
            
            <div className="w-full flex items-center justify-between text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#ffcf70]">
              <span className="bg-white/15 px-2.5 py-0.5 rounded-full border border-white/20">
                {selectedTargetLang}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playSound("click");
                  speak(card.translations[selectedTargetLang], selectedTargetLang);
                }}
                className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded-lg text-white text-xs transition-colors"
              >
                <Volume2 className="w-3 h-3" />
                <span>Audio</span>
              </button>
            </div>

            <div className="my-auto space-y-2 sm:space-y-4 py-2">
              <span className="text-3xl sm:text-4xl">{card.emoji}</span>
              <h3 className="text-2xl sm:text-4xl font-black text-[#ffcf70] tracking-tight">
                {card.translations[selectedTargetLang]}
              </h3>
              <p className="text-xs sm:text-base text-emerald-100 max-w-md font-medium leading-relaxed">
                {card.meaning}
              </p>
            </div>

            <div className="w-full pt-2 border-t border-white/15 text-[10px] sm:text-[11px] text-emerald-200/90 flex flex-wrap justify-center gap-x-3 gap-y-0.5">
              <span>Hindi: {card.translations.Hindi.split(" ")[0]}</span>
              <span>Bengali: {card.translations.Bengali.split(" ")[0]}</span>
              <span>Odia: {card.translations.Odia.split(" ")[0]}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Control Buttons (Navigation & Mastery Answers) */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
          <button
            onClick={handlePrev}
            className="flex-1 sm:flex-initial p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white border border-[#eadfca] hover:bg-[#fff0d5] text-[#173f35] font-bold shadow-2xs transition-all flex items-center justify-center gap-1 text-xs"
            title="Previous card"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="sm:hidden">Prev</span>
          </button>
          <button
            onClick={handleNext}
            className="flex-1 sm:flex-initial p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white border border-[#eadfca] hover:bg-[#fff0d5] text-[#173f35] font-bold shadow-2xs transition-all flex items-center justify-center gap-1 text-xs"
            title="Next card"
          >
            <span className="sm:hidden">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => handleAnswer(false)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-xs transition-all"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>Practice</span>
          </button>

          <button
            onClick={() => handleAnswer(true)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-[#155c48] hover:bg-[#0f4234] text-white font-bold text-xs sm:text-sm shadow-xs transition-all"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#ffcf70]" />
            <span>Mastered (+10)</span>
          </button>
        </div>
      </div>

    </div>
  );
}
