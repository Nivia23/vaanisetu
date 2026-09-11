"use client";

import React from "react";
import { useGame } from "@/context/GameContext";
import { BADGES_LIST } from "@/lib/data";
import { 
  BarChart3, 
  Flame, 
  Lock, 
  CheckCircle, 
  RotateCcw,
  Share2
} from "lucide-react";

export default function ProgressSection() {
  const { 
    xp, 
    level, 
    streak, 
    correctAnswers, 
    unlockedBadges, 
    resetProgress, 
    playSound, 
    triggerConfetti 
  } = useGame();

  const currentLevelXP = xp % 100;
  const xpNeeded = 100 - currentLevelXP;

  const handleBadgeClick = (isUnlocked: boolean) => {
    if (isUnlocked) {
      playSound("levelup");
      triggerConfetti();
    } else {
      playSound("error");
    }
  };

  const handleReset = () => {
    playSound("click");
    if (window.confirm("Are you sure you want to reset your learning progress? Your XP and badges will return to zero.")) {
      resetProgress();
    }
  };

  const handleShare = () => {
    playSound("click");
    if (navigator.share) {
      navigator.share({
        title: "VAANISETU Progress",
        text: `I've reached Level ${level} with ${xp} XP on VAANISETU! Bridging languages and education across India. 🌉`,
        url: window.location.href
      }).catch(() => {});
    } else {
      alert(`🎉 Share your milestone: Level ${level} with ${xp} XP on VAANISETU!`);
    }
  };

  // Weekday streak bubbles
  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];
  const fullDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const currentDayIndex = (new Date().getDay() + 6) % 7; // 0=Mon, 6=Sun

  return (
    <section id="progress" className="py-8 sm:py-16 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-[#ffe0a6] text-[#8a4c00] border border-[#ffcf70] px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-bold text-xs uppercase tracking-wider">
          <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ff7043]" />
          <span>Your Learning Odyssey</span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#173f35] tracking-tight">
          Learning Progress & Badges
        </h2>
        <p className="text-xs sm:text-base text-[#5e7068] font-medium">
          Every word you master builds another pillar on your bridge to multilingual knowledge.
        </p>
      </div>

      {/* Main Progress Overview Card */}
      <div className="bg-white rounded-3xl p-4 sm:p-10 border border-[#eadfca] shadow-lg space-y-6 sm:space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          
          {/* Circular Level Radial Hub */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center">
            <div className="relative w-36 h-36 sm:w-48 sm:h-48 flex items-center justify-center">
              
              {/* SVG Radial Gauge */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="text-gray-100"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="text-[#ff7043] transition-all duration-700 ease-out"
                  strokeWidth="8"
                  strokeDasharray={264}
                  strokeDashoffset={264 - (264 * currentLevelXP) / 100}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                />
              </svg>

              {/* Inner Center Level Counter */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-[#155c48]">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#5e7068]">Level</span>
                <span className="text-4xl sm:text-5xl font-black">{level}</span>
                <span className="text-[10px] sm:text-[11px] font-bold text-[#ff7043] mt-0.5">{currentLevelXP}%</span>
              </div>
            </div>

            <div className="mt-3 text-center">
              <span className="text-xs sm:text-sm font-black text-[#173f35] block">
                {xpNeeded} XP to Level {level + 1}
              </span>
              <span className="text-[11px] sm:text-xs text-[#5e7068]">
                Total: <strong className="text-[#ff7043]">{xp} XP</strong>
              </span>
            </div>
          </div>

          {/* Right Column: Detailed Progress & Weekly Streaks */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            
            <div className="flex flex-wrap items-center justify-between gap-2.5">
              <div>
                <h3 className="text-lg sm:text-2xl font-black text-[#155c48]">
                  Keep Going! You&apos;re doing fantastic 🚀
                </h3>
                <p className="text-xs sm:text-sm font-medium text-[#5e7068]">
                  Consistency is the secret to mastering new languages.
                </p>
              </div>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#fff0d5] text-[#8a4c00] border border-[#ffcf70] hover:bg-[#ffe0a6] text-xs font-bold transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>

            {/* Linear Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] sm:text-xs font-bold text-[#5e7068]">
                <span>Level {level} Milestone</span>
                <span>Level {level + 1}</span>
              </div>
              <div className="w-full h-2.5 sm:h-3 rounded-full bg-gray-100 overflow-hidden p-0.5 border border-[#eadfca]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#155c48] via-[#27916f] to-[#ff7043] transition-all duration-500"
                  style={{ width: `${Math.max(5, currentLevelXP)}%` }}
                />
              </div>
            </div>

            {/* Weekly Practice Tracker */}
            <div className="bg-[#fffaf2] rounded-2xl p-3 sm:p-4 border border-[#eadfca] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] sm:text-xs font-extrabold uppercase text-[#173f35] flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-[#ff7043] fill-[#ff7043]" />
                  <span>7-Day Active Habit Tracker</span>
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-[#ff7043]">
                  {streak} Days Active
                </span>
              </div>

              <div className="grid grid-cols-7 gap-1 sm:gap-2 pt-0.5">
                {daysOfWeek.map((dayLetter, idx) => {
                  const isCurrent = idx === currentDayIndex;
                  const isCompletedDay = idx <= currentDayIndex && streak > (currentDayIndex - idx);
                  return (
                    <div
                      key={idx}
                      className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-center border transition-all ${
                        isCompletedDay
                          ? "bg-gradient-to-b from-[#ffcf70] to-[#ff7043] text-white border-transparent shadow-2xs"
                          : isCurrent
                          ? "bg-white border-[#ff7043] text-[#ff7043] font-black"
                          : "bg-white border-[#eadfca] text-gray-400"
                      }`}
                    >
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold block">
                        <span className="sm:hidden">{dayLetter}</span>
                        <span className="hidden sm:inline">{fullDays[idx]}</span>
                      </span>
                      <span className="text-[10px] sm:text-xs font-black">
                        {isCompletedDay ? "✓" : isCurrent ? "•" : "—"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

        {/* Badges & Achievements Shelf */}
        <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-6 border-t border-[#eadfca]">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base sm:text-lg font-black text-[#173f35]">
                Unlocked Badges & Honors
              </h4>
              <p className="text-[11px] sm:text-xs text-[#5e7068] font-medium">
                Tap unlocked badges for confetti celebration!
              </p>
            </div>

            <span className="text-[10px] sm:text-xs font-bold bg-[#fff0d5] text-[#8a4c00] border border-[#ffcf70] px-2.5 py-0.5 sm:py-1 rounded-full">
              {unlockedBadges.length}/{BADGES_LIST.length}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
            {BADGES_LIST.map((b) => {
              const isUnlocked = unlockedBadges.includes(b.id) || 
                (b.type === "xp" && xp >= (b.thresholdXP || 0)) ||
                (b.type === "correct" && correctAnswers >= (b.thresholdCorrect || 0)) ||
                (b.type === "streak" && streak >= (b.thresholdStreak || 0));

              return (
                <button
                  key={b.id}
                  onClick={() => handleBadgeClick(isUnlocked)}
                  className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-between ${
                    isUnlocked
                      ? "bg-gradient-to-b from-[#fff8e7] to-[#fff0d5] border-[#ffcf70] shadow-xs hover:scale-103 cursor-pointer"
                      : "bg-gray-50/80 border-gray-200 opacity-40 grayscale cursor-not-allowed"
                  }`}
                >
                  <div className="text-2xl sm:text-4xl mb-1 sm:mb-2">
                    {b.icon}
                  </div>
                  <div>
                    <h5 className="text-[11px] sm:text-sm font-black text-[#173f35] line-clamp-1">
                      {b.title}
                    </h5>
                    <p className="text-[9px] sm:text-[10px] text-[#5e7068] mt-0.5 line-clamp-2">
                      {b.description}
                    </p>
                  </div>

                  <div className="mt-1.5 text-[9px] sm:text-[10px] font-bold">
                    {isUnlocked ? (
                      <span className="text-emerald-700 flex items-center gap-0.5 justify-center">
                        <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Unlocked
                      </span>
                    ) : (
                      <span className="text-gray-400 flex items-center gap-0.5 justify-center">
                        <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Locked
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer actions inside card (Reset) */}
        <div className="flex justify-end pt-2 border-t border-[#eadfca]/60">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-gray-400 hover:text-red-600 transition-colors"
          >
            <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Reset Progress Data</span>
          </button>
        </div>

      </div>
    </section>
  );
}
