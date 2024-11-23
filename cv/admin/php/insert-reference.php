<?php

session_start();

if (isset($_SESSION['admin_id'])) {
    include "../config.php";
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];

    $sql = mysqli_query($conn, "INSERT INTO reference (`user_id`,`name`, `contact_info`, `email`) VALUES({$_SESSION['admin_id']}, '{$name}', '{$phone}', '{$email}')");

    if ($sql) {
        echo "
            <script>
                alert('Reference Information Inserted');
                document.location.href = '../dashboard.php';
            </script>
        ";
    } else {
        echo "
            <script>
                alert('Reference Information Failed to be inserted');
                document.location.href = '../dashboard.php';
            </script>
        ";
    }
}
