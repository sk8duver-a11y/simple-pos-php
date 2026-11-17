<?php

session_start();

// Verificar si existe una sesión iniciada
if (!isset($_SESSION["usuario"])) {
    header("Location: login.php");
    exit();
}

// Verificar si el usuario tiene rol de administrador
function verificarAdministrador() {

    if (!isset($_SESSION["rol"]) || $_SESSION["rol"] !== "administrador") {
        header("Location: index.php");
        exit();
    }
}

