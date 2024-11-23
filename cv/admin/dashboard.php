<?php
session_start();

// Check if the user is logged in
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
  header("Location: login.php");
  exit();
}

include_once "./config.php";
?>


<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin Dashboard - Portfolio</title>
  <link rel="stylesheet" href="admin.css" />
</head>

<body>
  <div class="dashboard">
    <!-- Sidebar Navigation -->
    <aside class="sidebar">
      <h2>My Portfolio</h2>
      <nav>
        <ul>
          <li>
            <a href="#" data-section="personal-info" class="active">Personal Info</a>
          </li>
          <li><a href="#" data-section="contact-info">Contact Info</a></li>
          <li>
            <a href="#" data-section="job-experience">Job Experience</a>
          </li>
          <li><a href="#" data-section="education">Education</a></li>
          <li><a href="#" data-section="skills">Skills</a></li>
          <li><a href="#" data-section="references">References</a></li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content Area -->
    <main class="content">
      <header class="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div class="user-info">
          <img src="./uploads/<?php echo htmlspecialchars($_SESSION['admin_image']); ?>" alt="Admin" />
          <span><?php echo htmlspecialchars($_SESSION['admin_username']); ?>!</span>
        </div>
        <div><a href="./logout.php" class="logout">Logout</a></div>
      </header>
      <!-- Personal Information Section -->
      <section id="personal-info" class="section active">
        <h2>Personal Information</h2>
        <form action="" method="post" enctype="multipart/form-data" class="personal-information">
          <label for="name">Name:</label>
          <input type="text" id="name" name="info-name" value="<?php echo htmlspecialchars($_SESSION['admin_name']); ?>" />

          <label for="title">Title:</label>
          <input
            type="text"
            id="title"
            name="info-title"
            value="<?php echo htmlspecialchars($_SESSION['admin_title']); ?>" />

          <label for="about">About:</label>
          <textarea
            id="about"
            name="info-about"><?php echo htmlspecialchars($_SESSION['admin_text']); ?>
          </textarea>

          <label for="profile-image">Profile Image URL:</label>
          <input
            type="file"
            name="info-image"
            id="profile-image" />

          <button type="submit" class="information-button">Save</button>

        </form>
      </section>

      <!-- Contact Information Section -->
      <section id="contact-info" class="section">
        <h2>Contact Information</h2>
        <?php
        $sql1 = mysqli_query($conn, "SELECT * FROM contacts WHERE `user_id` = {$_SESSION['admin_id']}");

        if (mysqli_num_rows($sql1) > 0) {
          $row1 = mysqli_fetch_assoc($sql1);
        }
        ?>
        <form action="" method="post" class="contacts-information">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value="<?php echo htmlspecialchars($row1['email']) ?>" />

          <label for="phone">Phone:</label>
          <input type="text" id="phone" name="phone"
            value="<?php echo htmlspecialchars($row1['phone']) ?>" />

          <label for="linkedin">LinkedIn:</label>
          <input
            type="text"
            id="linkedin"
            name="linkedin"
            value="<?php echo htmlspecialchars($row1['linkedin']) ?>" />

          <button type="button" onclick="saveContactInfo()" class="contacts-button">Save</button>
        </form>
      </section>

      <!-- Job Experience Section -->
      <section id="job-experience" class="section">
        <h2>Job Experience</h2>
        <div class="table-holder">
          <table>
            <tr>
              <th>N<sup><u>o</u></sup></th>
              <th>Position</th>
              <th>Company</th>
              <th>Start Year</th>
              <th>End Year</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
            <?php
            $sql2 = mysqli_query($conn, "SELECT * FROM job_experiences WHERE `user_id` = {$_SESSION['admin_id']}");

            if (mysqli_num_rows($sql2) > 0) {
              $i = 1;
              while ($row2 = mysqli_fetch_assoc($sql2)) {
            ?>
                <tr>
                  <td><?php echo $i; ?></td>
                  <td><?php echo htmlspecialchars($row2['position']) ?></td>
                  <td><?php echo htmlspecialchars($row2['company']) ?></td>
                  <td><?php echo htmlspecialchars($row2['start_year']) ?></td>
                  <td><?php echo htmlspecialchars($row2['end_year']) ?></td>
                  <td><?php echo htmlspecialchars($row2['description']) ?></td>
                  <td class="td">
                    <a href="?id=<?php echo $row2['id']; ?>#edit-experience" data-section="edit-experience" class="edit-exp-btn">Edit</a> |
                    <a href="./php/delete_experience.php?id=<?php echo $row2['id']; ?>" class="delete-exp-btn">Delete</a>
                  </td>
                </tr>
            <?php
                $i++;
              }
            }
            ?>
          </table>
        </div>

        <div id="job-list"></div>

        <button onclick="addJobExperienceForm()">Add Job Experience</button>
      </section>

      <?php
      if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $sql2 = mysqli_query($conn, "SELECT * FROM job_experiences WHERE `id` = {$id}");

        if (mysqli_num_rows($sql2) > 0) {
          $i = 1;
          while ($row2 = mysqli_fetch_assoc($sql2)) {
      ?>
            <section id="edit-experience">
              <form action="./php/update_experience.php" method="post" class="updation-experience">
                <label>Position:</label>
                <input type="text" name="position" value="<?php echo htmlspecialchars($row2['position']) ?>">
                <label>Company:</label>
                <input type="text" name="company" value="<?php echo htmlspecialchars($row2['company']) ?>">
                <label>Start Year:</label>
                <input type="number" name="start-year" value="<?php echo htmlspecialchars($row2['start_year']) ?>">
                <label>End Year:</label>
                <input type="number" name="end-year" value="<?php echo htmlspecialchars($row2['end_year']) ?>">
                <label>Description:</label>
                <textarea name="description"><?php echo htmlspecialchars($row2['description']) ?></textarea>
                <input type="number" value="<?php echo $id; ?>" name="id" hidden>
                <button class="experience-updation-button" type="submit">Update Experience</button>
              </form>
            </section>
      <?php
            $i++;
          }
        }
      }
      ?>

      <!-- Education Section -->
      <section id="education" class="section">
        <h2>Education</h2>
        <div class="table-holder">
          <table>
            <tr>
              <th>N<sup><u>o</u></sup></th>
              <th>Degree</th>
              <th>Institution</th>
              <th>Graduation Year</th>
              <th>Grades</th>
              <th>Action</th>
            </tr>
            <?php
            $sql3 = mysqli_query($conn, "SELECT * FROM education WHERE `user_id` = {$_SESSION['admin_id']}");

            if (mysqli_num_rows($sql3) > 0) {
              $i = 1;
              while ($row3 = mysqli_fetch_assoc($sql3)) {
            ?>
                <tr>
                  <td><?php echo $i; ?></td>
                  <td><?php echo htmlspecialchars($row3['degree']) ?></td>
                  <td><?php echo htmlspecialchars($row3['institution']) ?></td>
                  <td><?php echo htmlspecialchars($row3['graduation_year']) ?></td>
                  <td><?php echo htmlspecialchars($row3['gpa']) ?></td>
                  <td class="td">
                    <a href="?education_id=<?php echo $row3['id']; ?>#edit-education" class="edit-exp-btn">Edit</a> |
                    <a href="./php/delete_education.php?id=<?php echo $row3['id']; ?>" class="delete-exp-btn">Delete</a>
                  </td>
                </tr>
            <?php
                $i++;
              }
            }
            ?>
          </table>
        </div>
        <div id="education-list"></div>
        <button onclick="addEducationForm()">Add Education</button>
      </section>

      <?php
      if (isset($_GET['education_id'])) {
        $id = $_GET['education_id'];
        $sql3 = mysqli_query($conn, "SELECT * FROM education WHERE `id` = {$id}");

        if (mysqli_num_rows($sql3) > 0) {
          while ($row3 = mysqli_fetch_assoc($sql3)) {
      ?>
            <section id="edit-education">
              <form action="./php/update_education.php" method="post">
                <label>Degree:</label><input type="text" name="degree" value="<?php echo htmlspecialchars($row3['degree']) ?>">
                <label>Institution:</label><input type="text" name="institution" value="<?php echo htmlspecialchars($row3['institution']) ?>">
                <label>Graduation Year:</label><input type="number" name="g-year" value="<?php echo htmlspecialchars($row3['graduation_year']) ?>">
                <input type="number" value="<?php echo $id; ?>" name="id" hidden>
                <label>Grades:</label><input type="text" name="gpa" value="<?php echo htmlspecialchars($row3['gpa']) ?>">
                <button type="submit">Update Education</button>
              </form>
            </section>
      <?php
          }
        }
      }
      ?>

      <!-- Skills Section -->
      <section id="skills" class="section">
        <h2>Skills</h2>
        <table>
          <tr>
            <th>N<sup><u>o</u></sup></th>
            <th>My skills</th>
            <th>Actions</th>
          </tr>
          <?php
          $sql4 = mysqli_query($conn, "SELECT * FROM skills WHERE `user_id` = {$_SESSION['admin_id']}");

          if (mysqli_num_rows($sql4) > 0) {
            $i = 1;
            while ($row4 = mysqli_fetch_assoc($sql4)) {
          ?>
              <tr>
                <td><?php echo $i; ?></td>
                <td><?php echo htmlspecialchars($row4['skill_name']) ?></td>
                <td class="td">
                  <a href="?skill_id=<?php echo $row4['id']; ?>#edit-skill" class="edit-exp-btn">Edit</a> |
                  <a href="./php/delete_skill.php?id=<?php echo $row4['id']; ?>" class="delete-exp-btn">Delete</a>
                </td>
              </tr>

          <?php
              $i++;
            }
          }
          ?>
        </table>

        <form action="./php/insert_skill.php" method="post">
          <input type="text" name="skill" placeholder="Add a new skill" />
          <button type="submit">Add Skill</button>
        </form>
      </section>

      <?php
      if (isset($_GET['skill_id'])) {
        $id = $_GET['skill_id'];
        $sql6 = mysqli_query($conn, "SELECT * FROM skills WHERE `id` = {$id}");

        if (mysqli_num_rows($sql6) > 0) {
          $row6 = mysqli_fetch_assoc($sql6)
      ?>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
          <section id="edit-skill">
            <h2>Update skill</h2>
            <form action="./php/update_skill.php" method="post">
              <input type="text" name="skill" value="<?php echo htmlspecialchars($row6['skill_name']) ?>" />
              <input type="number" value="<?php echo $id; ?>" name="id" hidden>
              <button type="submit">update Skill</button>
            </form>
          </section>
      <?php
        }
      }
      ?>

      <main class="content">
        <!-- References Section -->
        <section id="references" class="section">
          <h2>References</h2>
          <div class="table-holder">
            <table>
              <tr>
                <th>N<sup><u>o</u></sup></th>
                <th>Name</th>
                <th>Phone number</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
              <?php
              $sql5 = mysqli_query($conn, "SELECT * FROM reference WHERE `user_id` = {$_SESSION['admin_id']}");

              if (mysqli_num_rows($sql5) > 0) {
                $i = 1;
                while ($row5 = mysqli_fetch_assoc($sql5)) {
              ?>
                  <tr>
                    <td><?php echo $i; ?></td>
                    <td><?php echo htmlspecialchars($row5['name']) ?></td>
                    <td><?php echo htmlspecialchars($row5['contact_info']) ?></td>
                    <td><?php echo htmlspecialchars($row5['email']) ?></td>
                    <td class="td">
                      <a href="?reference_id=<?php echo $row5['id']; ?>#edit-reference" class="edit-exp-btn">Edit</a> |
                      <a href="./php/delete_reference.php?id=<?php echo $row5['id']; ?>" class="delete-exp-btn">Delete</a>
                    </td>
                  </tr>
              <?php
                  $i++;
                }
              }
              ?>
            </table>
          </div>

          <div id="reference-list">
          </div>
          <button onclick="addReferenceForm()">Add Reference</button>
        </section>

        <?php
        if (isset($_GET['reference_id'])) {
          $id = $_GET['reference_id'];
          $sql5 = mysqli_query($conn, "SELECT * FROM reference WHERE `id` = {$id}");

          if (mysqli_num_rows($sql5) > 0) {
            while ($row5 = mysqli_fetch_assoc($sql5)) {
        ?>
              <section id="edit-reference">
                <form action="./php/update_reference.php" method="post">
                  <label>Name:</label><input type="text" name="name" value="<?php echo htmlspecialchars($row5['name']) ?>">
                  <label>Phone:</label><input type="text" name="phone" value="<?php echo htmlspecialchars($row5['contact_info']) ?>">
                  <label>Email:</label><input type="email" name="email" value="<?php echo htmlspecialchars($row5['email']) ?>">
                  <input type="number" value="<?php echo $id; ?>" name="id" hidden>
                  <button type="submit">update Reference</button>
                </form>
              </section>
        <?php
            }
          }
        }
        ?>
      </main>
    </main>
  </div>
  <script src="admin.js"></script>
</body>

</html>