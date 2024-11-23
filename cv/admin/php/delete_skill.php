<?php

session_start();

if (isset($_SESSION['admin_id'])) {
    include "../config.php";

    $id = $_GET['id'];

    $sql = mysqli_query($conn, "DELETE FROM skills WHERE `id` = {$id}");

    if ($sql) {
        echo "<script>
            alert('Experience Deleted');
            document.location.href = '../dashboard.php';
        </script>";
    }
}
