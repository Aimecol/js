// JavaScript functionality for like buttons and comment section could be added here

const likeIcons = document.querySelectorAll(".fa-heart");
likeIcons.forEach((icon) => {
  icon.addEventListener("click", function () {
    this.classList.toggle("liked");
    if (this.classList.contains("liked")) {
      alert("Liked!");
    } else {
      alert("Unliked!");
    }
  });
});
