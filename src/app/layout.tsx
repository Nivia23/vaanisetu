import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#155c48"
};

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vaanisetu.vercel.app"),
  title: "VAANISETU | Where Language Meets Learning",
  description:
    "An interactive, gamified multilingual learning platform bridging English and Indian languages (Hindi, Bengali, Odia, Marathi, Santali, Tamil, Telugu) through 3D flashcards, anagram puzzles, voice translation, and cognitive challenges.",
  keywords: [
    "VAANISETU",
    "Multilingual Education",
    "Indian Languages",
    "Learn Hindi",
    "Learn Bengali",
    "Learn Odia",
    "Learn Marathi",
    "Learn Santali",
    "Language Bridge",
    "Gamified Learning"
  ],
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg"
  },
  openGraph: {
    title: "VAANISETU | Where Language Meets Learning",
    description: "Gamified multilingual learning for Indian languages with voice synthesis, 3D flashcards, and word puzzles.",
    images: ["/logo.jpg"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-[#fffaf2] text-[#173f35]">
        {children}
      </body>
    </html>
  );
}
