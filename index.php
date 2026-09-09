<?php
include "session.php";
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Punto venta - Vender</title>
    <link rel="stylesheet" href="assets/css/styles.css">
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
                    <span id="total-venta">$0</span>
                </div>
                <div class="detalles-venta">
                    <label>Cuánto pagó:</label>
                    <input type="number" id="pago-con">
                </div>
                <div class="detalles-venta">
                    <label>Cambio:</label>
                    <span id="cambio-dinero">$0</span>
                </div>
                <div class="detalles-venta">
                    <button id="cancelar-venta" class="btn-eliminar">Cancelar Venta</button>
                </div>
                <div class="detalles-venta">
                    <button type="button" id="btn-modal-venta" class="btn-agregar">Vender</button>
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
            <input type="text" id="input-buscar-cliente" placeholder="Nombre cliente..." autocomplete="off" oninput="this.value = this.value.toUpperCase()">
        </div>
        <div id="lista-clientes"></div>
        <button type="button" id="btn-cerrar-modal" class="btn-eliminar">Cancelar</button>
        <button id="registrar-venta" class="btn-agregar">Registrar Venta</button>
    </dialog>

    <dialog id="modal-alerta">
        <div id="modal-alerta-contenido">
            <svg width="115px" height="115px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#155dfc" stroke-width="2"></path>
                    <path d="M12 8L12 13" stroke="#155dfc" stroke-width="2" stroke-linecap="round"></path>
                    <path d="M12 16V15.9888" stroke="#155dfc" stroke-width="2" stroke-linecap="round"></path>
                </g>
            </svg>
            <label id="mensaje-alerta"></label>
            <button type="button" class="btn-cancelar" onclick="modalAlerta.close()">Aceptar</button>
        </div>
    </dialog>

    <script src="assets/js/vender.js"></script>
</body>

</html>