<?php

session_start();

if (isset($_SESSION['admin_id'])) {
    include "../config.php";

    $id = $_GET['id'];

    $sql = mysqli_query($conn, "DELETE FROM reference WHERE `id` = {$id}");

    if ($sql) {
        echo "<script>
            alert('Reference Deleted');
            document.location.href = '../dashboard.php';
        </script>";
    }
}
