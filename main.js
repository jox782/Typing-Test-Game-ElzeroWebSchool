/*
  Advices
  - Always Check The Console
  - Take Your Time To Name The Identifiers
  - DRY

  Steps To Create The Project
  [01] Create HTML Markup
  [02] Add Styling And Separate From Logic
  [03] Create The App Logic
  ---- [01] Add Levels
  ---- [02] Show Level And Seconds
  ---- [03] Add Array Of Words
  ---- [04] ِAdd Start Game Button
  ---- [05] Generate Upcoming Words
  ---- [06] Disable Copy Word And Paste Event + Focus On Input
  ---- [07] Start Play Function
  ---- [08] Start The Time And Count Score
  ---- [09] Add The Error And Success Messages
  [04] Your Trainings To Add Features
  ---- [01] Save Score To Local Storage With Date
  ---- [02] Choose Levels From Select Box
  ---- [03] Break The Logic To More Functions
  ---- [04] Choose Array Of Words For Every Level
  ---- [05] Write Game Instruction With Dynamic Values
  ---- [06] Add 3 Seconds For The First Word
*/

// Array Of Words
let words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Electrode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

// Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let UpcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let difficultly = document.querySelector(".difficulty select");
let localStorageDate = document.querySelector(".local-storage .date");
let localStorageScore = document.querySelector(".local-storage .score");
let startTimer = document.querySelector(".get-ready");

//Save Date and score from local storage
let lastDate = new Date(window.localStorage.getItem("date"));
let lastScore = window.localStorage.getItem("lastScore");

//get from local Storage
localStorageDate.innerHTML = lastDate;
localStorageScore.innerHTML = lastScore;
// Setting Levels
const lvls = {
  easy: 5,
  normal: 4,
  hard: 2,
};
// Default Level EX
let defaultLevelName = "normal"; //Change Level From Here
let defaultLevelSeconds = lvls[defaultLevelName];

// Change Difficulty
difficultly.addEventListener("change", function (e) {
  selectDiff();
});

// Default Setting Level Name + Seconds + Score
selectDiff();

// difficulty
function selectDiff() {
  defaultLevelName = difficultly.value;
  defaultLevelSeconds = lvls[defaultLevelName];
  lvlNameSpan.innerHTML = defaultLevelName;
  secondsSpan.innerHTML = defaultLevelSeconds;
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  if (defaultLevelName === "hard") {
    words = ["Programming", "Destructuring", "Documentation", "Dependencies"];
  }
  scoreTotal.innerHTML = words.length;
}
// Disable Paste Events
input.onpaste = function () {
  return false;
};

// Start Game
startButton.onclick = function () {
  this.remove();
  input.focus();
  getReady();
};

// Get Ready Function
function getReady() {
  let intervalTimer = setInterval(() => {
    startTimer.innerHTML--;
    if (startTimer.innerHTML === "0") {
      clearInterval(intervalTimer);
      // Generate Word Function
      genWords();
    }
  }, 1000);
}

function genWords() {
  // Get Random Word From Array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // Get Word Index
  let wordIndex = words.indexOf(randomWord);
  // Remove WordFrom Array
  words.splice(wordIndex, 1);
  // Show the Random word
  theWord.innerHTML = randomWord;
  // Empty Upcoming Words
  UpcomingWords.innerHTML = "";
  // Generate Words
  for (let i = 0; i < words.length; i++) {
    // Create Div Element
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    UpcomingWords.appendChild(div);
  }
  // Start Play Function
  startPlay();
}

function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      // Stop Timer
      clearInterval(start);
      // Compare Words

      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        //Empty Input Field
        input.value = "";
        // Increase Score
        scoreGot.innerHTML++;
        if (words.length > 0) {
          // Call Generate Word Function
          genWords();
        } else {
          // WIN
          endGame("good", "Congratz");
        }
      } else {
        // LOSE
        endGame("bad", "game over");
      }
    }
  }, 1000);
}

// End Game
function endGame(cN, st) {
  let span = document.createElement("span");
  span.className = cN;
  let spanText = document.createTextNode(st);
  span.appendChild(spanText);
  finishMessage.appendChild(span);
  window.localStorage.setItem("lastScore", scoreGot.innerHTML);
  window.localStorage.setItem("date", new Date());
}
