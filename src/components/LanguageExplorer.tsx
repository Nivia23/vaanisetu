"use client";

import React, { useState } from "react";
import { useGame } from "@/context/GameContext";
import { INDIAN_LANGUAGES, LanguageInfo } from "@/lib/data";
import { Languages, Volume2, MapPin, Users, BookMarked } from "lucide-react";

export default function LanguageExplorer() {
  const { playSound, speak, addXP } = useGame();
  const [activeLang, setActiveLang] = useState<LanguageInfo>(INDIAN_LANGUAGES[0]);

  const handleCardClick = (lang: LanguageInfo) => {
    playSound("click");
    setActiveLang(lang);
    speak(lang.sampleGreeting, lang.name);
    addXP(2);
  };

  return (
    <section id="languages" className="py-8 sm:py-16 bg-[#fff0d5]/50 border-y border-[#eadfca]/60">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-[#ffe0a6] text-[#8a4c00] border border-[#ffcf70] px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-bold text-xs uppercase tracking-wider">
            <Languages className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ff7043]" />
            <span>Linguistic Heritage</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#173f35] tracking-tight">
            Our Indian Language Bridge
          </h2>
          <p className="text-xs sm:text-base text-[#5e7068] font-medium">
            Discover the rich scripts, soulful proverbs, and diverse voices across India.
          </p>
        </div>

        {/* Language Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {INDIAN_LANGUAGES.map((lang) => {
            const isSelected = activeLang.code === lang.code;
            return (
              <div
                key={lang.code}
                onClick={() => handleCardClick(lang)}
                className={`cursor-pointer rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all duration-200 border relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#155c48] text-white border-[#155c48] shadow-md scale-101 sm:scale-102 -translate-y-0.5 ring-2 sm:ring-4 ring-[#ffcf70]/40"
                    : "bg-white hover:bg-[#fffdf8] text-[#173f35] border-[#eadfca] shadow-2xs hover:shadow-xs"
                }`}
              >
                {/* Top Row: Emoji & Script */}
                <div className="flex items-start justify-between">
                  <span className="text-2xl sm:text-3xl">{lang.flagEmoji}</span>
                  <span className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    isSelected ? "bg-white/20 text-[#ffcf70]" : "bg-[#fff0d5] text-[#8a4c00]"
                  }`}>
                    {lang.script.split(" ")[0]}
                  </span>
                </div>

                {/* Middle Row: Name & Native Script */}
                <div className="my-2.5 sm:my-4">
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-1.5">
                    <span>{lang.name}</span>
                    <span className={`text-sm sm:text-base font-semibold ${isSelected ? "text-emerald-200" : "text-[#5e7068]"}`}>
                      ({lang.nativeName})
                    </span>
                  </h3>
                  
                  <div className="mt-1.5 space-y-0.5 text-[11px] sm:text-xs">
                    <p className={`flex items-center gap-1.5 font-medium ${isSelected ? "text-emerald-100" : "text-[#5e7068]"}`}>
                      <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                      <span className="line-clamp-1">{lang.speakers}</span>
                    </p>
                    <p className={`flex items-center gap-1.5 font-medium ${isSelected ? "text-emerald-100" : "text-[#5e7068]"}`}>
                      <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                      <span className="line-clamp-1">{lang.region}</span>
                    </p>
                  </div>
                </div>

                {/* Bottom Row: Sample Greeting Audio Trigger */}
                <div className={`pt-2.5 sm:pt-3 border-t flex items-center justify-between text-xs font-bold ${
                  isSelected ? "border-white/15 text-[#ffcf70]" : "border-[#eadfca] text-[#155c48]"
                }`}>
                  <span className="line-clamp-1 italic font-serif text-[11px] sm:text-xs">&quot;{lang.sampleGreeting}&quot;</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playSound("click");
                      speak(lang.sampleGreeting, lang.name);
                    }}
                    title="Pronounce greeting"
                    className={`p-1.5 rounded-lg ${isSelected ? "bg-white/20 hover:bg-white/30 text-white" : "bg-[#fff0d5] hover:bg-[#ffe0a6] text-[#155c48]"}`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Spotlight Showcase of Selected Language */}
        <div className="bg-white rounded-3xl p-4 sm:p-8 border border-[#eadfca] shadow-md max-w-4xl mx-auto space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#eadfca]">
            <div className="flex items-center gap-2.5">
              <span className="text-3xl sm:text-4xl">{activeLang.flagEmoji}</span>
              <div>
                <h4 className="text-lg sm:text-xl font-black text-[#173f35]">
                  {activeLang.name} — {activeLang.nativeName}
                </h4>
                <p className="text-[11px] sm:text-xs font-semibold text-[#5e7068]">
                  Script: {activeLang.script} • {activeLang.region}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playSound("click");
                speak(activeLang.proverb.native, activeLang.name);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#155c48] hover:bg-[#0f4234] text-white font-bold text-xs shadow-xs transition-all"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Pronounce Proverb</span>
            </button>
          </div>

          {/* Proverb Details */}
          <div className="bg-[#fffaf2] rounded-2xl p-3.5 sm:p-5 border border-[#eadfca] space-y-1.5">
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-extrabold uppercase text-[#ff7043]">
              <BookMarked className="w-3.5 h-3.5" />
              <span>Cultural Proverb & Wisdom</span>
            </div>
            <p className="text-lg sm:text-2xl font-black text-[#155c48]">
              &quot;{activeLang.proverb.native}&quot;
            </p>
            <p className="text-[11px] sm:text-xs text-[#5e7068] font-mono">
              Transliteration: {activeLang.proverb.transliteration}
            </p>
            <p className="text-xs sm:text-sm font-semibold text-[#173f35] pt-0.5">
              Meaning: {activeLang.proverb.meaning}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
