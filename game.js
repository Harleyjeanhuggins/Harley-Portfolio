let tvInitialized = false;
let revealTimer = null;
let currentChannel = 0;

const channels = [
  {
    number: "CH 01",
    title: "Overview",
    description:
      "A main idea, and overall direction for a character.",
    video: "videos/game-concept-1.mp4"
  },
  {
    number: "CH 02",
    title: "Character & Mechanics Showcase",
    description:
     "Character ideas, design logic, mechanics.",
    video: "videos/game-concept-2.mp4"
  },
  {
    number: "CH 03",
    title: "Lore / Worldbuilding Breakdown",
    description:
      "World lore, factions, mythology, atmosphere, and story systems behind the concept.",
    video: "videos/game-concept-3.mp4"
  },
  {
    number: "CH 04",
    title: "Process / Design Log",
    description:
      "Behind-the-scenes design work, planning, sketches, progress clips, and project evolution.",
    video: "videos/game-process-1.mp4"
  }
];

function startTVSequence() {
  const tvStatic = document.getElementById("tvStatic");
  const tvContent = document.getElementById("tvContent");
  const videoArchive = document.getElementById("videoArchive");

  if (!tvStatic || !tvContent || !videoArchive) return;

  tvStatic.classList.add("active");
  tvContent.classList.remove("active");
  videoArchive.classList.add("hidden-archive");

  clearTimeout(revealTimer);

  revealTimer = setTimeout(() => {
    tvStatic.classList.remove("active");
    tvContent.classList.add("active");
    videoArchive.classList.remove("hidden-archive");
    updateChannel();
  }, 3000);
}

function updateChannel() {
  const channel = channels[currentChannel];

  const video = document.getElementById("mainTvVideo");
  const source = document.getElementById("mainTvVideoSource");
  const channelNumber = document.getElementById("channelNumber");
  const channelTitle = document.getElementById("channelTitle");
  const channelDescription = document.getElementById("channelDescription");

  if (!channel || !video || !source) return;

  source.src = channel.video;
  video.load();

  /*
    Keep muted so browsers allow smoother playback.
    The user can unmute manually with the video controls.
  */
  video.muted = true;

  video.play().catch(() => {
    /*
      Some browsers block autoplay even when muted.
      That is okay. The user can press play manually.
    */
  });

  if (channelNumber) {
    channelNumber.textContent = channel.number;
  }

  if (channelTitle) {
    channelTitle.textContent = channel.title;
  }

  if (channelDescription) {
    channelDescription.textContent = channel.description;
  }

  updateActiveChannelCard();
}

function setChannel(channelIndex) {
  if (channelIndex < 0 || channelIndex >= channels.length) return;

  currentChannel = channelIndex;

  playChannelSound();
  triggerVHSGlitch();

  setTimeout(() => {
    updateChannel();
  }, 260);
}

function nextChannel(event) {
  if (event) {
    event.stopPropagation();
  }

  currentChannel++;

  if (currentChannel >= channels.length) {
    currentChannel = 0;
  }

  playChannelSound();
  triggerVHSGlitch();

  setTimeout(() => {
    updateChannel();
  }, 260);
}

function previousChannel(event) {
  if (event) {
    event.stopPropagation();
  }

  currentChannel--;

  if (currentChannel < 0) {
    currentChannel = channels.length - 1;
  }

  playChannelSound();
  triggerVHSGlitch();

  setTimeout(() => {
    updateChannel();
  }, 260);
}

function updateActiveChannelCard() {
  const cards = document.querySelectorAll("[data-channel-card]");

  cards.forEach(card => {
    card.classList.remove("active-channel");
  });

  const activeCard = document.querySelector(`[data-channel-card="${currentChannel}"]`);

  if (activeCard) {
    activeCard.classList.add("active-channel");
  }
}

function activateTV(event) {
  if (event) {
    event.stopPropagation();
  }

  playTVClickSound();
  rebootTV();
}

function rebootTV() {
  const video = document.getElementById("mainTvVideo");

  if (video) {
    video.pause();
    video.currentTime = 0;
  }

  triggerVHSGlitch();
  startTVSequence();
}

function triggerVHSGlitch() {
  const tvScreen = document.getElementById("tvScreen");
  const glitchLayer = document.getElementById("vhsGlitchLayer");

  if (tvScreen) {
    tvScreen.classList.remove("glitching");
    void tvScreen.offsetWidth;
    tvScreen.classList.add("glitching");
  }

  if (glitchLayer) {
    glitchLayer.classList.remove("active");
    void glitchLayer.offsetWidth;
    glitchLayer.classList.add("active");
  }
}

function playTVClickSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;

  if (!AudioContext) return;

  const audioContext = new AudioContext();

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(120, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(70, audioContext.currentTime + 0.08);
  oscillator.frequency.exponentialRampToValueAtTime(180, audioContext.currentTime + 0.18);

  gainNode.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.06, audioContext.currentTime + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.25);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.28);
}

function playChannelSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;

  if (!AudioContext) return;

  const audioContext = new AudioContext();

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = "sawtooth";
  oscillator.frequency.setValueAtTime(520, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(180, audioContext.currentTime + 0.16);

  gainNode.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.045, audioContext.currentTime + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.2);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.22);
}

startTVSequence();
