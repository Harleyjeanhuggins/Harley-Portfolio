const customCursor = document.getElementById("customCursor");
const cursorTrail = document.getElementById("cursorTrail");

let mouseX = 0;
let mouseY = 0;

let trailX = 0;
let trailY = 0;

document.addEventListener("mousemove", function(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;

  if (customCursor) {
    customCursor.style.left = mouseX + "px";
    customCursor.style.top = mouseY + "px";
  }
});

function animateCursorTrail() {
  trailX += (mouseX - trailX) * 0.14;
  trailY += (mouseY - trailY) * 0.14;

  if (cursorTrail) {
    cursorTrail.style.left = trailX + "px";
    cursorTrail.style.top = trailY + "px";
  }

  requestAnimationFrame(animateCursorTrail);
}

animateCursorTrail();

const hoverTargets = document.querySelectorAll(
  "button, a, .portal-card, .unlock-card, .world-card, .case-card, .video-card, .skill-pill, .branch-btn, .tv-shell, .book-cover"
);

hoverTargets.forEach(function(target) {
  target.addEventListener("mouseenter", function() {
    if (customCursor) {
      customCursor.classList.add("cursor-hover");
    }

    if (cursorTrail) {
      cursorTrail.classList.add("cursor-hover");
    }
  });

  target.addEventListener("mouseleave", function() {
    if (customCursor) {
      customCursor.classList.remove("cursor-hover");
    }

    if (cursorTrail) {
      cursorTrail.classList.remove("cursor-hover");
    }
  });
});
document.addEventListener("click", function(event) {
  const spark = document.createElement("span");
  spark.classList.add("cursor-spark");

  spark.style.left = event.clientX + "px";
  spark.style.top = event.clientY + "px";

  document.body.appendChild(spark);

  setTimeout(function() {
    spark.remove();
  }, 600);
});