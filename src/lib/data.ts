export interface FlashcardItem {
  id: string;
  category: "Basics" | "Nature" | "School" | "Everyday" | "Animals";
  word: string;
  emoji: string;
  pronunciation: string;
  meaning: string;
  translations: {
    Hindi: string;
    Bengali: string;
    Odia: string;
    Marathi: string;
    Santali: string;
    Tamil: string;
    Telugu: string;
  };
  example: string;
}

export interface PuzzleItem {
  id: string;
  scrambled: string;
  word: string;
  hint: string;
  category: string;
  xpReward: number;
}

export interface MatchPair {
  id: string;
  word: string;
  meaning: string;
  nativeWord: string;
  language: string;
  emoji: string;
}

export interface RapidQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  category: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  xpReward: number;
  difficulty: "Easy" | "Medium" | "Challenging";
}

export interface LanguageInfo {
  code: string;
  name: string;
  nativeName: string;
  script: string;
  speakers: string;
  region: string;
  sampleGreeting: string;
  greetingMeaning: string;
  flagEmoji: string;
  accentColor: string;
  proverb: {
    native: string;
    transliteration: string;
    meaning: string;
  };
}

export const FLASHCARDS_DATA: FlashcardItem[] = [
  {
    id: "fc-1",
    category: "Basics",
    word: "Water",
    emoji: "💧",
    pronunciation: "Wah-ter",
    meaning: "An essential clear liquid we drink to stay hydrated and alive.",
    translations: {
      Hindi: "जल / पानी (Paani)",
      Bengali: "জল (Jôl)",
      Odia: "ପାଣି (Paani)",
      Marathi: "पाणी (Pāṇī)",
      Santali: "ᱫᱟᱜ (Dak')",
      Tamil: "தண்ணீர் (Thaneer)",
      Telugu: "నీరు (Neeru)"
    },
    example: "Drink clean water every day for good health."
  },
  {
    id: "fc-2",
    category: "School",
    word: "Book",
    emoji: "📖",
    pronunciation: "Buuk",
    meaning: "A set of written, printed, or illustrated pages bound together for reading.",
    translations: {
      Hindi: "किताब / पुस्तक (Kitaab / Pustak)",
      Bengali: "বই (Boi)",
      Odia: "ବହି (Bahi)",
      Marathi: "पुस्तक (Pustak)",
      Santali: "ᱯᱩᱛᱷᱤ (Puthi)",
      Tamil: "புத்தகம் (Puthagam)",
      Telugu: "పుస్తకం (Pustakam)"
    },
    example: "Reading a book opens new worlds of imagination."
  },
  {
    id: "fc-3",
    category: "Nature",
    word: "Tree",
    emoji: "🌳",
    pronunciation: "Tree",
    meaning: "A woody perennial plant with a single trunk and branches producing leaves.",
    translations: {
      Hindi: "पेड़ / वृक्ष (Ped / Vriksh)",
      Bengali: "গাছ (Gaachh)",
      Odia: "ଗଛ (Gachha)",
      Marathi: "झाड (Jhaad)",
      Santali: "ᱫᱟᱨᱮ (Dare)",
      Tamil: "மரம் (Maram)",
      Telugu: "చెట్టు (Chettu)"
    },
    example: "Trees provide oxygen, shade, and sweet fruits."
  },
  {
    id: "fc-4",
    category: "School",
    word: "School",
    emoji: "🏫",
    pronunciation: "Skoo-ul",
    meaning: "An institution designed for the teaching and education of students.",
    translations: {
      Hindi: "विद्यालय / स्कूल (Vidyalaya)",
      Bengali: "বিদ্যালয় / স্কুল (Bidyalay)",
      Odia: "ବିଦ୍ୟାଳୟ (Bidyalaya)",
      Marathi: "शाळा (Shaala)",
      Santali: "ᱤᱥᱠᱩᱞ (Iskul)",
      Tamil: "பள்ளி (Palli)",
      Telugu: "పాఠశాల (Paathasaala)"
    },
    example: "Children gather at school to learn, play, and grow."
  },
  {
    id: "fc-5",
    category: "Nature",
    word: "Sun",
    emoji: "☀️",
    pronunciation: "Suhn",
    meaning: "The radiant celestial star at the center of the solar system providing light.",
    translations: {
      Hindi: "सूर्य / सूरज (Soorya / Sooraj)",
      Bengali: "সূর্য (Shurjo)",
      Odia: "ସୂର୍ଯ୍ୟ (Surjya)",
      Marathi: "सूर्य (Soorya)",
      Santali: "ᱥᱤᱧ ᱪᱟᱸᱫᱚ (Sin Chando)",
      Tamil: "சூரியன் (Sooriyan)",
      Telugu: "సూర్యుడు (Sooryudu)"
    },
    example: "The sun rises in the east and fills the world with warmth."
  },
  {
    id: "fc-6",
    category: "Everyday",
    word: "Friend",
    emoji: "🤝",
    pronunciation: "Frend",
    meaning: "A person with whom one has a bond of mutual affection and support.",
    translations: {
      Hindi: "मित्र / दोस्त (Mitra / Dost)",
      Bengali: "বন্ধু (Bondhu)",
      Odia: "ସାଙ୍ଗ / ମିତ୍ର (Saanga / Mitra)",
      Marathi: "मित्र (Mitra)",
      Santali: "ᱜᱟᱛᱮ (Gate)",
      Tamil: "நண்பன் (Nanban)",
      Telugu: "స్నేహితుడు (Snehitudu)"
    },
    example: "A true friend is a treasure for a lifetime."
  },
  {
    id: "fc-7",
    category: "Basics",
    word: "Mother",
    emoji: "👩‍👧",
    pronunciation: "Muh-ther",
    meaning: "A female parent who nurtures, guides, and loves unconditionally.",
    translations: {
      Hindi: "माँ / माता (Maa / Mata)",
      Bengali: "মা (Maa)",
      Odia: "ମାଆ (Maa)",
      Marathi: "आई (Aai)",
      Santali: "ᱟᱭᱳ (Ayo)",
      Tamil: "அம்மா (Amma)",
      Telugu: "అమ్మ (Amma)"
    },
    example: "Mother teaches us our first words and steps."
  },
  {
    id: "fc-8",
    category: "Nature",
    word: "River",
    emoji: "🌊",
    pronunciation: "Ri-ver",
    meaning: "A large flowing natural stream of water traveling towards an ocean or sea.",
    translations: {
      Hindi: "नदी (Nadi)",
      Bengali: "নদী (Nodi)",
      Odia: "ନଦୀ (Nadi)",
      Marathi: "नदी (Nadi)",
      Santali: "ᱜᱟᱰᱟ (Gada)",
      Tamil: "நதி / ஆறு (Nadhi / Aaru)",
      Telugu: "నది (Nadi)"
    },
    example: "The great rivers of India nourish thousands of villages."
  },
  {
    id: "fc-9",
    category: "Animals",
    word: "Peacock",
    emoji: "🦚",
    pronunciation: "Pee-kok",
    meaning: "A magnificently feathered bird, celebrated as the National Bird of India.",
    translations: {
      Hindi: "मोर (Mor)",
      Bengali: "ময়ূর (Moyur)",
      Odia: "ମୟୂର (Mayura)",
      Marathi: "मोर (Mor)",
      Santali: "ᱢᱟᱨᱟᱜ (Marag)",
      Tamil: "மயில் (Mayil)",
      Telugu: "నెమలి (Nemali)"
    },
    example: "The peacock dances gracefully when rain clouds arrive."
  }
];

