<?php

session_start();

if (isset($_SESSION['admin_id'])) {
    include "../config.php";
    $degree = $_POST['degree'];
    $institution = $_POST['institution'];
    $graduationYear = $_POST['g-year'];
    $gpa = $_POST['gpa'];

    $sql = mysqli_query($conn, "INSERT INTO education (`user_id`,`degree`, `institution`, `graduation_year`, `gpa`) VALUES({$_SESSION['admin_id']}, '{$degree}', '{$institution}', '{$graduationYear}', '{$gpa}')");

    if ($sql) {
        echo "
            <script>
                alert('Education Information Inserted');
                document.location.href = '../dashboard.php';
            </script>
        ";
    } else {
        echo "
            <script>
                alert('Education Information Failed to be inserted');
                document.location.href = '../dashboard.php';
            </script>
        ";
    }
}
