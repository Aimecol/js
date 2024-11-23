<?php

session_start();

if (isset($_SESSION['admin_id'])) {
    include "../config.php";
    $position = $_POST['position'];
    $company = $_POST['company'];
    $startYear = $_POST['start-year'];
    $endYear = $_POST['end-year'];
    $description = $_POST['description'];

    $sql = mysqli_query($conn, "INSERT INTO job_experiences (`user_id`,`position`, `company`, `start_year`, `end_year`, `description`) VALUES({$_SESSION['admin_id']}, '{$position}', '{$company}', '{$startYear}', '{$endYear}', '{$description}')");

    if ($sql) {
        echo "
            <script>
                alert('Job Experience Information Inserted')
                document.location.href = '../dashboard.php'
            </script>
            ;
        ";
    } else {
        echo "
            <script>alert('Job Experience Information Insertion Failed')</script>
            document.location.href = '../dashboard.php';
        ";
    }
}