export const PUZZLES_DATA: PuzzleItem[] = [
  { id: "p1", scrambled: "LOOHCS", word: "SCHOOL", hint: "A temple of learning where students study", category: "Education", xpReward: 15 },
  { id: "p2", scrambled: "RETAW", word: "WATER", hint: "Transparent fluid of life that we drink", category: "Essentials", xpReward: 15 },
  { id: "p3", scrambled: "KOOB", word: "BOOK", hint: "Pages bound with knowledge and stories", category: "Study", xpReward: 10 },
  { id: "p4", scrambled: "EERT", word: "TREE", hint: "Gives us oxygen, shade, and green leaves", category: "Nature", xpReward: 10 },
  { id: "p5", scrambled: "DNEIRF", word: "FRIEND", hint: "Someone who stands by you through thick and thin", category: "Bond", xpReward: 15 },
  { id: "p6", scrambled: "NRAELEG", word: "LEARN", hint: "Acquiring new wisdom and language skills", category: "Action", xpReward: 15 },
  { id: "p7", scrambled: "EGAUGNAL", word: "LANGUAGE", hint: "The bridge of speech and words connecting humanity", category: "Linguistics", xpReward: 20 },
  { id: "p8", scrambled: "TNEDUTS", word: "STUDENT", hint: "A curious seeker of knowledge in classrooms", category: "People", xpReward: 15 },
  { id: "p9", scrambled: "EGDIRB", word: "BRIDGE", hint: "What 'SETU' stands for — connecting two sides", category: "Metaphor", xpReward: 15 },
  { id: "p10", scrambled: "INAAAV", word: "VAANI", hint: "Sacred voice or speech in Indian heritage", category: "Heritage", xpReward: 20 }
];

