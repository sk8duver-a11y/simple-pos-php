<?php
include "session.php";
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Punto Venta - Usuarios</title>
    <link rel="stylesheet" href="assets/css/styles.css">
</head>

<body>
    <?php include 'header.php'; ?>
    <main>
        <form id="agregar-usuario">
            <fieldset>
                <legend>Agregar Usuario</legend>
                <div class="item-clientes">
                    <label for="usuario">Usuario</label>
                    <input type="text" id="usuario" name="usuario" autocomplete="off" require>
                </div>
                <div class="item-clientes">
                    <label for="nombre-usuario">Nombre Usuario</label>
                    <input type="text" id="nombre-usuario" name="nombre-usuario" autocomplete="off" oninput="this.value = this.value.toUpperCase()" require>
                </div>
                <div class="item-clientes">
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" name="password" autocomplete="off" require>
                </div>
                <button type="submit" id="btn-agregar-usuario" class="btn-agregar" style="height: 40px;">Agregar</button>
                <button type="button" id="cancelar" class="btn-cancelar" style="height: 40px;">Cancelar</button>
            </fieldset>
        </form>
    </main>

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


    <script src="assets/js/usuarios.js"></script>
</body>

</html>