"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useGame } from "@/context/GameContext";
import { 
  Volume2, 
  VolumeX, 
  Flame, 
  Sparkles, 
  Menu, 
  X,
  BookOpen,
  Gamepad2,
  Globe2,
  Brain,
  BarChart3
} from "lucide-react";

export default function Navbar() {
  const { xp, level, streak, soundEnabled, toggleSound, playSound } = useGame();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home", icon: BookOpen },
    { name: "Arcade", href: "#games", icon: Gamepad2 },
    { name: "Translator", href: "#translator", icon: Globe2 },
    { name: "Languages", href: "#languages", icon: Brain },
    { name: "Progress", href: "#progress", icon: BarChart3 }
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-[#fffaf2]/95 backdrop-blur-md shadow-xs border-b border-[#eadfca]" 
          : "bg-[#fffaf2]/85 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          
          {/* Brand Logo & Title */}
          <a 
            href="#home" 
            className="flex items-center gap-2 sm:gap-3.5 group cursor-pointer flex-shrink-0"
            onClick={() => playSound("click")}
          >
            <div className="relative w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl overflow-hidden shadow-xs group-hover:scale-105 transition-transform duration-200 border border-[#155c48]/15 flex-shrink-0">
              <Image
                src="/logo.jpg"
                alt="VAANISETU Logo"
                fill
                sizes="(max-width: 640px) 36px, 48px"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-lg sm:text-2xl font-black tracking-tight text-[#155c48] group-hover:text-[#ff7043] transition-colors">
                  VAANISETU
                </span>
                <span className="text-[10px] sm:text-xs px-1.5 py-0.2 sm:py-0.5 rounded-full font-bold bg-[#ff7043]/10 text-[#ff7043]">
                  2.0
                </span>
              </div>
              <p className="text-[10px] sm:text-xs font-medium text-[#5e7068] tracking-wide hidden sm:block">
                Where Language Meets Learning
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => playSound("click")}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold text-[#173f35] hover:text-[#ff7043] hover:bg-[#fff0d5]/60 transition-all duration-150"
                >
                  <Icon className="w-4 h-4 text-[#155c48]" />
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Live Status Badges & Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* XP Pill */}
            <div 
              title="Experience Points" 
              className="flex items-center gap-1 bg-[#fff0d5] border border-[#ffcf70] px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-2xs text-xs sm:text-sm font-black text-[#8a4c00]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ff7043]" />
              <span>{xp}</span>
              <span className="text-[9px] sm:text-[10px] text-[#8a4c00]/70 uppercase hidden xs:inline">XP</span>
            </div>

            {/* Level Pill */}
            <div 
              title="Current Mastery Level" 
              className="hidden sm:flex items-center gap-1 bg-[#155c48] text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-2xs text-xs sm:text-sm font-bold"
            >
              <span className="text-yellow-300">★</span>
              <span>Lvl {level}</span>
            </div>

            {/* Streak Flame */}
            <div 
              title="Day Streak" 
              className="flex items-center gap-1 bg-[#ff7043] text-white px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-full shadow-2xs text-xs sm:text-sm font-bold"
            >
              <Flame className="w-3.5 h-3.5 text-yellow-200 fill-yellow-200" />
              <span>{streak}</span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                toggleSound();
                playSound("click");
              }}
              title={soundEnabled ? "Mute Audio Effects" : "Enable Audio Effects"}
              className="p-1.5 sm:p-2 rounded-xl border border-[#eadfca] bg-white text-[#155c48] hover:bg-[#fff0d5] hover:text-[#ff7043] transition-colors"
              aria-label="Toggle Sound"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4 text-gray-400" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-xl border border-[#eadfca] bg-white text-[#173f35] hover:bg-[#fff0d5]"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fffaf2] border-b border-[#eadfca] px-4 pt-2 pb-5 space-y-1.5 shadow-lg animate-fade-in">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={() => {
                  playSound("click");
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-sm text-[#173f35] hover:bg-[#fff0d5] hover:text-[#ff7043] transition-colors"
              >
                <Icon className="w-4 h-4 text-[#155c48]" />
                {item.name}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
