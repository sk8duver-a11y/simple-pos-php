<?php

include "conexion.php";

$contenido = file_get_contents("php://input");

$datos = json_decode($contenido, true);

$id_producto = $datos['idProducto'];

$sql = "UPDATE productos SET estado = 0 WHERE id_producto = ?";

$stmt = $conn->prepare($sql);

$stmt->bind_param("i", $id_producto);

if ($stmt->execute()) {
    echo "Producto eliminado correctamente.";
} else {
    echo "Error al eliminar el producto";
}