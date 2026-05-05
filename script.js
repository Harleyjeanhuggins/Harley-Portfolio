function openPanel(panelId) {
  const panels = document.querySelectorAll(".side-panel");
  const selectedPanel = document.getElementById(panelId);

  panels.forEach(function(panel) {
    panel.classList.remove("active");
    panel.setAttribute("aria-hidden", "true");
  });

  if (selectedPanel) {
    selectedPanel.classList.add("active");
    selectedPanel.setAttribute("aria-hidden", "false");
    document.body.classList.add("panel-open");

    const closeButton = selectedPanel.querySelector(".close-btn");
    if (closeButton) {
      closeButton.focus();
    }
  }
}

function closePanel(panelId) {
  const selectedPanel = document.getElementById(panelId);

  if (selectedPanel) {
    selectedPanel.classList.remove("active");
    selectedPanel.setAttribute("aria-hidden", "true");
  }

  const anyOpenPanel = document.querySelector(".side-panel.active");

  if (!anyOpenPanel) {
    document.body.classList.remove("panel-open");
  }
}

function closeAllPanels() {
  const panels = document.querySelectorAll(".side-panel");

  panels.forEach(function(panel) {
    panel.classList.remove("active");
    panel.setAttribute("aria-hidden", "true");
  });

  document.body.classList.remove("panel-open");
}

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeAllPanels();
    closeProjectModal();
  }
});

document.addEventListener("click", function(event) {
  const openPanelElement = document.querySelector(".side-panel.active");

  if (!openPanelElement) return;

  const clickedInsidePanel = openPanelElement.contains(event.target);
  const clickedPanelButton = event.target.closest("[onclick*='openPanel']");

  if (!clickedInsidePanel && !clickedPanelButton) {
    closeAllPanels();
  }
});

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    const panels = document.querySelectorAll(".side-panel");

    panels.forEach(function(panel) {
      panel.classList.remove("active");
    });
  }
});

function toggleReveal(revealId) {
  const revealBox = document.getElementById(revealId);

  if (revealBox) {
    revealBox.classList.toggle("show");
  }
}

function openProjectModal(title, description) {
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");

  if (modal && modalTitle && modalDescription) {
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modal.classList.add("active");
  }
}

function closeProjectModal() {
  const modal = document.getElementById("projectModal");

  if (modal) {
    modal.classList.remove("active");
  }
}

document.addEventListener("click", function(event) {
  const modal = document.getElementById("projectModal");

  if (event.target === modal) {
    closeProjectModal();
  }
});
/* CYBERPUNK PORTAL ANIMATION */

const portalSlides = [
  {
    title: "Fantasy Game Concept",
    description:
      "A dark fantasy game concept with dragon lore, dual reality, clans, betrayal, and player choice.",
    image: "images/game-concept.jpg"
  },
  {
    title: "Webtoon / Visual Novel Work",
    description:
      "A visual storytelling showcase with character-driven scenes, dramatic panel layouts, and cinematic atmosphere.",
    image: "images/webtoon-art.jpg"
  },
  {
    title: "Brand Video Project",
    description:
      "A media project focused on editing, transitions, sound, timing, storyboarding, and professional presentation.",
    image: "images/video-project.jpg"
  },
  {
    title: "Creative Developer Identity",
    description:
      "A personal portfolio style that combines code, cyberpunk fantasy visuals, and interactive design.",
    image: "images/profile.jpg"
  }
];

let currentPortalSlide = 0;
let portalBroken = false;
let breakAnimationId = null;
let shieldRebuildTimer = null;

const portalViewer = document.getElementById("portalViewer");
const portalImage = document.getElementById("portalImage");
const portalCanvas = document.getElementById("portalCanvas");
const portalOverlay = document.getElementById("portalOverlay");
const portalTitle = document.getElementById("portalTitle");
const portalDescription = document.getElementById("portalDescription");

const prevPortal = document.getElementById("prevPortal");
const nextPortal = document.getElementById("nextPortal");
const resetPortal = document.getElementById("resetPortal");

function updatePortalSlide() {
  const slide = portalSlides[currentPortalSlide];

  portalImage.src = slide.image;
  portalImage.alt = slide.title;
  portalTitle.textContent = slide.title;
  portalDescription.textContent = slide.description;

  rebuildPortalShield();
}

