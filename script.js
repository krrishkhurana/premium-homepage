const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

const simulateBtn = document.getElementById("simulateBtn");
const runState = document.getElementById("runState");
const sourceStatus = document.getElementById("sourceStatus");
const eventText = document.getElementById("eventText");

let blocked = false;
simulateBtn?.addEventListener("click", () => {
  blocked = !blocked;
  if (blocked) {
    runState.textContent = "Guarded";
    sourceStatus.textContent = "429 — rate limited";
    eventText.textContent = "Source blocked. Routed to checkpoint → mirror.";
    simulateBtn.textContent = "Restore source";
  } else {
    runState.textContent = "Healthy";
    sourceStatus.textContent = "API endpoint";
    eventText.textContent = "Source recovered. Checkpoint reconciled.";
    simulateBtn.textContent = "Simulate source block";
  }
});

document.getElementById("refreshBtn")?.addEventListener("click", (event) => {
  const button = event.currentTarget;
  button.textContent = "View refreshed ✓";
  button.disabled = true;
  setTimeout(() => {
    button.textContent = "Refresh view ↻";
    button.disabled = false;
  }, 1400);
});
