// script.js - Bank Wars Game 
document.addEventListener("DOMContentLoaded", function() {
  // Core game state
  let gameState = {
    era: 1,
    economicStability: 50,
    politicalTrust: 50,
    inequalityLevel: 50,
    score: 0
  };

  const maxScore = 100;

  // DOM Elements (now guaranteed to exist)
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

  // Add safety checks
  if (!startBtn) {
    console.error("Start Game button (#startGame) not found!");
    return;
  }

  // ... (rest of your eras array, updateMeters(), loadEra(), makeChoice(), endGame() functions remain the same)

  // Power slider
  if (powerRange && powerOutput) {
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
  }

  // Jackson buttons
  if (agreeBtn && disagreeBtn && counterOutput) {
    agreeBtn.addEventListener("click", () => {
      counterOutput.textContent = "You agree with Jackson: The Bank was seen as elitist, privileged, and harmful to farmers, laborers, and Western/Southern states — even if it provided economic benefits.";
      counterOutput.className = "mt-3 text-success fst-italic";
    });

    disagreeBtn.addEventListener("click", () => {
      counterOutput.textContent = "You disagree: Despite political attacks, the Bank's regulation of credit and currency reduced financial volatility and supported national growth.";
      counterOutput.className = "mt-3 text-danger fst-italic";
    });
  }

  // Start button
  startBtn.addEventListener("click", () => {
    const introSection = document.getElementById('intro');
    if (introSection) introSection.classList.add('d-none');
    if (gameSection) gameSection.classList.remove('d-none');
    updateMeters();
    loadEra();
  });

  // Next era
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      loadEra();
    });
  }

  console.log("Bank Wars game initialized successfully! Click 'Start Game' now.");
});
