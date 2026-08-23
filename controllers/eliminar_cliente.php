<?php

include "../config/conexion.php";

$contenido = file_get_contents("php://input");

$datos = json_decode($contenido, true);

$id_cliente = $datos['idCliente'];

$sql = "UPDATE clientes SET estado = 0 WHERE id_cliente = ?";

$stmt = $conn->prepare($sql);

$stmt->bind_param("i", $id_cliente);

if ($stmt->execute()) {
    echo json_encode([
        "mensaje" => "Cliente eliminado correctamente."
    ]);
} else {
    echo json_encode([
        "mensaje" => "Error al eliminar el cliente"
    ]);
}
