function toggleBranch(branchId, buttonElement) {
  const allClusters = document.querySelectorAll(".skill-cluster");
  const allButtons = document.querySelectorAll(".branch-btn");
  const allLines = document.querySelectorAll(".tree-line");
  const targetCluster = document.getElementById(branchId);
  const targetLine = document.querySelector(`[data-line="${branchId}"]`);

  const alreadyActive = targetCluster.classList.contains("active");

  allClusters.forEach(cluster => {
    cluster.classList.remove("active");
  });

  allButtons.forEach(button => {
    button.classList.remove("active");
  });

  allLines.forEach(line => {
    line.classList.remove("growing");
  });

  if (!alreadyActive) {
    targetCluster.classList.add("active");
    buttonElement.classList.add("active");

    if (targetLine) {
      targetLine.classList.remove("growing");
      void targetLine.offsetWidth;
      targetLine.classList.add("growing");
    }

    pulseCore();
    createTreeParticles();
    playBranchSound();
  }
}

function collapseAllBranches() {
  const allClusters = document.querySelectorAll(".skill-cluster");
  const allButtons = document.querySelectorAll(".branch-btn");
  const allLines = document.querySelectorAll(".tree-line");

  allClusters.forEach(cluster => {
    cluster.classList.remove("active");
  });

  allButtons.forEach(button => {
    button.classList.remove("active");
  });

  allLines.forEach(line => {
    line.classList.remove("growing");
  });

  updateTooltip("Hover over a skill to see details.");
}

function pulseCore() {
  const core = document.getElementById("treeCore");

  if (!core) return;

  core.classList.remove("pulse");
  void core.offsetWidth;
  core.classList.add("pulse");
}

function createTreeParticles() {
  const particleField = document.getElementById("particleField");

  if (!particleField) return;

  for (let i = 0; i < 18; i++) {
    const particle = document.createElement("span");
    particle.classList.add("tree-particle");

    particle.style.left = 45 + Math.random() * 10 + "%";
    particle.style.top = 45 + Math.random() * 10 + "%";
    particle.style.animationDelay = Math.random() * 0.25 + "s";

    particleField.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 1800);
  }
}

function playBranchSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;

  if (!AudioContext) return;

  const audioContext = new AudioContext();

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(660, audioContext.currentTime + 0.18);

  gainNode.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.08, audioContext.currentTime + 0.03);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.26);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.28);
}

function updateTooltip(text) {
  const tooltip = document.getElementById("skillTooltip");

  if (tooltip) {
    tooltip.textContent = text;
  }
}

function setupSkillTooltips() {
  const skillPills = document.querySelectorAll(".skill-pill");

  skillPills.forEach(skill => {
    skill.addEventListener("mouseenter", function() {
      const description = skill.getAttribute("data-description");

      if (description) {
        updateTooltip(description);
      }
    });

    skill.addEventListener("mouseleave", function() {
      updateTooltip("Hover over a skill to see details.");
    });
  });
}

setupSkillTooltips();
document.querySelectorAll('a[href="#"]').forEach(link => {
  link.addEventListener("click", function(event) {
    event.preventDefault();
  });
});