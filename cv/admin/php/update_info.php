<?php
session_start();
if (isset($_SESSION['admin_id'])) {
    include_once "../config.php";
    $infoName = $_POST['info-name'];
    $infoTitle = $_POST['info-title'];
    $infoAbout = $_POST['info-about'];

    $infoImage = $_FILES['info-image']['name'];
    $img_size = $_FILES['info-image']['size'];
    $tmp_name = $_FILES['info-image']['tmp_name'];
    $img_error = $_FILES['info-image']['error'];

    if ($img_size > 1250000) {
        echo "Too large";
    } else {
        $img_ex = pathinfo($infoImage, PATHINFO_EXTENSION);
        $img_ex_lc = strtolower($img_ex);

        $allowed_exts = ["jpg", "png", "jpeg"];

        if (in_array($img_ex_lc, $allowed_exts)) {
            $new_img_name = uniqid("IMG-", true) . "." . $img_ex_lc;
            $img_upload_path = "../uploads/" . $new_img_name;
            move_uploaded_file($tmp_name, $img_upload_path);
            $sql = mysqli_query($conn, "UPDATE users SET name = '{$infoName}', `title` = '{$infoTitle}', `about` = '{$infoAbout}', `profile_image` = '{$new_img_name}' WHERE `id` = {$_SESSION['admin_id']}");
        } else {
            echo "unsupported Format";
        }
    }

    if ($sql) {
        echo "Personal information Updated";
    } else {
        echo "Personal information Updation Failed";
    }
}
