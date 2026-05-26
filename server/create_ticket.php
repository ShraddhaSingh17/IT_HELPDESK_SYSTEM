<?php

include "config.php";

$title = $_POST['title'];
$description = $_POST['description'];
$priority = $_POST['priority'];
$created_by = $_POST['created_by'];

$attachment = "";

if (isset($_FILES['attachment'])) {
    $fileName = time() . "_" . $_FILES['attachment']['name'];
    $targetPath = "uploads/" . $fileName;
    move_uploaded_file($_FILES['attachment']['tmp_name'], $targetPath);

    $attachment = $fileName;
}

$sql = "INSERT INTO tickets (
title,
description,
priority,
created_by,
attachment
)
VALUES(
'$title',
'$description',
'$priority',
'$created_by',
'$attachment'
)";

if ($conn->query($sql)) {

    echo json_encode([
        "success" => true,
        "message" => "Ticket created successfully"
    ]);
} else {

    echo json_encode([
        "success" => false,
        "message" => "Failed to create ticket"
    ]);
}
