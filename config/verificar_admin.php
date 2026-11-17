<?php

session_start();

header("Content-Type: application/json; charset=UTF-8");

// Verificar sesión
if (!isset($_SESSION["usuario"])) {
    http_response_code(401);

    echo json_encode([
        "mensaje" => "Debe iniciar sesión."
    ]);

    exit();
}

// Verificar rol de administrador
if (!isset($_SESSION["rol"]) || $_SESSION["rol"] !== "administrador") {
    http_response_code(403);

    echo json_encode([
        "mensaje" => "No tiene permisos para realizar esta acción."
    ]);

    exit();
}
