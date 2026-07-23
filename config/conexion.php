<?php

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$servidor = "localhost";
$usuario = "root";
$contraseña = "";
$basedatos = "punto_venta_php";

$conn = new mysqli($servidor, $usuario, $contraseña, $basedatos);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}