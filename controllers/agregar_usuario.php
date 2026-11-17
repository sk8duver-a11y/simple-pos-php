<?php

include "../config/conexion.php";

$contenido = file_get_contents("php://input");

$datos = json_decode($contenido, true);

$usuario = trim($datos['usuario']);
$nombre_usuario = trim($datos['nombreUsuario']);
$password = trim($datos['password']);

if (empty($usuario) || empty($nombre_usuario) || empty($password)) {
    echo json_encode([
        "mensaje" => "Todos los campos son obligatorios."
    ]);
    exit;
}

$hash_password = password_hash($password, PASSWORD_DEFAULT);

// Verificar si el usuario ya existe
$sql = "SELECT id_usuario FROM usuarios WHERE usuario = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $usuario);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode([
        "mensaje" => "El usuario ya existe."
    ]);
    exit;
}

// Insertar el nuevo usuario en la base de datos
$sql = "INSERT INTO usuarios (usuario, nombre_usuario, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $usuario, $nombre_usuario, $hash_password);

if ($stmt->execute()) {
    echo json_encode([
        "mensaje" => "Usuario agregado correctamente."
    ]);
} else {
    echo json_encode([
        "mensaje" => "Error al agregar el usuario."
    ]);
}
