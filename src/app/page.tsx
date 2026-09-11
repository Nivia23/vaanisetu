"use client";

import React from "react";
import { GameProvider } from "@/context/GameContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsDashboard from "@/components/StatsDashboard";
import GameSelector from "@/components/games/GameSelector";
import TranslatorBridge from "@/components/TranslatorBridge";
import LanguageExplorer from "@/components/LanguageExplorer";
import ProgressSection from "@/components/ProgressSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <GameProvider>
      <div className="min-h-screen flex flex-col bg-[#fffaf2] text-[#173f35] selection:bg-[#ffcf70] selection:text-[#8a4c00]">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-1 space-y-4">
          <Hero />
          <StatsDashboard />
          <GameSelector />
          <TranslatorBridge />
          <LanguageExplorer />
          <ProgressSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </GameProvider>
  );
}
