<?php

include "config.php";

$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = $data->password;

$sql = "SELECT * FROM users
WHERE email='$email'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {

    $user = $result->fetch_assoc();

    if (password_verify($password, $user['password'])) {

        echo json_encode([
            "success" => true,
            "message" => "Login successful",
            "user" => $user
        ]);
    } else {

        echo json_encode([
            "success" => false,
            "message" => "Invalid email or password"
        ]);
    }
} else {

    echo json_encode([
        "success" => false,
        "message" => "User not found"
    ]);
}
