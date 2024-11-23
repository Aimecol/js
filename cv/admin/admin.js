document.querySelectorAll(".sidebar a").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector(".sidebar a.active").classList.remove("active");
    this.classList.add("active");

    const sectionId = this.getAttribute("data-section");
    document.querySelectorAll(".section").forEach((section) => {
      section.classList.remove("active");
    });
    document.getElementById(sectionId).classList.add("active");
  });
});

const form = document.querySelector(".personal-information"),
  infoBut = form.querySelector(".information-button");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

infoBut.addEventListener("click", () => {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "php/update_info.php", true);
  xhr.onload = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        let data = xhr.response;
        alert(data);
      }
    }
  };
  let formData = new FormData(form);
  xhr.send(formData);
});

function saveContactInfo() {
  const form = document.querySelector(".contacts-information"),
    infoBut = form.querySelector(".contacts-button");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  infoBut.addEventListener("click", () => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/update_contacts.php", true);
    xhr.onload = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          let data = xhr.response;
          alert(data);
        }
      }
    };
    let formData = new FormData(form);
    xhr.send(formData);
  });
}

function addJobExperienceForm() {
  const jobList = document.getElementById("job-list");
  jobList.innerHTML = `
    <form action="./php/insert_experience.php" method="post" class="insertion-experience">
      <label>Position:</label><input type="text" name="position">
      <label>Company:</label><input type="text" name="company">
      <label>Start Year:</label><input type="number" name="start-year">
      <label>End Year:</label><input type="number" name="end-year">
      <label>Description:</label><textarea name="description"></textarea>
      <button type="submit">Save Experience</button>
    </form>
  `;
}

function addEducationForm() {
  const educationList = document.getElementById("education-list");
  educationList.innerHTML = `
    <form method="post" action="./php/insert-education.php">
      <label>Degree:</label><input type="text" name="degree">
      <label>Institution:</label><input type="text" name="institution">
      <label>Graduation Year:</label><input type="number" name="g-year">
      <label>GPA:</label><input type="text" name="gpa">
      <button type= "submit">Save Education</button>
    </form>
  `;
}

function addReferenceForm() {
  const referenceList = document.getElementById("reference-list");
  referenceList.innerHTML = `
    <form method="post" action="./php/insert-reference.php">
      <label>Name:</label><input type="text" name="name" placeholder="Reference Name">
      <label>Phone:</label><input type="text" name="phone" placeholder="Reference Phone">
      <label>Email:</label><input type="email" name="email" placeholder="Reference Email">
      <button type="submit">Save Reference</button>
    </form>
  `;
}
