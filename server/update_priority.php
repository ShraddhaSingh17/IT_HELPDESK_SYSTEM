<?php

include "config.php";

$data = json_decode(file_get_contents("php://input"));

$id = $data->id;
$priority = $data->priority;

$sql = "UPDATE tickets
SET priority='$priority'
WHERE id='$id'";

if ($conn->query($sql)) {

    echo json_encode([
        "success" => true,
        "message" => "Priority updated successfully"
    ]);
} else {

    echo json_encode([
        "success" => false,
        "message" => "Failed to update priority"
    ]);
}
