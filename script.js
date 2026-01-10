// script.js - Advanced Interactive Game Logic for "Bank Wars"
// AP U.S. History Project by Ivy - January 2026

// Core game state
let gameState = {
  era: 1,
  economicStability: 50,
  politicalTrust: 50,
  inequalityLevel: 50,
  score: 0
};

const maxScore = 100;

// DOM Elements
const startBtn = document.getElementById('startGame');
const gameSection = document.getElementById('game');
const eraTitle = document.getElementById('eraTitle');
const progressBar = document.getElementById('progressBar');
const econBar = document.getElementById('econBar');
const trustBar = document.getElementById('trustBar');
const ineqBar = document.getElementById('ineqBar');
const scenarioText = document.getElementById('scenario');
const choicesDiv = document.getElementById('choices');
const powerRange = document.getElementById('powerRange');
const powerOutput = document.getElementById('powerOutput');
const agreeBtn = document.getElementById('agreeBtn');
const disagreeBtn = document.getElementById('disagreeBtn');
const counterOutput = document.getElementById('counterOutput');
const nextBtn = document.getElementById('nextEra');
const gameResult = document.getElementById('gameResult');

// Historical Eras & Scenarios (based on your research)
const eras = [
  {
    title: "Era 1: Founding the System (1790) – Alexander Hamilton",
    scenario: "As Alexander Hamilton, you propose a powerful national bank to stabilize the young nation after the Revolutionary War debts and economic chaos. How much centralized power should the First Bank have?",
    choices: [
      { text: "Strong national bank with broad powers (high centralization)", delta: { econ: +18, trust: -12, ineq: +15 }, feedback: "The Bank becomes a powerful fiscal agent, regulating currency and credit — but many see it as elitist and favoring Northern merchants." },
      { text: "Moderate national bank with state cooperation", delta: { econ: +12, trust: +5, ineq: +5 }, feedback: "Balanced approach gains some regional support, but critics still fear federal overreach." },
      { text: "Weak bank, mostly state-controlled", delta: { econ: -10, trust: +15, ineq: -8 }, feedback: "States retain control, political trust rises, but national economic instability persists." }
    ]
  },
  {
    title: "Era 2: The Second Bank under Nicholas Biddle (1820s)",
    scenario: "Nicholas Biddle manages the Second Bank effectively — restraining risky state banks and promoting growth. But regional tensions rise. How aggressively should Biddle defend the Bank's charter?",
    choices: [
      { text: "Aggressively defend and expand the Bank's power", delta: { econ: +20, trust: -18, ineq: +20 }, feedback: "Sound management boosts growth, but Jackson portrays it as a 'privileged' institution harming farmers and laborers." },
      { text: "Compromise with regional interests", delta: { econ: +10, trust: +10, ineq: +5 }, feedback: "Some stability is maintained, but the Bank's effectiveness is weakened." },
      { text: "Let states have more control", delta: { econ: -15, trust: +20, ineq: -10 }, feedback: "Political support increases, but financial panics become more likely." }
    ]
  },
  {
    title: "Era 3: Jackson's Bank War (1832)",
    scenario: "Andrew Jackson vetoes the Bank's recharter, calling it elitist and harmful to ordinary Americans. Do you support Jackson's veto as a modern policymaker looking back?",
    choices: [
      { text: "Support Jackson's veto – destroy the Bank", delta: { econ: -25, trust: +25, ineq: -15 }, feedback: "Political trust surges among farmers & workers, but the economy suffers from instability and the Panic of 1837." },
      { text: "Oppose the veto – renew the Bank", delta: { econ: +15, trust: -20, ineq: +18 }, feedback: "Economic stability improves, but deepens regional and class divisions." }
    ]
  },
  {
    title: "Era 4: Birth of the Federal Reserve (1913)",
    scenario: "After repeated panics, the Federal Reserve is created with 12 regional banks, national oversight, and independence from direct political control. How much autonomy should the Fed have?",
    choices: [
      { text: "Strong independence + decentralized structure", delta: { econ: +25, trust: +15, ineq: -10 }, feedback: "The Fed successfully balances power, reduces tensions, and stabilizes the system — especially during crises like 2008." },
      { text: "More political control over the Fed", delta: { econ: +5, trust: -10, ineq: +15 }, feedback: "Short-term political popularity rises, but long-term stability and credibility suffer." }
    ]
  }
];

