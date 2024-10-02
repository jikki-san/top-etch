const INITIAL_GRID_SIZE = 100;
let CONTAINER_WIDTH = 720;

//#region grid creation
function drawGrid(size) {
  const container = document.querySelector("#container");
  const squareDimension = CONTAINER_WIDTH / size;
  // container.style.maxWidth = `${containerDimension}px`;
  // container.style.maxHeight = `${containerDimension}px`;

  for (let i = 0; i < size * size; i++) {
    addGridSquare(container, squareDimension);
  }
}

function addGridSquare(parent, size) {
  const testGridElement = document.createElement("div");
  testGridElement.style.flexShrink = "0";
  testGridElement.style.border = "0.5px solid black";
  // testGridElement.style.margin = "1px";
  testGridElement.style.width = `${size}px`;
  testGridElement.style.height = `${size}px`;

  testGridElement.addEventListener("mouseenter", colorGridSquare);

  parent.appendChild(testGridElement);
}
//#endregion
//#region event handlers
function displayModal() {
  const modal = document.querySelector(".modal");
  modal.classList.add("active");

  const cancelBtn = document.querySelector("#modalCancel");
  cancelBtn.addEventListener("click", closeModal);
  const updateBtn = document.querySelector("#modalUpdate");
  updateBtn.addEventListener("click", updateGridSize);
}

function closeModal() {
  const modal = document.querySelector(".modal");
  const input = document.querySelector("#sizeInput");
  input.value = "";
  modal.classList.remove("active");
}

function updateGridSize() {
  const input = document.querySelector("#sizeInput");
  // TODO: validate this
  const newGridSize = input.valueAsNumber;

  const container = document.querySelector("#container");
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }

  drawGrid(newGridSize);
  closeModal();
}

function colorGridSquare(event) {
  const gridElement = event.target;
  const r = Math.random() * 255;
  const g = Math.random() * 255;
  const b = Math.random() * 255;
  gridElement.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}
//#endregion
//#region reset logic
//#endregion
//#region grid size change
//#endregion
//#region page init
const vh = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0
);
if (vh) {
  console.log(vh);
}
const resetButton = document.querySelector("#gridSize");
resetButton.addEventListener("click", displayModal);
drawGrid(INITIAL_GRID_SIZE);
//#endregion
