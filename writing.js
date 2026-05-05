const spreads = [
  {
    leftLabel: "Opening Scene",
    leftTitle: "The Shattered Borderland Shrine",
    leftText:
      "Cold dawn light bleeds over a ruined borderland shrine where snapped torii arches vanish into pale spirit mist. The protagonist wakes on a cracked altar with no memory, ash-stained clothes, and a sky that flickers between a human sun and a blood-red spirit moon.",

    rightLabel: "First Encounter",
    rightTitle: "The Wounded White Snake",
    rightText:
      "Beside a toppled fox statue, a wounded white snake breathes shallowly as ghostly light leaks from its side. When shadow beasts emerge from the tree line, the protagonist instinctively shields it, triggering the first bond between human body and ancient dragon soul."
  },

  {
    leftLabel: "Core System",
    leftTitle: "The Dragon Veil Bond",
    leftText:
      "After the fight, the snake coils around the protagonist's forearm like a living bracer. A spectral cord hums between their chests, revealing that the creature is not a familiar, but the Dragon Ruler whose scattered bones still cage the world in pieces.",

    rightLabel: "HUD Concept",
    rightTitle: "Shared Health Interface",
    rightText:
      "The interface briefly glitches, showing two health bars pulsing together in rhythm with their shared breathing. This visual system introduces the bond mechanic: the protagonist becomes the anchor, while the snake becomes the form that can survive across fractured realities."
  },

  {
    leftLabel: "World System",
    leftTitle: "Dual-Reality Vision",
    leftText:
      "At the Marrow Marshes, the player's sight splits between the human world and the spirit overlay. One view shows rotting walkways and lantern posts, while the other reveals bone bridges, ivory ribs, and eyeless animal spirits watching from the fog.",

    rightLabel: "Distance Mechanic",
    rightTitle: "The Spirit Cord",
    rightText:
      "A shimmering Spirit Cord stretches between the protagonist and the snake. If the player moves too far, the cord tightens, vision fractures into glyphs, and the snake begins to fade. The mechanic turns emotional connection into gameplay tension."
  },

  {
    leftLabel: "Creature System",
    leftTitle: "Animal Resonance",
    leftText:
      "In the dark marsh, the protagonist learns that animals are not commanded through force. The Animal Resonance System responds to hesitation, breath rhythm, and where the player chooses to look, creating a calmer, more intuitive form of interaction.",

    rightLabel: "Gameplay Reward",
    rightTitle: "Listening Opens the Path",
    rightText:
      "When the player slows their breathing and places a hand on a swamp beast's forehead, perception snaps into the creature's body. Hidden causeways of bone and root appear beneath the water, raising a glowing path forward."
  },

  {
    leftLabel: "Set Piece",
    leftTitle: "Rib-Crest Peaks",
    leftText:
      "High in the mountains, snow lashes against cliffs shaped like broken ribs. In the spirit overlay, the snake separates from the protagonist's arm and becomes a dragon-shadow riding spectral air currents only it can see.",

    rightLabel: "Traversal Design",
    rightTitle: "The Wind Bridge",
    rightText:
      "The snake possesses a mountain eagle to strike a hanging prayer-bell, revealing hidden footholds in the Dual-Reality. When the protagonist leaps, the wind solidifies into a translucent bridge beneath their boots."
  },

  {
    leftLabel: "Truth Mechanic",
    leftTitle: "See the Truth",
    leftText:
      "Near the Brain Tower's apex, the protagonist touches a suspended fragment of the Dragon's skull and is thrown into a violent memory of marriage, betrayal, and a mirrored spear driven through the Dragon's heart.",

    rightLabel: "Narrative Ability",
    rightTitle: "Lies in the Archive",
    rightText:
      "A new ability blooms in the HUD: See the Truth. When toggled, the chamber warps, revealing that many scrolls are illusions while only a few glow with painful honesty about the world's betrayal."
  },

  {
    leftLabel: "Stealth Zone",
    leftTitle: "The Sea of Calcified Silk",
    leftText:
      "The ground becomes a dry ocean of bone dust and pale cocoons. The Silk-Stalkers inside mimic voices from the protagonist's fears, punishing careless movement and speech with sudden pursuit.",

    rightLabel: "Player Behavior",
    rightTitle: "Soft Steps, Softer Tongues",
    rightText:
      "This zone turns stealth into emotional restraint. The player must move quietly, control sound, and read two different safe paths through the Dual-Reality while the snake uses possessed bone-feathered birds to misdirect enemies."
  },

  {
    leftLabel: "Choice Scene",
    leftTitle: "Mirror-City of Oaths",
    leftText:
      "In a candlelit pavilion above frozen canals, the protagonist kneels before a veiled spirit-lord to sign a ceremonial contract. The marriage will bind health and fate: if one dies, both shatter.",

    rightLabel: "Moral Tension",
    rightTitle: "If You Betray Me",
    rightText:
      "The scene forces the player to accept a dangerous alliance while remembering a previous betrayal in the same city. The choice is political, emotional, and mechanical, tying trust directly to survival."
  },

  {
    leftLabel: "Final Region",
    leftTitle: "The Abyss of the Unborn",
    leftText:
      "In the final descent, the protagonist and snake drift through a living tunnel of pulsing red light. The Spirit Cord thickens into a glowing rope as the UI glitches into handwritten notes the player does not remember writing.",

    rightLabel: "Ending Question",
    rightTitle: "Whom Will You Restore This World For?",
    rightText:
      "After defeating the heart-beast and grasping the restored Heart bone, the Dragon consciousness asks the final question: now that the betrayal is remembered, who deserves the restored world?"
  }
];
let currentSpread = 0;

