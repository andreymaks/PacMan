"use strict";

const field = document.querySelector(".field");
const boardSize = 20;
const pacman = { x: 1, y: 1 };
const spirits = [
  { x: 1, y: 18 },
  { x: 18, y: 1 },
  { x: 18, y: 18 },
];
let direction = { x: 0, y: 0 };
let canMove = true;
const map = [
  "wwwwwwwwwwwwwwwwwwww",
  "w..................w",
  "w.ww.wwww..wwww.ww.w",
  "w.ww.wwww..wwww.ww.w",
  "w..................w",
  "w.ww.ww.wwww.ww.ww.w",
  "w....ww.wwww.ww....w",
  "w.ww.ww..ww..ww.ww.w",
  "w.ww.www.ww.www.ww.w",
  "w..................w",
  "w..................w",
  "w.ww.www.ww.www.ww.w",
  "w.ww.ww..ww..ww.ww.w",
  "w....ww.wwww.ww....w",
  "w.ww.ww.wwww.ww.ww.w",
  "w..................w",
  "w.ww.wwww..wwww.ww.w",
  "w.ww.wwww..wwww.ww.w",
  "w..................w",
  "wwwwwwwwwwwwwwwwwwww",
];

const calculateIndex = function (position) {
  let index;
  return (index = position.x * boardSize + position.y);
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

const checkFood = function () {
  if (
    Array.from(field.children).some((child) => child.classList.contains("food"))
  )
    return;
  clearInterval(interval);
  alert("You've won!");
};

const drawPacMan = function () {
  const index = calculateIndex(pacman);
  field.children[index].classList.remove("food");
  field.children[index].classList.add("pacman");
  if (
    field.children[index].classList.contains("spirit") &&
    field.children[index].classList.contains("pacman")
  ) {
    field.children[index].classList.add("spirit");
    clearInterval(interval);
    setTimeout(() => alert("Game over!"), 0);
  }
};

drawPacMan();

const movePacMan = function () {
  if (map[pacman.x + direction.x][pacman.y + direction.y] !== "w") {
    const index = calculateIndex(pacman);
    field.children[index].classList.remove("pacman");
    pacman.x += direction.x;
    pacman.y += direction.y;
    drawPacMan();
  }
};

const drawSpirits = function () {
  spirits.forEach((spirit) => {
    const index = calculateIndex(spirit);
    field.children[index].classList.add("spirit");
    if (
      field.children[index].classList.contains("spirit") &&
      field.children[index].classList.contains("pacman")
    ) {
      field.children[index].classList.add("pacman");
      clearInterval(interval);
      alert("Game over!");
    }
  });
};

drawSpirits();

const moveSpirits = function () {
  spirits.forEach((spirit) => {
    const directions = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ];
    const possibleDirections = directions.filter((dir) => {
      if (map[spirit.x + dir.x][spirit.y + dir.y] !== "w") return dir;
    });
    const move = Math.floor(Math.random() * possibleDirections.length);
    const index = calculateIndex(spirit);
    field.children[index].classList.remove("spirit");
    spirit.x += possibleDirections[move].x;
    spirit.y += possibleDirections[move].y;
  });

  drawSpirits();
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

const gameLoop = function () {
  moveSpirits();
  checkFood();
};

const interval = setInterval(gameLoop, 300);
