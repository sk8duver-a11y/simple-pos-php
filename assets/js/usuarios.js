const usuario = document.getElementById('usuario');
const nombreUsuario = document.getElementById('nombre-usuario');
const password = document.getElementById('password');
const btnAgregarUsuario = document.getElementById('btn-agregar-usuario');
const modalAlerta = document.getElementById("modal-alerta");
const mensajeAlerta = document.getElementById("mensaje-alerta");
const formularioUsuarios = document.getElementById("agregar-usuario");
const btnCancelar = document.getElementById("cancelar");
const tablaUsuarios = document.getElementById("usuarios-registrados");
const buscarUsuario = document.getElementById("buscar-usuario");
const modalEliminarUsuario = document.getElementById("modal-eliminar-usuario");
const btnEliminarUsuario = document.getElementById("btn-eliminar-usuario");
const nombreUsuarioEliminar = document.getElementById("nombre-eliminar-usuario");

let idEditar = null;
let tiempoBusqueda;

listarUsuarios();

setInterval(() => {
    listarUsuarios(buscarUsuario.value);
}, 5000);

formularioUsuarios.addEventListener("submit", function (event) {
    event.preventDefault();

    const datos = {
        idUsuario: idEditar,
        usuario: usuario.value,
        nombreUsuario: nombreUsuario.value,
        password: password.value
    };

    let archivo = "controllers/agregar_usuario.php";

    if (idEditar !== null) {
        archivo = "controllers/editar_usuario.php";
    }

    fetch(archivo, {
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

            if (resultado.mensaje === "Usuario agregado correctamente." ||
                resultado.mensaje === "Usuario editado correctamente.") {
                formularioUsuarios.reset();
                idEditar = null;
                btnAgregarUsuario.textContent = "Agregar";
                listarUsuarios();
            }
        });
});

function listarUsuarios(busqueda = "") {
    fetch("controllers/listar_usuarios.php?buscar=" + encodeURIComponent(busqueda))
        .then((respuesta) => respuesta.json())
        .then((usuarios) => {
            const cantidadUsuarios = document.getElementById("cantidad-usuarios");
            cantidadUsuarios.textContent = usuarios.length;

            tablaUsuarios.innerHTML = "";

            usuarios.forEach((usuarioFila) => {
                const fila = document.createElement("tr");

                const tdUsuario = document.createElement("td");
                tdUsuario.textContent = usuarioFila.usuario;
                fila.appendChild(tdUsuario);

                const tdNombreUsuario = document.createElement("td");
                tdNombreUsuario.textContent = usuarioFila.nombre_usuario;
                fila.appendChild(tdNombreUsuario);

                const tdRol = document.createElement("td");
                const selectRol = document.createElement("select");
                tdRol.appendChild(selectRol);
                selectRol.classList.add("rol-select");
                selectRol.innerHTML = `
                    <option value="administrador" ${usuarioFila.rol === "administrador" ? "selected" : ""}>Administrador</option>
                    <option value="vendedor" ${usuarioFila.rol === "vendedor" ? "selected" : ""}>Vendedor</option>
                `;
                fila.appendChild(tdRol);

                selectRol.addEventListener("change", function () {
                    const nuevoRol = selectRol.value;

                    fetch("controllers/actualizar_rol.php", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            idUsuario: usuarioFila.id_usuario,
                            rol: nuevoRol
                        })
                    })
                    .then((respuesta) => respuesta.json())
                    .then((resultado) => {

                        if (resultado.mensaje === "Rol actualizado correctamente.") {
                            modalAlerta.showModal();
                            mensajeAlerta.textContent = resultado.mensaje;
                        }
                    });
                });

                const tdAcciones = document.createElement("td");

                const btnPermisos = document.createElement("button");
                btnPermisos.textContent = "Permisos";
                btnPermisos.classList.add("btn-cancelar");

                const btnEditar = document.createElement("button");
                btnEditar.textContent = "Editar";
                btnEditar.dataset.id = usuarioFila.id_usuario;
                btnEditar.classList.add("btn-editar");

                btnEditar.addEventListener("click", function () {
                    btnAgregarUsuario.textContent = "Editar";
                    idEditar = usuarioFila.id_usuario;
                    usuario.value = usuarioFila.usuario;
                    nombreUsuario.value = usuarioFila.nombre_usuario;
                    modalAlerta.showModal();
                    mensajeAlerta.textContent = "Ten presente que al editar el usuario, debes agregar la contraseña nuevamente.";
                });

                const btnEliminar = document.createElement("button");
                btnEliminar.textContent = "Eliminar";
                btnEliminar.dataset.id = usuarioFila.id_usuario;
                btnEliminar.classList.add("btn-eliminar");

                btnEliminar.addEventListener("click", function () {
                    btnEliminarUsuario.dataset.id_usuario = usuarioFila.id_usuario;
                    modalEliminarUsuario.showModal();
                    nombreUsuarioEliminar.textContent = usuarioFila.nombre_usuario;
                });

                btnEliminarUsuario.addEventListener("click", function () {
                    const idUsuario = btnEliminarUsuario.dataset.id_usuario;

                    fetch("controllers/eliminar_usuario.php", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ idUsuario: idUsuario })
                    })
                        .then((respuesta) => respuesta.json())
                        .then((resultado) => {
                            modalEliminarUsuario.close();
                            modalAlerta.showModal();
                            mensajeAlerta.textContent = resultado.mensaje;
                            listarUsuarios();
                            limpiarformulario();
                        });
                });

                tdAcciones.appendChild(btnPermisos);
                tdAcciones.appendChild(btnEditar);
                tdAcciones.appendChild(btnEliminar);
                fila.appendChild(tdAcciones);
                tablaUsuarios.appendChild(fila);
            });
        });
};

btnCancelar.addEventListener("click", function () {
    limpiarformulario();
});

function limpiarformulario() {
    formularioUsuarios.reset();
    idEditar = null;
    btnAgregarUsuario.textContent = "Agregar";
    buscarUsuario.value = "";
    listarUsuarios();
}

buscarUsuario.addEventListener("input", function () {
    clearTimeout(tiempoBusqueda);

    tiempoBusqueda = setTimeout(() => {
        listarUsuarios(buscarUsuario.value);
    }, 300);
});
