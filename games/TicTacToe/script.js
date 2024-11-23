// script.js
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

function makeMove(index) {
  if (gameOver || board[index]) return;
  board[index] = currentPlayer;
  document.querySelectorAll(".cell")[index].textContent = currentPlayer;
  if (checkWinner()) {
    document.getElementById("message").textContent = `${currentPlayer} wins!`;
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  return winningCombinations.some((combination) => {
    const [a, b, c] = combination;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameOver = false;
  currentPlayer = "X";
  document.querySelectorAll(".cell").forEach((cell) => (cell.textContent = ""));
  document.getElementById("message").textContent = "";
}
