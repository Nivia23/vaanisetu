"use client";

import React, { useState, useEffect } from "react";
import { useGame } from "@/context/GameContext";
import { MATCH_PAIRS_DATA, MatchPair } from "@/lib/data";
import { Sparkles, Check, X, ArrowRight, RotateCcw, Volume2 } from "lucide-react";

export default function MatchGame() {
  const { addXP, recordAnswer, playSound, speak } = useGame();
  
  const [round, setRound] = useState(0);
  const [currentWord, setCurrentWord] = useState<MatchPair>(MATCH_PAIRS_DATA[0]);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [streakCount, setStreakCount] = useState(0);

  const initRound = (index: number) => {
    const pair = MATCH_PAIRS_DATA[index % MATCH_PAIRS_DATA.length];
    setCurrentWord(pair);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);

    // Create 3 choices: 1 correct, 2 random distractors
    const otherMeanings = MATCH_PAIRS_DATA
      .filter(p => p.id !== pair.id)
      .map(p => p.meaning)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);

    const allChoices = [pair.meaning, ...otherMeanings].sort(() => Math.random() - 0.5);
    setOptions(allChoices);
  };

  useEffect(() => {
    initRound(round);
  }, [round]);

  const handleSelectOption = (opt: string) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    if (opt === currentWord.meaning) {
      playSound("success");
      const comboBonus = streakCount > 2 ? 5 : 0;
      addXP(15 + comboBonus);
      recordAnswer(true);
      setIsCorrect(true);
      setStreakCount(prev => prev + 1);
    } else {
      playSound("error");
      recordAnswer(false);
      setIsCorrect(false);
      setStreakCount(0);
    }
  };

  const handleNext = () => {
    playSound("click");
    setRound(prev => prev + 1);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between bg-[#fffaf2] p-4 rounded-2xl border border-[#eadfca]">
        <div>
          <span className="text-xs font-bold text-[#155c48] uppercase tracking-wider">
            Round {round + 1}
          </span>
          <h3 className="text-base font-extrabold text-[#173f35]">
            Match the Correct Meaning
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {streakCount > 1 && (
            <span className="text-xs font-bold bg-[#ff7043] text-white px-2.5 py-1 rounded-full animate-bounce">
              🔥 {streakCount} Combo!
            </span>
          )}
          <span className="flex items-center gap-1 text-xs font-bold bg-[#fff0d5] text-[#8a4c00] border border-[#ffcf70] px-3 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#ff7043]" />
            +15 XP
          </span>
        </div>
      </div>

      {/* Main Focus Word Card */}
      <div className="bg-white rounded-3xl p-8 border border-[#eadfca] shadow-md text-center space-y-6">
        
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5e7068]">
            Target Vocabulary Word
          </span>
          
          <div className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#fff0d5] to-[#fffaf2] border-2 border-[#ffcf70] px-8 py-5 rounded-3xl shadow-sm">
            <span className="text-4xl sm:text-5xl font-black text-[#155c48] tracking-tight">
              {currentWord.word}
            </span>
            <button
              onClick={() => {
                playSound("click");
                speak(currentWord.word);
              }}
              title="Pronounce word"
              className="p-2 rounded-xl bg-white text-[#155c48] hover:text-[#ff7043] shadow-xs border border-[#eadfca] transition-colors"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-[#5e7068] font-medium pt-1">
            Indian Script Equivalents: <strong className="text-[#173f35]">{currentWord.nativeWord}</strong>
          </p>
        </div>

        {/* Meaning Options List */}
        <div className="space-y-3 pt-2">
          <p className="text-xs font-extrabold uppercase tracking-wider text-[#5e7068] text-left">
            Select the matching definition:
          </p>

          <div className="grid grid-cols-1 gap-3">
            {options.map((opt, idx) => {
              let btnStyle = "bg-[#fffaf2] border-[#eadfca] text-[#173f35] hover:bg-[#fff0d5] hover:border-[#ffcf70]";

              if (isAnswered) {
                if (opt === currentWord.meaning) {
                  btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-black shadow-sm ring-2 ring-emerald-400";
                } else if (opt === selectedOption) {
                  btnStyle = "bg-rose-50 border-rose-500 text-rose-900 font-bold opacity-80";
                } else {
                  btnStyle = "bg-gray-50 border-gray-200 text-gray-400 opacity-50";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(opt)}
                  className={`w-full p-4 rounded-2xl border-2 text-left font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && opt === currentWord.meaning && (
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  )}
                  {isAnswered && opt === selectedOption && opt !== currentWord.meaning && (
                    <X className="w-5 h-5 text-rose-600 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Result Action Bar */}
        {isAnswered && (
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in">
            <span className={`text-sm font-black ${isCorrect ? "text-emerald-700" : "text-rose-600"}`}>
              {isCorrect ? "🎯 Perfect Match! (+15 XP)" : "❌ Incorrect. The right answer is highlighted in green."}
            </span>

            <button
              onClick={handleNext}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#155c48] hover:bg-[#0f4234] text-white font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <span>Next Match</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
