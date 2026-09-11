"use client";

import React, { useState } from "react";
import { useGame } from "@/context/GameContext";
import { INDIAN_LANGUAGES, LanguageInfo } from "@/lib/data";
import { Languages, Volume2, Sparkles, MapPin, Users, BookMarked } from "lucide-react";

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
    <section id="languages" className="py-16 bg-[#fff0d5]/50 border-y border-[#eadfca]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-[#ffe0a6] text-[#8a4c00] border border-[#ffcf70] px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider">
            <Languages className="w-4 h-4 text-[#ff7043]" />
            <span>Linguistic Heritage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#173f35] tracking-tight">
            Our Indian Language Bridge
          </h2>
          <p className="text-sm sm:text-base text-[#5e7068] font-medium">
            Discover the rich scripts, soulful proverbs, and diverse voices that weave the cultural tapestry of India.
          </p>
        </div>

        {/* Language Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {INDIAN_LANGUAGES.map((lang) => {
            const isSelected = activeLang.code === lang.code;
            return (
              <div
                key={lang.code}
                onClick={() => handleCardClick(lang)}
                className={`cursor-pointer rounded-3xl p-6 transition-all duration-200 border relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#155c48] text-white border-[#155c48] shadow-xl scale-102 -translate-y-1 ring-4 ring-[#ffcf70]/40"
                    : "bg-white hover:bg-[#fffdf8] text-[#173f35] border-[#eadfca] shadow-xs hover:shadow-md hover:-translate-y-0.5"
                }`}
              >
                {/* Top Row: Emoji & Script */}
                <div className="flex items-start justify-between">
                  <span className="text-3xl">{lang.flagEmoji}</span>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    isSelected ? "bg-white/20 text-[#ffcf70]" : "bg-[#fff0d5] text-[#8a4c00]"
                  }`}>
                    {lang.script.split(" ")[0]}
                  </span>
                </div>

                {/* Middle Row: Name & Native Script */}
                <div className="my-4">
                  <h3 className="text-2xl font-black tracking-tight flex items-center gap-2">
                    <span>{lang.name}</span>
                    <span className={`text-base font-semibold ${isSelected ? "text-emerald-200" : "text-[#5e7068]"}`}>
                      ({lang.nativeName})
                    </span>
                  </h3>
                  
                  <div className="mt-2 space-y-1 text-xs">
                    <p className={`flex items-center gap-1.5 font-medium ${isSelected ? "text-emerald-100" : "text-[#5e7068]"}`}>
                      <Users className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{lang.speakers}</span>
                    </p>
                    <p className={`flex items-center gap-1.5 font-medium ${isSelected ? "text-emerald-100" : "text-[#5e7068]"}`}>
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{lang.region}</span>
                    </p>
                  </div>
                </div>

                {/* Bottom Row: Sample Greeting Audio Trigger */}
                <div className={`pt-3 border-t flex items-center justify-between text-xs font-bold ${
                  isSelected ? "border-white/15 text-[#ffcf70]" : "border-[#eadfca] text-[#155c48]"
                }`}>
                  <span className="line-clamp-1 italic font-serif">&quot;{lang.sampleGreeting}&quot;</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playSound("click");
                      speak(lang.sampleGreeting, lang.name);
                    }}
                    title="Pronounce greeting"
                    className={`p-1.5 rounded-lg ${isSelected ? "bg-white/20 hover:bg-white/30 text-white" : "bg-[#fff0d5] hover:bg-[#ffe0a6] text-[#155c48]"}`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Spotlight Showcase of Selected Language */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#eadfca] shadow-md max-w-4xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#eadfca]">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{activeLang.flagEmoji}</span>
              <div>
                <h4 className="text-xl font-black text-[#173f35]">
                  {activeLang.name} — {activeLang.nativeName}
                </h4>
                <p className="text-xs font-semibold text-[#5e7068]">
                  Script: {activeLang.script} • {activeLang.region}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playSound("click");
                speak(activeLang.proverb.native, activeLang.name);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#155c48] hover:bg-[#0f4234] text-white font-bold text-xs shadow-xs transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>Pronounce Proverb</span>
            </button>
          </div>

          {/* Proverb Details */}
          <div className="bg-[#fffaf2] rounded-2xl p-5 border border-[#eadfca] space-y-2">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase text-[#ff7043]">
              <BookMarked className="w-4 h-4" />
              <span>Cultural Proverb & Wisdom</span>
            </div>
            <p className="text-xl sm:text-2xl font-black text-[#155c48]">
              &quot;{activeLang.proverb.native}&quot;
            </p>
            <p className="text-xs text-[#5e7068] font-mono">
              Transliteration: {activeLang.proverb.transliteration}
            </p>
            <p className="text-sm font-semibold text-[#173f35] pt-1">
              Meaning: {activeLang.proverb.meaning}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