// Update UI meters
function updateMeters() {
  econBar.style.width = gameState.economicStability + "%";
  econBar.textContent = Math.round(gameState.economicStability) + "%";

  trustBar.style.width = gameState.politicalTrust + "%";
  trustBar.textContent = Math.round(gameState.politicalTrust) + "%";

  ineqBar.style.width = gameState.inequalityLevel + "%";
  ineqBar.textContent = Math.round(gameState.inequalityLevel) + "%";

  // Progress through eras
  const progress = ((gameState.era - 1) / eras.length) * 100;
  progressBar.style.width = progress + "%";
}

// Load current era
function loadEra() {
  const current = eras[gameState.era - 1];
  eraTitle.textContent = current.title;
  scenarioText.textContent = current.scenario;

  choicesDiv.innerHTML = "";
  current.choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-primary btn-lg";
    btn.textContent = choice.text;
    btn.addEventListener("click", () => makeChoice(choice, index));
    choicesDiv.appendChild(btn);
  });

  nextBtn.classList.add("d-none");
  gameResult.textContent = "";
}

// Make a decision
function makeChoice(choice, index) {
  // Apply deltas (clamped 0-100)
  gameState.economicStability = Math.max(0, Math.min(100, gameState.economicStability + choice.delta.econ));
  gameState.politicalTrust = Math.max(0, Math.min(100, gameState.politicalTrust + choice.delta.trust));
  gameState.inequalityLevel = Math.max(0, Math.min(100, gameState.inequalityLevel + choice.delta.ineq));

  gameState.score += (choice.delta.econ * 0.4 + choice.delta.trust * 0.4 - choice.delta.ineq * 0.2);

  updateMeters();

  // Show feedback
  alert(choice.feedback + "\n\nEconomic Stability: " + choice.delta.econ + "\nPolitical Trust: " + choice.delta.trust + "\nInequality: " + choice.delta.ineq);

  // Move to next era or end game
  gameState.era++;
  if (gameState.era > eras.length) {
    endGame();
  } else {
    nextBtn.classList.remove("d-none");
  }
}

// End game & show result
function endGame() {
  choicesDiv.innerHTML = "";
  nextBtn.classList.add("d-none");

  let ending = "";
  if (gameState.economicStability > 80 && gameState.politicalTrust > 70) {
    ending = "Historic Success! You created a stable, trusted financial system like the modern Federal Reserve.";
    gameState.score += 30;
  } else if (gameState.economicStability < 40) {
    ending = "Collapse! Repeated panics and instability plagued the nation under your decisions.";
  } else if (gameState.politicalTrust < 40) {
    ending = "Political Disaster! Massive backlash and division destroyed the system.";
  } else {
    ending = "Mixed Result. You achieved some stability, but deep divisions and tensions remained.";
  }

  gameResult.innerHTML = `<h4 class="text-center">${ending}</h4>
    <p class="text-center fs-4">Final Score: ${Math.round(gameState.score)} / ${maxScore}<br>
    Stability: ${Math.round(gameState.economicStability)}% | Trust: ${Math.round(gameState.politicalTrust)}% | Inequality: ${Math.round(gameState.inequalityLevel)}%</p>`;
}

// Power Range Slider (enhanced with historical context)
powerRange.addEventListener("input", () => {
  const value = parseInt(powerRange.value);
  let message = `Power Level: ${value}`;

  if (value >= 80) {
    message += " — High centralization (Hamilton/Biddle style): Great economic power, but high risk of political rebellion.";
  } else if (value >= 60) {
    message += " — Moderate centralization: Balanced growth with some regional tensions.";
  } else if (value >= 40) {
    message += " — Balanced approach: Stability with reasonable political acceptance.";
  } else if (value >= 20) {
    message += " — Limited central power: High political trust, but weaker national economy.";
  } else {
    message += " — Almost no central bank: Maximum political support, frequent financial crises.";
  }

  powerOutput.textContent = message;
});

// Jackson Agree/Disagree (from your research)
agreeBtn.addEventListener("click", () => {
  counterOutput.textContent = "You agree with Jackson: The Bank was seen as elitist, privileged, and harmful to farmers, laborers, and Western/Southern states — even if it provided economic benefits.";
  counterOutput.className = "mt-3 text-success fst-italic";
});

disagreeBtn.addEventListener("click", () => {
  counterOutput.textContent = "You disagree: Despite political attacks, the Bank's regulation of credit and currency reduced financial volatility and supported national growth.";
  counterOutput.className = "mt-3 text-danger fst-italic";
});

// Start & Next
startBtn.addEventListener("click", () => {
  document.getElementById('intro').classList.add('d-none');
  gameSection.classList.remove('d-none');
  updateMeters();
  loadEra();
});

nextBtn.addEventListener("click", () => {
  loadEra();
});
