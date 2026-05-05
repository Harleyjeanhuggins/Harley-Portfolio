const spreads = [
  {
    leftLabel: "Archive Entry 01",
    leftTitle: "The Ice Prince of Shanghai",
    leftText:
      "Lin Xuan was not the kind of person people approached without thinking first. At the university, his name moved faster than he did — whispered through lecture halls, student lounges, glass corridors, and every place ambition gathered.",

    rightLabel: "Archive Entry 02",
    rightTitle: "A Foreign Bloom",
    rightText:
      "Allie Reed arrived in Shanghai with too much color in her voice, too much curiosity in her eyes, and absolutely no understanding of the invisible rules that governed the university’s elite."
  },

  {
    leftLabel: "Character Profile",
    leftTitle: "Allie Reed",
    leftText:
      "An exchange student from Chicago with a sharp mind, artistic talent, and a habit of walking into rooms like she has no idea she is disturbing the balance of them. She is creative, bright, stubborn, and stronger than people first assume.",

    rightLabel: "Character Profile",
    rightTitle: "Lin Xuan",
    rightText:
      "The university’s untouchable Ice Prince. Disciplined, wealthy, respected, and emotionally guarded, Lin Xuan has spent years building walls high enough that no one questions the coldness anymore."
  },

  {
    leftLabel: "Chapter Sample",
    leftTitle: "A Forced Study Session",
    leftText:
      "The Dean’s email arrived at exactly 7:03 in the morning. Lin Xuan read it once, then twice, then a third time with the growing realization that his peaceful semester had just been destroyed by one name: Allie Reed.",

    rightLabel: "Chapter Sample",
    rightTitle: "Noodles Behind Campus",
    rightText:
      "By the time the study session ended, the campus had gone quiet. The library lights reflected across the rain-slick pavement as Xuan led Allie through the back gate toward a noodle shop that only students with secrets seemed to know."
  },

  {
    leftLabel: "Worldbuilding Note",
    leftTitle: "The Rules of the Elite",
    leftText:
      "At Xuan’s university, status is not always spoken. It appears in who gets invited, who gets protected, who gets ignored, and who everyone suddenly notices when they stand beside the wrong person.",

    rightLabel: "Worldbuilding Note",
    rightTitle: "Future Additions",
    rightText:
      "This archive can eventually hold full chapters, character sheets, webtoon scripts, manga panels, game lore, concept art, and process videos showing how each story evolves from idea to final version."
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