function updateBook() {
  const spread = spreads[currentSpread];

  document.getElementById("leftLabel").textContent = spread.leftLabel;
  document.getElementById("leftTitle").textContent = spread.leftTitle;
  document.getElementById("leftText").textContent = spread.leftText;

  document.getElementById("rightLabel").textContent = spread.rightLabel;
  document.getElementById("rightTitle").textContent = spread.rightTitle;
  document.getElementById("rightText").textContent = spread.rightText;

  const pageStart = currentSpread * 2 + 1;
  const pageEnd = pageStart + 1;

  document.getElementById("pageCounter").textContent = `Pages ${pageStart} - ${pageEnd}`;
}

function animatePageTurn() {
  const turningPage = document.getElementById("turningPage");

  turningPage.classList.remove("turning");

  void turningPage.offsetWidth;

  turningPage.classList.add("turning");
}
function nextSpread() {
  const book = document.getElementById("book");

  if (book && book.classList.contains("closed")) {
    openBook();
    return;
  }

  if (currentSpread < spreads.length - 1) {
    animatePageTurn();

    setTimeout(() => {
      currentSpread++;
      updateBook();
    }, 350);

    return;
  }

  closeBook();
}

function previousSpread() {
  const book = document.getElementById("book");

  if (book && book.classList.contains("closed")) {
    openBook();
    return;
  }

  if (currentSpread > 0) {
    animatePageTurn();

    setTimeout(() => {
      currentSpread--;
      updateBook();
    }, 350);
  }
}
function jumpToSpread(spreadNumber) {
  const book = document.getElementById("book");

  if (book && book.classList.contains("closed")) {
    openBook();
  }

  if (spreadNumber >= 0 && spreadNumber < spreads.length) {
    animatePageTurn();

    setTimeout(() => {
      currentSpread = spreadNumber;
      updateBook();
    }, 350);
  }
}

updateBook();

function openBook() {
  const book = document.getElementById("book");
  const bookControls = document.getElementById("bookControls");
  const chapterMenu = document.getElementById("chapterMenu");

  if (book) {
    book.classList.add("magic-open");

    setTimeout(() => {
      book.classList.remove("closed");
      book.classList.add("opened");
    }, 250);

    setTimeout(() => {
      book.classList.remove("magic-open");
    }, 1000);
  }

  if (bookControls) {
    bookControls.classList.remove("hidden-until-open");
  }

  if (chapterMenu) {
    chapterMenu.classList.remove("hidden-until-open");
  }
}
function closeBook() {
  const book = document.getElementById("book");
  const bookControls = document.getElementById("bookControls");
  const chapterMenu = document.getElementById("chapterMenu");

  if (!book) return;

  book.classList.remove("opened");
  book.classList.add("closing");

  if (bookControls) {
    bookControls.classList.add("hidden-until-open");
  }

  if (chapterMenu) {
    chapterMenu.classList.add("hidden-until-open");
  }

  setTimeout(() => {
    book.classList.remove("closing");
    book.classList.add("closed");
    currentSpread = 0;
    updateBook();
  }, 1000);
}
