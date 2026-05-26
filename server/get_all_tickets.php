<?php

include "config.php";

$sql = "SELECT tickets.*, users.name AS created_by_name,
admins.name AS assigned_admin_name
FROM tickets
JOIN users
ON tickets.created_by = users.id
LEFT JOIN users AS admins
ON tickets.assigned_to = admins.id
ORDER BY tickets.created_at DESC";

$result = $conn->query($sql);

$tickets = [];

while ($row = $result->fetch_assoc()) {
    $tickets[] = $row;
}

echo json_encode($tickets);
