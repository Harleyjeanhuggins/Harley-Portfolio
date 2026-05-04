const binaryOverlay = document.getElementById("binaryOverlay");

if (binaryOverlay) {
  createBinaryColumns();
}

function createBinaryColumns() {
  const totalColumns = 26;

  for (let i = 0; i < totalColumns; i++) {
    const column = document.createElement("div");
    column.classList.add("binary-column");

    // Random size variation
    const randomType = Math.random();
    if (randomType < 0.25) {
      column.classList.add("small");
    } else if (randomType < 0.45) {
      column.classList.add("large");
    } else if (randomType < 0.62) {
      column.classList.add("blur");
    }

    // Position across the screen
    column.style.left = Math.random() * 100 + "%";

    // Random duration and delay
    const duration = 14 + Math.random() * 18;
    const delay = Math.random() * -20;

    column.style.animationDuration = duration + "s";
    column.style.animationDelay = delay + "s";

    // Slight transparency variation
    column.style.opacity = 0.25 + Math.random() * 0.55;

    // Random number of digits
    const digitCount = 14 + Math.floor(Math.random() * 22);

    for (let j = 0; j < digitCount; j++) {
      const digit = document.createElement("span");
      digit.textContent = Math.random() > 0.5 ? "1" : "0";
      column.appendChild(digit);
    }

    binaryOverlay.appendChild(column);
  }
}