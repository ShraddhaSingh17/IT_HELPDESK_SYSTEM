<?php

include "config.php";

$data = json_decode(file_get_contents("php://input"));

$ticket_id = $data->ticket_id;
$user_id = $data->user_id;
$comment = $data->comment;

$sql = "INSERT INTO comments (
ticket_id,
user_id,
comment
)
VALUES(
'$ticket_id',
'$user_id',
'$comment'
)";

if ($conn->query($sql)) {

    echo json_encode([
        "success" => true,
        "message" => "Comment added successfully"
    ]);
} else {

    echo json_encode([
        "success" => false,
        "message" => "Failed to add comment"
    ]);
}
