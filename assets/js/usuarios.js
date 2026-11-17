const usuario = document.getElementById('usuario');
const nombreUsuario = document.getElementById('nombre-usuario');
const password = document.getElementById('password');
const btnAgregarUsuario = document.getElementById('btn-agregar-usuario');
const modalAlerta = document.getElementById("modal-alerta");
const mensajeAlerta = document.getElementById("mensaje-alerta");
const formularioUsuarios = document.getElementById("agregar-usuario");

formularioUsuarios.addEventListener("submit", function (event) {
    event.preventDefault();

    const datos = {
        usuario: usuario.value,
        nombreUsuario: nombreUsuario.value,
        password: password.value
    };

    fetch("controllers/agregar_usuario.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos)
    })
    .then((respuesta) => respuesta.json())
    .then((resultado) => {
        modalAlerta.showModal();
        mensajeAlerta.textContent = resultado.mensaje;

        if (resultado.mensaje === "Usuario agregado correctamente.") {
            formularioUsuarios.reset();
        }
    });
});
