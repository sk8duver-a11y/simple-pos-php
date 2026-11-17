<?php

require_once "../config/verificar_admin.php";
include "../config/conexion.php";

$contenido = file_get_contents("php://input");

$datos = json_decode($contenido, true);

$id_usuario = $datos['idUsuario'];

$sql = "DELETE FROM usuarios WHERE id_usuario = ?";

$stmt = $conn->prepare($sql);

$stmt->bind_param("i", $id_usuario);

if ($stmt->execute()) {
    echo json_encode([
        "mensaje" => "Usuario eliminado correctamente."
    ]);
} else {
    echo json_encode([
        "mensaje" => "Error al eliminar el usuario"
    ]);
}