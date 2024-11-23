// script.js
const gameBoard = document.getElementById("gameBoard");
const cardValues = ["A", "B", "C", "D", "E", "F", "G", "H"];
const shuffledValues = [...cardValues, ...cardValues].sort(
  () => Math.random() - 0.5
);
let flippedCards = [];
let matchedCards = [];

function createBoard() {
  shuffledValues.forEach((value) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-value", value);
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (flippedCards.length === 2) return;

  this.classList.add("flipped");
  this.textContent = this.getAttribute("data-value");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  if (
    flippedCards[0].getAttribute("data-value") ===
    flippedCards[1].getAttribute("data-value")
  ) {
    matchedCards.push(flippedCards[0].getAttribute("data-value"));
    flippedCards = [];
    if (matchedCards.length === cardValues.length) {
      alert("You win!");
    }
  } else {
    setTimeout(() => {
      flippedCards.forEach((card) => card.classList.remove("flipped"));
      flippedCards.forEach((card) => (card.textContent = ""));
      flippedCards = [];
    }, 1000);
  }
}

createBoard();
