<?php

include "config.php";

$data = json_decode(file_get_contents("php://input"));

$id = $data->id;

$sql = "DELETE FROM tickets
WHERE id='$id'";

if ($conn->query($sql)) {

    echo json_encode([
        "success" => true,
        "message" => "Ticket deleted successfully"
    ]);
} else {

    echo json_encode([
        "success" => false,
        "message" => "Failed to delete ticket"
    ]);
}
