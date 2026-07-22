<?php

include "../config/conexion.php";

$contenido = file_get_contents("php://input");

$datos = json_decode($contenido, true);

$codigo_barras = trim($datos['codigoBarras']);
$nombre = trim($datos['nombre']);
$precio_compra = trim($datos['precioCompra']);
$precio_venta = trim($datos['precioVenta']);

if ($codigo_barras === "" || $nombre === "" || $precio_compra === "" || $precio_venta === "") {
    echo "Todos los campos son obligatorios.";
    exit;
}

// Buscar si ya existe el producto
$sql = "SELECT id_producto, estado FROM productos WHERE codigo_barras = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $codigo_barras);
$stmt->execute();

$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    $producto = $resultado->fetch_assoc();

    // El producto ya existe y está activo
    if ($producto["estado"] == 1) {
        echo "El producto ya existe.";
        exit;
    }

    // El producto existe pero está inactivo
    $sql = "UPDATE productos SET nombre = ?, precio_compra = ?, precio_venta = ?, estado = 1 WHERE id_producto = ?";

    $stmt = $conn->prepare($sql);

    $stmt->bind_param("siii", $nombre, $precio_compra, $precio_venta, $producto["id_producto"]);

    if ($stmt->execute()) {
        echo "Producto reactivado correctamente.";
    } else {
        echo "Error al reactivar el producto.";
    }
    exit;
}

// El producto no existe, se inserta
$sql = "INSERT INTO productos (codigo_barras, nombre, precio_compra, precio_venta) VALUES (?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

$stmt->bind_param("ssii", $codigo_barras, $nombre, $precio_compra, $precio_venta);

if ($stmt->execute()) {
    echo "Producto agregado correctamente.";
} else {
    echo "Error al agregar el producto.";
}
