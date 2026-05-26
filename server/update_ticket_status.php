<?php

include "config.php";

$data = json_decode(file_get_contents("php://input"));

$id = $data->id;
$status = $data->status;

$sql = "UPDATE tickets
SET status='$status'
WHERE id='$id'";

if ($conn->query($sql)) {

    echo json_encode([
        "success" => true,
        "message" => "Status updated successfully"
    ]);
} else {

    echo json_encode([
        "success" => false,
        "message" => "Failed to update status"
    ]);
}
