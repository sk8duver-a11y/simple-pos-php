<?php

include "../config/conexion.php";

$contenido = file_get_contents("php://input");

$datos = json_decode($contenido, true);

$usuario = trim($datos["usuario"]);
$password = trim($datos["password"]);

$sql = "SELECT * FROM usuarios WHERE usuario = ?";

$stmt = $conn->prepare($sql);

$stmt->bind_param("s", $usuario);

$stmt->execute();

$resultado = $stmt->get_result();

if($resultado->num_rows > 0){
    $usuarioEncontrado = $resultado->fetch_assoc();

    if(password_verify($password, $usuarioEncontrado["password"])){
        session_start();
        $_SESSION["usuario"] = $usuarioEncontrado["usuario"];
        echo "Login correcto";
    }else{
        echo "Contraseña incorrecta";
    }
}else{
    echo "Usuario no encontrado";
}