<?php
include "session.php";
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Punto Venta - Vender</title>
    <!-- <link rel="stylesheet" href="assets/css/styles.css"> -->
    <link rel="stylesheet" href="assets/css/global.css">
    <link rel="stylesheet" href="assets/css/index.css">
    <link rel="stylesheet" href="assets/css/header.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=shopping_cart,package_2,group,receipt,bar_chart,manage_accounts,search,delete" />
</head>

<body>
    <?php include 'header.php'; ?>
    <main>
        <div id="contenedor-busqueda">
            <div id="section-busqueda-producto">
                <span class="material-symbols-outlined" style="color: var(--indigo);">search</span>
                <input type="text" id="busqueda-producto" name="busqueda-producto" placeholder="Buscar producto o escanear código" autocomplete="off" oninput="this.value = this.value.toUpperCase()" autofocus required>
                <button id="btn-limpiar-texto">X</button>
            </div>
            <div id="lista-productos"></div>
        </div>

        <div id="detalles-venta">
            <div id="detalles-total-venta">
                <label>Total venta</label>
                <span id="total-venta">$0</span>
            </div>
            <div id="detalles-cuanto-pago">
                <label>Cuánto pagó</label>
                <div id="div-cuanto-pago">
                    <span id="signo-pesos">$</span>
                    <input type="number" id="pago-con">
                </div>
            </div>
            <div id="detalles-cambio">
                <label>Cambio</label>
                <span id="cambio-dinero">$0</span>
            </div>
            <div id="detalles-botones">
                <button type="button" id="cancelar-venta">Cancelar Venta</button>
                <button type="button" id="btn-modal-venta">Vender</button>
            </div>
        </div>

        <div class="section-tablas">
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
        </div>
    </main>

    <dialog id="modalVenta">
        <button id="btn-cerrar-modal-2" class="btn-eliminar">x</button>
        <h2>Tipo Venta</h2>
        <div id="tipo-venta">
            <label>
                <input type="radio" id="venta-contado" name="opcion" value="contado" checked>
                Contado
            </label>
            <label>
                <input type="radio" id="venta-credito" name="opcion" value="credito">
                Crédito
            </label>
        </div>
        <div id="buscar-cliente">
            <span class="material-symbols-outlined" style="color: var(--indigo);">search</span>
            <input type="text" id="input-buscar-cliente" placeholder="Nombre cliente..." autocomplete="off" oninput="this.value = this.value.toUpperCase()">
        </div>
        <div id="contenedor-lista-clientes">
            <div id="lista-clientes"></div>
        </div>
        <div class="botones-modal-venta">
            <button type="button" id="btn-cerrar-modal">Cancelar</button>
            <button id="registrar-venta">Registrar venta</button>
        </div>
    </dialog>

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

    <script src="assets/js/vender.js"></script>
</body>

</html>