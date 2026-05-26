<?php

include "config.php";

$ticket_id = $_GET['ticket_id'];

$sql = "SELECT comments.*, users.name
FROM comments
JOIN users
ON comments.user_id = users.id
WHERE ticket_id='$ticket_id'
ORDER BY comments.created_at ASC";

$result = $conn->query($sql);

$comments = [];

while ($row = $result->fetch_assoc()) {
    $comments[] = $row;
}

echo json_encode($comments);
