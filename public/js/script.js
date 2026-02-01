/* 🎵 Background Music */
const bgm = document.getElementById("bgm");
let musicPlayed = false;

function playMusic() {
  if (!musicPlayed) {
    bgm.play().catch(() => {});
    musicPlayed = true;
  }
}

/* 🎀 Personalised Name from URL */
const params = new URLSearchParams(window.location.search);
const personName = params.get("name");

const questionHeading = document.getElementById("question-heading");
if (personName) {
  questionHeading.innerText = `${personName}, will you be my Valentine? ❤️`;
}

/* 🌍 Language Data */
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

let language = "english";
let i = 1;
let size = 50;
let clicks = 0;

const no_button = document.getElementById("no-button");
const yes_button = document.getElementById("yes-button");

/* ❌ NO BUTTON LOGIC */
no_button.addEventListener("click", () => {
  playMusic();

  let banner = document.getElementById("banner");
  if (clicks === 0) {
    banner.src = "public/images/no.gif";
    refreshBanner();
  }

  clicks++;

  size += Math.floor(Math.random() * 20);
  yes_button.style.height = `${size}px`;
  yes_button.style.width = `${size}px`;

  if (i < answers_no[language].length) {
    no_button.innerText = answers_no[language][i];
    i++;
  } else {
    i = 1;
    size = 50;
    no_button.innerText = answers_no[language][0];
    yes_button.innerText = answers_yes[language];
    yes_button.style.height = "auto";
    yes_button.style.width = "auto";
  }
});

/* ✅ YES BUTTON */
yes_button.addEventListener("click", () => {
  playMusic();

  let banner = document.getElementById("banner");
  banner.src = "public/images/yes.gif";
  refreshBanner();

  document.querySelector(".buttons").style.display = "none";
  document.querySelector(".message").style.display = "block";
});

/* 🔄 Reload GIF */
function refreshBanner() {
  let banner = document.getElementById("banner");
  const src = banner.src;
  banner.src = "";
  banner.src = src;
}

/* 🌐 Language Switch */
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

  document.getElementById("success-message").innerText =
    language === "english"
      ? "Yepppie, see you sooonnn :3"
      : "❤️🥹❤️";
}

