/* =========================
   🎵 Background Music
========================= */
const bgm = document.getElementById("bgm");
let musicPlayed = false;

function playMusic() {
  if (!musicPlayed && bgm) {
    bgm.play().catch(() => {});
    musicPlayed = true;
  }
}

/* =========================
   🎀 Personalised Name
========================= */
const params = new URLSearchParams(window.location.search);
const personName = params.get("name");

const questionHeading = document.getElementById("question-heading");
if (personName) {
  questionHeading.innerText = `${personName}, will you be my Valentine? ❤️`;
}

/* =========================
   🌍 Language Data
========================= */
const answers_no = {
  english: [
    "No",
    "Are you sure?",
    "Are you really sure??",
    "Think again?",
    "Please give me a chance!",
    "Ok… let’s start over 😭"
  ],
  malayalam: [
    "ഇല്ല",
    "ശരിക്കുമോ?",
    "ഒരിക്കൽ കൂടി ചിന്തിക്കൂ?",
    "ദയവായി 🥺",
    "ഒരു അവസരം തരുമോ?",
    "ശരി… വീണ്ടും തുടങ്ങാം 😭"
  ],
  tamil: [
    "இல்லை",
    "நிச்சயமா?",
    "மறுபடியும் யோசிக்கலாமா?",
    "தயவு செய்து 🥺",
    "ஒரு வாய்ப்பு தாருங்கள்?",
    "சரி… மீண்டும் தொடங்கலாம் 😭"
  ],
  telugu: [
    "కాదు",
    "నిజమేనా?",
    "మళ్లీ ఆలోచించవచ్చా?",
    "దయచేసి 🥺",
    "ఒక అవకాశం ఇవ్వు?",
    "సరే… మళ్లీ మొదలుపెడదాం 😭"
  ],
  hindi: [
    "नहीं",
    "पक्का?",
    "फिर से सोच लो?",
    "प्लीज़ 🥺",
    "एक मौका दोगी?",
    "ठीक है… फिर से शुरू करें 😭"
  ]
};

const answers_yes = {
  english: "Yes",
  malayalam: "അതെ",
  tamil: "ஆம்",
  telugu: "అవును",
  hindi: "हाँ"
};

/* =========================
   🔘 Buttons & State
========================= */
const no_button = document.getElementById("no-button");
const yes_button = document.getElementById("yes-button");

let language = "english";
let index = 1;
let clicks = 0;

/* YES button sizing (BIG & DRAMATIC 😈) */
const INITIAL_YES_HEIGHT = 60;
const INITIAL_YES_WIDTH = 120;
let size = INITIAL_YES_HEIGHT;
const MAX_SIZE = 420;

/* Apply initial size */
yes_button.style.height = `${INITIAL_YES_HEIGHT}px`;
yes_button.style.width = `${INITIAL_YES_WIDTH}px`;

/* =========================
   ❌ NO BUTTON LOGIC
========================= */
no_button.addEventListener("click", () => {
  playMusic();

  const banner = document.getElementById("banner");
  if (clicks === 0) {
    banner.src = "public/images/no.gif";
    refreshBanner();
  }

  clicks++;

  /* 🔥 Grow YES button FAST */
  size += Math.floor(Math.random() * 40) + 20;
  if (size > MAX_SIZE) size = MAX_SIZE;

  yes_button.style.height = `${size}px`;
  yes_button.style.width = `${size}px`;

  /* Change NO text */
  if (index < answers_no[language].length) {
    no_button.innerText = answers_no[language][index];
    index++;
  } else {
    /* Reset cycle */
    index = 1;
    size = INITIAL_YES_HEIGHT;

    no_button.innerText = answers_no[language][0];
    yes_button.innerText = answers_yes[language];

    yes_button.style.height = `${INITIAL_YES_HEIGHT}px`;
    yes_button.style.width = `${INITIAL_YES_WIDTH}px`;
  }
});

/* =========================
   ✅ YES BUTTON LOGIC
========================= */
yes_button.addEventListener("click", () => {
  playMusic();

  const banner = document.getElementById("banner");
  banner.src = "public/images/yes.gif";
  refreshBanner();

  document.querySelector(".buttons").style.display = "none";
  document.querySelector(".message").style.display = "block";
});

/* =========================
   🔄 Refresh GIF
========================= */
function refreshBanner() {
  const banner = document.getElementById("banner");
  const src = banner.src;
  banner.src = "";
  banner.src = src;
}

/* =========================
   🌐 Language Switch
========================= */
function changeLanguage() {
  const select = document.getElementById("language-select");
  language = select.value;

  const textMap = {
    english: "will you be my Valentine?",
    malayalam: "നീ എന്റെ വാലന്റൈൻ ആകുമോ?",
    tamil: "நீ என் காதலர் ஆகுவாயா?",
    telugu: "నువ్వు నా వాలెంటైన్ అవుతావా?",
    hindi: "क्या तुम मेरी वैलेंटाइन बनोगी?"
  };

  questionHeading.innerText = personName
    ? `${personName}, ${textMap[language]}`
    : textMap[language];

  yes_button.innerText = answers_yes[language];
  no_button.innerText = answers_no[language][0];

  /* Reset YES button size */
  size = INITIAL_YES_HEIGHT;
  index = 1;

  yes_button.style.height = `${INITIAL_YES_HEIGHT}px`;
  yes_button.style.width = `${INITIAL_YES_WIDTH}px`;

  document.getElementById("success-message").innerText =
    language === "english"
      ? "Yepppie, see you sooonnn :3"
      : "❤️🥹❤️";
}
