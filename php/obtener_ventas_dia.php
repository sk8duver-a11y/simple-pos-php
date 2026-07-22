<?php

include "../config/conexion.php";

$respuesta = [
    "ganancia" => 0,
    "total_vendido" => 0,
    "cantidad_ventas" => 0,
    "ventas" => []
];

$fecha = $_GET['fecha'] ?? '';

//Calcular ganancia total
$sqlGanancia = "SELECT COALESCE(SUM(ganancia), 0) AS ganancia
        FROM ventas
        INNER JOIN detalle_venta
            ON ventas.id_venta = detalle_venta.id_venta
        WHERE DATE(ventas.fecha) = ?";

$stmtGanancia = $conn->prepare($sqlGanancia);

$stmtGanancia->bind_param("s", $fecha);

$stmtGanancia->execute();

$resultadoGanancia = $stmtGanancia->get_result();

$filaGanancia = $resultadoGanancia->fetch_assoc();

$respuesta["ganancia"] = $filaGanancia["ganancia"];

//Calcular total vendido
$sqlTotalVendido = "SELECT COALESCE(SUM(total), 0) AS total_vendido
                        FROM ventas
                        WHERE DATE(ventas.fecha) = ?";

$stmtTotalVendido = $conn->prepare($sqlTotalVendido);

$stmtTotalVendido->bind_param("s", $fecha);

$stmtTotalVendido->execute();

$resultadoTotalVendido = $stmtTotalVendido->get_result();

$filaTotalVendido = $resultadoTotalVendido->fetch_assoc();

$respuesta["total_vendido"] = $filaTotalVendido["total_vendido"];

//Calcular cantidad ventas
$sqlCantidadVentas = "SELECT COUNT(*) AS cantidad_ventas
                        FROM ventas
                        WHERE DATE(ventas.fecha) = ?";

$stmtCantidadVentas = $conn->prepare($sqlCantidadVentas);

$stmtCantidadVentas->bind_param("s", $fecha);

$stmtCantidadVentas->execute();

$resultadoCantidadVentas = $stmtCantidadVentas->get_result();

$filaCantidadVentas = $resultadoCantidadVentas->fetch_assoc();

$respuesta["cantidad_ventas"] = $filaCantidadVentas["cantidad_ventas"];

//Obtener las ventas
$sqlVentas = "SELECT
                ventas.id_venta,
                DATE_FORMAT(ventas.fecha, '%H:%i') AS hora,
                ventas.total,
                COUNT(*) AS productos
                FROM ventas
                INNER JOIN detalle_venta
                ON ventas.id_venta = detalle_venta.id_venta
                WHERE DATE(ventas.fecha) = ?
                GROUP BY
                ventas.id_venta,
                ventas.fecha,
                ventas.total
                ORDER BY hora DESC;";

$stmtVentas = $conn->prepare($sqlVentas);

$stmtVentas->bind_param("s", $fecha);

$stmtVentas->execute();

$resultadoVentas = $stmtVentas->get_result();

$respuesta["ventas"] = $resultadoVentas->fetch_all(MYSQLI_ASSOC);

echo json_encode($respuesta);