<?php

include "config.php";

$ticket_id = $_GET['ticket_id'];

$sql = "SELECT activity_logs.*, users.name
FROM activity_logs
JOIN users ON activity_logs.user_id = users.id
WHERE ticket_id='$ticket_id'
ORDER BY activity_logs.created_at DESC";

$result = $conn->query($sql);

$logs = [];

while ($row = $result->fetch_assoc()) {
    $logs[] = $row;
}

echo json_encode($logs);
