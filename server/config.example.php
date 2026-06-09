<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

$conn = new mysqli(
    "YOUR_HOST",
    "YOUR_USERNAME",
    "YOUR_PASSWORD",
    "YOUR_DATABASE"
);

$conn->set_charset("utf8mb4");

if ($conn->connect_error) {
    die(json_encode([
        "success" => false,
        "message" => "Database connection failed"
    ]));
}
