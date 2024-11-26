// Select elements
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

// Function to add messages
function addMessage(message, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  messageDiv.textContent = message;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
}

// Simulate bot response
function getBotResponse(input) {
  const inputLower = input.toLowerCase();

  if (inputLower.includes("hello")) {
    return "Hello! How can I help you today?";
  } else if (inputLower.includes("how are you")) {
    return "I'm just a bot, but I'm here to assist you!";
  } else if (inputLower.includes("bye")) {
    return "Goodbye! Have a great day!";
  } else {
    return "I'm not sure I understand that.";
  }
}

// Handle message sending
sendButton.addEventListener("click", () => {
  const userMessage = userInput.value.trim();
  if (userMessage) {
    addMessage(userMessage, "user"); // Add user message
    userInput.value = ""; // Clear input
    setTimeout(() => {
      const botMessage = getBotResponse(userMessage);
      addMessage(botMessage, "bot"); // Add bot response
    }, 500); // Simulate a delay
  }
});
