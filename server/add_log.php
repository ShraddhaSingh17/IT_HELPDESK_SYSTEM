<?php

include "config.php";

$data = json_decode(file_get_contents("php://input"));

$ticket_id = $data->ticket_id;
$user_id = $data->user_id;
$action = $data->action;

$sql = "INSERT INTO activity_logs (ticket_id, user_id, action)
VALUES ('$ticket_id', '$user_id', '$action')";

if ($conn->query($sql)) {
    echo json_encode([
        "success" => true,
        "message" => "Log added"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed to add log"
    ]);
}
