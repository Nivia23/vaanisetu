"use client";

import React, { useState, useEffect } from "react";
import { useGame } from "@/context/GameContext";
import { PUZZLES_DATA, PuzzleItem } from "@/lib/data";
import { 
  Sparkles, 
  HelpCircle, 
  RotateCw, 
  Check, 
  X, 
  ArrowRight,
  Lightbulb
} from "lucide-react";

export default function WordScrambleGame() {
  const { addXP, recordAnswer, playSound } = useGame();
  
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [currentPuzzle, setCurrentPuzzle] = useState<PuzzleItem>(PUZZLES_DATA[0]);
  const [selectedLetters, setSelectedLetters] = useState<{ char: string; originalIndex: number }[]>([]);
  const [availableLetters, setAvailableLetters] = useState<{ char: string; index: number; used: boolean }[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [resultState, setResultState] = useState<"idle" | "correct" | "wrong">("idle");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const initPuzzle = (item: PuzzleItem) => {
    setCurrentPuzzle(item);
    const chars = item.scrambled.split("").map((char, index) => ({
      char,
      index,
      used: false
    }));
    setAvailableLetters(chars);
    setSelectedLetters([]);
    setInputVal("");
    setShowHint(false);
    setResultState("idle");
    setFeedbackMsg("");
  };

  useEffect(() => {
    initPuzzle(PUZZLES_DATA[puzzleIndex % PUZZLES_DATA.length]);
  }, [puzzleIndex]);

  const handleTileClick = (letterObj: { char: string; index: number; used: boolean }) => {
    if (letterObj.used) return;
    playSound("click");

    const newSelected = [...selectedLetters, { char: letterObj.char, originalIndex: letterObj.index }];
    setSelectedLetters(newSelected);
    setInputVal(newSelected.map(s => s.char).join(""));

    setAvailableLetters(prev =>
      prev.map(item => item.index === letterObj.index ? { ...item, used: true } : item)
    );
  };

  const handleRemoveSelected = (selIndex: number) => {
    playSound("click");
    const itemToRemove = selectedLetters[selIndex];
    const newSelected = selectedLetters.filter((_, idx) => idx !== selIndex);
    setSelectedLetters(newSelected);
    setInputVal(newSelected.map(s => s.char).join(""));

    setAvailableLetters(prev =>
      prev.map(item => item.index === itemToRemove.originalIndex ? { ...item, used: false } : item)
    );
  };

  const handleResetLetters = () => {
    playSound("click");
    setSelectedLetters([]);
    setInputVal("");
    setAvailableLetters(prev => prev.map(item => ({ ...item, used: false })));
    setResultState("idle");
    setFeedbackMsg("");
  };

  const handleCheckAnswer = () => {
    const finalAnswer = (inputVal || selectedLetters.map(s => s.char).join("")).trim().toUpperCase();

    if (!finalAnswer) return;

    if (finalAnswer === currentPuzzle.word.toUpperCase()) {
      playSound("success");
      const xpEarned = showHint ? Math.max(5, currentPuzzle.xpReward - 5) : currentPuzzle.xpReward;
      addXP(xpEarned);
      recordAnswer(true);
      setResultState("correct");
      setFeedbackMsg(`🎉 Splendid! You solved '${currentPuzzle.word}' and earned +${xpEarned} XP!`);
    } else {
      playSound("error");
      recordAnswer(false);
      setResultState("wrong");
      setFeedbackMsg("❌ Not quite the right word. Try unscrambling again or use a hint!");
    }
  };

  const handleNextWord = () => {
    playSound("click");
    setPuzzleIndex(prev => prev + 1);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      
      {/* Header Info */}
      <div className="flex items-center justify-between bg-[#fffaf2] p-4 rounded-2xl border border-[#eadfca]">
        <div>
          <span className="text-xs font-bold text-[#ff7043] uppercase tracking-wider">
            Puzzle { (puzzleIndex % PUZZLES_DATA.length) + 1 } / { PUZZLES_DATA.length }
          </span>
          <h3 className="text-base font-extrabold text-[#173f35]">
            Unscramble the Word
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-bold bg-[#fff0d5] text-[#8a4c00] border border-[#ffcf70] px-3 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#ff7043]" />
            +{currentPuzzle.xpReward} XP
          </span>
        </div>
      </div>

      {/* Main Puzzle Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#eadfca] shadow-md text-center space-y-6">
        
        {/* Scrambled Visual Container */}
        <div className="space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#5e7068]">
            Click letters to spell the word
          </span>

          {/* Letter Slots / Constructed Word Area */}
          <div className="min-h-[64px] bg-[#fffaf2] border-2 border-dashed border-[#155c48]/30 rounded-2xl p-3 flex flex-wrap items-center justify-center gap-2.5">
            {selectedLetters.length === 0 ? (
              <span className="text-sm font-semibold text-[#5e7068]/60 italic">
                Tap the letter tiles below or type
              </span>
            ) : (
              selectedLetters.map((sel, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRemoveSelected(idx)}
                  className="w-11 h-12 rounded-xl bg-[#155c48] text-white font-black text-xl shadow-md hover:bg-red-600 transition-colors flex items-center justify-center animate-scale-in"
                  title="Click to remove letter"
                >
                  {sel.char}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Available Scrambled Tiles */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 py-2">
          {availableLetters.map((tile) => (
            <button
              key={tile.index}
              disabled={tile.used}
              onClick={() => handleTileClick(tile)}
              className={`w-12 h-14 sm:w-14 sm:h-16 rounded-2xl font-black text-2xl shadow-md transition-all duration-150 flex items-center justify-center ${
                tile.used
                  ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed scale-95 opacity-50"
                  : "bg-gradient-to-b from-[#ffcf70] to-[#ff7043] text-white hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
              }`}
            >
              {tile.char}
            </button>
          ))}
        </div>

        {/* Optional Manual Input */}
        <div className="max-w-md mx-auto flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value.toUpperCase())}
            placeholder="Or type word here..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#eadfca] bg-[#fffaf2] text-[#173f35] font-bold text-center uppercase tracking-widest focus:outline-none focus:border-[#ff7043]"
          />
          <button
            onClick={handleResetLetters}
            title="Reset letters"
            className="p-2.5 rounded-xl border border-[#eadfca] bg-white text-[#5e7068] hover:bg-[#fff0d5] hover:text-[#ff7043] transition-colors"
          >
            <RotateCw className="w-5 h-5" />
          </button>
        </div>

        {/* Hint Box */}
        {showHint ? (
          <div className="bg-[#fff4d8] border border-[#ffe0a6] rounded-2xl p-4 text-xs font-bold text-[#8a4c00] flex items-center justify-center gap-2 animate-fade-in">
            <Lightbulb className="w-4 h-4 text-[#ff7043] flex-shrink-0" />
            <span>Hint: {currentPuzzle.hint} ({currentPuzzle.word.length} letters)</span>
          </div>
        ) : (
          <button
            onClick={() => {
              playSound("click");
              setShowHint(true);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#155c48] hover:text-[#ff7043] transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Need a clue? Reveal Hint (-5 XP penalty)</span>
          </button>
        )}

        {/* Feedback Message */}
        {resultState !== "idle" && (
          <div 
            className={`p-4 rounded-2xl text-sm font-extrabold flex items-center justify-center gap-2 ${
              resultState === "correct" 
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200" 
                : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}
          >
            {resultState === "correct" ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {resultState !== "correct" ? (
            <button
              onClick={handleCheckAnswer}
              className="px-8 py-3.5 rounded-2xl bg-[#ff7043] hover:bg-[#e65100] text-white font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNextWord}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#155c48] hover:bg-[#0f4234] text-white font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <span>Next Scramble</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
