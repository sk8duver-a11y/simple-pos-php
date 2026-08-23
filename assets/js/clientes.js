const formularioClientes = document.getElementById("agregar-cliente");
const tablaClientes = document.getElementById("clientes-registrados");

let idEditar = null;
let listaClientes = [];
listarClientes();

formularioClientes.addEventListener("submit", function (event) {
  event.preventDefault();

  const datos = {
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

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.dataset.id_cliente = cliente.id_cliente;
        btnEditar.classList.add("btn-editar");

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.dataset.id_cliente = cliente.id_cliente;
        btnEliminar.classList.add("btn-eliminar");

        tdAcciones.appendChild(btnVerCliente);
        tdAcciones.appendChild(btnEditar);
        tdAcciones.appendChild(btnEliminar);
        fila.appendChild(tdAcciones);

        tablaClientes.appendChild(fila);
      });
    });
}
