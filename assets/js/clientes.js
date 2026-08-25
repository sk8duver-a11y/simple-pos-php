const formularioClientes = document.getElementById("agregar-cliente");
const tablaClientes = document.getElementById("clientes-registrados");
const botonGuardar = document.getElementById("btn-agregar-cliente");
const botonCancelar = document.getElementById("cancelar");
const buscarCliente = document.getElementById("buscar-cliente");

let idEditar = null;
let listaClientes = [];
listarClientes();

formularioClientes.addEventListener("submit", function (event) {
  event.preventDefault();

  const datos = {
    idCliente: idEditar,
    nombreCliente: document.getElementById("nombre-cliente").value,
    celularCliente: document.getElementById("celular-cliente").value,
    correoCliente: document.getElementById("correo-cliente").value,
  };

  let archivo = "controllers/agregar_cliente.php";

  if (idEditar !== null) {
    archivo = "controllers/editar_cliente.php";
  }

  if (datos.nombreCliente.trim() === "") {
    alert("Por favor, digite el nombre del cliente");
    return;
  }

  fetch(archivo, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(datos),
  })
    .then((respuesta) => respuesta.json())
    .then((resultado) => {
      alert(resultado.mensaje);

      if (
        resultado.mensaje === "Cliente agregado correctamente." ||
        resultado.mensaje === "Cliente reactivado correctamente." ||
        resultado.mensaje === "Cliente editado correctamente."
      ) {
        formularioClientes.reset();
        idEditar = null;
        botonGuardar.textContent = "Agregar";
        listarClientes();
      }
    });
});

function listarClientes(busqueda = "") {
  fetch(
    "controllers/listar_clientes.php?buscar=" + encodeURIComponent(busqueda),
  )
    .then((respuesta) => respuesta.json())

    .then((clientes) => {
      listaClientes = clientes;

      const cantidadClientes = document.getElementById("cantidad-clientes");
      cantidadClientes.textContent = clientes.length;

      tablaClientes.innerHTML = "";

      clientes.forEach((cliente) => {
        const fila = document.createElement("tr");

        const tdId = document.createElement("td");
        tdId.textContent = cliente.id_cliente;
        fila.appendChild(tdId);

        const tdNombreCliente = document.createElement("td");
        tdNombreCliente.textContent = cliente.nombre;
        fila.appendChild(tdNombreCliente);

        const tdCelularCliente = document.createElement("td");
        tdCelularCliente.textContent = cliente.celular;
        fila.appendChild(tdCelularCliente);

        const tdCorreoCliente = document.createElement("td");
        tdCorreoCliente.textContent = cliente.correo;
        fila.appendChild(tdCorreoCliente);

        const tdAcciones = document.createElement("td");

        const btnVerCliente = document.createElement("button");
        btnVerCliente.textContent = "Ver Cliente";
        btnVerCliente.dataset.id_cliente = cliente.id_cliente;
        btnVerCliente.classList.add("btn-agregar");

        btnVerCliente.addEventListener("click", function () {
          const idCliente = btnVerCliente.dataset.id_cliente;

          window.location.href = `cliente.php?id=${idCliente}`;
        });

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.dataset.id_cliente = cliente.id_cliente;
        btnEditar.classList.add("btn-editar");

        btnEditar.addEventListener("click", function () {
          botonGuardar.textContent = "Actualizar";
          idEditar = cliente.id_cliente;

          const clienteEditar = listaClientes.find(
            (u) => u.id_cliente == idEditar,
          );

          document.getElementById("nombre-cliente").value = cliente.nombre;
          document.getElementById("celular-cliente").value = cliente.celular;
          document.getElementById("correo-cliente").value = cliente.correo;
        });

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.dataset.id_cliente = cliente.id_cliente;
        btnEliminar.classList.add("btn-eliminar");

        btnEliminar.addEventListener("click", function () {
          const idCliente = btnEliminar.dataset.id_cliente;

          if (
            !confirm(
              `¿Esta seguro que desea eliminar al cliente: ${cliente.nombre}?`,
            )
          ) {
            return;
          }

          fetch("controllers/eliminar_cliente.php", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ idCliente: idCliente }),
          })
            .then((respuesta) => respuesta.json())
            .then((resultado) => {
              alert(resultado.mensaje);
              listarClientes();
            });
        });

        tdAcciones.appendChild(btnVerCliente);
        tdAcciones.appendChild(btnEditar);
        tdAcciones.appendChild(btnEliminar);
        fila.appendChild(tdAcciones);

        tablaClientes.appendChild(fila);
      });
    });
}

botonCancelar.addEventListener("click", function () {
  formularioClientes.reset();
  idEditar = null;
  botonGuardar.textContent = "Agregar";
  buscarCliente.value = "";
  buscarCliente.focus();
  listarClientes();
});

buscarCliente.addEventListener("input", function () {
  listarClientes(buscarCliente.value);
});
