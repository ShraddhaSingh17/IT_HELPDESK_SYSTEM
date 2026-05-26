<?php

include "config.php";

$user_id = $_GET['user_id'];

$sql = "SELECT * FROM tickets
WHERE created_by = '$user_id'
ORDER BY created_at DESC";

$result = $conn->query($sql);

$tickets = [];

while ($row = $result->fetch_assoc()) {
    $tickets[] = $row;
}

echo json_encode($tickets);
