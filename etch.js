const INITIAL_GRID_SIZE = 16;
let CONTAINER_WIDTH = 720;

//#region grid creation
function drawGrid(size) {
  const container = document.querySelector("#container");
  const squareDimension = CONTAINER_WIDTH / size;

  for (let i = 0; i < size * size; i++) {
    addGridSquare(container, squareDimension);
  }
}

function addGridSquare(parent, size) {
  const testGridElement = document.createElement("div");
  testGridElement.style.flexShrink = "0";
  testGridElement.style.border = "0.5px solid black";
  testGridElement.style.width = `${size}px`;
  testGridElement.style.height = `${size}px`;

  testGridElement.addEventListener("mouseenter", colorGridSquare);

  parent.appendChild(testGridElement);
}
//#endregion
//#region event handlers
function promptForResize() {
  let newGridSize = +prompt("Enter the new grid width (1-100)");

  while (isNaN(newGridSize) || newGridSize < 1) {
    alert("Please enter a number between 1 and 100!");
    newGridSize = +prompt("Enter the new grid width (1-100)");
  }

  updateGridSize(newGridSize);
}

function updateGridSize(newGridSize) {
  const container = document.querySelector("#container");
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }

  drawGrid(newGridSize);
}

function colorGridSquare(event) {
  const gridElement = event.target;

  if (gridElement.style.backgroundColor) {
    increaseOpacity(gridElement);
    return;
  }

  const r = Math.random() * 255;
  const g = Math.random() * 255;
  const b = Math.random() * 255;
  gridElement.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.1)`;
}

function increaseOpacity(gridElement) {
  const opacityMatch = /([0-9]\.[0-9])\)/g;
  const opMatch = gridElement.style.backgroundColor.match(opacityMatch);
  let currentOpacity = opMatch ? opMatch[0] : "0.0)";
  currentOpacity = currentOpacity.substring(0, currentOpacity.length - 1);
  gridElement.style.backgroundColor = gridElement.style.backgroundColor.replace(
    opacityMatch,
    `${Math.min(+currentOpacity + 0.1, 1)})`
  );
}
//#endregion
//#region page init
const vh = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0
);

const resetButton = document.querySelector("#gridSize");
resetButton.addEventListener("click", promptForResize);
drawGrid(INITIAL_GRID_SIZE);
//#endregion
