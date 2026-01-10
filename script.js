script.js
const powerRange = document.getElementById("powerRange");
const powerOutput = document.getElementById("powerOutput");
const counterOutput = document.getElementById("counterOutput");

powerRange.addEventListener("input", () => {
  powerOutput.textContent = "Power Level: " + powerRange.value;

  if (powerRange.value > 70) {
    powerOutput.textContent += " — Stability rises, trust falls.";
  } else if (powerRange.value < 30) {
    powerOutput.textContent += " — Trust rises, stability weakens.";
  }
});

document.getElementById("agreeBtn").addEventListener("click", () => {
  counterOutput.textContent =
    "Jackson’s argument resonated with citizens who feared concentrated economic power.";
});

document.getElementById("disagreeBtn").addEventListener("click", () => {
  counterOutput.textContent =
    "Despite criticism, the Bank reduced instability by regulating currency and credit.";
});
