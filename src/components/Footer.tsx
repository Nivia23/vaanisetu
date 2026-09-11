"use client";

import React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#123d32] text-white pt-10 sm:pt-16 pb-8 sm:pb-12 border-t border-[#155c48]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center justify-between">
          
          {/* Brand & Mission */}
          <div className="md:col-span-6 space-y-3 sm:space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl overflow-hidden shadow-md border border-white/20 flex-shrink-0">
                <Image
                  src="/logo.jpg"
                  alt="VAANISETU Logo"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5 justify-center md:justify-start">
                  <span>VAANISETU</span>
                  <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-bold bg-[#ff7043] text-white">
                    वाणी सेतु
                  </span>
                </h3>
                <p className="text-[11px] sm:text-xs font-medium text-emerald-200">
                  Where Language Meets Learning
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-md mx-auto md:mx-0 leading-relaxed">
              Empowering every learner with inclusive, gamified education in their mother tongue. Bridging languages, scripts, and generations across India.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-6 flex flex-wrap justify-center md:justify-end gap-6 sm:gap-8 text-xs font-bold text-emerald-200">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="text-white text-xs sm:text-sm font-black uppercase tracking-wider block">
                Learning Arcade
              </span>
              <ul className="space-y-1">
                <li><a href="#games" className="hover:text-[#ffcf70] transition-colors">3D Flashcards</a></li>
                <li><a href="#games" className="hover:text-[#ffcf70] transition-colors">Word Scramble</a></li>
                <li><a href="#games" className="hover:text-[#ffcf70] transition-colors">Meaning Match</a></li>
                <li><a href="#games" className="hover:text-[#ffcf70] transition-colors">Rapid Fire 30s</a></li>
              </ul>
            </div>

            <div className="space-y-1.5 text-center md:text-left">
              <span className="text-white text-xs sm:text-sm font-black uppercase tracking-wider block">
                Language Bridge
              </span>
              <ul className="space-y-1">
                <li><a href="#translator" className="hover:text-[#ffcf70] transition-colors">Voice Translator</a></li>
                <li><a href="#languages" className="hover:text-[#ffcf70] transition-colors">Indian Scripts</a></li>
                <li><a href="#languages" className="hover:text-[#ffcf70] transition-colors">Proverbs & Wisdom</a></li>
                <li><a href="#progress" className="hover:text-[#ffcf70] transition-colors">Badges & Streaks</a></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Indian Languages Ticker */}
        <div className="pt-4 sm:pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-1.5 text-[11px] sm:text-xs font-semibold text-emerald-200/90">
          <span>Supported:</span>
          {["हिन्दी", "বাংলা", "ଓଡ଼ିଆ", "मराठी", "ᱥᱟᱱᱛᱟᱲᱤ", "தமிழ்", "తెలుగు", "English"].map((l) => (
            <span key={l} className="bg-white/10 px-2 py-0.5 rounded-md border border-white/10">
              {l}
            </span>
          ))}
        </div>

        {/* Copyright & Signoff */}
        <div className="text-center text-[11px] sm:text-xs text-emerald-200/60 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
          <span>© {new Date().getFullYear()} VAANISETU. All rights reserved.</span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1 justify-center">
            Made with <Heart className="w-3 h-3 text-[#ff7043] fill-[#ff7043]" /> for inclusive education in India 🇮🇳
          </span>
        </div>

      </div>
    </footer>
  );
}
