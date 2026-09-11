"use client";

import React from "react";
import { useGame } from "@/context/GameContext";
import { Sparkles, Trophy, Flame, Target, ArrowUpRight } from "lucide-react";

export default function StatsDashboard() {
  const { xp, level, streak, correctAnswers, totalAttempts } = useGame();

  const accuracy = totalAttempts > 0 
    ? Math.round((correctAnswers / totalAttempts) * 100) 
    : 100;

  const currentLevelXP = xp % 100;
  const xpToNextLevel = 100 - currentLevelXP;

  const getRankTitle = (lvl: number) => {
    if (lvl >= 10) return "Grand Polyglot Master 👑";
    if (lvl >= 7) return "Language Sage 🌟";
    if (lvl >= 5) return "Linguistic Scholar 📜";
    if (lvl >= 3) return "Curious Explorer 🧭";
    return "Aspiring Pioneer 🌱";
  };

  const stats = [
    {
      label: "Total Experience",
      value: `${xp} XP`,
      subtitle: `${xpToNextLevel} XP to Level ${level + 1}`,
      icon: Sparkles,
      iconColor: "text-[#ff7043]",
      bgColor: "bg-[#fff0d5]",
      borderColor: "border-[#ffcf70]",
      progress: currentLevelXP
    },
    {
      label: "Mastery Level",
      value: `Level ${level}`,
      subtitle: getRankTitle(level),
      icon: Trophy,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      progress: Math.min(100, level * 10)
    },
    {
      label: "Day Streak",
      value: `${streak} ${streak === 1 ? "Day" : "Days"}`,
      subtitle: streak > 0 ? "Daily streak active! 🔥" : "Practice today to start",
      icon: Flame,
      iconColor: "text-orange-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      progress: Math.min(100, (streak / 7) * 100)
    },
    {
      label: "Global Accuracy",
      value: `${accuracy}%`,
      subtitle: `${correctAnswers} correct of ${totalAttempts} tries`,
      icon: Target,
      iconColor: "text-[#155c48]",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      progress: accuracy
    }
  ];

  return (
    <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className={`relative bg-white rounded-3xl p-5 border ${stat.borderColor} shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between overflow-hidden group`}
            >
              {/* Top Row: Icon & Label */}
              <div className="flex items-start justify-between gap-3">
                <div className={`p-3 rounded-2xl ${stat.bgColor} ${stat.iconColor}`}>
                  <Icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#5e7068] bg-[#fffaf2] px-2.5 py-1 rounded-lg border border-[#eadfca]/60">
                  {stat.label}
                </span>
              </div>

              {/* Middle Row: Main Metric Value */}
              <div className="mt-4 mb-2">
                <div className="text-2xl sm:text-3xl font-black text-[#173f35] tracking-tight">
                  {stat.value}
                </div>
                <p className="text-xs font-semibold text-[#5e7068] mt-1 flex items-center gap-1">
                  <span>{stat.subtitle}</span>
                </p>
              </div>

              {/* Bottom Progress Bar */}
              <div className="mt-3">
                <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-[#155c48] to-[#ff7043]"
                    style={{ width: `${Math.max(5, stat.progress)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
