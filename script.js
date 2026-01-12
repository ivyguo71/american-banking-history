// script.js - Bank Wars
// APUSH Project - Ivy - January 12, 2026

document.addEventListener("DOMContentLoaded", function () {
  console.log("Bank Wars - On-Page Feedback Edition Loaded!");

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
  if (!startBtn || !gameSection || !introSection || !choicesDiv || !counterOutput) {
    console.error("Missing critical elements! Check your HTML IDs.");
    return;
  }

  // Eras with choices (based on your research document)
  const eras = [
    {
      title: "Era 1: Hamilton's Proposal (1790)",
      scenario: "The nation faces debts, no uniform currency, and weak credit. Hamilton proposes a national bank to solve economic instability. What level of centralized power do you give it?",
      choices: [
        {
          text: "Very strong national bank (high centralization)",
          delta: { econ: +18, trust: -12, ineq: +15 },
          feedback: "The Bank acts as a fiscal agent, regulates currency, restrains risky banking practices, and promotes growth (as Hamilton argued). However, political backlash and regional disputes limit long-term consensus — as seen in opposition to centralized power."
        },
        {
          text: "Moderate national bank with state input",
          delta: { econ: +10, trust: +5, ineq: +5 },
          feedback: "Balanced approach provides some stability and regulation, but limited power makes it harder to manage national credit effectively — contributing to ongoing tensions."
        },
        {
          text: "Weak, mostly state-controlled bank",
          delta: { econ: -12, trust: +15, ineq: -8 },
          feedback: "Political trust rises from states and local interests, but the nation struggles with economic instability, no strong federal fiscal agent, and lack of uniform currency — early patterns that predicted collapse."
        }
      ]
    },
    {
      title: "Era 2: Second Bank under Nicholas Biddle (1820s–1830s)",
      scenario: "Biddle's sound management restrains risky state banks and contributes to economic growth. But regional tensions rise. How aggressively do you defend the Bank's charter?",
      choices: [
        {
          text: "Aggressively defend & expand the Bank's power",
          delta: { econ: +20, trust: -18, ineq: +20 },
          feedback: "Sound management is credited with economic growth, but Jackson successfully portrays the Bank as an elitist, privileged institution that benefits the few — fueling political opposition and regional disputes."
        },
        {
          text: "Compromise with regional and state interests",
          delta: { econ: +8, trust: +10, ineq: +5 },
          feedback: "Some political support is gained, but the Bank's effectiveness in regulating and stabilizing is reduced — highlighting the challenge of maintaining consensus."
        },
        {
          text: "Allow more state control over banking",
          delta: { econ: -15, trust: +18, ineq: -10 },
          feedback: "Political trust rises among states, but national financial stability suffers — a key factor in the eventual collapse of the Second Bank."
        }
      ]
    },
    {
      title: "Era 3: Jackson's Bank War (1832)",
      scenario: "Jackson vetoes the recharter, arguing the Bank concentrates power in the hands of elites and harms ordinary Americans. Do you support his position?",
      choices: [
        {
          text: "Support Jackson – veto and destroy the Bank",
          delta: { econ: -25, trust: +25, ineq: -15 },
          feedback: "Political trust surges among farmers, laborers, and states (as Jackson framed it), but the economy faces instability without a central bank — contributing to later panics."
        },
        {
          text: "Oppose the veto – renew the Bank's charter",
          delta: { econ: +15, trust: -20, ineq: +18 },
          feedback: "Economic stability improves with continued regulation, but deepens regional and class divisions — seen as favoring the rich and powerful (Jackson's main critique)."
        }
      ]
    },
    {
      title: "Era 4: Federal Reserve Creation (1913)",
      scenario: "Repeated banking panics show the need for reform. The Federal Reserve is created with 12 regional banks and independence. How do you balance national authority?",
      choices: [
        {
          text: "Strong independence + decentralized regional structure",
          delta: { econ: +25, trust: +15, ineq: -10 },
          feedback: "Tensions are lessened! The Fed balances national oversight with regional representation, providing autonomy from direct politics — effective in crises like 2008 through flexible tools (open market operations, quantitative easing, liquidity provision)."
        },
        {
          text: "More direct political control over the Fed",
          delta: { econ: +5, trust: -10, ineq: +15 },
          feedback: "Short-term political popularity rises, but risks repeating early patterns of instability — as political pressure can undermine long-term credibility and effectiveness."
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
        // Apply changes
        gameState.economicStability = Math.max(0, Math.min(100, gameState.economicStability + choice.delta.econ));
        gameState.politicalTrust = Math.max(0, Math.min(100, gameState.politicalTrust + choice.delta.trust));
        gameState.inequalityLevel = Math.max(0, Math.min(100, gameState.inequalityLevel + choice.delta.ineq));
        gameState.score += (choice.delta.econ * 0.4 + choice.delta.trust * 0.4 - choice.delta.ineq * 0.2);

        updateMeters();

        // Show feedback on page (no popup!)
        counterOutput.innerHTML = `<strong>Historical Outcome:</strong><br>${choice.feedback}`;
        counterOutput.classList.remove("d-none");

        // Disable choices & show next
        choicesDiv.querySelectorAll("button").forEach(b => b.disabled = true);
        nextBtn.classList.remove("d-none");
      });
      choicesDiv.appendChild(btn);
    });

    // Reset feedback box for new era
    counterOutput.classList.add("d-none");
    nextBtn.classList.add("d-none");
    updateMeters();
  }

  // End game
  function endGame() {
    choicesDiv.innerHTML = "";
    nextBtn.classList.add("d-none");
    counterOutput.classList.add("d-none");

    let ending = "Game Complete!";
    if (gameState.economicStability >= 80 && gameState.politicalTrust >= 70) {
      ending += "<br><strong>Outstanding Success!</strong> You achieved a stable system with trust — much like the Federal Reserve overcame early tensions.";
      gameState.score += 30;
    } else if (gameState.economicStability < 40) {
      ending += "<br><strong>Economic Disaster!</strong> Repeated instability and panics resulted.";
    } else if (gameState.politicalTrust < 40) {
      ending += "<br><strong>Political Collapse!</strong> Backlash and division destroyed the system — repeating early bank failures.";
    } else {
      ending += "<br><strong>Mixed Outcome</strong>: Partial stability achieved, but political divisions and inequality persisted.";
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

  console.log("Ready! Click 'Start Game' to begin.");
});
