// Simulating sending a message (for now, adding the sent message on click)
document.querySelector(".send-btn").addEventListener("click", function () {
  const messageInput = document.querySelector(".message-input input");
  const messageText = messageInput.value.trim();

  if (messageText !== "") {
    // Add the sent message to the feed
    const messageFeed = document.querySelector(".message-feed");
    const newMessage = document.createElement("div");
    newMessage.classList.add("message", "sent");
    newMessage.innerHTML = `<span class="message-text">${messageText}</span>`;
    messageFeed.appendChild(newMessage);

    // Scroll to the bottom of the feed
    messageFeed.scrollTop = messageFeed.scrollHeight;

    // Clear the input field
    messageInput.value = "";
  }
});

// Optional: Add a return key listener to send messages
document
  .querySelector(".message-input input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      document.querySelector(".send-btn").click();
    }
  });
