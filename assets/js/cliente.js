const parametros = new URLSearchParams(window.location.search);
const idCliente = parametros.get("id");
const txtCliente = document.getElementById("txt-cliente");
const txtCelular = document.getElementById("txt-celular");
const txtCorreo = document.getElementById("txt-correo");

console.log("ID del cliente", idCliente);

function obtenerCliente() {
  fetch(`controllers/obtener_cliente.php?id=${idCliente}`)
    .then((respuesta) => respuesta.json())

    .then((cliente) => {
      console.log(cliente);
      txtCliente.textContent = cliente.nombre;
      txtCelular.textContent = cliente.celular;
      txtCorreo.textContent = cliente.correo;
    });
}

obtenerCliente();
