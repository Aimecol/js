<?php

include "./admin/config.php";

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Profile Resume</title>
  <link rel="stylesheet" href="styles.css" />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" />
</head>

<body>
  <div class="resume-container">
    <div class="left-panel">
      <?php

      $sql = mysqli_query($conn, "SELECT * FROM users WHERE id = 1");

      if (mysqli_num_rows($sql) == 1) {
        $row = mysqli_fetch_assoc($sql);
      }
      ?>
      <div class="profile-photo">
        <img src="./admin2/uploads/<?php echo $row['profile_image'] ?>" alt="Profile Photo" />
      </div>
      <h2 class="name"><?php echo $row['name'] ?></h2>
      <p class="title"><?php echo $row['title'] ?></p>

      <div class="about-me">
        <h3>About Me</h3>
        <p><?php echo $row['about'] ?></p>
      </div>

      <?php

      $sql2 = mysqli_query($conn, "SELECT * FROM contacts WHERE `user_id` = 1");

      if (mysqli_num_rows($sql2) > 0) {
        while ($row2 = mysqli_fetch_assoc($sql2)) {
      ?>
          <div class="contact-info">
            <h3>Contact</h3>
            <p><strong>Email:</strong> <?php echo  $row2['email'] ?></p>
            <p><strong>Phone:</strong> <?php echo  $row2['phone'] ?></p>
            <p><strong>LinkedIn:</strong> <?php echo  $row2['linkedin'] ?></p>
          </div>
      <?php
        }
      }
      ?>
      <div class="skills">
        <h3>Skills</h3>
        <?php
        $sql3 = mysqli_query($conn, "SELECT * FROM skills WHERE `user_id` = 1");

        if (mysqli_num_rows($sql3) > 0) {
          while ($row3 = mysqli_fetch_assoc($sql3)) {
        ?>
            <ul>
              <li><?php echo $row3['skill_name'] ?></li>
            </ul>
        <?php
          }
        }
        ?>
      </div>

      <div class="reference">
        <h3>Reference</h3>
        <?php
        $sql4 = mysqli_query($conn, "SELECT * FROM reference WHERE `user_id` = 1");

        if (mysqli_num_rows($sql4) > 0) {
          while ($row4 = mysqli_fetch_assoc($sql4)) {
        ?>
            <p><?php echo $row4['name'] ?></p>
            <p><?php echo $row4['contact_info'] ?></p>
            <p><?php echo $row4['email'] ?></p>
            <br>
        <?php
          }
        }
        ?>
      </div>

      <div class="media">
        <h3>My Media</h3>
        <div class="icons">
          <i class="fa-brands fa-github"></i>
          <i class="fa-brands fa-instagram"></i>
          <i class="fa-brands fa-linkedin"></i>
          <i class="fa-brands fa-twitter"></i>
          <i class="fa-brands fa-facebook"></i>
        </div>
      </div>
      <br>

      <div class="languages">
        <h3>Languages</h3>
        <div class="icons">
          <p>English: <span>Fluent</span></p>
          <p>French: <span>Good</span></p>
          <p>Swahili: <span>Good</span></p>
          <p>Kinyarwanda: <span>Fluent</span></p>
        </div>
      </div>
    </div>

    <div class="right-panel">
      <div class="job-experiences">
        <h3>Job Experiences</h3>
        <?php
        $sql5 = mysqli_query($conn, "SELECT * FROM job_experiences WHERE `user_id` = 1");

        if (mysqli_num_rows($sql5) > 0) {
          while ($row5 = mysqli_fetch_assoc($sql5)) {
        ?>
            <div class="job">
              <h4><?php echo $row5['position'] ?></h4>
              <p><strong><?php echo $row5['company'] ?></strong> | <?php echo $row5['start_year'] ?> - <?php echo $row5['end_year'] ?></p>
              <p><?php echo $row5['description'] ?></p>
              <a href="http://localhost/ecommerce/complete/" target="_blank">Visit</a>
            </div>
        <?php
          }
        }
        ?>
      </div>

      <div class="more">
        <h3>My Projects</h3>
        <div class="projects">
          <a href="#">
            <img src="./images/Screenshot (116).png" alt="">
          </a>
          <a href="#">
            <img src="./images/Screenshot (116).png" alt="">
          </a>
          <a href="#">
            <img src="./images/Screenshot (116).png" alt="">
          </a>
        </div>
      </div>

      <div class="education">
        <h3>Education</h3>
        <?php
        $sql6 = mysqli_query($conn, "SELECT * FROM education WHERE `user_id` = 1");

        if (mysqli_num_rows($sql6) > 0) {
          while ($row6 = mysqli_fetch_assoc($sql6)) {
        ?>
            <div class="education-item">
              <p><?php echo $row6['degree'] ?> | <?php echo $row6['graduation_year'] ?></p>
              <p><?php echo $row6['institution'] ?></p>
              <p><?php echo $row6['gpa'] ?></p>
            </div>
            <br>
        <?php
          }
        }
        ?>
      </div>

      <div class="contact-me">
        <h3>Contact me now</h3>
        <form action="./admin2/php/get_message.php" method="post">
          <div class="row">
            <div class="column">
              <label for="name">Name:</label>
              <input type="text" name="name" id="name">
            </div>
            <div class="column">
              <label for="email">Email:</label>
              <input type="email" name="email" id="email">
            </div>
          </div>
          <div class="row">
            <div class="column">
              <label for="phone">Telephone:</label>
              <input type="text" name="phone" id="phone">
            </div>
            <div class="column">
              <label for="location">Location:</label>
              <input type="text" name="location" id="location">
            </div>
          </div>
          <div class="row">
            <div class="column">
              <label for="message">Message:</label>
              <textarea name="message" id="message"></textarea>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

</body>

</html>