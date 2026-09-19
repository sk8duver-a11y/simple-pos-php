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
    <dialog id="modal-detalle-venta"> <button type="button" id="btn-cerrar-modal-2" class="btn-eliminar"> X </button>
        <h2>Detalle de venta</h2>
        <div id="contenido-detalle-venta"> <!-- JavaScript agregará aquí la tabla --> </div>
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

    <dialog id="modal-eliminar-producto">
        <!-- <button type="button" id="btn-cerrar-liquidar" class="btn-eliminar">X</button> -->
        <div id="modal-alerta-contenido">
            <span id="nombre-producto-eliminar"></span>
            <label>¿Seguro que desea eliminar el producto?</label>
            <div>
                <button type="button" class="btn-cancelar" onclick="modalEliminarProducto.close()">Cancelar</button>
                <button type="button" class="btn-eliminar" id="btn-eliminar-producto">Eliminar</button>
            </div>
        </div>
    </dialog>

    <dialog id="modal-eliminar-venta">
        <!-- <button type="button" id="btn-cerrar-liquidar" class="btn-eliminar">X</button> -->
        <div id="modal-alerta-contenido">
            <label>¿Seguro que desea eliminar la venta?</label>
            <div>
                <button type="button" class="btn-cancelar" onclick="modalEliminarVenta.close()">Cancelar</button>
                <button type="button" class="btn-eliminar" id="btn-confirmar-eliminar-venta">Eliminar</button>
            </div>
        </div>
    </dialog>

    <script src="assets/js/ventas.js"></script>

</body>

</html>