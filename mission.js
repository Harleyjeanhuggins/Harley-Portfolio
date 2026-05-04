function calculateMissionStats() {
  const missionCards = document.querySelectorAll(".mission-card");
  const projectCount = document.getElementById("projectCount");
  const overallProgress = document.getElementById("overallProgress");

  let totalProgress = 0;

  missionCards.forEach(card => {
    const progress = Number(card.getAttribute("data-progress"));
    totalProgress += progress;
  });

  const averageProgress = Math.round(totalProgress / missionCards.length);

  if (projectCount) {
    projectCount.textContent = missionCards.length;
  }

  if (overallProgress) {
    overallProgress.textContent = averageProgress + "%";
  }
}

function openMissionTerminal(title, summary, nextStep) {
  const modal = document.getElementById("terminalModal");
  const terminalTitle = document.getElementById("terminalTitle");
  const terminalSummary = document.getElementById("terminalSummary");
  const terminalNext = document.getElementById("terminalNext");

  if (terminalTitle) {
    terminalTitle.textContent = title;
  }

  if (terminalSummary) {
    terminalSummary.textContent = summary;
  }

  if (terminalNext) {
    terminalNext.textContent = nextStep;
  }

  if (modal) {
    modal.classList.add("active");
  }

  playTerminalSound();
}

function closeMissionTerminal() {
  const modal = document.getElementById("terminalModal");

  if (modal) {
    modal.classList.remove("active");
  }
}

document.addEventListener("click", function(event) {
  const modal = document.getElementById("terminalModal");

  if (event.target === modal) {
    closeMissionTerminal();
  }
});

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeMissionTerminal();
  }
});

function playTerminalSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;

  if (!AudioContext) return;

  const audioContext = new AudioContext();

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(180, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(520, audioContext.currentTime + 0.15);

  gainNode.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.04, audioContext.currentTime + 0.03);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.22);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.24);
}

calculateMissionStats();