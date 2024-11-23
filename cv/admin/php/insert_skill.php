<?php

session_start();

if (isset($_SESSION['admin_id'])) {
    include "../config.php";
    $skill = $_POST['skill'];

    $sql = mysqli_query($conn, "INSERT INTO skills (`user_id`,`skill_name`) VALUES({$_SESSION['admin_id']}, '{$skill}')");

    if ($sql) {
        echo "
            <script>
                alert('Skill Information Inserted');
                document.location.href = '../dashboard.php';
            </script>
        ";
    } else {
        echo "
            <script>
                alert('Skill Information Failed to be inserted');
                document.location.href = '../dashboard.php';
            </script>
        ";
    }
}
