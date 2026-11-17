<?php

require_once "../config/verificar_admin.php";
include "../config/conexion.php";

$buscar = $_GET['buscar'] ?? '';

$sql = "SELECT id_usuario, usuario, nombre_usuario, rol FROM usuarios WHERE nombre_usuario LIKE ?";

$stmt = $conn->prepare($sql);

$textoBusqueda = "%" . $buscar . "%";

$stmt->bind_param("s", $textoBusqueda);

$stmt->execute();

$resultado = $stmt->get_result();

$usuarios = [];

while ($fila = $resultado->fetch_assoc()) {
    $usuarios[] = $fila;
}

echo json_encode($usuarios);