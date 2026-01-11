// script.js - Bank Wars: America's Financial Destiny (COMPLETE & FIXED)
// APUSH Project - Ivy - January 12, 2026

document.addEventListener("DOMContentLoaded", function () {
  console.log("Bank Wars Game fully initialized!");

  // Game State
  let gameState = {
    era: 1,
    economicStability: 50,
    politicalTrust: 50,
    inequalityLevel: 50,
    score: 0
  };

  const maxScore = 100;

  // DOM Elements
  const startBtn = document.getElementById("startGame");
  const introSection = document.getElementById("intro");
  const gameSection = document.getElementById("game");
  const eraTitle = document.getElementById("eraTitle");
  const progressBar = document.getElementById("progressBar");
  const econBar = document.getElementById("econBar");
  const trustBar = document.getElementById("trustBar");
  const ineqBar = document.getElementById("ineqBar");
  const scenarioText = document.getElementById("scenario");
  const choicesDiv = document.getElementById("choices");
  const nextBtn = document.getElementById("nextEra");
  const gameResult = document.getElementById("gameResult");

  // Power Slider & Jackson Buttons (optional elements)
  const powerRange = document.getElementById("powerRange");
  const powerOutput = document.getElementById("powerOutput");
  const agreeBtn = document.getElementById("agreeBtn");
  const disagreeBtn = document.getElementById("disagreeBtn");
  const counterOutput = document.getElementById("counterOutput");

  // Safety check for required elements
  if (!startBtn || !gameSection || !introSection) {
    console.error("Critical elements missing! Check your HTML IDs.");
    return;
  }

  // Historical Eras (based on your APUSH research)
  const eras = [
    {
      title: "Era 1: Founding the System (1790) – Alexander Hamilton",
      scenario: "The young nation faces debts, no uniform currency, and weak credit. As Hamilton, you propose a national bank. How powerful should it be?",
      choices: [
        {
          text: "Very strong national bank (high centralization)",
          delta: { econ: +18, trust: -12, ineq: +15 },
          feedback: "The Bank regulates currency and restrains risky state banks → strong economic growth, but many fear elitism and Northern favoritism."
        },
        {
          text: "Moderate national bank with state input",
          delta: { econ: +10, trust: +5, ineq: +5 },
          feedback: "Some stability achieved, but limited power makes it harder to control national credit."
        },
        {
          text: "Weak, mostly state-controlled bank",
          delta: { econ: -12, trust: +15, ineq: -8 },
          feedback: "Political trust rises, but the nation struggles with economic instability and no strong federal fiscal agent."
        }
      ]
    },
    {
      title: "Era 2: The Second Bank under Nicholas Biddle (1820s–1830s)",
      scenario: "Biddle manages the Second Bank well — restraining state banks and promoting growth. But regional tensions grow. How aggressively do you defend the Bank's charter?",
      choices: [
        {
          text: "Aggressively defend and expand the Bank's power",
          delta: { econ: +20, trust: -18, ineq: +20 },
          feedback: "Sound management boosts economic growth, but Jackson portrays it as a privileged, elitist institution harming farmers and laborers."
        },
        {
          text: "Compromise with regional and state interests",
          delta: { econ: +8, trust: +10, ineq: +5 },
          feedback: "Some political support gained, but the Bank's effectiveness is reduced."
        },
        {
          text: "Allow more state control over banking",
          delta: { econ: -15, trust: +18, ineq: -10 },
          feedback: "Political trust rises among states, but national financial stability suffers."
        }
      ]
    },
    {
      title: "Era 3: Jackson's Bank War (1832)",
      scenario: "Jackson vetoes the recharter, calling the Bank elitist and harmful to ordinary citizens. Do you support destroying the Second Bank?",
      choices: [
        {
          text: "Support Jackson – veto and destroy the Bank",
          delta: { econ: -25, trust: +25, ineq: -15 },
          feedback: "Political trust surges among farmers and workers, but the economy faces instability (leading to the Panic of 1837)."
        },
        {
          text: "Oppose the veto – renew the Bank's charter",
          delta: { econ: +15, trust: -20, ineq: +18 },
          feedback: "Economic stability improves, but deepens regional and class divisions — seen as favoring the rich and powerful."
        }
      ]
    },
    {
      title: "Era 4: Birth of the Federal Reserve (1913)",
      scenario: "Repeated panics show the need for a new system. The Federal Reserve is created with 12 regional banks, national oversight, and independence. How much autonomy should it have?",
      choices: [
        {
          text: "Strong independence + decentralized regional structure",
          delta: { econ: +25, trust: +15, ineq: -10 },
          feedback: "Tensions are reduced! The Fed balances national power with regional representation → flexible crisis response (e.g., 2008) and long-term stability."
        },
        {
          text: "More direct political control over the Fed",
          delta: { econ: +5, trust: -10, ineq: +15 },
          feedback: "Short-term political popularity, but risks long-term credibility and effectiveness of the central system."
        }
      ]
    }
  ];

  // Update progress and meters
  function updateMeters() {
    econBar.style.width = gameState.economicStability + "%";
    econBar.textContent = Math.round(gameState.economicStability) + "%";
    trustBar.style.width = gameState.politicalTrust + "%";
    trustBar.textContent = Math.round(gameState.politicalTrust) + "%";
    ineqBar.style.width = gameState.inequalityLevel + "%";
    ineqBar.textContent = Math.round(gameState.inequalityLevel) + "%";

    const progress = ((gameState.era - 1) / eras.length) * 100;
    progressBar.style.width = progress + "%";
  }

  // Load current era
  function loadEra() {
    if (gameState.era > eras.length) {
      endGame();
      return;
    }

    const current = eras[gameState.era - 1];
    eraTitle.textContent = current.title;
    scenarioText.textContent = current.scenario;

    choicesDiv.innerHTML = "";
    current.choices.forEach((choice) => {
      const btn = document.createElement("button");
      btn.className = "btn btn-outline-primary btn-lg m-2";
      btn.textContent = choice.text;
      btn.addEventListener("click", () => makeChoice(choice));
      choicesDiv.appendChild(btn);
    });

    nextBtn.classList.add("d-none");
    gameResult.textContent = "";
  }

  // Handle player choice
  function makeChoice(choice) {
    gameState.economicStability = Math.max(0, Math.min(100, gameState.economicStability + choice.delta.econ));
    gameState.politicalTrust = Math.max(0, Math.min(100, gameState.politicalTrust + choice.delta.trust));
    gameState.inequalityLevel = Math.max(0, Math.min(100, gameState.inequalityLevel + choice.delta.ineq));

    gameState.score += (choice.delta.econ * 0.4 + choice.delta.trust * 0.4 - choice.delta.ineq * 0.2);

    updateMeters();

    alert(choice.feedback);

    nextBtn.classList.remove("d-none");
  }

  // End game with final screen
  function endGame() {
    choicesDiv.innerHTML = "";
    nextBtn.classList.add("d-none");

    let endingMessage = "";
    if (gameState.economicStability >= 80 && gameState.politicalTrust >= 70) {
      endingMessage = "Outstanding Success!<br>You created a stable, trusted, and relatively equitable financial system — much like the modern Federal Reserve overcame early tensions.";
      gameState.score += 30;
    } else if (gameState.economicStability < 40) {
      endingMessage = "Economic Disaster!<br>Repeated financial panics and instability plagued the nation under your decisions.";
    } else if (gameState.politicalTrust < 40) {
      endingMessage = "Political Collapse!<br>Massive backlash and regional divisions destroyed the system.";
    } else if (gameState.inequalityLevel > 70) {
      endingMessage = "Deep Inequality!<br>Your choices entrenched elitism and regional divides — tensions were never fully resolved.";
    } else {
      endingMessage = "Mixed Outcome<br>You achieved partial stability, but political divisions and inequality remained significant challenges.";
    }

    gameResult.innerHTML = `
      <h3 class="text-center mb-4">Game Complete!</h3>
      <div class="alert alert-info text-center">
        ${endingMessage}
      </div>
      <p class="text-center fs-4 fw-bold">
        Final Score: ${Math.round(gameState.score)} / ${maxScore}<br>
        <small>Economic Stability: ${Math.round(gameState.economicStability)}% | 
        Political Trust: ${Math.round(gameState.politicalTrust)}% | 
        Inequality: ${Math.round(gameState.inequalityLevel)}%</small>
      </p>
      <div class="text-center mt-4">
        <button class="btn btn-primary btn-lg" onclick="location.reload()">Play Again</button>
      </div>
    `;
  }

  // Optional: Power slider (if present in HTML)
  if (powerRange && powerOutput) {
    powerRange.addEventListener("input", () => {
      const value = parseInt(powerRange.value);
      let msg = `Power Level: ${value}`;
      if (value >= 80) msg += " — High centralization: Economic power ↑, political rebellion risk ↑";
      else if (value >= 60) msg += " — Moderate: Balanced growth with tensions";
      else if (value >= 40) msg += " — Balanced: Reasonable stability & acceptance";
      else if (value >= 20) msg += " — Limited: High trust, weaker economy";
      else msg += " — No central bank: Max trust, frequent crises";
      powerOutput.textContent = msg;
    });
  }

  // Optional: Jackson buttons (if present)
  if (agreeBtn && disagreeBtn && counterOutput) {
    agreeBtn.addEventListener("click", () => {
      counterOutput.textContent = "You agree with Jackson: The Bank favored elites over farmers, workers, and states — even if it provided stability.";
      counterOutput.className = "mt-3 text-success fst-italic";
    });
    disagreeBtn.addEventListener("click", () => {
      counterOutput.textContent = "You disagree: The Bank's regulation reduced volatility and supported national growth despite political attacks.";
      counterOutput.className = "mt-3 text-danger fst-italic";
    });
  }

  // Start Game
  startBtn.addEventListener("click", () => {
    introSection.classList.add("d-none");
    gameSection.classList.remove("d-none");
    updateMeters();
    loadEra();
  });

  // Next Era
  nextBtn.addEventListener("click", () => {
    gameState.era++;
    loadEra();
  });

  console.log("Ready! Click 'Start Game' to begin your journey through American banking history.");
});
