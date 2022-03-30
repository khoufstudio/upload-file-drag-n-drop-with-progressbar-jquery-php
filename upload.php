<?php

$fileName = $_FILES['file']['name'];
$fileSize =  $_FILES['file']['size'];
$location = "uploads/" . $fileName;
$returnArr = array();

if (move_uploaded_file($_FILES['file']['tmp_name'], $location)) {
    $src = "default.png";

    if (is_array(getimagesize($location))) {
        $src = $location;
    }

    $returnArray = array(
        'name' => $fileName,
        'size'=> $fileSize,
        'src' => $src
    );
}

echo json_encode($returnArray);
