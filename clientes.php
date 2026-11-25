<?php
include "session.php";
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Punto Venta - Clientes</title>
    <link rel="stylesheet" href="assets/css/global.css">
    <link rel="stylesheet" href="assets/css/clientes.css">
    <link rel="stylesheet" href="assets/css/header.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=shopping_cart,package_2,group,receipt,bar_chart,manage_accounts,search" />
</head>

<body>
    <?php include 'header.php'; ?>

    <main>
        <form id="agregar-cliente">
            <h2>Agregar cliente</h2>
            <div id="contenedor-item-clientes">
                <div class="item-clientes">
                    <label for="nombre-cliente">Nombre Cliente</label>
                    <input type="text" id="nombre-cliente" name="nombre-cliente" autocomplete="off" oninput="this.value = this.value.toUpperCase()" require>
                </div>
                <div class="item-clientes">
                    <label for="celular-cliente">Celular</label>
                    <input type="text" id="celular-cliente" name="celular-cliente" autocomplete="off">
                </div>
                <div class="item-clientes">
                    <label for="correo-cliente">Correo Electrónico</label>
                    <input type="email" id="correo-cliente" name="correo-cliente" autocomplete="off">
                </div>
                <button type="submit" id="btn-agregar-cliente">Agregar</button>
                <button type="button" id="cancelar">Cancelar</button>
            </div>
        </form>

        <div class="section-tablas">
            <div id="section-buscar-cliente">
                <div id="contenedor-input-cliente">
                    <span class="material-symbols-outlined" style="color: var(--indigo);">search</span>
                    <input type="text" id="buscar-cliente" name="buscar-cliente" placeholder="Buscar cliente..." autofocus oninput="this.value = this.value.toUpperCase()">
                </div>
                <div id="spam-cantidad-clientes">
                    <span>Clientes:</span>
                    <span id="cantidad-clientes"></span>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Celular</th>
                        <th>Correo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="clientes-registrados">
                    <!-- Aquí se agregarán los clientes registrados -->
                </tbody>
            </table>
            </section>
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

    <dialog id="modal-eliminar-cliente">
        <!-- <button type="button" id="btn-cerrar-liquidar" class="btn-eliminar">X</button> -->
        <div id="modal-alerta-contenido">
            <span id="nombre-eliminar-cliente"></span>
            <label>¿Seguro que desea eliminar el cliente?</label>
            <div class="botones-modal">
                <button type="button" class="btn-cancelar-alerta" onclick="modalEliminarCliente.close()">Cancelar</button>
                <button type="button" class="btn-confirmar-eliminar" id="btn-eliminar-cliente">Eliminar</button>
            </div>
        </div>
    </dialog>

    <script src="assets/js/clientes.js"></script>
</body>

</html>