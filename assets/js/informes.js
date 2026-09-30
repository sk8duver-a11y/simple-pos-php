const fechaInicial = document.getElementById("fecha-inicial");
const fechaFinal = document.getElementById("fecha-final");
const btnDescargarInforme = document.querySelector(".btn-descargar-informe");
const modalAlerta = document.getElementById("modal-alerta");
const mensajeAlerta = document.getElementById("mensaje-alerta");

btnDescargarInforme.addEventListener("click", function () {
    const fechaInicio = fechaInicial.value;
    const fechaFin = fechaFinal.value;

    if (!fechaInicio || !fechaFin) {
        mensajeAlerta.textContent = "Debes seleccionar la fecha inicial y la fecha final.";
        modalAlerta.showModal();
        return;
    }

    if (fechaInicio > fechaFin) {
        mensajeAlerta.textContent = "La fecha inicial no puede ser mayor que la fecha final.";
        modalAlerta.showModal();
        return;
    }

    const parametros = new URLSearchParams({
        fechaInicial: fechaInicio,
        fechaFinal: fechaFin
    });

    console.log("Fecha inicial:", fechaInicio);
    console.log("Fecha final:", fechaFin);
    console.log("Parámetros:", parametros.toString());

    // window.location.href =
    //     `controllers/descargar_informe_ventas.php?${parametros.toString()}`;
});