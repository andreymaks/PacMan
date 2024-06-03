const field = document.querySelector(".field");
const boardSize = 20;
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

const drawMap = function () {
  map.forEach((row, i) => {
    [...row].forEach((cell, j) => {
      const el = document.createElement("div");
      const index = i * boardSize + j;
      const cellClass = cell === "w" ? "wall" : "food";
      el.classList.add(`${cellClass}`);
      field.appendChild(el);
    });
  });
};

drawMap();