function resizePortalCanvas() {
  if (!portalCanvas || !portalViewer) return;

  const rect = portalViewer.getBoundingClientRect();
  const pixelRatio = window.devicePixelRatio || 1;

  portalCanvas.width = rect.width * pixelRatio;
  portalCanvas.height = rect.height * pixelRatio;

  portalCanvas.style.width = rect.width + "px";
  portalCanvas.style.height = rect.height + "px";

  const ctx = portalCanvas.getContext("2d");
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
}

function createShard(x, y, width, height) {
  const angle = Math.random() * Math.PI * 2;
  const speed = 3 + Math.random() * 7;
  const size = 5 + Math.random() * 16;

  return {
    x: x,
    y: y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    rotation: Math.random() * Math.PI,
    rotationSpeed: -0.18 + Math.random() * 0.36,
    size: size,
    alpha: 1,
    color: Math.random() > 0.5 ? "rgba(77, 252, 255," : "rgba(255, 79, 216,",
    life: 55 + Math.random() * 20,
    maxLife: 75,
    width: width,
    height: height
  };
}

function createCrackLine(x, y) {
  const angle = Math.random() * Math.PI * 2;
  const length = 70 + Math.random() * 150;
  const segments = 4 + Math.floor(Math.random() * 5);

  const points = [];

  for (let i = 0; i <= segments; i++) {
    const progress = i / segments;

    points.push({
      x: x + Math.cos(angle) * length * progress + (Math.random() - 0.5) * 34,
      y: y + Math.sin(angle) * length * progress + (Math.random() - 0.5) * 34
    });
  }

  return {
    points: points,
    alpha: 1,
    width: 1 + Math.random() * 2.4
  };
}

function drawSatisfyingBreak(x, y) {
  if (!portalCanvas) return;

  cancelAnimationFrame(breakAnimationId);

  resizePortalCanvas();

  const ctx = portalCanvas.getContext("2d");
  const width = portalViewer.offsetWidth;
  const height = portalViewer.offsetHeight;

  const shards = [];
  const cracks = [];
  const sparks = [];

  for (let i = 0; i < 32; i++) {
    shards.push(createShard(x, y, width, height));
  }

  for (let i = 0; i < 26; i++) {
    cracks.push(createCrackLine(x, y));
  }

  for (let i = 0; i < 75; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 9;

    sparks.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      size: 1 + Math.random() * 3,
      life: 35 + Math.random() * 25
    });
  }

  let frame = 0;
  let shockwaveRadius = 8;

  function animateBreak() {
    frame++;

    ctx.clearRect(0, 0, width, height);

    /*
      Shockwave pulse
    */
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, shockwaveRadius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(77, 252, 255, ${Math.max(0, 0.9 - frame / 38)})`;
    ctx.shadowColor = "rgba(77, 252, 255, 0.95)";
    ctx.shadowBlur = 22;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();

    shockwaveRadius += 8;

    /*
      Crack lines
    */
    cracks.forEach(function(crack) {
      crack.alpha -= 0.022;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(crack.points[0].x, crack.points[0].y);

      for (let i = 1; i < crack.points.length; i++) {
        ctx.lineTo(crack.points[i].x, crack.points[i].y);
      }

      ctx.strokeStyle = `rgba(77, 252, 255, ${Math.max(0, crack.alpha)})`;
      ctx.shadowColor = "rgba(255, 79, 216, 0.95)";
      ctx.shadowBlur = 16;
      ctx.lineWidth = crack.width;
      ctx.stroke();
      ctx.restore();
    });

    /*
      Cyber glass shards
    */
    shards.forEach(function(shard) {
      shard.x += shard.vx;
      shard.y += shard.vy;
      shard.vy += 0.08;
      shard.rotation += shard.rotationSpeed;
      shard.life--;
      shard.alpha = Math.max(0, shard.life / shard.maxLife);

      ctx.save();
      ctx.translate(shard.x, shard.y);
      ctx.rotate(shard.rotation);

      ctx.beginPath();
      ctx.moveTo(0, -shard.size);
      ctx.lineTo(shard.size * 0.8, shard.size * 0.5);
      ctx.lineTo(-shard.size * 0.8, shard.size * 0.7);
      ctx.closePath();

      ctx.fillStyle = `${shard.color} ${shard.alpha * 0.55})`;
      ctx.strokeStyle = `rgba(255, 255, 255, ${shard.alpha * 0.75})`;
      ctx.shadowColor = "rgba(77, 252, 255, 0.9)";
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    });

    /*
      Sparks
    */
    sparks.forEach(function(spark) {
      spark.x += spark.vx;
      spark.y += spark.vy;
      spark.vx *= 0.96;
      spark.vy *= 0.96;
      spark.life--;
      spark.alpha = Math.max(0, spark.life / 60);

      ctx.save();
      ctx.beginPath();
      ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${spark.alpha})`;
      ctx.shadowColor = Math.random() > 0.5 ? varColorCyan() : varColorPink();
      ctx.shadowBlur = 16;
      ctx.fill();
      ctx.restore();
    });

    if (frame < 75) {
      breakAnimationId = requestAnimationFrame(animateBreak);
    } else {
      ctx.clearRect(0, 0, width, height);
    }
  }

  animateBreak();
}

