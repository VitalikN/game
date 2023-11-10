import { GameBoard } from "./counter";

const gameBoard = new GameBoard(6, 7);
const gameBoardDiv = document.getElementById("gameBoard");
const updateGameButton = document.getElementById("updateGameButton");

function updateGameBoardView() {
  gameBoardDiv.innerHTML = "";

  let allCellsEmpty = true;

  for (let i = 0; i < gameBoard.rows; i++) {
    for (let j = 0; j < gameBoard.cols; j++) {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      cellDiv.textContent = gameBoard.board[i][j]
        ? gameBoard.board[i][j].type
        : "";
      if (gameBoard.board[i][j]) {
        allCellsEmpty = false;
      }

      cellDiv.addEventListener("click", () => {
        gameBoard.findAndRemoveGroup(i, j);
        updateGameBoardView();
      });

      gameBoardDiv.appendChild(cellDiv);
    }
  }

  if (allCellsEmpty && !gameBoard.gameOver) {
    alert(
      "Ви успішно закінчили гру! Натискайте 'Почати нову гру', щоб розпочати знову."
    );
  }
}

updateGameButton.addEventListener("click", () => {
  gameBoard.board = gameBoard.createBoard();
  updateGameBoardView();
});

updateGameBoardView();