export const MATCH_PAIRS_DATA: MatchPair[] = [
  { id: "m1", word: "Water 💧", meaning: "Essential clear liquid we drink", nativeWord: "जल / পানি / ᱫᱟᱜ", language: "Multilingual", emoji: "💧" },
  { id: "m2", word: "Tree 🌳", meaning: "A tall woody green plant", nativeWord: "पेड़ / গাছ / ᱫᱟᱨᱮ", language: "Multilingual", emoji: "🌳" },
  { id: "m3", word: "School 🏫", meaning: "Where students gather to study", nativeWord: "विद्यालय / शाळा / ᱤᱥᱠᱩᱞ", language: "Multilingual", emoji: "🏫" },
  { id: "m4", word: "Sun ☀️", meaning: "Star that brightens our day", nativeWord: "सूर्य / সূর্য / ᱥᱤᱧ ᱪᱟᱸᱫᱚ", language: "Multilingual", emoji: "☀️" },
  { id: "m5", word: "Book 📖", meaning: "Pages bound with knowledge", nativeWord: "किताब / বই / ᱵᱚᱦᱤ", language: "Multilingual", emoji: "📖" },
  { id: "m6", word: "Friend 🤝", meaning: "A loyal and caring companion", nativeWord: "दोस्त / বন্ধু / ᱜᱟᱛᱮ", language: "Multilingual", emoji: "🤝" }
];

export const MEMORY_LEVELS = [
  { level: 1, words: ["Water 💧", "Book 📖", "Tree 🌳"], timeSeconds: 4 },
  { level: 2, words: ["Sun ☀️", "School 🏫", "Friend 🤝", "Book 📖"], timeSeconds: 5 },
  { level: 3, words: ["Tree 🌳", "Water 💧", "Student 🎒", "Learn 💡", "School 🏫"], timeSeconds: 6 },
  { level: 4, words: ["River 🌊", "Peacock 🦚", "Sun ☀️", "Friend 🤝", "Bridge 🌉", "Knowledge 📜"], timeSeconds: 7 }
];

