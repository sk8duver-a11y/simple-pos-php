<?php

require_once "../config/verificar_admin.php";
include "../config/conexion.php";

$contenido = file_get_contents("php://input");

$datos = json_decode($contenido, true);

$id_usuario = $datos['idUsuario'];
$usuario = trim($datos['usuario']);
$nombre_usuario = trim($datos['nombreUsuario']);
$password = trim($datos['password']);

$hash_password = password_hash($password, PASSWORD_DEFAULT);

$sql = "UPDATE usuarios SET usuario = ?, nombre_usuario = ?, password = ? WHERE id_usuario = ?";

$stmt = $conn->prepare($sql);

$stmt->bind_param("sssi", $usuario, $nombre_usuario, $hash_password, $id_usuario);

if ($stmt->execute()) {
    echo json_encode([
        "mensaje" => "Usuario editado correctamente."
    ]);
} else {
    echo json_encode([
        "mensaje" => "Error al actualizar el usuario."
    ]);
}