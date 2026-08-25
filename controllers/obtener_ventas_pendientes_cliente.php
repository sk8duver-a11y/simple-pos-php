<?php

include "../config/conexion.php";

$idCliente = $_GET["id"] ?? "";

$sql = "SELECT
            v.id_venta,
            v.fecha,
            (
                SELECT COUNT(*)
                FROM detalle_venta d
                WHERE d.id_venta = v.id_venta
            ) AS productos,
            v.total,
            COALESCE(
                (
                    SELECT SUM(p.monto)
                    FROM pagos p
                    WHERE p.id_venta = v.id_venta
                ), 0
            ) AS pagado,
            v.total - COALESCE(
                (
                    SELECT SUM(p.monto)
                    FROM pagos p
                    WHERE p.id_venta = v.id_venta
                ), 0
            ) AS saldo
        FROM ventas v
        WHERE v.id_cliente = ?
        AND v.tipo_venta = 'CREDITO'
        AND v.estado = 'PENDIENTE'
        ORDER BY v.fecha ASC";

$stmt = $conn->prepare($sql);

$stmt->bind_param("i", $idCliente);

$stmt->execute();

$resultado = $stmt->get_result();

$ventas = $resultado->fetch_all(MYSQLI_ASSOC);

echo json_encode($ventas);