export const RAPID_FIRE_DATA: RapidQuestion[] = [
  { id: "r1", question: "Which one is used for reading and learning?", options: ["Book 📖", "Water 💧", "Tree 🌳", "River 🌊"], correctIndex: 0, category: "Basics" },
  { id: "r2", question: "Which one grows from the soil and provides oxygen?", options: ["Book 📖", "Tree 🌳", "School 🏫", "Chair 🪑"], correctIndex: 1, category: "Nature" },
  { id: "r3", question: "Where do students go every morning to learn?", options: ["School 🏫", "River 🌊", "Tree 🌳", "Market 🏪"], correctIndex: 0, category: "Education" },
  { id: "r4", question: "Which clear liquid do we drink every single day?", options: ["Water 💧", "Book 📖", "Sun ☀️", "Pencil ✏️"], correctIndex: 0, category: "Health" },
  { id: "r5", question: "What luminous celestial star illuminates the Earth?", options: ["Sun ☀️", "Book 📖", "School 🏫", "Cloud ☁️"], correctIndex: 0, category: "Astronomy" },
  { id: "r6", question: "What is the national bird of India?", options: ["Peacock 🦚", "Crow 🐦", "Eagle 🦅", "Sparrow 🐤"], correctIndex: 0, category: "Heritage" },
  { id: "r7", question: "What does 'Setu' mean in Hindi and Sanskrit?", options: ["Bridge 🌉", "River 🌊", "Mountain 🏔️", "Road 🛣️"], correctIndex: 0, category: "Linguistics" },
  { id: "r8", question: "Which script is used to write Hindi and Marathi?", options: ["Devanagari 🇮🇳", "Ol Chiki 🌳", "Roman 🔤", "Cyrillic 🌐"], correctIndex: 0, category: "Scripts" }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    question: "What does the name 'VAANISETU' symbolize in language learning?",
    options: [
      "A bridge of voice connecting different languages & learners",
      "A dictionary of only ancient words",
      "A speed typing software",
      "A physical classroom building"
    ],
    correctIndex: 0,
    explanation: "'Vaani' means Voice/Speech and 'Setu' means Bridge — symbolizing connecting learners across diverse Indian languages.",
    xpReward: 15,
    difficulty: "Easy"
  },
  {
    id: "q2",
    question: "Which script is historically created for writing the Santali (ᱥᱟᱱᱛᱟᱲᱤ) language?",
    options: [
      "Ol Chiki script (created by Pandit Raghunath Murmu)",
      "Devanagari script",
      "Greek alphabet",
      "Bengali Brahmi only"
    ],
    correctIndex: 0,
    explanation: "Ol Chiki was created in 1925 by Pandit Raghunath Murmu specifically for the indigenous Santali language.",
    xpReward: 20,
    difficulty: "Medium"
  },
  {
    id: "q3",
    question: "In Marathi, what is the affectionate word for 'Mother'?",
    options: [
      "आई (Aai)",
      "মা (Maa)",
      "ଅମ୍ମା (Amma)",
      "Mataji"
    ],
    correctIndex: 0,
    explanation: "'आई (Aai)' is the sweet and widely revered Marathi word for mother.",
    xpReward: 15,
    difficulty: "Easy"
  },
  {
    id: "q4",
    question: "How do you say 'Thank you' in Hindi respectfully?",
    options: [
      "धन्यवाद (Dhanyavaad) / शुक्रिया (Shukriya)",
      "नमस्ते (Namaste)",
      "अलविदा (Alvida)",
      "स्वागत (Swagat)"
    ],
    correctIndex: 0,
    explanation: "'धन्यवाद (Dhanyavaad)' is the formal and respectful Hindi term expressing gratitude.",
    xpReward: 15,
    difficulty: "Easy"
  },
  {
    id: "q5",
    question: "Which Indian classical language is celebrated for ancient epics like the Sangam literature?",
    options: [
      "Tamil (தமிழ்)",
      "French",
      "Latin",
      "Gothic"
    ],
    correctIndex: 0,
    explanation: "Tamil has one of the longest continuous literary traditions in the world spanning over 2,500 years.",
    xpReward: 20,
    difficulty: "Medium"
  }
];

