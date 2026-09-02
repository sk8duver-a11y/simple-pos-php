<?php

include "../config/conexion.php";

$idCliente = $_POST["idCliente"] ?? "";
$montoAbono = $_POST["monto"] ?? "";

if ($idCliente === "" || $montoAbono === "") {
    echo json_encode([
        "success" => false,
        "mensaje" => "Faltan datos para registrar el abono."
    ]);
    exit;
}

$idCliente = (int) $idCliente;
$montoAbono = (int) $montoAbono;

if ($idCliente <= 0 || $montoAbono <= 0) {
    echo json_encode([
        "success" => false,
        "mensaje" => "El cliente y el monto deben ser válidos."
    ]);
    exit;
}

$conn->begin_transaction();

try {

    $sqlVentas = "SELECT
                    v.id_venta,
                    v.total,
                    COALESCE(
                        (
                            SELECT SUM(p.monto)
                            FROM pagos p
                            WHERE p.id_venta = v.id_venta
                        ), 0
                    ) AS pagado
                FROM ventas v
                WHERE v.id_cliente = ?
                AND v.tipo_venta = 'CREDITO'
                AND v.estado = 'PENDIENTE'
                ORDER BY v.fecha ASC
                FOR UPDATE";

    $stmtVentas = $conn->prepare($sqlVentas);

    $stmtVentas->bind_param("i", $idCliente);

    $stmtVentas->execute();

    $resultadoVentas = $stmtVentas->get_result();

    $montoRestante = $montoAbono;

    while ($venta = $resultadoVentas->fetch_assoc()) {

        if ($montoRestante <= 0) {
            break;
        }

        $saldoVenta = (int) $venta["total"] - (int) $venta["pagado"];

        if ($saldoVenta <= 0) {
            continue;
        }

        $montoAplicar = min($montoRestante, $saldoVenta);

        $sqlPago = "INSERT INTO pagos (id_venta, monto)
                    VALUES (?, ?)";

        $stmtPago = $conn->prepare($sqlPago);

        $stmtPago->bind_param(
            "ii",
            $venta["id_venta"],
            $montoAplicar
        );

        $stmtPago->execute();

        $montoRestante -= $montoAplicar;

        if ($montoAplicar === $saldoVenta) {

            $sqlActualizarVenta = "UPDATE ventas
                                   SET estado = 'PAGADA'
                                   WHERE id_venta = ?";

            $stmtActualizarVenta = $conn->prepare($sqlActualizarVenta);

            $stmtActualizarVenta->bind_param(
                "i",
                $venta["id_venta"]
            );

            $stmtActualizarVenta->execute();
        }
    }

    if ($montoRestante > 0) {

        throw new Exception(
            "El abono es mayor al saldo pendiente del cliente."
        );
    }

    $conn->commit();

    echo json_encode([
        "success" => true,
        "mensaje" => "Pago registrado correctamente."
    ]);
} catch (Exception $e) {

    $conn->rollback();

    echo json_encode([
        "success" => false,
        "mensaje" => $e->getMessage()
    ]);
}
