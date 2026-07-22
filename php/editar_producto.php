<?php

include "conexion.php";

$contenido = file_get_contents("php://input");

$datos = json_decode($contenido, true);

$id_producto = $datos['idProducto'];
$codigo_barras =$datos['codigoBarras'];
$nombre = $datos['nombre'];
$precio_compra = $datos['precioCompra'];
$precio_venta = $datos['precioVenta'];

$sql = "UPDATE productos SET codigo_barras = ?, nombre = ?, precio_compra = ?, precio_venta = ? WHERE id_producto = ?";

$stmt = $conn->prepare($sql);

$stmt->bind_param("ssddi", $codigo_barras, $nombre, $precio_compra, $precio_venta, $id_producto);

if ($stmt->execute()) {
    echo "Producto actualizado correctamente.";
} else {
    echo "Error al actualizar el producto";
}