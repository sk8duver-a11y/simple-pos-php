<?php
include "session.php";
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Punto Venta - Productos</title>
    <link rel="stylesheet" href="assets/css/global.css">
    <link rel="stylesheet" href="assets/css/productos.css">
    <link rel="stylesheet" href="assets/css/header.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=shopping_cart,package_2,group,receipt,bar_chart,manage_accounts,search" />
</head>

<body>
    <?php include 'header.php'; ?>

    <main>
        <form id="agregar-producto">
            <h2>Agregar producto</h2>
            <div id="contenedor-item-productos">
                <div class="item-productos">
                    <label for="codigo-barras">Código de barras</label>
                    <input type="text" id="codigo-barras" name="codigo-barras" autocomplete="off" required>
                </div>
                <div class="item-productos">
                    <label for="nombre">Producto</label>
                    <input type="text" id="nombre" name="nombre" autocomplete="off" oninput="this.value = this.value.toUpperCase()" required>
                </div>
                <div class="item-productos">
                    <label for="precio-compra">Precio compra</label>
                    <input type="number" id="precio-compra" name="precio-compra" autocomplete="off" required>
                </div>
                <div class="item-productos">
                    <label for="precio-venta">Precio venta</label>
                    <input type="number" id="precio-venta" name="precio-venta" autocomplete="off" required>
                </div>
                <button type="submit" id="btn-agregar-producto">Agregar</button>
                <button type="button" id="cancelar">Cancelar</button>
            </div>
        </form>

        <div class="section-tablas">
            <div id="section-buscar-producto">
                <div id="contenedor-input-producto">
                    <span class="material-symbols-outlined" style="color: var(--indigo);">search</span>
                    <input type="text" id="buscar-producto" name="buscar-producto" placeholder="Buscar producto..." autofocus oninput="this.value = this.value.toUpperCase()" autocomplete="off">
                </div>
                <div id="spam-cantidad-productos">
                    <span>Productos</span>
                    <span id="cantidad-productos"></span>
                </div>
            </div>
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
        </div>

    </main>

    <dialog id="modal-alerta">
        <div id="modal-alerta-contenido">
            <svg width="115px" height="115px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#4f46e5" stroke-width="2"></path>
                    <path d="M12 8L12 13" stroke="#4f46e5" stroke-width="2" stroke-linecap="round"></path>
                    <path d="M12 16V15.9888" stroke="#4f46e5" stroke-width="2" stroke-linecap="round"></path>
                </g>
            </svg>
            <label id="mensaje-alerta"></label>
            <button type="button" class="btn-aceptar-alerta" onclick="modalAlerta.close()">Aceptar</button>
        </div>
    </dialog>

    <dialog id="modal-eliminar-producto">
        <!-- <button type="button" id="btn-cerrar-liquidar" class="btn-eliminar">X</button> -->
        <div id="modal-alerta-contenido">
            <span id="nombre-producto-eliminar"></span>
            <label>¿Seguro que desea eliminar el producto?</label>
            <div class="botones-modal">
                <button type="button" class="btn-cancelar-alerta" onclick="modalEliminarProducto.close()">Cancelar</button>
                <button type="button" class="btn-confirmar-eliminar" id="btn-eliminar-producto">Eliminar</button>
            </div>
        </div>
    </dialog>

    <script src="assets/js/productos.js"></script>
</body>

</html>