<?php

include "../config/conexion.php";

$buscar = $_GET['buscar'] ?? '';

$sql = "SELECT * FROM clientes WHERE estado = 1 AND (nombre LIKE ?) ORDER BY nombre";

$stmt = $conn->prepare($sql);

$textoBusqueda = "%" . $buscar . "%";

$stmt->bind_param("s", $textoBusqueda);

$stmt->execute();

$resultado = $stmt->get_result();

$clientes = [];

while ($fila = $resultado->fetch_assoc()) {
    $clientes[] = $fila;
}

echo json_encode($clientes);
