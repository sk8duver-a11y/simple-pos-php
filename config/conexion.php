<?php

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

// Si existen las variables de Railway, usarlas.
// De lo contrario, usar la configuración local (XAMPP).
$servidor = $_ENV["MYSQLHOST"] ?? "localhost";
$usuario = $_ENV["MYSQLUSER"] ?? "root";
$contraseña = $_ENV["MYSQLPASSWORD"] ?? "";
$basedatos = $_ENV["MYSQLDATABASE"] ?? "punto_venta_php";
$puerto = $_ENV["MYSQLPORT"] ?? 3306;

$conn = new mysqli(
    $servidor,
    $usuario,
    $contraseña,
    $basedatos,
    $puerto
);

$conn->set_charset("utf8mb4");