<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

$conn = new mysqli(
    "sql111.infinityfree.com",
    "if0_42026156",
    "ej7jMrFoMkGqpU",
    "if0_42026156_helpdesk_db"
);

$conn->set_charset("utf8mb4");

if ($conn->connect_error) {
    die(json_encode([
        "success" => false,
        "message" => "Database connection failed"
    ]));
}
