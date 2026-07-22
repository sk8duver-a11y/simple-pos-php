<?php
include "session.php";
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Punto venta - Vender</title>
    <link rel="stylesheet" href="css/styles.css">
</head>

<body>
    <?php include 'header.php'; ?>
    <main>
        <section id="section-busqueda-producto">
            <label for="busqueda-producto">Buscar</label>
            <input type="text" id="busqueda-producto" name="busqueda-producto" autocomplete="off" oninput="this.value = this.value.toUpperCase()" autofocus required>
            <button id="btn-limpiar-texto" class="btn-eliminar">X</button>
            <div id="lista-productos"></div>
        </section>

        <section id="tabla-venta-productos">
            <div id="opciones-venta">
                <div class="detalles-venta">
                    <label>Total Venta:</label>
                    <span id="total-venta">0</span>
                </div>
                <div class="detalles-venta">
                    <label>Cuánto pagó:</label>
                    <input type="number" id="pago-con">
                </div>
                <div class="detalles-venta">
                    <label>Cambio:</label>
                    <span id="cambio-dinero">0</span>
                </div>
                <div class="detalles-venta">
                    <button id="cancelar-venta" class="btn-eliminar">Cancelar Venta</button>
                </div>
                <div class="detalles-venta">
                    <button id="registrar-venta" class="btn-agregar">Registrar Venta</button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th width="12%">Código Barras</th>
                        <th width="40%">Producto</th>
                        <th width="12%">Precio Venta</th>
                        <th width="12%">Cantidad</th>
                        <th width="12%">Total</th>
                        <th width="12%">Eliminar</th>
                    </tr>
                </thead>
                <tbody id="productos-vender">
                    <!-- Aquí se agregarán los productos registrados -->
                </tbody>
            </table>

        </section>
    </main>
    <script src="js/vender.js"></script>
</body>

</html>