<?php
session_start();

// Database credentials
$host = 'localhost';
$db_user = 'root';
$db_password = '';
$db_name = 'portfolio';

// Connect to the database
$conn = mysqli_connect($host, $db_user, $db_password, $db_name);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = $_POST['password'];

    // Fetch user data from database
    $query = "SELECT * FROM users WHERE username = '$username'";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);

        // Verify password
        if ($password === $row['password']) {
            // Set session variables
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_text'] = $row['about'];
            $_SESSION['admin_id'] = $row['id'];
            $_SESSION['admin_name'] = $row['name'];
            $_SESSION['admin_username'] = $row['username'];
            $_SESSION['admin_title'] = $row['title'];
            $_SESSION['admin_image'] = $row['profile_image'];

            // Redirect to dashboard
            header("Location: ../dashboard.php");
            exit();
        } else {
            $error_message = "Invalid password.";
            header("Location: ../login.php?error_message = $error_message");
        }
    } else {
        $error_message = "Invalid username or password.";
        header("Location: ../login.php?error_message = $error_message");
    }
}

// Close the database connection
mysqli_close($conn);
