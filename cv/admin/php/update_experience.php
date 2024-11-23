<?php

session_start();

if (isset($_SESSION['admin_id'])) {
    include "../config.php";
    $position = $_POST['position'];
    $id = $_POST['id'];
    $company = $_POST['company'];
    $startYear = $_POST['start-year'];
    $endYear = $_POST['end-year'];
    $description = $_POST['description'];

    $sql = mysqli_query($conn, "UPDATE job_experiences SET `position` = '{$position}', `company` = '{$company}', `start_year` = '{$startYear}', `end_year` = '{$endYear}', `description` = '{$description}' WHERE `user_id` = {$_SESSION['admin_id']} AND `id` = {$id}");

    if ($sql) {
        echo "
            <script>
                alert('Job Experience Information Updated');
                document.location.href = '../dashboard.php';
            </script>
        ";
    } else {
        echo "
            <script>
                alert('Job Experience Information Failed to be updated');
                document.location.href = '../dashboard.php';
            </script>
        ";
    }
}
