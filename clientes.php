<?php
include "session.php";
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Punto Venta - Clientes</title>
    <link rel="stylesheet" href="assets/css/styles.css">
</head>

<body>
    <?php include 'header.php'; ?>

    <main>
        <form id="agregar-cliente">
            <fieldset>
                <legend>Agregar Cliente</legend>
                <div class="item-cliente">
                    <label for="nombre-cliente">Nombre Cliente</label>
                    <input type="text" id="nombre-cliente" name="nombre-cliente" autocomplete="off" oninput="this.value = this.value.toUpperCase()" require>
                </div>
                <div class="item-cliente">
                    <label for="celular-cliente">Celular</label>
                    <input type="text" id="celular-cliente" name="celular-cliente" autocomplete="off">
                </div>
                <div class="item-cliente">
                    <label for="correo-cliente">Correo Electrónico</label>
                    <input type="email" id="correo-cliente" name="correo-cliente" autocomplete="off">
                </div>
                <button type="submit" id="btn-agregar-cliente" class="btn-agregar" style="height: 40px;">Agregar</button>
                <button type="button" id="cancelar" class="btn-cancelar" style="height: 40px;">Cancelar</button>
            </fieldset>
        </form>

        <section id="tabla-clientes">
            <fieldset>
                <legend>Buscar Cliente</legend>
                <input type="text" id="buscar-cliente" name="buscar-cliente" placeholder="Buscar cliente..." autofocus oninput="this.value = this.value.toUpperCase()">
                <span>Clientes:</span>
                <span id="cantidad-clientes"></span>
            </fieldset>

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

    <script src="assets/js/clientes.js"></script>
</body>

</html>