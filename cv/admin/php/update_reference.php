<?php

session_start();

if (isset($_SESSION['admin_id'])) {
    include "../config.php";
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $id = $_POST['id'];

    $sql = mysqli_query($conn, "UPDATE reference SET `name` = '{$name}', `contact_info` = '{$phone}', `email` = '{$email}' WHERE `user_id` = {$_SESSION['admin_id']} AND `id` = {$id}");

    if ($sql) {
        echo "
            <script>
                alert('References Information Updated');
                document.location.href = '../dashboard.php';
            </script>
        ";
    } else {
        echo "
            <script>
                alert('References Information Failed to be updated');
                document.location.href = '../dashboard.php';
            </script>
        ";
    }
}
