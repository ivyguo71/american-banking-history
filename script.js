// script.js - Bank Wars: Multiple Choice + Meter Feedback (Clean Version)
// APUSH Project - Ivy - January 12, 2026

document.addEventListener("DOMContentLoaded", function () {
  console.log("Bank Wars - Multiple Choice Edition Loaded!");

  // Game State
  let gameState = {
    era: 1,
    economicStability: 50,
    politicalTrust: 50,
    inequalityLevel: 50,
    score: 0
  };

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
  const counterOutput = document.getElementById("counterOutput");
  const nextBtn = document.getElementById("nextEra");
  const gameResult = document.getElementById("gameResult");

  // Safety check
  if (!startBtn || !gameSection || !introSection || !choicesDiv) {
    console.error("Missing critical elements! Check HTML IDs.");
    return;
  }

  // Eras with multiple choice options (from your research)
  const eras = [
    {
      title: "Era 1: Hamilton's Proposal (1790)",
      scenario: "The nation faces debts and instability. Hamilton proposes a national bank. What level of centralized power do you give it?",
      choices: [
        {
          text: "Very strong national bank (high centralization)",
          delta: { econ: +18, trust: -12, ineq: +15 },
          feedback: "The Bank becomes a powerful fiscal agent, regulating currency and credit — strong economic stability, but many fear elitism and Northern favoritism (as Hamilton's report idealized benefits without addressing political resistance)."
        },
        {
          text: "Moderate national bank with state cooperation",
          delta: { econ: +10, trust: +5, ineq: +5 },
          feedback: "Balanced approach provides some regulation and growth, but limited power leaves the nation vulnerable to regional disputes and instability."
        },
        {
          text: "Weak, mostly state-controlled bank",
          delta: { econ: -12, trust: +15, ineq: -8 },
          feedback: "High political trust from states, but no strong federal system leads to weak credit, currency issues, and ongoing economic instability — as early banks struggled."
        }
      ]
    },
    {
      title: "Era 2: Second Bank under Nicholas Biddle (1820s–1830s)",
      scenario: "Biddle manages the Second Bank effectively, restraining risky banks and promoting growth. But regional opposition grows. How do you handle the Bank's power?",
      choices: [
        {
          text: "Aggressively defend & expand the Bank's power",
          delta: { econ: +20, trust: -18, ineq: +20 },
          feedback: "Sound management contributes to economic growth and stability — but Jackson portrays it as an elitist, privileged institution benefiting the few at the expense of farmers and laborers."
        },
        {
          text: "Compromise with regional interests",
          delta: { econ: +8, trust: +10, ineq: +5 },
          feedback: "Some political support is gained, but the Bank's ability to regulate and stabilize is weakened — foreshadowing its vulnerability to opposition."
        },
        {
          text: "Allow more state control",
          delta: { econ: -15, trust: +18, ineq: -10 },
          feedback: "Political trust rises among states, but national financial stability suffers — contributing to later panics and instability."
        }
      ]
    },
    {
      title: "Era 3: Jackson's Bank War (1832)",
      scenario: "Jackson vetoes the Bank's recharter, calling it elitist and harmful to ordinary citizens. Do you support his position?",
      choices: [
        {
          text: "Support Jackson – veto & destroy the Bank",
          delta: { econ: -25, trust: +25, ineq: -15 },
          feedback: "Political trust surges among farmers, workers, and states — but destroying the Bank leads to economic instability and contributes to the Panic of 1837."
        },
        {
          text: "Oppose Jackson – renew the Bank's charter",
          delta: { econ: +15, trust: -20, ineq: +18 },
          feedback: "Economic stability improves with continued regulation — but deepens regional and class divisions, seen as favoring the rich and powerful."
        }
      ]
    },
    {
      title: "Era 4: Federal Reserve Creation (1913)",
      scenario: "After repeated panics, the Federal Reserve is created. How do you balance national oversight with regional representation?",
      choices: [
        {
          text: "Strong independence + decentralized structure",
          delta: { econ: +25, trust: +15, ineq: -10 },
          feedback: "The Fed reduces previous tensions with balanced power — national oversight for stability, regional banks for representation, autonomy from direct politics — proven effective in crises like 2008."
        },
        {
          text: "More direct political control over the Fed",
          delta: { econ: +5, trust: -10, ineq: +15 },
          feedback: "Short-term political popularity rises, but risks long-term credibility and effectiveness — repeating early patterns of instability."
        }
      ]
    }
  ];

  // Update meters
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
      btn.addEventListener("click", () => selectChoice(choice));
      choicesDiv.appendChild(btn);
    });

    counterOutput.textContent = "";
    nextBtn.classList.add("d-none");
    updateMeters();
  }

  // When a choice is selected
  function selectChoice(choice) {
    // Update state
    gameState.economicStability = Math.max(0, Math.min(100, gameState.economicStability + choice.delta.econ));
    gameState.politicalTrust = Math.max(0, Math.min(100, gameState.politicalTrust + choice.delta.trust));
    gameState.inequalityLevel = Math.max(0, Math.min(100, gameState.inequalityLevel + choice.delta.ineq));

    gameState.score += (choice.delta.econ * 0.4 + choice.delta.trust * 0.4 - choice.delta.ineq * 0.2);

    updateMeters();

    // Show feedback in counterOutput (clean & integrated)
    counterOutput.innerHTML = `<strong>Historical Feedback:</strong> ${choice.feedback}`;
    counterOutput.className = "mt-4 p-3 border rounded bg-light fst-italic";

    // Disable choices & show next
    choicesDiv.querySelectorAll("button").forEach(btn => btn.disabled = true);
    nextBtn.classList.remove("d-none");
  }

  // End game
  function endGame() {
    choicesDiv.innerHTML = "";
    nextBtn.classList.add("d-none");
    counterOutput.textContent = "";

    let ending = "";
    if (gameState.economicStability >= 80 && gameState.politicalTrust >= 70) {
      ending = "Outstanding Success! You balanced stability and trust — much like the Federal Reserve overcame early tensions.";
      gameState.score += 30;
    } else if (gameState.economicStability < 40) {
      ending = "Economic Disaster! Repeated panics and instability resulted from your choices.";
    } else if (gameState.politicalTrust < 40) {
      ending = "Political Collapse! Backlash and division destroyed the system — repeating early bank failures.";
    } else {
      ending = "Mixed Outcome: Partial stability achieved, but political divisions and inequality persisted.";
    }

    gameResult.innerHTML = `
      <h3 class="text-center mb-4">Game Complete!</h3>
      <div class="alert alert-info text-center">${ending}</div>
      <p class="text-center fs-4 fw-bold">
        Final Score: ${Math.round(gameState.score)} / 100<br>
        <small>Stability: ${Math.round(gameState.economicStability)}% | Trust: ${Math.round(gameState.politicalTrust)}% | Inequality: ${Math.round(gameState.inequalityLevel)}%</small>
      </p>
      <div class="text-center mt-4">
        <button class="btn btn-primary btn-lg" onclick="location.reload()">Play Again</button>
      </div>
    `;
  }

  // Start Game
  startBtn.addEventListener("click", () => {
    introSection.classList.add("d-none");
    gameSection.classList.remove("d-none");
    loadEra();
  });

  // Next Era
  nextBtn.addEventListener("click", () => {
    gameState.era++;
    loadEra();
  });

  console.log("Ready! Click 'Start Game' to play.");
});
