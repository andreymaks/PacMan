const field = document.querySelector(".field");
const boardSize = 20;
const pacman = { x: 1, y: 1 };
let direction = { x: 0, y: 0 };
let canMove = true;
const map = [
  "wwwwwwwwwwwwwwwwwwww",
  "w....wwwwwwwwww....w",
  "w.ww.wwwwwwwwww.ww.w",
  "w.ww.wwwwwwwwww.ww.w",
  "w....wwwwwwwwww....w",
  "w....wwwwwwwwww....w",
  "w....wwwwwwwwww....w",
  "w....wwwwwwwwww....w",
  "w....wwwwwwwwww....w",
  "w..................w",
  "w..................w",
  "w....wwwwwwwwww....w",
  "w....wwwwwwwwww....w",
  "w....wwwwwwwwww....w",
  "w....wwwwwwwwww....w",
  "w....wwwwwwwwww....w",
  "w.ww.wwwwwwwwww.ww.w",
  "w.ww.wwwwwwwwww.ww.w",
  "w....wwwwwwwwww....w",
  "wwwwwwwwwwwwwwwwwwww",
];

const calculateIndex = function () {
  return (index = pacman.x * boardSize + pacman.y);
};

const drawMap = function () {
  map.forEach((row, i) => {
    [...row].forEach((cell, j) => {
      const el = document.createElement("div");
      const cellClass = cell === "w" ? "wall" : "food";
      el.classList.add(`${cellClass}`);
      field.appendChild(el);
    });
  });
};

drawMap();

const drawPacMan = function () {
  const index = calculateIndex();
  field.children[index].classList.remove("food");
  field.children[index].classList.add("pacman");
};

drawPacMan();

const movePacMan = function () {
  if (map[pacman.x + direction.x][pacman.y + direction.y] !== "w") {
    const index = calculateIndex();
    field.children[index].classList.remove("pacman");
    pacman.x += direction.x;
    pacman.y += direction.y;
    drawPacMan();
  }
};

const keyDown = function (e) {};

document.addEventListener("keydown", function (e) {
  e.preventDefault();
  if (canMove) {
    canMove = false;
    setTimeout(function () {
      canMove = true;
    }, 150);
    switch (e.key) {
      case "ArrowUp":
        direction = { x: -1, y: 0 };
        movePacMan();
        break;
      case "ArrowDown":
        direction = { x: 1, y: 0 };
        movePacMan();
        break;
      case "ArrowLeft":
        direction = { x: 0, y: -1 };
        movePacMan();
        break;
      case "ArrowRight":
        direction = { x: 0, y: 1 };
        movePacMan();
        break;
      default:
        break;
    }
  }
});
