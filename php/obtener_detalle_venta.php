<?php

include "conexion.php";

$resultado = [];

$idVenta = $_GET['idVenta'] ?? '';

$sql = "SELECT id_detalle, nombre, cantidad, precio_venta, subtotal FROM detalle_venta WHERE id_venta = ?";

$stmt = $conn->prepare($sql);

$stmt->bind_param("i", $idVenta);

$stmt->execute();

$resultadoDetalle = $stmt->get_result();

$resultado = $resultadoDetalle->fetch_all(MYSQLI_ASSOC);

echo json_encode($resultado);