<?php
include "session.php";
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Punto Venta - Productos</title>
    <link rel="stylesheet" href="css/styles.css">
</head>

<body>
    <?php include 'header.php'; ?>

    <main>
        <form id="agregar-producto">
            <fieldset>
                <legend>Agregar Producto</legend>
                <div class="item-producto">
                    <label for="codigo-barras">Código Barras</label>
                    <input type="text" id="codigo-barras" name="codigo-barras" autocomplete="off" required>
                </div>
                <div class="item-producto">
                    <label for="nombre">Producto</label>
                    <input type="text" id="nombre" name="nombre" autocomplete="off" oninput="this.value = this.value.toUpperCase()" required>
                </div>
                <div class="item-producto">
                    <label for="precio-compra">Precio Compra</label>
                    <input type="number" id="precio-compra" name="precio-compra" autocomplete="off" required>
                </div>
                <div class="item-producto">
                    <label for="precio-venta">Precio Venta</label>
                    <input type="number" id="precio-venta" name="precio-venta" autocomplete="off" required>
                </div>
                <button type="submit" id="btn-agregar-producto" class="btn-agregar" style="height: 40px;">Agregar</button>
                <button type="button" id="cancelar" class="btn-cancelar" style="height: 40px;">Cancelar</button>
            </fieldset>
        </form>

        <section id="tabla-productos">
            <fieldset>
                <legend>Buscar Producto</legend>
                <input type="text" id="buscar-producto" name="buscar-producto" placeholder="Buscar producto..." autofocus oninput="this.value = this.value.toUpperCase()">
                <span>Productos:</span>
                <span id="cantidad-productos"></span>
            </fieldset>
            <table>
                <thead>
                    <tr>
                        <th width="6%">Id</th>
                        <th width="12%">Código Barras</th>
                        <th width="30%">Producto</th>
                        <th width="12%">Precio Compra</th>
                        <th width="12%">Precio Venta</th>
                        <th width="12%">Ganancia</th>
                        <th width="16%">Acciones</th>
                    </tr>
                </thead>
                <tbody id="productos-registrados">
                    <!-- Aquí se agregarán los productos registrados -->
                </tbody>
            </table>
        </section>

    </main>

    <script src="js/productos.js"></script>
</body>

</html>