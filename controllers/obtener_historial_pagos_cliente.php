<?php

include "../config/conexion.php";

$idCliente = $_GET["id"] ?? "";

$sql = "SELECT
            p.id_pago,
            p.fecha,
            p.monto,
            p.id_venta
        FROM pagos p
        INNER JOIN ventas v
            ON p.id_venta = v.id_venta
        WHERE v.id_cliente = ?
        AND v.tipo_venta = 'CREDITO'
        ORDER BY p.fecha DESC";

$stmt = $conn->prepare($sql);

$stmt->bind_param("i", $idCliente);

$stmt->execute();

$resultado = $stmt->get_result();

$pagos = $resultado->fetch_all(MYSQLI_ASSOC);

echo json_encode($pagos);
