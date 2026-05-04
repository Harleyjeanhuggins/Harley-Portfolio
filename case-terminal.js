// ===============================
// UNIVERSAL CASE STUDY TERMINAL
// ===============================

const caseStudies = {
  home: {
    title: "Main Portfolio Dashboard",
    goal: "Create a memorable portfolio homepage that introduces my technical, creative, storytelling, and game design identity.",
    problem: "A normal resume-style portfolio would not fully show my personality, visual style, or interactive design skills.",
    solution: "I built a cyberpunk dark fantasy dashboard with panels, portals, project cards, interactive sections, and floating navigation.",
    tools: ["HTML", "CSS", "JavaScript", "VS Code", "Responsive Design"],
    learned: [
      "How to organize a multi-section portfolio",
      "How to balance visual design with usability",
      "How to create interactive panels and project pathways"
    ],
    next: "Add more final project links, portfolio videos, GitHub proof, and downloadable resume materials."
  },

  developer: {
    title: "Cyber Skill Tree",
    goal: "Showcase developer and technology skills through an interactive skill-growth interface.",
    problem: "A basic list of skills would feel too plain and would not show my ability to design creative UI systems.",
    solution: "I created a cyberpunk skill tree with branching categories, animated lines, particles, icons, hover descriptions, meters, links, and sound feedback.",
    tools: ["HTML", "CSS", "JavaScript", "UI Design", "Interaction Design"],
    learned: [
      "How to use JavaScript to reveal skill groups",
      "How to build interactive visual systems",
      "How to connect skills to project evidence"
    ],
    next: "Attach every skill node to real projects, GitHub links, videos, or class assignments."
  },

  writing: {
    title: "Interactive Writing Archive",
    goal: "Create a writing showcase that feels like opening a cyberpunk dark fantasy book.",
    problem: "A normal text page would not match the creative storytelling identity of the rest of the portfolio.",
    solution: "I built a closed-book opening interaction, page-turning spreads, vintage paper styling, story samples, and floating navigation.",
    tools: ["HTML", "CSS", "JavaScript", "Creative Writing", "Visual Storytelling"],
    learned: [
      "How to build a page-based reading system",
      "How to style an interface around a story concept",
      "How to create a more immersive writing presentation"
    ],
    next: "Add full chapter excerpts, character profiles, downloadable writing samples, and concept art."
  },

  game: {
    title: "Game Design Signal Vault",
    goal: "Showcase game design videos and project concepts through a cyberpunk TV broadcast interface.",
    problem: "A standard video gallery did not feel strong enough for a design-focused game portfolio page.",
    solution: "I created an old TV interface with static, VHS glitch effects, channel switching, sound feedback, and video project channels.",
    tools: ["HTML", "CSS", "JavaScript", "Video", "Game Design Presentation"],
    learned: [
      "How to combine media with interaction design",
      "How to create a themed video showcase",
      "How to use timing, sound, and animation to create mood"
    ],
    next: "Add real gameplay/project videos, design breakdowns, worldbuilding clips, and prototype footage."
  },

  mission: {
    title: "Mission Log & Achievement System",
    goal: "Track portfolio projects like active missions while showing progress, achievements, and project status.",
    problem: "Unfinished projects can look incomplete unless they are presented as active builds with clear progress.",
    solution: "I built a mission log system with project cards, progress bars, achievements, and terminal-style mission files.",
    tools: ["HTML", "CSS", "JavaScript", "Project Planning", "Portfolio Strategy"],
    learned: [
      "How to present in-progress work professionally",
      "How to explain project goals and next steps",
      "How to make a portfolio feel like a connected system"
    ],
    next: "Connect each mission to live project links, videos, GitHub repositories, and final downloadable files."
  }
};

function openCaseStudy(caseId) {
  const study = caseStudies[caseId];

  if (!study) return;

  const modal = document.getElementById("caseTerminalModal");
  const title = document.getElementById("caseTerminalTitle");
  const goal = document.getElementById("caseTerminalGoal");
  const problem = document.getElementById("caseTerminalProblem");
  const solution = document.getElementById("caseTerminalSolution");
  const tools = document.getElementById("caseTerminalTools");
  const learned = document.getElementById("caseTerminalLearned");
  const next = document.getElementById("caseTerminalNext");

  title.textContent = study.title;
  goal.textContent = study.goal;
  problem.textContent = study.problem;
  solution.textContent = study.solution;
  next.textContent = study.next;

  tools.innerHTML = "";
  study.tools.forEach(function(tool) {
    const span = document.createElement("span");
    span.textContent = tool;
    tools.appendChild(span);
  });

  learned.innerHTML = "";
  study.learned.forEach(function(item) {
    const li = document.createElement("li");
    li.textContent = item;
    learned.appendChild(li);
  });

  modal.classList.add("active");
  playCaseTerminalSound();
}

function closeCaseStudy() {
  const modal = document.getElementById("caseTerminalModal");

  if (modal) {
    modal.classList.remove("active");
  }
}

document.addEventListener("click", function(event) {
  const modal = document.getElementById("caseTerminalModal");

  if (event.target === modal) {
    closeCaseStudy();
  }
});

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeCaseStudy();
  }
});

function playCaseTerminalSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;

  if (!AudioContext) return;

  const audioContext = new AudioContext();

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(180, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(620, audioContext.currentTime + 0.18);

  gainNode.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.035, audioContext.currentTime + 0.03);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.24);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.26);
}