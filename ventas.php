<?php
include "session.php";
date_default_timezone_set('America/Bogota');
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Punto Venta - Ventas</title>
    <link rel="stylesheet" href="assets/css/styles.css">
</head>

<body>

    <?php include 'header.php'; ?>

    <main>
    
        <fieldset>
            <legend>Resumen del día</legend>

            <div class="resumen-ventas">
                <div class="filtros-resumen">
                    <div class="item-producto">
                        <label for="input-ganancia">Fecha</label>
                        <input type="date" id="input-ganancia" value="<?php echo date("Y-m-d"); ?>">
                    </div>
                    <button type="button" id="btn-ganancia" class="btn-agregar">Calcular</button>
                </div>

                <div class="resumen-dia">
                    <div class="tarjeta-resumen">
                        <span class="titulo-resumen">Ganancia</span>
                        <strong id="ver-ganancia" class="valor-resumen">$0</strong>
                    </div>

                    <div class="tarjeta-resumen">
                        <span class="titulo-resumen">Total vendido</span>
                        <strong id="ver-total-vendido" class="valor-resumen">$0</strong>
                    </div>

                    <div class="tarjeta-resumen">
                        <span class="titulo-resumen">Ventas realizadas</span>
                        <strong id="ver-cantidad-ventas" class="valor-resumen">0</strong>
                    </div>
                </div>
            </div>
        </fieldset>
        <section id="section-ventas-dia">
            <!-- Aquí JavaScript creará la tabla -->
        </section>
    </main>

    <script src="assets/js/ventas.js"></script>

</body>

</html>