<?php

include "../config/conexion.php";

$contenido = file_get_contents("php://input");

$datos = json_decode($contenido, true);

$id_cliente = $datos['idCliente'];
$nombre_cliente = trim($datos['nombreCliente']);
$celular_cliente = trim($datos['celularCliente']);
$correo_cliente = trim($datos['correoCliente']);

$sql = "UPDATE clientes SET nombre = ?, celular = ?, correo = ? WHERE id_cliente = ?";

$stmt = $conn->prepare($sql);

$stmt->bind_param("sssi", $nombre_cliente, $celular_cliente, $correo_cliente, $id_cliente);

if ($stmt->execute()) {
    echo json_encode([
        "mensaje" => "Cliente editado correctamente."
    ]);
} else {
    echo json_encode([
        "mensaje" => "Error al actualizar el cliente."
    ]);
}
