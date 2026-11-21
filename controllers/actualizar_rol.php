<?php

require_once "../config/verificar_admin.php";
include "../config/conexion.php";

$contenido = file_get_contents("php://input");

$datos = json_decode($contenido, true);

$id_usuario = trim($datos['idUsuario']);
$rol = trim($datos['rol']);

if (empty($id_usuario) || empty($rol)) {
    echo json_encode([
        "mensaje" => "Todos los campos son obligatorios."
    ]);
    exit;
}

// Actualizar el rol del usuario en la base de datos
$sql = "UPDATE usuarios SET rol = ? WHERE id_usuario = ?";

$stmt = $conn->prepare($sql);

$stmt->bind_param("si", $rol, $id_usuario);

$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo json_encode([
        "mensaje" => "Rol actualizado correctamente."
    ]);
} else {
    echo json_encode([
        "mensaje" => "Error al actualizar el rol o no se realizaron cambios."
    ]);
}
