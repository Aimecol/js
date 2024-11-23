document
  .getElementById("imageInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const imagePreview = document.getElementById("imagePreview");
        const imagePreviewContainer = document.querySelector(".image-preview");

        imagePreview.src = e.target.result; // Set the image source to the selected file
        imagePreviewContainer.style.display = "block"; // Show the image preview container
      };

      reader.readAsDataURL(file); // Read the selected image as a data URL
    }
  });