export const INDIAN_LANGUAGES: LanguageInfo[] = [
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    script: "Devanagari (देवनागरी)",
    speakers: "600M+ Speakers",
    region: "Northern & Central India",
    sampleGreeting: "नमस्ते! आप कैसे हैं?",
    greetingMeaning: "Hello! How are you?",
    flagEmoji: "🇮🇳",
    accentColor: "#f97316",
    proverb: {
      native: "विद्या ददाति विनयं।",
      transliteration: "Vidya Dadati Vinayam.",
      meaning: "Knowledge brings true humility and wisdom."
    }
  },
  {
    code: "bn",
    name: "Bengali",
    nativeName: "বাংলা",
    script: "Bengali Script (বাংলা লিপি)",
    speakers: "270M+ Global Speakers",
    region: "West Bengal, Tripura, Bangladesh",
    sampleGreeting: "নমস্কার! আপনি কেমন আছেন?",
    greetingMeaning: "Greetings! How are you doing?",
    flagEmoji: "🌺",
    accentColor: "#ec4899",
    proverb: {
      native: "জ্ঞানের চেয়ে বড় সম্পদ নেই।",
      transliteration: "Gyaner cheye boro shompod nei.",
      meaning: "There is no wealth greater than pure knowledge."
    }
  },
  {
    code: "or",
    name: "Odia",
    nativeName: "ଓଡ଼ିଆ",
    script: "Odia Lipi (ଓଡ଼ିଆ ଲିପି)",
    speakers: "45M+ Speakers",
    region: "Odisha & Eastern Coastal belt",
    sampleGreeting: "ନମସ୍କାର! ଆପଣ କେମିତି ଅଛନ୍ତି?",
    greetingMeaning: "Hello! How are you doing?",
    flagEmoji: "🌊",
    accentColor: "#06b6d4",
    proverb: {
      native: "ବିଦ୍ୟା ଅମୂଲ୍ୟ ଧନ।",
      transliteration: "Bidyā amūlya dhana.",
      meaning: "Education is the most priceless treasure."
    }
  },
  {
    code: "mr",
    name: "Marathi",
    nativeName: "मराठी",
    script: "Balbodh Devanagari (देवनागरी)",
    speakers: "95M+ Speakers",
    region: "Maharashtra & Western India",
    sampleGreeting: "नमस्कार! तुम्ही कसे आहात?",
    greetingMeaning: "Greetings! How are you?",
    flagEmoji: "🌿",
    accentColor: "#10b981",
    proverb: {
      native: "प्रयत्ने वाळूचे कण रगडिता तेलही गळे।",
      transliteration: "Prayatne valuche kan ragadita tel-hi gale.",
      meaning: "With relentless persistence, even the impossible is conquered."
    }
  },
  {
    code: "sat",
    name: "Santali",
    nativeName: "ᱥᱟᱱᱛᱟᱲᱤ",
    script: "Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)",
    speakers: "7.6M+ Speakers",
    region: "Jharkhand, Odisha, West Bengal, Assam",
    sampleGreeting: "ᱡᱚᱦᱟᱨ! ᱪᱮᱫ ᱞᱮᱠᱟ ᱢᱮᱱᱟᱜ ᱵᱤᱱᱟ?",
    greetingMeaning: "Johar! How are you?",
    flagEmoji: "🌳",
    accentColor: "#8b5cf6",
    proverb: {
      native: "ᱚᱞ ᱯᱟᱲᱦᱟᱣ ᱜᱮ ᱢᱟᱨᱟᱝ ᱫᱷᱚᱱ।",
      transliteration: "Ol padhaw ge marang dhon.",
      meaning: "Learning and literacy are the supreme wealth."
    }
  },
  {
    code: "ta",
    name: "Tamil",
    nativeName: "தமிழ்",
    script: "Tamil Script (தமிழ் எழுத்து)",
    speakers: "85M+ Speakers",
    region: "Tamil Nadu, Puducherry, Sri Lanka",
    sampleGreeting: "வணக்கம்! எப்படி இருக்கிறீர்கள்?",
    greetingMeaning: "Vanakkam! How are you?",
    flagEmoji: "🦚",
    accentColor: "#eab308",
    proverb: {
      native: "கற்றது கைமண் அளவு, கல்லாதது உலகளவு.",
      transliteration: "Kattradhu kaiman alavu, kalladhadhu ulagalavu.",
      meaning: "What is learned is like a handful of sand; what remains is like the entire universe."
    }
  },
  {
    code: "te",
    name: "Telugu",
    nativeName: "తెలుగు",
    script: "Telugu Script (తెలుగు లిపి)",
    speakers: "95M+ Speakers",
    region: "Andhra Pradesh & Telangana",
    sampleGreeting: "నమస్కారం! మీరు ఎలా ఉన్నారు?",
    greetingMeaning: "Namaskaram! How are you?",
    flagEmoji: "🌟",
    accentColor: "#3b82f6",
    proverb: {
      native: "చదువురాని వాడు వింత పశువు.",
      transliteration: "Chaduvurani vaadu vintha pashuvu.",
      meaning: "A life enriched with education discovers true human purpose."
    }
  },
  {
    code: "en",
    name: "English",
    nativeName: "English",
    script: "Latin Alphabet",
    speakers: "Global Lingua Franca",
    region: "Worldwide & Pan-India",
    sampleGreeting: "Welcome to VAANISETU!",
    greetingMeaning: "Where language meets learning.",
    flagEmoji: "🌉",
    accentColor: "#0ea5e9",
    proverb: {
      native: "A bridge built with words unites every heart.",
      transliteration: "Vaani Setu",
      meaning: "Inclusive language opens the doors to boundless learning."
    }
  }
];

