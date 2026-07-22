<?php

include "conexion.php";

$fecha = $_GET['fecha'] ?? '';

$sql = "SELECT COALESCE(SUM(ganancia), 0) AS ganancia_total
        FROM ventas
        INNER JOIN detalle_venta
            ON ventas.id_venta = detalle_venta.id_venta
        WHERE DATE(ventas.fecha) = ?";

$stmt = $conn->prepare($sql);

$stmt->bind_param("s", $fecha);

$stmt->execute();

$resultado = $stmt->get_result();

$fila = $resultado->fetch_assoc();

echo json_encode($fila);
