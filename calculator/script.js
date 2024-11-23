// Select display and buttons
const display = document.getElementById("display");
const buttons = Array.from(document.querySelectorAll(".btn"));
let currentInput = "";

// Function to update the display
function updateDisplay(value) {
  display.value = value;
}

// Clear display
document.getElementById("clear").addEventListener("click", () => {
  currentInput = "";
  updateDisplay(currentInput);
});

// Backspace function
document.getElementById("backspace").addEventListener("click", () => {
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput);
});

// Basic number and operator input
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (value === "=") {
      try {
        currentInput = eval(currentInput).toString();
      } catch (error) {
        currentInput = "Error";
      }
      updateDisplay(currentInput);
    } else if (value !== "C" && value !== "←") {
      currentInput += value;
      updateDisplay(currentInput);
    }
  });
});

// Scientific functions
document.getElementById("sin").addEventListener("click", () => {
  currentInput = Math.sin(parseFloat(currentInput)).toString();
  updateDisplay(currentInput);
});

document.getElementById("cos").addEventListener("click", () => {
  currentInput = Math.cos(parseFloat(currentInput)).toString();
  updateDisplay(currentInput);
});

document.getElementById("tan").addEventListener("click", () => {
  currentInput = Math.tan(parseFloat(currentInput)).toString();
  updateDisplay(currentInput);
});

document.getElementById("asin").addEventListener("click", () => {
  currentInput = Math.asin(parseFloat(currentInput)).toString();
  updateDisplay(currentInput);
});

document.getElementById("acos").addEventListener("click", () => {
  currentInput = Math.acos(parseFloat(currentInput)).toString();
  updateDisplay(currentInput);
});

document.getElementById("atan").addEventListener("click", () => {
  currentInput = Math.atan(parseFloat(currentInput)).toString();
  updateDisplay(currentInput);
});

document.getElementById("log").addEventListener("click", () => {
  currentInput = Math.log(parseFloat(currentInput)).toString();
  updateDisplay(currentInput);
});

document.getElementById("sqrt").addEventListener("click", () => {
  currentInput = Math.sqrt(parseFloat(currentInput)).toString();
  updateDisplay(currentInput);
});

document.getElementById("exp").addEventListener("click", () => {
  currentInput = Math.exp(parseFloat(currentInput)).toString();
  updateDisplay(currentInput);
});

document.getElementById("pi").addEventListener("click", () => {
  currentInput = Math.PI.toString();
  updateDisplay(currentInput);
});

document.getElementById("e").addEventListener("click", () => {
  currentInput = Math.E.toString();
  updateDisplay(currentInput);
});

document.getElementById("pow").addEventListener("click", () => {
  currentInput += "^";
  updateDisplay(currentInput);
});

document.getElementById("factorial").addEventListener("click", () => {
  let n = parseInt(currentInput);
  if (n >= 0) {
    currentInput = factorial(n).toString();
  } else {
    currentInput = "Error";
  }
  updateDisplay(currentInput);
});

document.getElementById("sinh").addEventListener("click", () => {
  currentInput = Math.sinh(parseFloat(currentInput)).toString();
  updateDisplay(currentInput);
});

document.getElementById("cosh").addEventListener("click", () => {
  currentInput = Math.cosh(parseFloat(currentInput)).toString();
  updateDisplay(currentInput);
});

document.getElementById("tanh").addEventListener("click", () => {
  currentInput = Math.tanh(parseFloat(currentInput)).toString();
  updateDisplay(currentInput);
});

document.getElementById("ceil").addEventListener("click", () => {
  currentInput = Math.ceil(parseFloat(currentInput)).toString();
  updateDisplay(currentInput);
});

document.getElementById("floor").addEventListener("click", () => {
  currentInput = Math.floor(parseFloat(currentInput)).toString();
  updateDisplay(currentInput);
});

document.getElementById("round").addEventListener("click", () => {
  currentInput = Math.round(parseFloat(currentInput)).toString();
  updateDisplay(currentInput);
});

// Factorial function
function factorial(n) {
  if (n === 0) {
    return 1;
  }
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}
