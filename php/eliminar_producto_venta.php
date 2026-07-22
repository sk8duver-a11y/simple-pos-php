<?php

include "conexion.php";

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    $conn->begin_transaction();

    $contenido = file_get_contents("php://input");
    $datos = json_decode($contenido, true);

    $idDetalle = $datos['idDetalle'] ?? "";

    $sqlConsulta = "SELECT id_venta FROM detalle_venta WHERE id_detalle = ?";
    $stmtConsulta = $conn->prepare($sqlConsulta);
    $stmtConsulta->bind_param("i", $idDetalle);
    $stmtConsulta->execute();
    $resultadoConsulta = $stmtConsulta->get_result();
    $filaVenta = $resultadoConsulta->fetch_assoc();

    if (!$filaVenta) {
        throw new Exception("No se encontró el detalle de la venta.");
    }

    $idVenta = $filaVenta["id_venta"];

    $sqlEliminarDetalle = "DELETE FROM detalle_venta WHERE id_detalle = ?";
    $stmtEliminarDetalle = $conn->prepare($sqlEliminarDetalle);
    $stmtEliminarDetalle->bind_param("i", $idDetalle);
    $stmtEliminarDetalle->execute();

    if ($stmtEliminarDetalle->affected_rows === 0) {
        throw new Exception("No se pudo eliminar el detalle de la venta.");
    }

    $sqlContarProd = "SELECT COUNT(*) AS cantidad_productos FROM detalle_venta WHERE id_venta = ?";
    $stmtContarProd = $conn->prepare($sqlContarProd);
    $stmtContarProd->bind_param("i", $idVenta);
    $stmtContarProd->execute();
    $resultadoCantidad = $stmtContarProd->get_result();
    $filaCantidad = $resultadoCantidad->fetch_assoc();
    $cantidadProductos = $filaCantidad["cantidad_productos"];

    if ($cantidadProductos > 0) {
        $sqlSuma = "SELECT COALESCE(SUM(subtotal), 0) AS resultado_suma FROM detalle_venta WHERE id_venta = ?";
        $stmtSuma = $conn->prepare($sqlSuma);
        $stmtSuma->bind_param("i", $idVenta);
        $stmtSuma->execute();
        $resultadoSuma = $stmtSuma->get_result();
        $filaSuma = $resultadoSuma->fetch_assoc();
        $sumaSubtotal = $filaSuma["resultado_suma"];

        $sqlUpdateVentas = "UPDATE ventas SET total = ? WHERE id_venta = ?";
        $stmtUpdateVentas = $conn->prepare($sqlUpdateVentas);
        $stmtUpdateVentas->bind_param("ii", $sumaSubtotal, $idVenta);
        $stmtUpdateVentas->execute();
    } else {
        $sqlEliminarVenta = "DELETE FROM ventas WHERE id_venta = ?";
        $stmtEliminarVenta = $conn->prepare($sqlEliminarVenta);
        $stmtEliminarVenta->bind_param("i", $idVenta);
        $stmtEliminarVenta->execute();
        if ($stmtEliminarVenta->affected_rows === 0) {
            throw new Exception("No se pudo eliminar la venta.");
        }
    }

    $conn->commit();

    echo json_encode([
        "success" => true,
        "mensaje" => "Producto eliminado correctamente."
    ]);
} catch (Exception $e) {

    $conn->rollback();
    echo json_encode([
        "success" => false,
        "mensaje" => $e->getMessage()
    ]);
}
