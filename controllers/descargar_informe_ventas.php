<?php

require_once "../config/conexion.php";
require_once "../vendor/autoload.php";

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

$datos = json_decode(file_get_contents("php://input"), true);

$fechaInicial = $datos["fechaInicial"] ?? null;
$fechaFinal = $datos["fechaFinal"] ?? null;

if (!$fechaInicial || !$fechaFinal) {
    http_response_code(400);

    header("Content-Type: application/json");

    echo json_encode([
        "error" => "Debes seleccionar la fecha inicial y la fecha final."
    ]);

    exit;
}

if ($fechaInicial > $fechaFinal) {
    http_response_code(400);

    header("Content-Type: application/json");

    echo json_encode([
        "error" => "La fecha inicial no puede ser mayor que la fecha final."
    ]);

    exit;
}

$fechaInicio = $fechaInicial . " 00:00:00";
$fechaFin = date("Y-m-d", strtotime($fechaFinal . " +1 day")) . " 00:00:00";

$sqlVentas = "
    SELECT
        v.id_venta,
        v.fecha,
        c.nombre AS cliente,
        v.tipo_venta,
        v.estado,
        v.total,
        SUM(d.ganancia * d.cantidad) AS ganancia
    FROM ventas v
    LEFT JOIN clientes c
        ON v.id_cliente = c.id_cliente
    INNER JOIN detalle_venta d
        ON v.id_venta = d.id_venta
    WHERE v.fecha >= ?
    AND v.fecha < ?
    GROUP BY
        v.id_venta,
        v.fecha,
        c.nombre,
        v.tipo_venta,
        v.estado,
        v.total
    ORDER BY v.fecha ASC
";

$stmtVentas = $conn->prepare($sqlVentas);

$stmtVentas->bind_param(
    "ss",
    $fechaInicio,
    $fechaFin
);

$stmtVentas->execute();

$resultadoVentas = $stmtVentas->get_result();

$ventas = [];

while ($venta = $resultadoVentas->fetch_assoc()) {
    $ventas[] = $venta;
}

$stmtVentas->close();

$spreadsheet = new Spreadsheet();

$hoja = $spreadsheet->getActiveSheet();

$hoja->setTitle("Ventas");

$hoja->fromArray([
    "Fecha",
    "Hora",
    "Venta",
    "Cliente",
    "Tipo",
    "Estado",
    "Total",
    "Ganancia"
], null, "A1");

$fila = 2;

foreach ($ventas as $venta) {

    $fechaHora = new DateTime($venta["fecha"]);

    $hoja->fromArray([
        $fechaHora->format("d/m/Y"),
        $fechaHora->format("H:i:s"),
        $venta["id_venta"],
        $venta["cliente"] ?? "Venta general",
        $venta["tipo_venta"],
        $venta["estado"],
        $venta["total"],
        $venta["ganancia"]
    ], null, "A" . $fila);

    $fila++;
}

/*
 * Filtros en los encabezados
 */
$hoja->setAutoFilter("A1:H" . ($fila - 1));

/*
 * Ancho automático de las columnas
 */
foreach (range("A", "H") as $columna) {
    $hoja->getColumnDimension($columna)->setAutoSize(true);
}

$nombreArchivo = "informe_ventas_{$fechaInicial}_{$fechaFinal}.xlsx";

header(
    "Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
);

header(
    "Content-Disposition: attachment; filename=\"{$nombreArchivo}\""
);

header("Cache-Control: max-age=0");

$writer = new Xlsx($spreadsheet);

$writer->save("php://output");

exit;
