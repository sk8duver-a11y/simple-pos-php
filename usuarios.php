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
                    <input type="password" id="password" name="password" autocomplete="off">
                </div>
                <button type="submit" id="btn-agregar-cliente" class="btn-agregar" style="height: 40px;">Agregar</button>
                <button type="button" id="cancelar" class="btn-cancelar" style="height: 40px;">Cancelar</button>
            </fieldset>
        </form>

    </main>


    <script src="assets/js/usuarios.js"></script>
</body>

</html>