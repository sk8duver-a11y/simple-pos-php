<?php

require_once "../config/conexion.php";
require_once "../vendor/autoload.php";

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Cell\DataType;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

$sql = "SELECT * FROM productos ORDER BY nombre";

$stmt = $conn->prepare($sql);

$stmt->execute();

$resultado = $stmt->get_result();

$productos = [];

while ($fila = $resultado->fetch_assoc()){
    $productos[] = $fila;
}

$stmt->close();

$spreadsheet = new Spreadsheet();

$hoja = $spreadsheet->getActiveSheet();

$hoja->setTitle("Productos");

$hoja->fromArray([
    "id_producto",
    "codigo_barras",
    "nombre",
    "precio_compra",
    "precio_venta",
    "ganancia",
    "estado"
], null, "A1");

$fila = 2;

foreach ($productos as $producto) {
    $hoja->fromArray([
        $producto["id_producto"],
        $producto["codigo_barras"],
        $producto["nombre"],
        $producto["precio_compra"],
        $producto["precio_venta"],
        $producto["precio_venta"] - $producto["precio_compra"],
        $producto["estado"] > 0 ? "Activo" : "Inactivo"
    ], null, "A" . $fila);

    if (is_numeric($producto["codigo_barras"])) {
        $hoja->setCellValueExplicit(
            "B" . $fila,
            $producto["codigo_barras"],
            DataType::TYPE_NUMERIC
        );
    }

    $fila++;
}

$hoja->setAutoFilter("A1:G" . ($fila - 1));
$hoja->getStyle("B2:B" . ($fila - 1))
    ->getNumberFormat()
    ->setFormatCode("0");

foreach (range("A", "G") as $columna) {
    $hoja->getColumnDimension($columna)->setAutoSize(true);
}

$nombreArchivo = "informe_productos.xlsx";

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