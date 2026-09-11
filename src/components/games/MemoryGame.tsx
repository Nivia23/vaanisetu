"use client";

import React, { useState, useEffect } from "react";
import { useGame } from "@/context/GameContext";
import { MEMORY_LEVELS } from "@/lib/data";
import { Sparkles, Eye, Check, X, RotateCw, ArrowRight, BrainCircuit } from "lucide-react";

export default function MemoryGame() {
  const { addXP, recordAnswer, playSound } = useGame();
  
  const [levelIndex, setLevelIndex] = useState(0);
  const [stage, setStage] = useState<"memorize" | "recall" | "result">("memorize");
  const [timerCount, setTimerCount] = useState(5);
  const [userSequence, setUserSequence] = useState<string[]>([]);
  const [availableChoices, setAvailableChoices] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentLevel = MEMORY_LEVELS[levelIndex % MEMORY_LEVELS.length];

  const startLevel = (lvlIdx: number) => {
    const lvl = MEMORY_LEVELS[lvlIdx % MEMORY_LEVELS.length];
    setStage("memorize");
    setTimerCount(lvl.timeSeconds);
    setUserSequence([]);
    setIsCorrect(false);

    // Shuffled choices for recall stage
    const shuffled = [...lvl.words].sort(() => Math.random() - 0.5);
    setAvailableChoices(shuffled);
  };

  useEffect(() => {
    startLevel(levelIndex);
  }, [levelIndex]);

  // Countdown timer for memorization stage
  useEffect(() => {
    if (stage !== "memorize") return;
    
    if (timerCount <= 0) {
      setStage("recall");
      return;
    }

    const interval = setInterval(() => {
      setTimerCount(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [stage, timerCount]);

  const handleChipClick = (word: string) => {
    playSound("click");
    const nextSeq = [...userSequence, word];
    setUserSequence(nextSeq);

    // If completed sequence length, check immediately
    if (nextSeq.length === currentLevel.words.length) {
      const correct = nextSeq.every((w, idx) => w === currentLevel.words[idx]);
      setIsCorrect(correct);
      setStage("result");

      if (correct) {
        playSound("success");
        addXP(25);
        recordAnswer(true);
      } else {
        playSound("error");
        recordAnswer(false);
      }
    }
  };

  const handleUndo = () => {
    playSound("click");
    setUserSequence(prev => prev.slice(0, -1));
  };

  const handleNextLevel = () => {
    playSound("click");
    setLevelIndex(prev => prev + 1);
  };

  const handleRetry = () => {
    playSound("click");
    startLevel(levelIndex);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      
      {/* Level Header */}
      <div className="flex items-center justify-between bg-[#fffaf2] p-4 rounded-2xl border border-[#eadfca]">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-[#155c48]" />
          <div>
            <span className="text-xs font-bold text-[#ff7043] uppercase tracking-wider">
              Memory Challenge • Level {levelIndex + 1}
            </span>
            <h3 className="text-base font-extrabold text-[#173f35]">
              {stage === "memorize" ? "Memorize the Sequence!" : stage === "recall" ? "Recreate in Exact Order" : "Challenge Results"}
            </h3>
          </div>
        </div>

        <span className="flex items-center gap-1 text-xs font-bold bg-[#fff0d5] text-[#8a4c00] border border-[#ffcf70] px-3 py-1.5 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-[#ff7043]" />
          +25 XP
        </span>
      </div>

      {/* Main Gameplay Screen */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#eadfca] shadow-md text-center space-y-6">
        
        {/* STAGE 1: MEMORIZE */}
        {stage === "memorize" && (
          <div className="space-y-6 py-4">
            <div className="flex items-center justify-center gap-2 text-sm font-extrabold text-[#ff7043]">
              <Eye className="w-4 h-4" />
              <span>Memorize before timer ends: <strong className="text-xl">{timerCount}s</strong></span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {currentLevel.words.map((word, idx) => (
                <div
                  key={idx}
                  className="px-5 py-3.5 rounded-2xl bg-[#d9f3e9] text-[#155c48] font-black text-lg sm:text-xl border-2 border-[#155c48]/20 shadow-sm animate-scale-in"
                >
                  <span className="text-xs text-[#5e7068] block font-bold mb-0.5">#{idx + 1}</span>
                  {word}
                </div>
              ))}
            </div>

            <button
              onClick={() => setStage("recall")}
              className="px-6 py-2.5 rounded-xl bg-[#155c48] hover:bg-[#0f4234] text-white font-bold text-xs shadow-xs transition-all"
            >
              I Got It! Test Me Now →
            </button>
          </div>
        )}

        {/* STAGE 2: RECALL */}
        {stage === "recall" && (
          <div className="space-y-6 py-2">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#5e7068]">
                Your Assembled Order ({userSequence.length}/{currentLevel.words.length}):
              </span>
              
              <div className="min-h-[60px] mt-2 bg-[#fffaf2] border-2 border-dashed border-[#155c48]/30 rounded-2xl p-3 flex flex-wrap items-center justify-center gap-2">
                {userSequence.length === 0 ? (
                  <span className="text-xs font-semibold text-[#5e7068]/60 italic">
                    Tap the cards below in the order you memorized
                  </span>
                ) : (
                  userSequence.map((word, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-xl bg-[#155c48] text-white font-bold text-sm shadow-xs animate-scale-in"
                    >
                      {idx + 1}. {word}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Available options */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#5e7068] block">Select words:</span>
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                {availableChoices.map((word, idx) => {
                  const usedCount = userSequence.filter(w => w === word).length;
                  const totalCount = currentLevel.words.filter(w => w === word).length;
                  const isExhausted = usedCount >= totalCount;

                  return (
                    <button
                      key={idx}
                      disabled={isExhausted}
                      onClick={() => handleChipClick(word)}
                      className={`px-4 py-3 rounded-2xl font-black text-sm sm:text-base transition-all ${
                        isExhausted
                          ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed opacity-50"
                          : "bg-white border-2 border-[#ffcf70] hover:border-[#ff7043] text-[#173f35] hover:bg-[#fff0d5] shadow-xs hover:-translate-y-0.5"
                      }`}
                    >
                      {word}
                    </button>
                  );
                })}
              </div>
            </div>

            {userSequence.length > 0 && (
              <button
                onClick={handleUndo}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#5e7068] hover:text-[#ff7043] transition-colors"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Undo last selection</span>
              </button>
            )}
          </div>
        )}

        {/* STAGE 3: RESULT */}
        {stage === "result" && (
          <div className="space-y-6 py-4 animate-fade-in">
            <div 
              className={`p-6 rounded-3xl border-2 flex flex-col items-center justify-center gap-2 ${
                isCorrect 
                  ? "bg-emerald-50 border-emerald-300 text-emerald-900" 
                  : "bg-rose-50 border-rose-300 text-rose-900"
              }`}
            >
              {isCorrect ? (
                <>
                  <div className="p-3 bg-emerald-100 text-emerald-700 rounded-full">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-black">Phenomenal Memory! (+25 XP)</h4>
                  <p className="text-xs text-emerald-800 font-medium">
                    You recalled every single word in perfect order!
                  </p>
                </>
              ) : (
                <>
                  <div className="p-3 bg-rose-100 text-rose-700 rounded-full">
                    <X className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-black">Close Attempt!</h4>
                  <p className="text-xs text-rose-800 font-medium">
                    The correct order was: <strong>{currentLevel.words.join(" → ")}</strong>
                  </p>
                </>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleRetry}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-[#eadfca] hover:bg-[#fff0d5] text-[#173f35] font-bold text-sm shadow-xs transition-all"
              >
                <RotateCw className="w-4 h-4" />
                <span>Retry Level</span>
              </button>

              <button
                onClick={handleNextLevel}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#155c48] hover:bg-[#0f4234] text-white font-bold text-sm shadow-md transition-all"
              >
                <span>Next Challenge</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
