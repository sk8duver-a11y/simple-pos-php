<?php

include "../config/conexion.php";

$idCliente = $_GET["id"];

$sql = "SELECT id_cliente, nombre, celular, correo
        FROM clientes
        WHERE id_cliente = ?";

$stmt = $conn->prepare($sql);

$stmt->bind_param("i", $idCliente);

$stmt->execute();

$resultado = $stmt->get_result();

$cliente = $resultado->fetch_assoc();

echo json_encode($cliente);