function varColorCyan() {
  return "rgba(77, 252, 255, 0.95)";
}

function varColorPink() {
  return "rgba(255, 79, 216, 0.95)";
}

function breakPortalShield(event) {
  if (portalBroken) return;

  portalBroken = true;

  clearTimeout(shieldRebuildTimer);

  const rect = portalViewer.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  portalViewer.classList.add("shield-burst");
  portalOverlay.classList.add("is-broken");

  drawSatisfyingBreak(x, y);

  setTimeout(function() {
    portalViewer.classList.remove("shield-burst");
  }, 800);

  shieldRebuildTimer = setTimeout(function() {
    rebuildPortalShieldSlowly();
  }, 10000);
}
function movePortalGlow(event) {
  if (portalBroken) return;

  const rect = portalViewer.getBoundingClientRect();

  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  portalViewer.style.setProperty("--mouse-x", x + "px");
  portalViewer.style.setProperty("--mouse-y", y + "px");
}
function rebuildPortalShield() {
  portalBroken = false;

  clearTimeout(shieldRebuildTimer);
  cancelAnimationFrame(breakAnimationId);

  if (portalViewer) {
    portalViewer.classList.remove("shield-burst");
  }

  if (portalOverlay) {
    portalOverlay.classList.remove("is-broken");
  }

  if (portalCanvas) {
    resizePortalCanvas();
    const ctx = portalCanvas.getContext("2d");
    ctx.clearRect(0, 0, portalViewer.offsetWidth, portalViewer.offsetHeight);
  }
}
function rebuildPortalShieldSlowly() {
  if (!portalOverlay || !portalViewer) return;

  portalBroken = false;

  cancelAnimationFrame(breakAnimationId);

  portalOverlay.classList.remove("is-broken");
  portalOverlay.classList.add("is-rebuilding");

  portalViewer.classList.remove("shield-burst");

  if (portalCanvas) {
    const ctx = portalCanvas.getContext("2d");
    ctx.clearRect(0, 0, portalViewer.offsetWidth, portalViewer.offsetHeight);
  }

  setTimeout(function() {
    portalOverlay.classList.remove("is-rebuilding");
  }, 1600);
}

function showNextPortalSlide() {
  currentPortalSlide++;

  if (currentPortalSlide >= portalSlides.length) {
    currentPortalSlide = 0;
  }

  updatePortalSlide();
}

function showPreviousPortalSlide() {
  currentPortalSlide--;

  if (currentPortalSlide < 0) {
    currentPortalSlide = portalSlides.length - 1;
  }

  updatePortalSlide();
}

if (
  portalViewer &&
  portalCanvas &&
  portalOverlay &&
  portalImage &&
  portalTitle &&
  portalDescription &&
  prevPortal &&
  nextPortal &&
  resetPortal
) {
  resizePortalCanvas();
  updatePortalSlide();
  
  portalViewer.addEventListener("mousemove", movePortalGlow);
  portalViewer.addEventListener("click", breakPortalShield);

  nextPortal.addEventListener("click", showNextPortalSlide);
  prevPortal.addEventListener("click", showPreviousPortalSlide);
  resetPortal.addEventListener("click", rebuildPortalShield);

  window.addEventListener("resize", rebuildPortalShield);
}
// ===============================
// SHORT LOADING SCREEN
// ===============================

window.addEventListener("load", function() {
  const loadingScreen = document.getElementById("loadingScreen");

  if (!loadingScreen) return;

  setTimeout(function() {
    loadingScreen.classList.add("hidden");
  }, 2200);
});
