<?php

include "../config/conexion.php";

$fecha = $_GET["fecha"] ?? "";

if ($fecha === "") {
    echo json_encode([
        "success" => false,
        "mensaje" => "La fecha es obligatoria."
    ]);
    exit;
}


/*
|--------------------------------------------------------------------------
| GANANCIA DEL DÍA
|--------------------------------------------------------------------------
|
| La ganancia se calcula según el dinero que realmente fue recibido ese día.
|
| CONTADO:
| La venta crea automáticamente un pago por el total de la venta.
|
| CRÉDITO:
| La venta no genera ganancia hasta que se registre un pago.
|
| En ambos casos usamos la tabla pagos.
|
*/

$sqlGanancia = "
    SELECT
        COALESCE(
            SUM(
                (
                    SELECT COALESCE(SUM(d.ganancia * d.cantidad), 0)
                    FROM detalle_venta d
                    WHERE d.id_venta = v.id_venta
                )
                / v.total
                * p.monto
            ),
            0
        ) AS ganancia
    FROM pagos p
    INNER JOIN ventas v
        ON p.id_venta = v.id_venta
    WHERE DATE(p.fecha) = ?
";

$stmtGanancia = $conn->prepare($sqlGanancia);
$stmtGanancia->bind_param("s", $fecha);
$stmtGanancia->execute();

$resultadoGanancia = $stmtGanancia->get_result();
$datosGanancia = $resultadoGanancia->fetch_assoc();

$ganancia = (int) round($datosGanancia["ganancia"]);


/*
|--------------------------------------------------------------------------
| TOTAL VENDIDO
|--------------------------------------------------------------------------
|
| Se mantiene el comportamiento actual:
| muestra el total de las ventas realizadas ese día.
|
*/

$sqlTotalVendido = "
    SELECT COALESCE(SUM(total), 0) AS total_vendido
    FROM ventas
    WHERE DATE(fecha) = ?
";

$stmtTotalVendido = $conn->prepare($sqlTotalVendido);
$stmtTotalVendido->bind_param("s", $fecha);
$stmtTotalVendido->execute();

$resultadoTotalVendido = $stmtTotalVendido->get_result();
$datosTotalVendido = $resultadoTotalVendido->fetch_assoc();

$totalVendido = (int) $datosTotalVendido["total_vendido"];


/*
|--------------------------------------------------------------------------
| CANTIDAD DE VENTAS
|--------------------------------------------------------------------------
*/

$sqlCantidadVentas = "
    SELECT COUNT(*) AS cantidad_ventas
    FROM ventas
    WHERE DATE(fecha) = ?
";

$stmtCantidadVentas = $conn->prepare($sqlCantidadVentas);
$stmtCantidadVentas->bind_param("s", $fecha);
$stmtCantidadVentas->execute();

$resultadoCantidadVentas = $stmtCantidadVentas->get_result();
$datosCantidadVentas = $resultadoCantidadVentas->fetch_assoc();

$cantidadVentas = (int) $datosCantidadVentas["cantidad_ventas"];


/*
|--------------------------------------------------------------------------
| VENTAS DEL DÍA
|--------------------------------------------------------------------------
*/

$sqlVentas = "
    SELECT
        v.id_venta,
        DATE_FORMAT(v.fecha, '%H:%i') AS hora,
        COUNT(d.id_detalle) AS productos,
        v.total,
        v.tipo_venta,
        v.estado
    FROM ventas v
    INNER JOIN detalle_venta d
        ON v.id_venta = d.id_venta
    WHERE DATE(v.fecha) = ?
    GROUP BY
        v.id_venta,
        v.fecha,
        v.total,
        v.tipo_venta,
        v.estado
    ORDER BY v.fecha DESC
";

$stmtVentas = $conn->prepare($sqlVentas);
$stmtVentas->bind_param("s", $fecha);
$stmtVentas->execute();

$resultadoVentas = $stmtVentas->get_result();

$ventas = [];

while ($venta = $resultadoVentas->fetch_assoc()) {

    $ventas[] = [
        "id_venta" => (int) $venta["id_venta"],
        "hora" => $venta["hora"],
        "productos" => (int) $venta["productos"],
        "total" => (int) $venta["total"],
        "tipo_venta" => $venta["tipo_venta"],
        "estado" => $venta["estado"]
    ];
}


/*
|--------------------------------------------------------------------------
| RESPUESTA
|--------------------------------------------------------------------------
*/

echo json_encode([
    "success" => true,
    "ganancia" => $ganancia,
    "total_vendido" => $totalVendido,
    "cantidad_ventas" => $cantidadVentas,
    "ventas" => $ventas
]);
