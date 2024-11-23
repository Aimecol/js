<?php
session_start();
if (isset($_SESSION['admin_id'])) {
    include_once "../config.php";
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $linkedin = $_POST['linkedin'];

    $sql = mysqli_query($conn, "UPDATE contacts SET `email` = '{$email}', `phone` = '{$phone}', `linkedin` = '{$linkedin}' WHERE `user_id` = {$_SESSION['admin_id']}");

    if ($sql) {
        echo "contacts information Updated";
    } else {
        echo "contacts information Updation Failed";
    }
}
