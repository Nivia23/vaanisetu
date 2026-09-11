"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useGame } from "@/context/GameContext";
import { 
  Sparkles, 
  Rocket, 
  BarChart2, 
  Languages, 
  Volume2, 
  ChevronRight,
  Flame,
  Award
} from "lucide-react";

export default function Hero() {
  const { xp, level, streak, playSound, speak } = useGame();
  
  const dailyProverbs = [
    { text: "विद्या ददाति विनयं।", lang: "Hindi", meaning: "Knowledge brings true humility & wisdom." },
    { text: "জ্ঞানের চেয়ে বড় সম্পদ নেই।", lang: "Bengali", meaning: "There is no wealth greater than knowledge." },
    { text: "ବିଦ୍ୟା ଅମୂଲ୍ୟ ଧନ।", lang: "Odia", meaning: "Education is the most priceless treasure." },
    { text: "ᱚᱞ ᱯᱟᱲᱦᱟᱣ ᱜᱮ ᱢᱟᱨᱟᱝ ᱫᱷᱚᱱ।", lang: "Santali", meaning: "Learning is the supreme treasure." },
    { text: "प्रयत्ने वाळूचे कण रगडिता तेलही गळे।", lang: "Marathi", meaning: "With dedication, every obstacle turns into victory." }
  ];

  const [currentProverbIndex, setCurrentProverbIndex] = useState(0);
  const activeProverb = dailyProverbs[currentProverbIndex];

  const nextProverb = () => {
    playSound("click");
    setCurrentProverbIndex((prev) => (prev + 1) % dailyProverbs.length);
  };

  return (
    <section id="home" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#ffe0a6]/40 blur-3xl" />
        <div className="absolute top-40 right-10 w-96 h-96 rounded-full bg-[#155c48]/10 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-[#ff7043]/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading & Introduction */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Mission Badge */}
            <div className="inline-flex items-center gap-2 bg-[#ffe0a6] text-[#8a4c00] border border-[#ffcf70] px-4 py-1.5 rounded-full font-bold text-xs sm:text-sm tracking-wide shadow-xs">
              <Sparkles className="w-4 h-4 text-[#ff7043]" />
              <span>🌈 Learn • Play • Grow • Connect</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#173f35] tracking-tight leading-[1.12]">
              Education in{" "}
              <span className="relative inline-block text-[#ff7043]">
                Your Language.
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#ffb703] -z-10 opacity-70"
                  viewBox="0 0 250 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9C60 2 190 2 247 9"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-[#5e7068] font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Explore diverse Indian languages, play gamified vocabulary arcades, test your mental reflexes, and bridge linguistic boundaries with <strong className="text-[#155c48]">VAANISETU</strong>.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href="#games"
                onClick={() => playSound("click")}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#ff7043] hover:bg-[#e65100] text-white font-bold text-base shadow-lg shadow-[#ff7043]/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <Rocket className="w-5 h-5" />
                <span>Start Learning Games</span>
              </a>

              <a
                href="#translator"
                onClick={() => playSound("click")}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#155c48] hover:bg-[#0f4234] text-white font-bold text-base shadow-lg shadow-[#155c48]/20 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <Languages className="w-5 h-5 text-[#ffcf70]" />
                <span>Explore Bridge</span>
              </a>

              <a
                href="#progress"
                onClick={() => playSound("click")}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white border border-[#eadfca] hover:border-[#ff7043] text-[#173f35] hover:text-[#ff7043] font-bold text-base shadow-xs hover:bg-[#fff0d5]/40 transition-all duration-200"
              >
                <BarChart2 className="w-5 h-5 text-[#155c48]" />
                <span>My Stats</span>
              </a>
            </div>

            {/* Quick Language Support Ticker */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-semibold text-[#5e7068]">
              <span className="text-[#8a4c00] font-bold">Supported Languages:</span>
              {["हिन्दी (Hindi)", "বাংলা (Bengali)", "ଓଡ଼ିଆ (Odia)", "मराठी (Marathi)", "ᱥᱟᱱᱛᱟᱲᱤ (Santali)", "தமிழ் (Tamil)", "తెలుగు (Telugu)", "English"].map((l) => (
                <span key={l} className="bg-white/80 border border-[#eadfca] px-2.5 py-1 rounded-lg shadow-2xs">
                  {l}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Visual Card with Official Logo */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md relative">
              
              {/* Outer Glow Card */}
              <div className="relative rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-hidden bg-gradient-to-br from-[#155c48] via-[#1c785f] to-[#0f4234] border border-white/20">
                
                {/* Background Bridge Pattern */}
                <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-[#ff7043]/20 blur-xl pointer-events-none" />

                {/* Logo Presentation in Card */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl mb-6 bg-white/95 p-2 flex items-center justify-center border border-white/40 group">
                  <Image
                    src="/logo.jpg"
                    alt="VAANISETU - Where Language Meets Learning"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </div>

                {/* Proverb Spotlight */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 mb-6 text-left relative">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#ffcf70] flex items-center gap-1">
                      <span>Daily Wisdom</span>
                      <span>•</span>
                      <span>{activeProverb.lang}</span>
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          playSound("click");
                          speak(activeProverb.text, activeProverb.lang);
                        }}
                        title="Listen to pronunciation"
                        className="p-1 rounded-md hover:bg-white/20 text-white/90 hover:text-white transition-colors"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={nextProverb}
                        title="Next quote"
                        className="p-1 rounded-md hover:bg-white/20 text-[#ffcf70] hover:text-white transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-white tracking-wide">
                    &quot;{activeProverb.text}&quot;
                  </p>
                  <p className="text-xs text-[#e8fff7] mt-1 italic">
                    {activeProverb.meaning}
                  </p>
                </div>

                {/* Mini Live Stats Grid */}
                <div className="grid grid-cols-3 gap-2 text-center bg-black/20 rounded-2xl p-3 border border-white/10">
                  <div className="p-2">
                    <div className="flex items-center justify-center gap-1 text-[#ffcf70] mb-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="text-xl font-black">{xp}</span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-100 uppercase tracking-wider">Total XP</span>
                  </div>

                  <div className="p-2 border-x border-white/15">
                    <div className="flex items-center justify-center gap-1 text-white mb-0.5">
                      <Award className="w-3.5 h-3.5 text-yellow-300" />
                      <span className="text-xl font-black">{level}</span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-100 uppercase tracking-wider">Level</span>
                  </div>

                  <div className="p-2">
                    <div className="flex items-center justify-center gap-1 text-[#ff7043] mb-0.5">
                      <Flame className="w-3.5 h-3.5 fill-[#ff7043]" />
                      <span className="text-xl font-black text-white">{streak}</span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-100 uppercase tracking-wider">Day Streak</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
