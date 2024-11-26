// // Select elements
// const chatBox = document.getElementById("chat-box");
// const userInput = document.getElementById("user-input");
// const sendButton = document.getElementById("send-button");

// // Function to add messages
// function addMessage(message, sender) {
//   const messageDiv = document.createElement("div");
//   messageDiv.classList.add("message", sender);
//   messageDiv.textContent = message;
//   chatBox.appendChild(messageDiv);
//   chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
// }

// // Simulate bot response
// function getBotResponse(input) {
//   const inputLower = input.toLowerCase();

//   if (inputLower.includes("hello")) {
//     return "Hello! How can I help you today?";
//   } else if (inputLower.includes("how are you")) {
//     return "I'm just a bot, but I'm here to assist you!";
//   } else if (inputLower.includes("bye")) {
//     return "Goodbye! Have a great day!";
//   } else {
//     return "I'm not sure I understand that.";
//   }
// }

// // Handle message sending
// sendButton.addEventListener("click", () => {
//   const userMessage = userInput.value.trim();
//   if (userMessage) {
//     addMessage(userMessage, "user"); // Add user message
//     userInput.value = ""; // Clear input
//     setTimeout(() => {
//       const botMessage = getBotResponse(userMessage);
//       addMessage(botMessage, "bot"); // Add bot response
//     }, 500); // Simulate a delay
//   }
// });

async function getBotResponse(userMessage) {
  const apiKey = "YOUR_OPENAI_API_KEY"; // Replace with your OpenAI API key
  const endpoint = "https://api.openai.com/v1/chat/completions";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  const data = {
    model: "gpt-3.5-turbo", // Or "gpt-4" if available
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: userMessage },
    ],
    max_tokens: 150, // Limit the response length
    temperature: 0.7, // Control randomness (0 is deterministic, 1 is very random)
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const json = await response.json();
    const botMessage = json.choices[0].message.content.trim();
    return botMessage;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return "I'm having trouble connecting to the server. Please try again later.";
  }
}
