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
            <fieldset>
                <legend>Cliente</legend>

                <div class="info-datos-cliente">
                    <label>Nombre:</label>
                    <p id="txt-cliente"></p>
                </div>
                <div class="info-datos-cliente">
                    <label>Celular:</label>
                    <p id="txt-celular"></p>
                </div>
                <div class="info-datos-cliente">
                    <label>Correo:</label>
                    <p id="txt-correo"></p>
                </div>

            </fieldset>
        </section>
        <section id="detalles-cliente">
            <div class="info-datos-cliente">
                <label>Saldo pendiente:</label>
                <p id="txt-saldo-pendiente"></p>
            </div>
            <div class="info-datos-cliente">
                <button type="button" class="btn-cancelar">Abonar</button>
            </div>
            <div class="info-datos-cliente">
                <button type="button" class="btn-agregar">Liquidar</button>
            </div>
        </section>

    </main>

</body>

<script src="assets/js/cliente.js"></script>

</html>