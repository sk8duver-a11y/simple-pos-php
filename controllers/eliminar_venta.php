<?php

include "../config/conexion.php";

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try{
    $conn->begin_transaction();
    $contenido = file_get_contents("php://input");
    $datos = json_decode($contenido, true);

    $idVenta = $datos['idVenta'] ?? "";

    if (empty($idVenta)) {
    throw new Exception("No se recibió el id de la venta.");
}

    $sqlEliminarDetalles = "DELETE FROM detalle_venta WHERE id_venta = ?";
    $stmtEliminarDetalles = $conn->prepare($sqlEliminarDetalles);
    $stmtEliminarDetalles->bind_param("i", $idVenta);
    $stmtEliminarDetalles->execute();

    if ($stmtEliminarDetalles->affected_rows === 0) {
        throw new Exception("No se pudieron eliminar los detalles de la venta.");
    }

    $sqlEliminarVenta = "DELETE FROM ventas WHERE id_venta = ?";
    $stmtEliminarVenta = $conn->prepare($sqlEliminarVenta);
    $stmtEliminarVenta->bind_param("i", $idVenta);
    $stmtEliminarVenta->execute();

    if ($stmtEliminarVenta->affected_rows === 0) {
        throw new Exception("No se pudo eliminar la venta.");
    }

    $conn->commit();

    echo json_encode([
        "success" => true,
        "mensaje" => "Venta eliminada correctamente."
    ]);

} catch (Exception $e) {
    $conn->rollback();
    echo json_encode([
        "success" => false,
        "mensaje" => $e->getMessage()
    ]);
}