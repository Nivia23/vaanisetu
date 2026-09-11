/* =========================
   VAANISETU LEARNING ENGINE
========================= */

let data = JSON.parse(localStorage.getItem("vaanisetu")) || {
  xp: 0,
  correct: 0,
  attempts: 0,
  streak: 0,
  lastDay: ""
};


/* ---------- SAVE ---------- */

function save() {
  localStorage.setItem("vaanisetu", JSON.stringify(data));
  updateStats();
}


/* ---------- XP ---------- */

function addXP(amount) {
  data.xp += amount;
  save();
}


/* ---------- STATS ---------- */

function updateStats() {

  let level = Math.floor(data.xp / 100) + 1;

  let accuracy = data.attempts
    ? Math.round((data.correct / data.attempts) * 100)
    : 0;

  document.getElementById("xp").textContent = data.xp;
  document.getElementById("level").textContent = level;
  document.getElementById("accuracy").textContent = accuracy + "%";
  document.getElementById("streak").textContent = data.streak;

  document.getElementById("heroXP").textContent = data.xp;
  document.getElementById("heroLevel").textContent = level;
  document.getElementById("heroStreak").textContent = data.streak;

  document.getElementById("progressXP").textContent = data.xp;
  document.getElementById("progressLevel").textContent = level;

  let progress = data.xp % 100;
  document.getElementById("progressFill").style.width = progress + "%";

  checkBadges();
}


/* ---------- NAVIGATION ---------- */

function goTo(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
}


/* ---------- STREAK ---------- */

function updateStreak() {

  let today = new Date().toDateString();

  if (data.lastDay !== today) {

    if (data.lastDay) {
      let previous = new Date(data.lastDay);
      let current = new Date(today);

      let difference =
        (current - previous) / (1000 * 60 * 60 * 24);

      if (difference === 1)
        data.streak++;
      else
        data.streak = 1;

    } else {
      data.streak = 1;
    }

    data.lastDay = today;
    save();
  }
}


/* ---------- BADGES ---------- */

function checkBadges() {

  if (data.xp >= 10)
    document.getElementById("badge1").classList.remove("locked");

  if (data.xp >= 100)
    document.getElementById("badge2").classList.remove("locked");

  if (data.correct >= 10)
    document.getElementById("badge3").classList.remove("locked");

  if (data.streak >= 7)
    document.getElementById("badge4").classList.remove("locked");
}


/* =========================
   FLASHCARDS
========================= */

const cards = [
  ["Water 💧", "Something we drink"],
  ["Book 📖", "Something we read"],
  ["Tree 🌳", "A tall plant"],
  ["School 🏫", "A place where students learn"],
  ["Sun ☀️", "The star that gives us light"],
  ["Friend 🤝", "Someone who cares about you"]
];

let cardIndex = 0;

function startFlashcards() {
  showGame("flashcards");
  goTo("games");
}

function flipCard() {
  document.getElementById("cardFront").classList.toggle("hidden");
  document.getElementById("cardBack").classList.toggle("hidden");
}

function cardAnswer(gotIt) {

  if (gotIt) {
    addXP(10);
  }

  cardIndex++;

  if (cardIndex >= cards.length)
    cardIndex = 0;

  document.getElementById("cardFront").classList.remove("hidden");
  document.getElementById("cardBack").classList.add("hidden");

  document.querySelector("#cardFront h1").textContent =
    cards[cardIndex][0];

  document.querySelector("#cardBack h1").textContent =
    cards[cardIndex][1];

  updateStreak();
}


/* =========================
   WORD PUZZLE
========================= */

const puzzleWords = [
  "SCHOOL",
  "WATER",
  "BOOK",
  "TREE",
  "FRIEND",
  "LEARN",
  "LANGUAGE",
  "STUDENT"
];

let puzzleWord = "";

function startPuzzle() {
  showGame("puzzle");
  newPuzzle();
  goTo("games");
}

