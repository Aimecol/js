<?php

session_start();

if (isset($_SESSION['admin_id'])) {
    include "../config.php";
    $id = $_POST['id'];
    $degree = $_POST['degree'];
    $institution = $_POST['institution'];
    $graduationYear = $_POST['g-year'];
    $gpa = $_POST['gpa'];

    $sql = mysqli_query($conn, "UPDATE education SET `degree` = '{$degree}', `institution` = '{$institution}', `graduation_year` = '{$graduationYear}', `gpa` = {$gpa} WHERE `id` = {$id} AND `user_id` = {$_SESSION['admin_id']}");

    if ($sql) {
        echo "
            <script>
                alert('Education Information Updated');
                document.location.href = '../dashboard.php';
            </script>
        ";
    } else {
        echo "
            <script>
                alert('Education Information Failed Updating');
                document.location.href = '../dashboard.php';
            </script>
        ";
    }
}
