<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include "../config/conexion.php";

// Recibir los datos enviados desde JavaScript
$contenido = file_get_contents("php://input");
$datos = json_decode($contenido, true);

$usuario = trim($datos["usuario"] ?? "");
$password = trim($datos["password"] ?? "");

// Verificar que los campos no estén vacíos
if (empty($usuario) || empty($password)) {
    echo "Debe completar todos los campos.";
    exit();
}

// Buscar el usuario en la base de datos
$sql = "SELECT id_usuario, usuario, password, rol
        FROM usuarios
        WHERE usuario = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $usuario);
$stmt->execute();

$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {

    $usuarioEncontrado = $resultado->fetch_assoc();

    // Verificar la contraseña
    if (password_verify($password, $usuarioEncontrado["password"])) {

        // Iniciar la sesión
        session_start();

        // Regenerar el identificador de sesión
        session_regenerate_id(true);

        // Guardar los datos del usuario en la sesión
        $_SESSION["id_usuario"] = $usuarioEncontrado["id_usuario"];
        $_SESSION["usuario"] = $usuarioEncontrado["usuario"];
        $_SESSION["rol"] = $usuarioEncontrado["rol"];

        echo "Login correcto";

    } else {
        echo "Contraseña incorrecta";
    }

} else {
    echo "Usuario no encontrado";
}

$stmt->close();
$conn->close();