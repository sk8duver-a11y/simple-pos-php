<?php

include "../config/conexion.php";

$buscar = $_GET['buscar'] ?? '';

$sql = "SELECT * FROM productos WHERE ESTADO = 1 AND (codigo_barras LIKE ? OR nombre LIKE ?) ORDER BY nombre";

$stmt = $conn->prepare($sql);

$textoBusqueda = "%" . $buscar . "%";

$stmt->bind_param("ss", $textoBusqueda, $textoBusqueda);

$stmt->execute();

$resultado = $stmt->get_result();

$productos = [];

while ($fila = $resultado->fetch_assoc()){
    $productos[] = $fila;
}

echo json_encode($productos);