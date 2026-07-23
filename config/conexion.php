<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

// Si existen las variables de Railway, usarlas.
// De lo contrario, usar la configuración local (XAMPP).
$servidor = getenv("MYSQLHOST") ?: "localhost";
$usuario = getenv("MYSQLUSER") ?: "root";
$contraseña = getenv("MYSQLPASSWORD") ?: "";
$basedatos = getenv("MYSQLDATABASE") ?: "punto_venta_php";
$puerto = getenv("MYSQLPORT") ?: 3306;

$conn = new mysqli(
    $servidor,
    $usuario,
    $contraseña,
    $basedatos,
    $puerto
);

$conn->set_charset("utf8mb4");