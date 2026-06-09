<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

$conn = new mysqli(
    $host = "YOUR_HOST";
    $user = "YOUR_USERNAME";
    $password = "YOUR_PASSWORD";
    $dbname = "YOUR_DATABASE";
);

$conn->set_charset("utf8mb4");

if ($conn->connect_error) {
    die(json_encode([
        "success" => false,
        "message" => "Database connection failed"
    ]));
}
