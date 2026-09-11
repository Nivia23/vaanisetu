"use client";

import React, { useState } from "react";
import { useGame } from "@/context/GameContext";
import { QUIZ_QUESTIONS, QuizQuestion } from "@/lib/data";
import { Trophy, Sparkles, Check, X, ArrowRight, RotateCw, BookOpen } from "lucide-react";

export default function BrainBattleQuiz() {
  const { addXP, recordAnswer, playSound, triggerConfetti } = useGame();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIndex] || QUIZ_QUESTIONS[0];

  const handleSelectAnswer = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswer(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      playSound("success");
      addXP(currentQ.xpReward);
      setQuizScore(prev => prev + 1);
      recordAnswer(true);
    } else {
      playSound("error");
      recordAnswer(false);
    }
  };

  const handleNext = () => {
    playSound("click");
    if (currentIndex + 1 >= QUIZ_QUESTIONS.length) {
      setIsCompleted(true);
      playSound("levelup");
      triggerConfetti();
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  const handleRestart = () => {
    playSound("click");
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setQuizScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      
      {/* Quiz Top Header */}
      <div className="flex items-center justify-between bg-[#fffaf2] p-4 rounded-2xl border border-[#eadfca]">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <div>
            <span className="text-xs font-bold text-[#ff7043] uppercase tracking-wider">
              Daily Challenge {!isCompleted && `• Question ${currentIndex + 1} of ${QUIZ_QUESTIONS.length}`}
            </span>
            <h3 className="text-base font-extrabold text-[#173f35]">
              Brain Battle Quiz
            </h3>
          </div>
        </div>

        <span className="flex items-center gap-1 text-xs font-bold bg-[#fff0d5] text-[#8a4c00] border border-[#ffcf70] px-3 py-1.5 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-[#ff7043]" />
          +{currentQ.xpReward} XP per correct
        </span>
      </div>

      {/* Main Quiz Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#eadfca] shadow-md text-left space-y-6">
        
        {!isCompleted ? (
          <>
            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#155c48] to-[#ff7043] transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-[#155c48] uppercase tracking-wider">
                {currentQ.difficulty} Question
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-[#173f35] leading-snug">
                {currentQ.question}
              </h4>
            </div>

            {/* Answer Options */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt, idx) => {
                let btnStyle = "bg-[#fffaf2] border-[#eadfca] text-[#173f35] hover:bg-[#fff0d5] hover:border-[#ffcf70]";

                if (isAnswered) {
                  if (idx === currentQ.correctIndex) {
                    btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-black ring-2 ring-emerald-400";
                  } else if (idx === selectedAnswer) {
                    btnStyle = "bg-rose-50 border-rose-500 text-rose-950 font-bold opacity-85";
                  } else {
                    btnStyle = "bg-gray-50 border-gray-200 text-gray-400 opacity-50";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectAnswer(idx)}
                    className={`w-full p-4 rounded-2xl border-2 font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && idx === currentQ.correctIndex && (
                      <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    )}
                    {isAnswered && idx === selectedAnswer && idx !== currentQ.correctIndex && (
                      <X className="w-5 h-5 text-rose-600 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation & Next Trigger */}
            {isAnswered && (
              <div className="space-y-4 pt-2 animate-fade-in">
                <div className="bg-[#fff4d8] border border-[#ffe0a6] rounded-2xl p-4 text-xs font-semibold text-[#8a4c00] flex items-start gap-2.5">
                  <BookOpen className="w-4 h-4 text-[#ff7043] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-[#173f35] mb-0.5">Did You Know?</strong>
                    <span>{currentQ.explanation}</span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-[#155c48] hover:bg-[#0f4234] text-white font-bold text-sm shadow-md transition-all"
                  >
                    <span>{currentIndex + 1 === QUIZ_QUESTIONS.length ? "Finish Quiz" : "Next Question"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* COMPLETION SUMMARY */
          <div className="py-8 text-center space-y-6 animate-fade-in">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-[#ffcf70] to-[#ff7043] flex items-center justify-center text-4xl shadow-lg">
              🏆
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl font-black text-[#155c48]">
                Battle Complete!
              </h3>
              <p className="text-base text-[#5e7068] font-medium">
                You scored <strong className="text-[#ff7043]">{quizScore}</strong> out of <strong>{QUIZ_QUESTIONS.length}</strong> questions!
              </p>
            </div>

            <div className="inline-flex items-center gap-2 bg-[#fff0d5] text-[#8a4c00] border border-[#ffcf70] px-6 py-2.5 rounded-full font-black text-sm">
              <Sparkles className="w-4 h-4 text-[#ff7043]" />
              <span>+{quizScore * 15} Total XP Earned</span>
            </div>

            <div className="pt-4">
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#155c48] hover:bg-[#0f4234] text-white font-black text-sm shadow-md transition-all"
              >
                <RotateCw className="w-4 h-4" />
                <span>Play Quiz Again</span>
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