export const TRANSLATION_DICTIONARY: Record<string, Record<string, string>> = {
  "hello": {
    "Hindi": "नमस्ते (Namaste)",
    "Bengali": "নমস্কার (Nomoshkar)",
    "Odia": "ନମସ୍କାର (Namaskara)",
    "Marathi": "नमस्कार (Namaskar)",
    "Santali": "ᱡᱚᱦᱟᱨ (Johar)",
    "Tamil": "வணக்கம் (Vanakkam)",
    "Telugu": "నమస్కారం (Namaskaram)",
    "English": "Hello"
  },
  "water": {
    "Hindi": "पानी / जल (Paani)",
    "Bengali": "জল (Jôl)",
    "Odia": "ପାଣି (Paani)",
    "Marathi": "पाणी (Pāṇī)",
    "Santali": "ᱫᱟᱜ (Dak')",
    "Tamil": "தண்ணீர் (Thaneer)",
    "Telugu": "నీరు (Neeru)",
    "English": "Water"
  },
  "book": {
    "Hindi": "किताब (Kitaab)",
    "Bengali": "বই (Boi)",
    "Odia": "ବହି (Bahi)",
    "Marathi": "पुस्तक (Pustak)",
    "Santali": "ᱯᱩᱛᱷᱤ (Puthi)",
    "Tamil": "புத்தகம் (Puthagam)",
    "Telugu": "పుస్తకం (Pustakam)",
    "English": "Book"
  },
  "tree": {
    "Hindi": "पेड़ (Ped)",
    "Bengali": "গাছ (Gaachh)",
    "Odia": "ଗଛ (Gachha)",
    "Marathi": "झाड (Jhaad)",
    "Santali": "ᱫᱟᱨᱮ (Dare)",
    "Tamil": "மரம் (Maram)",
    "Telugu": "చెట్టు (Chettu)",
    "English": "Tree"
  },
  "school": {
    "Hindi": "विद्यालय (Vidyalaya)",
    "Bengali": "বিদ্যালয় (Bidyalay)",
    "Odia": "ବିଦ୍ୟାଳୟ (Bidyalaya)",
    "Marathi": "शाळा (Shaala)",
    "Santali": "ᱤᱥᱠᱩᱞ (Iskul)",
    "Tamil": "பள்ளி (Palli)",
    "Telugu": "పాఠశాల (Paathasaala)",
    "English": "School"
  },
  "friend": {
    "Hindi": "दोस्त / मित्र (Dost)",
    "Bengali": "বন্ধু (Bondhu)",
    "Odia": "ସାଙ୍ଗ (Saanga)",
    "Marathi": "मित्र (Mitra)",
    "Santali": "ᱜᱟᱛᱮ (Gate)",
    "Tamil": "நண்பன் (Nanban)",
    "Telugu": "స్నేహితుడు (Snehitudu)",
    "English": "Friend"
  },
  "sun": {
    "Hindi": "सूर्य (Soorya)",
    "Bengali": "সূর্য (Shurjo)",
    "Odia": "ସୂର୍ଯ୍ୟ (Surjya)",
    "Marathi": "सूर्य (Soorya)",
    "Santali": "ᱥᱤᱧ ᱪᱟᱸᱫᱚ (Sin Chando)",
    "Tamil": "சூரியன் (Sooriyan)",
    "Telugu": "సూర్యుడు (Sooryudu)",
    "English": "Sun"
  },
  "mother": {
    "Hindi": "माँ (Maa)",
    "Bengali": "মা (Maa)",
    "Odia": "ମାଆ (Maa)",
    "Marathi": "आई (Aai)",
    "Santali": "ᱟᱭᱳ (Ayo)",
    "Tamil": "அம்மா (Amma)",
    "Telugu": "అమ్మ (Amma)",
    "English": "Mother"
  },
  "thank you": {
    "Hindi": "धन्यवाद (Dhanyavaad)",
    "Bengali": "ধন্যবাদ (Dhonyobad)",
    "Odia": "ଧନ୍ୟବାଦ (Dhanyabada)",
    "Marathi": "धन्यवाद (Dhanyavaad)",
    "Santali": "ᱥᱟᱨᱦᱟᱣ (Sarhaw)",
    "Tamil": "நன்றி (Nandri)",
    "Telugu": "ధన్యవాదాలు (Dhanyavaadaalu)",
    "English": "Thank you"
  },
  "welcome": {
    "Hindi": "स्वागत है (Swagat hai)",
    "Bengali": "স্বাগতম (Shagotom)",
    "Odia": "ସ୍ୱାଗତ (Swagata)",
    "Marathi": "स्वागत आहे (Swagat aahe)",
    "Santali": "ᱥᱟᱹᱜᱩᱱ ᱫᱟᱨᱟᱢ (Sagun Daram)",
    "Tamil": "நல்வரவு (Nalvaravu)",
    "Telugu": "స్వాగతం (Swagatham)",
    "English": "Welcome"
  },
  "good morning": {
    "Hindi": "सुप्रभात (Suprabhat)",
    "Bengali": "সুপ্রভাত (Shuprobhat)",
    "Odia": "ଶୁଭ ସକାଳ (Shubha Sakala)",
    "Marathi": "शुभ प्रभात (Shubh Prabhat)",
    "Santali": "ᱥᱟᱹᱜᱩᱱ ᱥᱮᱛᱟᱜ (Sagun Setag)",
    "Tamil": "காலை வணக்கம் (Kaalai Vanakkam)",
    "Telugu": "శుభోదయం (Shubhodhayam)",
    "English": "Good Morning"
  },
  "learn": {
    "Hindi": "सीखना (Seekhna)",
    "Bengali": "শেখা (Shekha)",
    "Odia": "ଶିଖିବା (Shikhiba)",
    "Marathi": "शिकणे (Shikne)",
    "Santali": "ᱯᱟᱲᱦᱟᱣ (Padhaw)",
    "Tamil": "கற்றல் (Katral)",
    "Telugu": "నేర్చుకోవడం (Nerchukovadam)",
    "English": "Learn"
  }
};

export const BADGES_LIST = [
  {
    id: "badge1",
    title: "First Step",
    description: "Earn your first 10 XP in any learning game",
    icon: "🌱",
    thresholdXP: 10,
    type: "xp"
  },
  {
    id: "badge2",
    title: "Quick Learner",
    description: "Reach 100 XP and master multiple words",
    icon: "⚡",
    thresholdXP: 100,
    type: "xp"
  },
  {
    id: "badge3",
    title: "Brain Master",
    description: "Score 10 correct answers with flying colors",
    icon: "🧠",
    thresholdCorrect: 10,
    type: "correct"
  },
  {
    id: "badge4",
    title: "7-Day Streak",
    description: "Keep your daily language practice active for 7 days",
    icon: "🔥",
    thresholdStreak: 7,
    type: "streak"
  },
  {
    id: "badge5",
    title: "Polyglot Explorer",
    description: "Reach 250 XP across languages",
    icon: "🌉",
    thresholdXP: 250,
    type: "xp"
  },
  {
    id: "badge6",
    title: "Rapid Champion",
    description: "Score 500 XP and conquer the challenges",
    icon: "🏆",
    thresholdXP: 500,
    type: "xp"
  }
];
