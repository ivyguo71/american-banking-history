


document.addEventListener("DOMContentLoaded", function () {
  console.log("Bank Wars Game - Full Version Loaded!");

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

  // Power Slider Elements
  const powerRange = document.getElementById("powerRange");
  const powerOutput = document.getElementById("powerOutput");

  // Jackson Buttons
  const agreeBtn = document.getElementById("agreeBtn");
  const disagreeBtn = document.getElementById("disagreeBtn");

  // Safety check
  if (!startBtn || !gameSection || !introSection || !choicesDiv || !counterOutput) {
    console.error("Missing critical elements! Check HTML IDs.");
    return;
  }

  // Eras (multiple choice + feedback from your document)
  const eras = [
    {
      title: "Era 1: Hamilton's Proposal (1790)",
      scenario: "The nation faces debts, no uniform currency, and weak credit. Hamilton proposes a national bank. What level of centralized power do you give it?",
      choices: [
        {
          text: "Very strong national bank (high centralization)",
          delta: { econ: +18, trust: -12, ineq: +15 },
          feedback: "The Bank becomes a fiscal agent, regulates currency, restrains risky practices, and augments productive capital (Hamilton's view). However, opposition stems from fears of elitism and regional favoritism."
        },
        {
          text: "Moderate national bank with state input",
          delta: { econ: +10, trust: +5, ineq: +5 },
          feedback: "Balanced approach provides some stability, but limited power makes it harder to achieve uniform currency and national credit."
        },
        {
          text: "Weak, mostly state-controlled bank",
          delta: { econ: -12, trust: +15, ineq: -8 },
          feedback: "Political trust rises, but the nation struggles with instability, no strong fiscal agent, and lack of uniform currency — early patterns that predicted collapse."
        }
      ]
    },
    {
      title: "Era 2: Second Bank under Biddle (1820s–1830s)",
      scenario: "Biddle's sound management restrains risky banks and contributes to growth, but regional tensions rise. How aggressively do you defend the Bank's power?",
      choices: [
        {
          text: "Aggressively defend & expand the Bank's power",
          delta: { econ: +20, trust: -18, ineq: +20 },
          feedback: "Sound management is credited with economic growth, but Jackson portrays it as elitist and privileged — harming ordinary citizens and local economies."
        },
        {
          text: "Compromise with regional interests",
          delta: { econ: +8, trust: +10, ineq: +5 },
          feedback: "Some political support is gained, but the Bank's effectiveness is reduced — limited long-term consensus."
        },
        {
          text: "Allow more state control",
          delta: { econ: -15, trust: +18, ineq: -10 },
          feedback: "Political trust rises among states, but national financial stability suffers — contributing to eventual collapse."
        }
      ]
    },
    {
      title: "Era 3: Jackson's Bank War (1832)",
      scenario: "Jackson vetoes the recharter, calling the Bank elitist and harmful. Do you support his position?",
      choices: [
        {
          text: "Support Jackson – veto and destroy the Bank",
          delta: { econ: -25, trust: +25, ineq: -15 },
          feedback: "Political trust surges among farmers and laborers, but the economy faces instability without a central bank."
        },
        {
          text: "Oppose the veto – renew the Bank's charter",
          delta: { econ: +15, trust: -20, ineq: +18 },
          feedback: "Economic stability improves, but deepens regional/class divisions — seen as favoring the rich and powerful."
        }
      ]
    },
    {
      title: "Era 4: Federal Reserve Creation (1913)",
      scenario: "Repeated panics lead to the Fed with regional banks and independence. How do you balance national authority?",
      choices: [
        {
          text: "Strong independence + decentralized structure",
          delta: { econ: +25, trust: +15, ineq: -10 },
          feedback: "Tensions are reduced — the Fed balances national oversight with regional representation and autonomy, effective in crises like 2008."
        },
        {
          text: "More direct political control over the Fed",
          delta: { econ: +5, trust: -10, ineq: +15 },
          feedback: "Short-term political popularity rises, but risks repeating early instability patterns."
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
      btn.addEventListener("click", () => {
        // Apply delta
        gameState.economicStability = Math.max(0, Math.min(100, gameState.economicStability + choice.delta.econ));
        gameState.politicalTrust = Math.max(0, Math.min(100, gameState.politicalTrust + choice.delta.trust));
        gameState.inequalityLevel = Math.max(0, Math.min(100, gameState.inequalityLevel + choice.delta.ineq));
        gameState.score += (choice.delta.econ * 0.4 + choice.delta.trust * 0.4 - choice.delta.ineq * 0.2);

        updateMeters();

        // Show feedback on page
        counterOutput.innerHTML = `<strong>Historical Outcome:</strong><br>${choice.feedback}`;
        counterOutput.classList.remove("d-none");

        // Disable choices & show next
        choicesDiv.querySelectorAll("button").forEach(b => b.disabled = true);
        nextBtn.classList.remove("d-none");
      });
      choicesDiv.appendChild(btn);
    });

    // Reset feedback & next button
    counterOutput.classList.add("d-none");
    nextBtn.classList.add("d-none");
    updateMeters();
  }

  // Power Slider (live preview only)
  if (powerRange && powerOutput) {
    powerRange.addEventListener("input", () => {
      const value = parseInt(powerRange.value);
      let msg = `Centralized Power Level: ${value}`;
      if (value >= 80) msg += " — Very strong (Hamilton/Biddle style)";
      else if (value >= 60) msg += " — Strong centralization";
      else if (value >= 40) msg += " — Balanced";
      else if (value >= 20) msg += " — Limited federal power";
      else msg += " — Mostly state-controlled";
      powerOutput.textContent = msg;
    });
  }

  // Jackson Agree/Disagree Buttons (now working!)
  if (agreeBtn && disagreeBtn) {
    agreeBtn.addEventListener("click", () => {
      counterOutput.innerHTML = "<strong>You agree with Jackson:</strong><br>The Bank was elitist, privileged, and harmful to farmers, laborers, and states — even if it provided some stability.";
      counterOutput.classList.remove("d-none");
    });

    disagreeBtn.addEventListener("click", () => {
      counterOutput.innerHTML = "<strong>You disagree:</strong><br>Despite political attacks, the Bank's regulation reduced volatility and supported national growth.";
      counterOutput.classList.remove("d-none");
    });
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

  // End Game
  function endGame() {
    choicesDiv.innerHTML = "";
    nextBtn.classList.add("d-none");
    counterOutput.classList.add("d-none");

    let ending = "Game Complete!";
    if (gameState.economicStability >= 80 && gameState.politicalTrust >= 70) {
      ending += "<br><strong>Success!</strong> You created a balanced system — like the Federal Reserve overcame early tensions.";
      gameState.score += 30;
    } else if (gameState.economicStability < 40) {
      ending += "<br><strong>Economic Disaster!</strong> Repeated instability and panics.";
    } else if (gameState.politicalTrust < 40) {
      ending += "<br><strong>Political Collapse!</strong> Backlash destroyed the system.";
    } else {
      ending += "<br><strong>Mixed Outcome</strong>: Partial stability, persistent divisions.";
    }

    gameResult.innerHTML = `
      <h3 class="text-center mb-4">${ending}</h3>
      <p class="text-center fs-4 fw-bold">
        Final Score: ${Math.round(gameState.score)}<br>
        <small>Stability: ${Math.round(gameState.economicStability)}% | Trust: ${Math.round(gameState.politicalTrust)}% | Inequality: ${Math.round(gameState.inequalityLevel)}%</small>
      </p>
      <div class="text-center mt-4">
        <button class="btn btn-primary btn-lg" onclick="location.reload()">Play Again</button>
      </div>
    `;
  }

  console.log("Ready! Click 'Start Game' to begin.");
});
