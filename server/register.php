<?php

include "config.php";

$data = json_decode(file_get_contents("php://input"));

$name = $data->name;
$email = $data->email;
$password = $data->password;

$sql = "INSERT INTO users (
name,
email,
password
)
VALUES (
'$name',
'$email',
'$password'
)";

if ($conn->query($sql)) {

    echo json_encode([
        "success" => true,
        "message" => "User registered successfully"
    ]);
} else {

    echo json_encode([
        "success" => false,
        "message" => "Registration failed"
    ]);
}
