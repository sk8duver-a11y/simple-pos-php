<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Punto Venta - Cliente</title>
    <link rel="stylesheet" href="assets/css/styles.css">
</head>

<body>
    <?php include 'header.php'; ?>

    <main>
        <section id="datos-cliente">
            <div class="datos-personales">
                <div class="tarjeta-resumen">
                    <span class="titulo-resumen">Nombre</span>
                    <strong id="txt-cliente" class="valor-resumen"></strong>
                </div>
                <div class="tarjeta-resumen">
                    <span class="titulo-resumen">Celular</span>
                    <strong id="txt-celular" class="valor-resumen"></strong>
                </div>
                <div class="tarjeta-resumen">
                    <span class="titulo-resumen">Correo</span>
                    <strong id="txt-correo" class="valor-resumen"></strong>
                </div>
                <div class="tarjeta-resumen">
                    <span class="titulo-resumen">Saldo pendiente</span>
                    <strong id="txt-correo" class="valor-resumen">$0<strong>
                </div>
            </div>
            <div id="detalles-cliente">
                <button type="button" class="btn-editar">Abonar</button>
                <button type="button" class="btn-agregar">Liquidar</button>
                <button type="button" class="btn-cancelar">Ventas Pendientes</button>
                <button type="button" class="btn-cancelar">Historial Ventas</button>
                <button type="button" class="btn-cancelar">Historial Pagos</button>
            </div>

            <table id="tabla-ventas-pendientes">
                <thead>
                    <tr>
                        <th>Venta</th>
                        <th>Hora</th>
                        <th>Productos</th>
                        <th>Total</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="ventas-pendientes">
                    <!-- Aquí se agregarán las ventas pendientes -->
                </tbody>
            </table>

            <table id="tabla-historial-ventas">
                <thead>
                    <tr>
                        <th>Venta</th>
                        <th>Hora</th>
                        <th>Productos</th>
                        <th>Total</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="historial ventas">
                    <!-- Aquí se agregará el historial de ventas -->
                </tbody>
            </table>
        </section>
    </main>

</body>

<script src="assets/js/cliente.js"></script>

</html>