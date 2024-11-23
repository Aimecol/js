<?php

session_start();

if (isset($_SESSION['admin_id'])) {
    include "../config.php";
    $skill = $_POST['skill'];
    $id = $_POST['id'];

    $sql = mysqli_query($conn, "UPDATE skills SET `skill_name` = '{$skill}' WHERE `user_id` = {$_SESSION['admin_id']} AND `id` = {$id}");

    if ($sql) {
        echo "
            <script>
                alert('Skill Information Updated');
                document.location.href = '../dashboard.php';
            </script>
        ";
    } else {
        echo "
            <script>
                alert('Skill Information Failed to be Updated');
                document.location.href = '../dashboard.php';
            </script>
        ";
    }
}
