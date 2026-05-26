<?php

include "config.php";

$data = json_decode(file_get_contents("php://input"));

$id = $data->id;
$assigned_to = $data->assigned_to;

$sql = "UPDATE tickets SET assigned_to='$assigned_to' WHERE id='$id'";

if ($conn->query($sql)) {

    echo json_encode([
        "success" => true,
        "message" => "Ticket assigned successfully"
    ]);
} else {

    echo json_encode([
        "success" => false,
        "message" => "Failed to assign ticket"
    ]);
}
