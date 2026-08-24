<?php

include "../config/conexion.php";

$conn->begin_transaction();

try {

    $contenido = file_get_contents("php://input");

    $venta = json_decode($contenido, true);

    $total = $venta["total"];
    $tipoVenta = $venta["tipoVenta"];
    $idCliente = $venta["idCliente"];
    $estado = $venta["estado"];

    $sql = "INSERT INTO ventas (total, tipo_venta, id_cliente, estado) VALUES (?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);

    $stmt->bind_param("isis", $total, $tipoVenta, $idCliente, $estado);

    $stmt->execute();

    $idVenta = $conn->insert_id;

    foreach ($venta["productos"] as $producto) {

        $ganancia = $producto["precioVenta"] - $producto["precioCompra"];

        $sqlDetalle = "INSERT INTO detalle_venta
        (
            id_venta,
            id_producto,
            codigo_barras,
            nombre,
            precio_compra,
            precio_venta,
            ganancia,
            cantidad,
            subtotal
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        $stmtDetalle = $conn->prepare($sqlDetalle);

        $stmtDetalle->bind_param(
            "iissiiiii",
            $idVenta,
            $producto["idProducto"],
            $producto["codigoBarras"],
            $producto["nombre"],
            $producto["precioCompra"],
            $producto["precioVenta"],
            $ganancia,
            $producto["cantidad"],
            $producto["subtotal"]
        );

        $stmtDetalle->execute();

    }

    $conn->commit();

    echo json_encode([
        "mensaje" => "Venta registrada correctamente."
    ]);

} catch (Exception $e) {

    $conn->rollback();

    echo json_encode([
        "mensaje" => "Error al registrar la venta."
    ]);

}