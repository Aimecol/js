// script.js
let secretNumber = Math.floor(Math.random() * 100) + 1;

function checkGuess() {
  const guess = Number(document.getElementById("guess").value);
  const message = document.getElementById("message");

  if (guess < secretNumber) {
    message.textContent = "Too low! Try again.";
  } else if (guess > secretNumber) {
    message.textContent = "Too high! Try again.";
  } else {
    message.textContent = "Correct! You guessed the number!";
  }
}

function resetGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  document.getElementById("guess").value = "";
  document.getElementById("message").textContent = "";
}