function shuffle(word) {

  return word
    .split("")
    .sort(() => Math.random() - .5)
    .join("");
}

function newPuzzle() {

  puzzleWord =
    puzzleWords[Math.floor(Math.random() * puzzleWords.length)];

  let scrambled = shuffle(puzzleWord);

  if (scrambled === puzzleWord)
    scrambled = shuffle(puzzleWord);

  document.getElementById("scramble").textContent = scrambled;
  document.getElementById("puzzleInput").value = "";
  document.getElementById("puzzleResult").textContent = "";
}

function checkPuzzle() {

  let answer =
    document.getElementById("puzzleInput").value
      .trim()
      .toUpperCase();

  data.attempts++;

  if (answer === puzzleWord) {

    data.correct++;
    addXP(15);

    document.getElementById("puzzleResult").textContent =
      "🎉 Correct! +15 XP";

  } else {

    save();

    document.getElementById("puzzleResult").textContent =
      "❌ Not quite! Try again.";
  }

  updateStreak();
}


/* =========================
   MATCH GAME
========================= */

function startMatch() {
  showGame("match");
  goTo("games");
}

function matchAnswer(choice) {

  data.attempts++;

  if (choice === 1) {

    data.correct++;
    addXP(15);

    document.getElementById("matchResult").textContent =
      "🎯 Perfect match! +15 XP";

  } else {

    save();

    document.getElementById("matchResult").textContent =
      "❌ Try again!";
  }

  updateStreak();
}


/* =========================
   MEMORY GAME
========================= */

const memoryList = [
  ["Water", "Book", "Tree"],
  ["Sun", "School", "Friend", "Book"],
  ["Tree", "Water", "Student", "Learn", "School"]
];

let memoryCurrent = [];

function startMemory() {

  showGame("memory");

  memoryCurrent =
    memoryList[Math.floor(Math.random() * memoryList.length)];

  document.getElementById("memoryWords").innerHTML =
    memoryCurrent
      .map(word => `<span>${word}</span>`)
      .join("");

  document.getElementById("memoryAnswer").classList.add("hidden");

  goTo("games");
}

function hideMemory() {
  document.getElementById("memoryWords").innerHTML =
    "<b>👀 The words are hidden!</b>";

  document.getElementById("memoryAnswer").classList.remove("hidden");
}

function checkMemory() {

  let answer =
    document.getElementById("memoryInput").value
      .trim()
      .toLowerCase();

  let correctAnswer =
    memoryCurrent.join(" ").toLowerCase();

  data.attempts++;

  if (answer === correctAnswer) {

    data.correct++;
    addXP(25);

    document.getElementById("memoryResult").textContent =
      "🧠 Amazing memory! +25 XP";

  } else {

    save();

    document.getElementById("memoryResult").textContent =
      "❌ Almost! The order was: " +
      memoryCurrent.join(" → ");
  }

  updateStreak();
}


/* =========================
   RAPID FIRE
========================= */

const rapidQuestions = [
  {
    q: "What do we use to read?",
    a: ["Book", "Tree", "Water"],
    correct: 0
  },
  {
    q: "Which one grows from the ground?",
    a: ["Book", "Tree", "School"],
    correct: 1
  },
  {
    q: "Where do students learn?",
    a: ["School", "River", "Tree"],
    correct: 0
  },
  {
    q: "Which one can we drink?",
    a: ["Water", "Book", "Sun"],
    correct: 0
  },
  {
    q: "Which one gives us light?",
    a: ["Sun", "Book", "School"],
    correct: 0
  }
];

let rapidTime = 30;
let rapidScore = 0;
let rapidCurrent = 0;
let rapidInterval;

