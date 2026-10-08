const fechaInicial = document.getElementById("fecha-inicial");
const fechaFinal = document.getElementById("fecha-final");
const btnDescargarInforme = document.getElementById("btn-descargar-ventas");
const btnDescargarInformeProductos = document.getElementById("btn-descargar-productos");
const modalAlerta = document.getElementById("modal-alerta");
const mensajeAlerta = document.getElementById("mensaje-alerta");

btnDescargarInforme.addEventListener("click", function () {
    const datos = {
        fechaInicial: fechaInicial.value,
        fechaFinal: fechaFinal.value,
    };

    if (!datos.fechaInicial || !datos.fechaFinal) {
        mensajeAlerta.textContent = "Por favor, complete ambos campos de fecha";
        modalAlerta.showModal();
        return;
    }

    if (datos.fechaInicial > datos.fechaFinal) {
        mensajeAlerta.textContent = "La fecha inicial no puede ser mayor que la fecha final";
        modalAlerta.showModal();
        return;
    }

    fetch("controllers/descargar_informe_ventas.php", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(datos),
    })
        .then((respuesta) => respuesta.blob())
        .then((archivo) => {
            const url = URL.createObjectURL(archivo);

            const enlace = document.createElement("a");

            enlace.href = url;
            enlace.download = `informe_ventas_${datos.fechaInicial}_${datos.fechaFinal}.xlsx`;

            document.body.appendChild(enlace);

            enlace.click();

            enlace.remove();

            URL.revokeObjectURL(url);
        })
        .catch((error) => {
            console.error("Error al descargar el informe:", error);
            mensajeAlerta.textContent = "Ocurrió un error al generar el informe.";
            modalAlerta.showModal();
        });
});

btnDescargarInformeProductos.addEventListener("click", function () {
    fetch("controllers/descargar_informe_productos.php")
        .then((respuesta) => respuesta.blob())
        .then((archivo) => {
            const url = URL.createObjectURL(archivo);

            const enlace = document.createElement("a");

            enlace.href = url;
            enlace.download = "informe_productos.xlsx";

            document.body.appendChild(enlace);

            enlace.click();

            enlace.remove();

            URL.revokeObjectURL(url);
        })
        .catch((error) => {
        console.error("Error al descargar el informe:", error);
        mensajeAlerta.textContent = "Ocurrió un error al generar el informe.";
        modalAlerta.showModal();
    });
});