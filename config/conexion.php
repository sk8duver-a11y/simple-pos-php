<?php

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$servidor = getenv('DB_HOST') ?: 'localhost';
$usuario = getenv('DB_USER') ?: 'root';
$contraseña = getenv('DB_PASSWORD') ?: '';
$basedatos = getenv('DB_NAME') ?: 'punto_venta_php';
$puerto = getenv('DB_PORT') ?: 3306;

$conn = mysqli_init();

if (getenv('DB_HOST')) {
    // Habilita TLS/SSL (Render -> TiDB)
    mysqli_ssl_set($conn, null, null, null, null, null);

    mysqli_real_connect(
        $conn,
        $servidor,
        $usuario,
        $contraseña,
        $basedatos,
        $puerto,
        null,
        MYSQLI_CLIENT_SSL
    );
} else {
    // Desarrollo local (XAMPP)
    mysqli_real_connect(
        $conn,
        $servidor,
        $usuario,
        $contraseña,
        $basedatos,
        $puerto
    );
}

$conn->set_charset("utf8mb4");