function startRapidFire() {

  rapidTime = 30;
  rapidScore = 0;
  rapidCurrent = 0;

  clearInterval(rapidInterval);

  document.getElementById("rapidScore").textContent = "";

  rapidInterval = setInterval(() => {

    rapidTime--;

    document.getElementById("timer").textContent =
      rapidTime;

    if (rapidTime <= 0) {

      clearInterval(rapidInterval);

      document.getElementById("rapidQuestion").textContent =
        "⏰ Time's Up!";

      document.getElementById("rapidAnswers").innerHTML = "";

      document.getElementById("rapidScore").textContent =
        "🏆 You scored " + rapidScore + " points!";

      addXP(rapidScore * 5);

    }

  }, 1000);

  showRapidQuestion();
}

function showRapidQuestion() {

  let item =
    rapidQuestions[
      rapidCurrent % rapidQuestions.length
    ];

  document.getElementById("rapidQuestion").textContent =
    item.q;

  document.getElementById("rapidAnswers").innerHTML =
    item.a.map((answer, index) =>
      `<button onclick="rapidAnswer(${index})">${answer}</button>`
    ).join("");
}

function rapidAnswer(choice) {

  let item =
    rapidQuestions[
      rapidCurrent % rapidQuestions.length
    ];

  data.attempts++;

  if (choice === item.correct) {

    data.correct++;
    rapidScore++;
    addXP(5);

  } else {

    save();
  }

  rapidCurrent++;

  if (rapidTime > 0)
    showRapidQuestion();

  updateStreak();
}


/* =========================
   QUIZ
========================= */

const quizQuestions = [
  {
    q: "Which one is used for reading?",
    a: ["Book 📖", "Water 💧", "Tree 🌳"],
    correct: 0
  },
  {
    q: "Which one is a living plant?",
    a: ["Book", "Tree", "School"],
    correct: 1
  },
  {
    q: "Where do students learn?",
    a: ["School", "River", "Sun"],
    correct: 0
  },
  {
    q: "Which one can we drink?",
    a: ["Water", "Book", "Tree"],
    correct: 0
  },
  {
    q: "What gives us daylight?",
    a: ["Sun", "Book", "School"],
    correct: 0
  }
];

let quizIndex = 0;
let quizScore = 0;

function loadQuiz() {

  let q = quizQuestions[quizIndex];

  document.getElementById("questionNumber").textContent =
    `Question ${quizIndex + 1}/${quizQuestions.length}`;

  document.getElementById("quizQuestion").textContent =
    q.q;

  document.getElementById("quizAnswers").innerHTML =
    q.a.map((answer, index) =>
      `<button onclick="quizAnswer(${index})">${answer}</button>`
    ).join("");

  document.getElementById("nextBtn").classList.add("hidden");
}

function quizAnswer(choice) {

  let q = quizQuestions[quizIndex];

  let buttons =
    document.querySelectorAll("#quizAnswers button");

  buttons.forEach(button => {
    button.disabled = true;
  });

  data.attempts++;

  if (choice === q.correct) {

    data.correct++;
    quizScore++;

    addXP(10);

    document.getElementById("quizResult").textContent =
      "🎉 Correct! +10 XP";

  } else {

    save();

    document.getElementById("quizResult").textContent =
      "❌ Not quite. Keep learning!";
  }

  document.getElementById("nextBtn").classList.remove("hidden");

  updateStreak();
}

function nextQuestion() {

  quizIndex++;

  if (quizIndex >= quizQuestions.length) {

    document.getElementById("quizQuestion").textContent =
      "🏆 Challenge Complete!";

    document.getElementById("quizAnswers").innerHTML = "";

    document.getElementById("nextBtn").classList.add("hidden");

    document.getElementById("quizResult").textContent =
      `You scored ${quizScore}/${quizQuestions.length}! 🎉`;

    quizIndex = 0;
    quizScore = 0;

    return;
  }

  document.getElementById("quizResult").textContent = "";

  loadQuiz();
}


/* =========================
   GAME SWITCHER
========================= */

function showGame(id) {

  document.querySelectorAll(".game").forEach(game => {
    game.classList.add("hidden");
  });

  document.getElementById(id).classList.remove("hidden");
}


/* =========================
   START
========================= */

updateStreak();
updateStats();
loadQuiz();
newPuzzle();
    