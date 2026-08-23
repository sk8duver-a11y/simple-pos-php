<?php

include "../config/conexion.php";

$contenido = file_get_contents("php://input");

$datos = json_decode($contenido, true);


$nombre_cliente = trim($datos['nombreCliente']);
$celular_cliente = trim($datos['celularCliente']);
$correo_cliente = trim($datos['correoCliente']);

if ($nombre_cliente === "") {
    echo json_encode([
        "mensaje" => "El nombre del cliente es obligatorio."
    ]);
    exit;
}

//Buscar si ya existe un cliente con el mismo nombre
$sql = "SELECT id_cliente, estado FROM clientes WHERE nombre = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $nombre_cliente);
$stmt->execute();

$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    $cliente = $resultado->fetch_assoc();

    //EL cliente ya existe y esta activo
    if ($cliente["estado"] == 1) {
        echo json_encode([
            "mensaje" => "Ya existe un cliente con el mismo nombre."
        ]);
        exit;
    }

    //El cliente existe pero esta inactivo
    $sql = "UPDATE clientes SET celular = ?, correo = ?, estado = 1 WHERE id_cliente = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssi", $celular_cliente, $correo_cliente, $cliente["id_cliente"]);

    if ($stmt->execute()) {
        echo json_encode([
            "mensaje" => "Cliente reactivado correctamente."
        ]);
    } else {
        echo json_encode([
            "mensaje" => "Error al reactivar el cliente."
        ]);
    }
    exit;
}

// EL cliente no existe, se inserta
$sql = "INSERT INTO clientes (nombre, celular, correo) VALUES (?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $nombre_cliente, $celular_cliente, $correo_cliente);

if ($stmt->execute()) {
    echo json_encode([
        "mensaje" => "Cliente agregado correctamente."
    ]);
} else {
    echo json_encode([
        "mensaje" => "Error al agregar el cliente."
    ]);
}
